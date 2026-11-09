import type { Brand, Product, Store } from '@/contracts/catalog';

// Brand, cửa hàng và sản phẩm đều hư cấu; tọa độ là vị trí mẫu tại Hà Nội.
export const brands: Brand[] = [
  { id: 'b1', name: 'NẾP', handle: '@nep.demo', tagline: 'Mặc nhẹ, sống chậm.' },
  { id: 'b2', name: 'STILL', handle: '@still.demo', tagline: 'Everyday, thoughtfully.' },
  { id: 'b3', name: 'MỘC', handle: '@moc.demo', tagline: 'Những điều vừa đủ.' },
  { id: 'b4', name: 'COMMON', handle: '@common.demo', tagline: 'Made for your days.' },
];
export const stores: Store[] = [
  {
    id: 's1',
    brandId: 'b1',
    name: 'NẾP Studio',
    address: 'Khu vực Đống Đa, Hà Nội (địa chỉ mẫu)',
    latitude: 21.013,
    longitude: 105.824,
    hours: '10:00–21:00',
  },
  {
    id: 's2',
    brandId: 'b2',
    name: 'STILL Space',
    address: 'Khu vực Cầu Giấy, Hà Nội (địa chỉ mẫu)',
    latitude: 21.036,
    longitude: 105.793,
    hours: '09:00–21:30',
  },
  {
    id: 's3',
    brandId: 'b3',
    name: 'MỘC House',
    address: 'Khu vực Ba Đình, Hà Nội (địa chỉ mẫu)',
    latitude: 21.034,
    longitude: 105.817,
    hours: '10:00–20:00',
  },
  {
    id: 's4',
    brandId: 'b4',
    name: 'COMMON Room',
    address: 'Khu vực Hoàn Kiếm, Hà Nội (địa chỉ mẫu)',
    latitude: 21.028,
    longitude: 105.849,
    hours: '10:00–22:00',
  },
];
export const products: Product[] = [
  {
    id: 'p1',
    brandId: 'b1',
    name: 'Sơ mi cotton relaxed',
    priceVnd: 420000,
    category: 'shirt',
    color: 'blue',
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['Minimal', 'Cotton'],
    description:
      'Phom rộng vừa, chất cotton nhẹ cho những ngày dạo phố. Hình minh họa và thông tin là dữ liệu demo.',
    storeIds: ['s1'],
  },
  {
    id: 'p2',
    brandId: 'b2',
    name: 'Áo thun everyday',
    priceVnd: 280000,
    category: 'tee',
    color: 'sand',
    sizes: ['S', 'M', 'L'],
    tags: ['Basic', 'Unisex'],
    description:
      'Một chiếc áo thun dễ phối trong tủ đồ hằng ngày. Hình minh họa và thông tin là dữ liệu demo.',
    storeIds: ['s2'],
  },
  {
    id: 'p3',
    brandId: 'b3',
    name: 'Quần ống suông linen',
    priceVnd: 490000,
    category: 'pants',
    color: 'olive',
    sizes: ['S', 'M', 'L'],
    tags: ['Minimal', 'Linen'],
    description:
      'Dáng suông thoải mái, bề mặt vải mộc mạc. Hình minh họa và thông tin là dữ liệu demo.',
    storeIds: ['s3'],
  },
  {
    id: 'p4',
    brandId: 'b4',
    name: 'Áo khoác daily layer',
    priceVnd: 650000,
    category: 'jacket',
    color: 'charcoal',
    sizes: ['M', 'L', 'XL'],
    tags: ['Streetwear', 'Unisex'],
    description:
      'Lớp áo nhẹ cho những buổi chiều ngoài phố. Hình minh họa và thông tin là dữ liệu demo.',
    storeIds: ['s4'],
  },
  {
    id: 'p5',
    brandId: 'b3',
    name: 'Sơ mi linen cổ mở',
    priceVnd: 390000,
    category: 'shirt',
    color: 'sand',
    sizes: ['S', 'M', 'L'],
    tags: ['Minimal', 'Linen'],
    description:
      'Cổ mở, màu trung tính, dễ mặc cùng quần suông. Hình minh họa và thông tin là dữ liệu demo.',
    storeIds: ['s3'],
  },
  {
    id: 'p6',
    brandId: 'b1',
    name: 'Áo thun weekend',
    priceVnd: 250000,
    category: 'tee',
    color: 'olive',
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['Basic', 'Cotton'],
    description:
      'Chiếc áo đơn giản cho một cuối tuần thảnh thơi. Hình minh họa và thông tin là dữ liệu demo.',
    storeIds: ['s1'],
  },
];
export const categories = [
  { value: 'shirt', label: 'Sơ mi' },
  { value: 'tee', label: 'Áo thun' },
  { value: 'pants', label: 'Quần dài' },
  { value: 'jacket', label: 'Áo khoác' },
] as const;
