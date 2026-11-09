import { products } from '@/fixtures/catalog';
export { ProductScreen as default } from '@/features/product/product-screen';
// Static web preview only: native routes remain dynamic.
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}
