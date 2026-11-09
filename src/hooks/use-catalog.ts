import { useQuery } from '@tanstack/react-query';
import type { SearchFilters } from '@/contracts/catalog';
import { catalogRepository } from '@/services/catalog-repository';
export function useProducts(filters: SearchFilters = {}) {
  return useQuery({
    queryKey: ['catalog', 'products', filters],
    queryFn: () => catalogRepository.listProducts(filters),
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
