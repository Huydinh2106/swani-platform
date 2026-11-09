import type { Brand, Product, SearchFilters } from '@/contracts/catalog';

export function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();
}

export function searchProducts(
  products: Product[],
  brands: Brand[],
  filters: SearchFilters = {},
): Product[] {
  const words = normalizeSearch(filters.query ?? '')
    .split(/\s+/)
    .filter(Boolean);
  const brandNames = new Map(brands.map((brand) => [brand.id, brand.name]));
  const result = products.filter((product) => {
    const text = normalizeSearch(
      [product.name, brandNames.get(product.brandId), ...product.tags].join(' '),
    );
    return (
      words.every((word) => text.includes(word)) &&
      (!filters.category || product.category === filters.category) &&
      (filters.maxPriceVnd === undefined || product.priceVnd <= filters.maxPriceVnd)
    );
  });
  return filters.sort === 'price-asc' ? result.sort((a, b) => a.priceVnd - b.priceVnd) : result;
}
