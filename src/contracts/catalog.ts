// Hợp đồng dữ liệu dùng chung. Giá luôn là số nguyên VND, ID luôn là string.
export type Category = 'shirt' | 'tee' | 'pants' | 'jacket';
export type GarmentColor = 'blue' | 'sand' | 'olive' | 'charcoal';
export type Product = {
  id: string;
  brandId: string;
  name: string;
  priceVnd: number;
  category: Category;
  color: GarmentColor;
  sizes: string[];
  tags: string[];
  description: string;
  storeIds: string[];
};
export type Brand = { id: string; name: string; handle: string; tagline: string };
export type Store = {
  id: string;
  brandId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  hours: string;
};
export type SearchFilters = {
  query?: string;
  category?: Category;
  maxPriceVnd?: number;
  sort?: 'featured' | 'price-asc';
};
export type CatalogRepository = {
  listProducts(filters?: SearchFilters): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  listBrands(): Promise<Brand[]>;
  listStores(): Promise<Store[]>;
};
