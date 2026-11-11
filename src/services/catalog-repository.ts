import type { CatalogRepository } from '@/contracts/catalog';
import { brands, products, stores } from '@/fixtures/catalog';
import { searchProducts } from '@/features/search/search-products';
import { createSupabaseCatalog } from '@/services/supabase-catalog';

const fixtureCatalog: CatalogRepository = {
  async listProducts() {
    return [...products];
  },
  async getProduct(id) {
    return products.find((product) => product.id === id);
  },
  async listBrands() {
    return [...brands];
  },
  async listStores() {
    return [...stores];
  },
};

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const source = url && key ? createSupabaseCatalog(url, key) : fixtureCatalog;

export const catalogRepository: CatalogRepository = {
  ...source,
  async listProducts(filters) {
    const items = await source.listProducts();
    if (!filters) return items;
    const catalogBrands = filters.query?.trim() ? await source.listBrands() : [];
    return searchProducts(items, catalogBrands, filters);
  },
};
