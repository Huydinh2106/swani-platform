-- Optional seed data from the SWANI demo catalog. All brands, products and stores are fictional.

insert into public.brands (id, name, handle, tagline, status, is_demo)
values
  ('b1', 'NẾP', '@nep.demo', 'Mặc nhẹ, sống chậm.', 'published', true),
  ('b2', 'STILL', '@still.demo', 'Everyday, thoughtfully.', 'published', true),
  ('b3', 'MỘC', '@moc.demo', 'Những điều vừa đủ.', 'published', true),
  ('b4', 'COMMON', '@common.demo', 'Made for your days.', 'published', true)
on conflict do nothing;

insert into public.stores (id, brand_id, name, address, latitude, longitude, hours, status, is_demo)
values
  ('s1', 'b1', 'NẾP Studio', 'Khu vực Đống Đa, Hà Nội (địa chỉ mẫu)', 21.013, 105.824, '10:00–21:00', 'published', true),
  ('s2', 'b2', 'STILL Space', 'Khu vực Cầu Giấy, Hà Nội (địa chỉ mẫu)', 21.036, 105.793, '09:00–21:30', 'published', true),
  ('s3', 'b3', 'MỘC House', 'Khu vực Ba Đình, Hà Nội (địa chỉ mẫu)', 21.034, 105.817, '10:00–20:00', 'published', true),
  ('s4', 'b4', 'COMMON Room', 'Khu vực Hoàn Kiếm, Hà Nội (địa chỉ mẫu)', 21.028, 105.849, '10:00–22:00', 'published', true)
on conflict do nothing;

insert into public.products (id, brand_id, name, price_vnd, category, color, sizes, tags, description, status, featured_order, is_demo)
values
  ('p1', 'b1', 'Sơ mi cotton relaxed', 420000, 'shirt', 'blue', array['S', 'M', 'L', 'XL']::text[], array['Minimal', 'Cotton']::text[], 'Phom rộng vừa, chất cotton nhẹ cho những ngày dạo phố. Hình minh họa và thông tin là dữ liệu demo.', 'published', 0, true),
  ('p2', 'b2', 'Áo thun everyday', 280000, 'tee', 'sand', array['S', 'M', 'L']::text[], array['Basic', 'Unisex']::text[], 'Một chiếc áo thun dễ phối trong tủ đồ hằng ngày. Hình minh họa và thông tin là dữ liệu demo.', 'published', 1, true),
  ('p3', 'b3', 'Quần ống suông linen', 490000, 'pants', 'olive', array['S', 'M', 'L']::text[], array['Minimal', 'Linen']::text[], 'Dáng suông thoải mái, bề mặt vải mộc mạc. Hình minh họa và thông tin là dữ liệu demo.', 'published', 2, true),
  ('p4', 'b4', 'Áo khoác daily layer', 650000, 'jacket', 'charcoal', array['M', 'L', 'XL']::text[], array['Streetwear', 'Unisex']::text[], 'Lớp áo nhẹ cho những buổi chiều ngoài phố. Hình minh họa và thông tin là dữ liệu demo.', 'published', 3, true),
  ('p5', 'b3', 'Sơ mi linen cổ mở', 390000, 'shirt', 'sand', array['S', 'M', 'L']::text[], array['Minimal', 'Linen']::text[], 'Cổ mở, màu trung tính, dễ mặc cùng quần suông. Hình minh họa và thông tin là dữ liệu demo.', 'published', 4, true),
  ('p6', 'b1', 'Áo thun weekend', 250000, 'tee', 'olive', array['S', 'M', 'L', 'XL']::text[], array['Basic', 'Cotton']::text[], 'Chiếc áo đơn giản cho một cuối tuần thảnh thơi. Hình minh họa và thông tin là dữ liệu demo.', 'published', 5, true)
on conflict do nothing;

insert into public.product_stores (product_id, store_id, brand_id)
values
  ('p1', 's1', 'b1'),
  ('p2', 's2', 'b2'),
  ('p3', 's3', 'b3'),
  ('p4', 's4', 'b4'),
  ('p5', 's3', 'b3'),
  ('p6', 's1', 'b1')
on conflict do nothing;
