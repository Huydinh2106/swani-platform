import { useQuery } from '@tanstack/react-query';
import type { SearchFilters } from '@/contracts/catalog';
import { searchProducts } from '@/features/search/search-products';
import { catalogRepository } from '@/services/catalog-repository';
export function useProducts(filters: SearchFilters = {}) {
  const brands = useBrands();
  return useQuery({
    queryKey: ['catalog', 'products'],
    queryFn: () => catalogRepository.listProducts(),
    select: (products) => searchProducts(products, brands.data ?? [], filters),
  });
}
export function useProduct(id: string) {
  return useQuery({
    queryKey: ['catalog', 'product', id],
    queryFn: async () => (await catalogRepository.getProduct(id)) ?? null,
    enabled: !!id,
  });
}
export function useBrands() {
  return useQuery({
    queryKey: ['catalog', 'brands'],
    queryFn: () => catalogRepository.listBrands(),
  });
}
export function useStores() {
  return useQuery({
    queryKey: ['catalog', 'stores'],
    queryFn: () => catalogRepository.listStores(),
  });
}
