-- Run after schema.sql. IDs intentionally match the original FitCart catalog.
insert into public.products (id, name, description, price, original_price, category, image, stock) values
(1, 'Premium Rolled Oats', 'Wholesome rolled oats for nourishing breakfasts.', 299, 349, 'Oats & Cereals', 'https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?auto=format&fit=crop&w=600&q=80', 50),
(2, 'Classic Oatmeal', 'A simple, comforting pantry breakfast staple.', 249, 299, 'Oats & Cereals', '/classic-oatmel.png', 50),
(3, 'High Protein Oats', 'Protein-rich oats for an active routine.', 399, 449, 'Oats & Cereals', 'https://www.simplyquinoa.com/wp-content/uploads/2023/08/protein-oatmeal-21-1024x1536.jpg', 40),
(4, 'Multigrain Breakfast Mix', 'A satisfying mix of grains for busy mornings.', 349, 399, 'Oats & Cereals', 'https://www.gatheranddine.com/wp-content/uploads/2015/03/muesli-1.jpg', 45),
(5, 'Natural Peanut Butter', 'Creamy natural peanut butter with no fuss.', 449, 499, 'Nut Butters', 'https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/natural_unsweetened_peanut_butter.jpg', 40),
(6, 'Crunchy Peanut Butter', 'Crunchy peanut butter for toast and smoothies.', 469, 529, 'Nut Butters', 'https://assets.syndigo.cloud/f5bcca90-7cc2-4778-bd50-1861a04326e4?fileType=jpg&size=600x600', 40),
(7, 'Almond Butter', 'Smooth premium almond butter.', 699, 799, 'Nut Butters', 'https://www.refillroom.com/wp-content/uploads/2021/01/8229.jpg', 30),
(8, 'Mixed Nut Butter', 'A rich, balanced mixed nut spread.', 599, 699, 'Nut Butters', 'https://nl.pit-pit.com/cdn/shop/files/654cb6454e78ca4621451a44_2000x.jpg?v=1699526226', 30),
(9, 'Mixed Premium Nuts', 'A premium everyday mix of nourishing nuts.', 599, 699, 'Nuts & Seeds', 'https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsb2ZmaWNlNl9taXhlZF9udXRzX2luX2Jvd2xfaXNvbGF0ZV9vbl9wYXBlcl9kZjI0NjNjMi0wNjU4LTQ0NzAtOGRmYi02NDYwYzQxYzZlZjlfMS5qcGc.jpg', 35),
(10, 'Premium Almonds', 'Crunchy almonds for snacks and recipes.', 549, 649, 'Nuts & Seeds', 'https://images.unsplash.com/photo-1642337841034-249c5a21623c?auto=format&fit=crop&w=600&q=80', 35),
(11, 'Roasted Cashews', 'Delicious roasted cashews ready to enjoy.', 649, 749, 'Nuts & Seeds', 'https://static.arrajol.com/users/user471261/shutterstock_2158030411_0.jpg', 35),
(12, 'Chia & Flax Seeds', 'A versatile chia and flax seed blend.', 299, 349, 'Nuts & Seeds', 'https://www.nutsinbulk.co.uk/files/items/seeds/chia_seeds_flaxseeds_brown.jpg', 50),
(13, 'Crunchy Granola', 'A crispy granola snack or breakfast topper.', 379, 429, 'Healthy Snacks', 'https://www.parade.com/.image/t_share/MjAzNjQ5MjAzNDc2Mzc1NDE0/bowl-of-granola-imago--pond5-images.jpg', 45),
(14, 'Dark Chocolate Bites', 'A little indulgence made with dark chocolate.', 299, 349, 'Healthy Snacks', 'https://cdn.apartmenttherapy.info/image/upload/f_auto%2Cq_auto%3Aeco%2Cc_fill%2Cg_center%2Cw_730%2Ch_913/k%2Farchive%2Ff84b9d24940d18326c70979b866797ebf717c5ae', 45),
(15, 'Roasted Makhana', 'Light and crunchy roasted fox nuts.', 329, 379, 'Healthy Snacks', 'https://healthymaster.in/cdn/shop/files/50.jpg?v=1703139463&width=%7Bwidth%7D', 50),
(16, 'Protein Energy Bites', 'Date and oat energy bites for quick fuel.', 399, 449, 'Healthy Snacks', 'https://www.consumerenergycenter.org/wp-content/uploads/2024/10/energy-balls-with-dates-and-oats-a-sweet-and-nutritious-snack-VL.jpeg', 40)
on conflict (id) do update set name = excluded.name, description = excluded.description, price = excluded.price, original_price = excluded.original_price, category = excluded.category, image = excluded.image, stock = excluded.stock;

select setval(pg_get_serial_sequence('public.products', 'id'), (select max(id) from public.products));
