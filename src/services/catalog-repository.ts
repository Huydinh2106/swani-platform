import type { CatalogRepository } from '@/contracts/catalog';
import { brands, products, stores } from '@/fixtures/catalog';
import { searchProducts } from '@/features/search/search-products';

// Adapter demo. Thay adapter tại đây khi nối backend; giữ nguyên contract.
export const catalogRepository: CatalogRepository = {
  async listProducts(filters) {
    return searchProducts(products, brands, filters);
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
