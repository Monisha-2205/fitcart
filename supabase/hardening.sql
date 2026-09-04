-- ============================================================
-- FitCart Production Hardening Migration
-- ============================================================
-- Run AFTER schema.sql has been applied.
--
-- This migration adds:
-- 1. Duplicate-checkout protection
-- 2. Safe stock restoration when orders are cancelled
-- 3. Collision-resistant order numbers
-- 4. Duplicate-product protection inside orders
-- 5. Authenticated-user email protection
-- ============================================================


-- ============================================================
-- 1. ADD HARDENING COLUMNS
-- ============================================================

alter table public.orders
add column if not exists idempotency_key text unique;

alter table public.orders
add column if not exists stock_restored boolean not null default false;


-- ============================================================
-- 2. ORDER NUMBER SEQUENCE
-- ============================================================

create sequence if not exists public.order_number_seq
start 1;


-- ============================================================
-- 3. REMOVE OLD place_order FUNCTION
-- ============================================================

drop function if exists public.place_order(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb
);


-- ============================================================
-- 4. CREATE SAFE place_order FUNCTION
-- ============================================================

create or replace function public.place_order(
  p_customer_name text,
  p_phone text,
  p_email text,
  p_address text,
  p_city text,
  p_state text,
  p_pincode text,
  p_items jsonb,
  p_idempotency_key text default null
)
returns table (
  id uuid,
  order_number text,
  subtotal numeric,
  shipping numeric,
  total numeric
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();

  v_item jsonb;
  v_product public.products%rowtype;

  v_quantity integer;
  v_product_id bigint;

  v_subtotal numeric(10,2) := 0;
  v_shipping numeric(10,2);

  v_order_id uuid := gen_random_uuid();
  v_order_number text;

  v_existing_id uuid;

  v_aggregated jsonb;

  v_email text;
begin

  -- ----------------------------------------------------------
  -- Authentication
  -- ----------------------------------------------------------

  if v_user_id is null then
    raise exception 'You must be logged in to place an order';
  end if;


  -- ----------------------------------------------------------
  -- Cart validation
  -- ----------------------------------------------------------

  if jsonb_typeof(p_items) <> 'array'
     or jsonb_array_length(p_items) = 0 then

    raise exception 'Your cart is empty';

  end if;


  -- ----------------------------------------------------------
  -- Use authenticated user's email
  -- ----------------------------------------------------------

  select au.email
  into v_email
  from auth.users as au
  where au.id = v_user_id;

  if v_email is null then
    raise exception 'Your account email could not be verified';
  end if;


  -- ----------------------------------------------------------
  -- Idempotency protection
  --
  -- Lock requests using the same idempotency key so two
  -- simultaneous checkout requests cannot create two orders.
  -- ----------------------------------------------------------

  if p_idempotency_key is not null
     and trim(p_idempotency_key) <> '' then

    perform pg_advisory_xact_lock(
      hashtextextended(trim(p_idempotency_key), 0)
    );

    select o.id
    into v_existing_id
    from public.orders as o
    where o.idempotency_key = trim(p_idempotency_key)
      and o.user_id = v_user_id
    limit 1;

    if found then

      return query
      select
        o.id,
        o.order_number,
        o.subtotal,
        o.shipping,
        o.total
      from public.orders as o
      where o.id = v_existing_id;

      return;

    end if;

  end if;


  -- ----------------------------------------------------------
  -- Aggregate duplicate product IDs
  --
  -- If the same product somehow appears twice in the request,
  -- combine the quantities before checking stock.
  -- ----------------------------------------------------------

  select jsonb_agg(
    jsonb_build_object(
      'productId',
      s.product_id,
      'quantity',
      s.total_qty
    )
  )
  into v_aggregated
  from (
    select
      (value ->> 'productId')::bigint as product_id,
      sum((value ->> 'quantity')::integer)::integer as total_qty
    from jsonb_array_elements(p_items)
    group by (value ->> 'productId')::bigint
  ) as s;


  -- ----------------------------------------------------------
  -- Validate products and stock
  --
  -- FOR UPDATE locks each product row.
  -- This prevents two simultaneous orders from overselling stock.
  -- ----------------------------------------------------------

  for v_item in
    select value
    from jsonb_array_elements(v_aggregated)
  loop

    v_product_id :=
      (v_item ->> 'productId')::bigint;

    v_quantity :=
      (v_item ->> 'quantity')::integer;


    if v_product_id is null then
      raise exception 'Your cart contains an invalid product';
    end if;


    if v_quantity is null
       or v_quantity < 1 then

      raise exception 'Invalid item quantity';

    end if;


    select p.*
    into v_product
    from public.products as p
    where p.id = v_product_id
      and p.is_active = true
    for update;


    if not found then
      raise exception 'One of the selected products is unavailable';
    end if;


    if v_product.stock < v_quantity then

      raise exception '% has only % left in stock',
        v_product.name,
        v_product.stock;

    end if;


    -- Always use the current database price.
    v_subtotal :=
      v_subtotal +
      (v_product.price * v_quantity);

  end loop;


  -- ----------------------------------------------------------
  -- Shipping
  -- ----------------------------------------------------------

  v_shipping :=
    case
      when v_subtotal >= 999 then 0
      else 49
    end;


  -- ----------------------------------------------------------
  -- Collision-resistant order number
  -- ----------------------------------------------------------

  v_order_number :=
    'FC' ||
    to_char(clock_timestamp(), 'YYMMDD') ||
    lpad(
      nextval('public.order_number_seq')::text,
      4,
      '0'
    );


  -- ----------------------------------------------------------
  -- Create order
  --
  -- payment_method is intentionally omitted so the existing
  -- database default remains "Cash on Delivery".
  -- ----------------------------------------------------------

  insert into public.orders (
    id,
    order_number,
    user_id,
    customer_name,
    phone,
    email,
    address,
    city,
    state,
    pincode,
    subtotal,
    shipping,
    total,
    status,
    idempotency_key
  )
  values (
    v_order_id,
    v_order_number,
    v_user_id,
    trim(p_customer_name),
    trim(p_phone),
    v_email,
    trim(p_address),
    trim(p_city),
    trim(p_state),
    trim(p_pincode),
    v_subtotal,
    v_shipping,
    v_subtotal + v_shipping,
    'pending',
    nullif(trim(p_idempotency_key), '')
  );


  -- ----------------------------------------------------------
  -- Create order items and reduce stock
  -- ----------------------------------------------------------

  for v_item in
    select value
    from jsonb_array_elements(v_aggregated)
  loop

    v_product_id :=
      (v_item ->> 'productId')::bigint;

    v_quantity :=
      (v_item ->> 'quantity')::integer;


    -- Lock and re-read the current product.
    select p.*
    into v_product
    from public.products as p
    where p.id = v_product_id
      and p.is_active = true
    for update;


    if not found then
      raise exception 'One of the selected products is unavailable';
    end if;


    insert into public.order_items (
      order_id,
      product_id,
      product_name,
      price,
      quantity
    )
    values (
      v_order_id,
      v_product.id,
      v_product.name,
      v_product.price,
      v_quantity
    );


    update public.products as p
    set stock = p.stock - v_quantity
    where p.id = v_product.id;

  end loop;


  -- ----------------------------------------------------------
  -- Return created order
  -- ----------------------------------------------------------

  return query
  select
    v_order_id,
    v_order_number,
    v_subtotal,
    v_shipping,
    v_subtotal + v_shipping;

end;
$$;


-- ============================================================
-- 5. FUNCTION PERMISSIONS
-- ============================================================

revoke all on function public.place_order(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb,
  text
)
from public;


grant execute on function public.place_order(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb,
  text
)
to authenticated;


-- ============================================================
-- 6. SAFE ORDER CANCELLATION FUNCTION
--
-- Only merchants can cancel orders.
-- Stock is restored exactly once.
-- Delivered orders cannot be cancelled.
-- ============================================================

create or replace function public.cancel_order(
  p_order_id uuid
)
returns table (
  id uuid,
  status public.order_status
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_item record;
begin

  -- ----------------------------------------------------------
  -- Authentication
  -- ----------------------------------------------------------

  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;


  -- ----------------------------------------------------------
  -- Merchant authorization
  -- ----------------------------------------------------------

  if not public.is_merchant() then
    raise exception 'Merchant access required';
  end if;


  -- ----------------------------------------------------------
  -- Lock the order
  -- ----------------------------------------------------------

  select o.*
  into v_order
  from public.orders as o
  where o.id = p_order_id
  for update;


  if not found then
    raise exception 'Order not found';
  end if;


  -- ----------------------------------------------------------
  -- Already cancelled
  --
  -- Do nothing and return current state.
  -- ----------------------------------------------------------

  if v_order.status = 'cancelled' then

    return query
    select
      v_order.id,
      v_order.status;

    return;

  end if;


  -- ----------------------------------------------------------
  -- Delivered orders cannot be cancelled
  -- ----------------------------------------------------------

  if v_order.status = 'delivered' then
    raise exception 'Delivered orders cannot be cancelled';
  end if;


  -- ----------------------------------------------------------
  -- Restore stock exactly once
  -- ----------------------------------------------------------

  if not v_order.stock_restored then

    for v_item in
      select
        oi.product_id,
        oi.quantity
      from public.order_items as oi
      where oi.order_id = p_order_id
    loop

      if v_item.product_id is not null then

        update public.products as p
        set stock = p.stock + v_item.quantity
        where p.id = v_item.product_id;

      end if;

    end loop;

  end if;


  -- ----------------------------------------------------------
  -- Mark order cancelled
  -- ----------------------------------------------------------

  update public.orders as o
  set
    status = 'cancelled',
    stock_restored = true,
    updated_at = now()
  where o.id = p_order_id;


  -- ----------------------------------------------------------
  -- Return result
  -- ----------------------------------------------------------

  return query
  select
    v_order.id,
    'cancelled'::public.order_status;

end;
$$;


-- ============================================================
-- 7. FUNCTION PERMISSIONS
-- ============================================================

revoke all on function public.cancel_order(uuid)
from public;


grant execute on function public.cancel_order(uuid)
to authenticated;