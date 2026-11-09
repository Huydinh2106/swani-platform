import test from 'node:test';
import assert from 'node:assert/strict';
import { products, brands, stores } from '../src/fixtures/catalog.ts';
import { normalizeSearch, searchProducts } from '../src/features/search/search-products.ts';

test('Vietnamese accents, case, whitespace and crossed d are normalized', () => {
  assert.equal(normalizeSearch('  DO DUNG \u0110\u1ed3 D\u00f9ng  '), 'do dung do dung');
  assert.deepEqual(
    searchProducts(products, brands, { query: 'so mi' }).map((p) => p.id),
    ['p1', 'p5'],
  );
  assert.deepEqual(
    searchProducts(products, brands, { query: '  SO    MI ' }).map((p) => p.id),
    ['p1', 'p5'],
  );
});
test('brand names and tags participate in search', () => {
  assert.deepEqual(
    searchProducts(products, brands, { query: 'nep' }).map((p) => p.id),
    ['p1', 'p6'],
  );
  assert.deepEqual(
    searchProducts(products, brands, { query: 'linen' }).map((p) => p.id),
    ['p3', 'p5'],
  );
});
test('category, price boundary and all query terms combine', () => {
  assert.deepEqual(
    searchProducts(products, brands, {
      query: 'so mi',
      category: 'shirt',
      maxPriceVnd: 420000,
      sort: 'price-asc',
    }).map((p) => p.id),
    ['p5', 'p1'],
  );
  assert.equal(searchProducts(products, brands, { maxPriceVnd: 0 }).length, 0);
  assert.equal(searchProducts(products, brands, { query: 'linen cotton' }).length, 0);
});
test('sorting never mutates the original catalog; unknown query returns empty', () => {
  const order = products.map((p) => p.id);
  const results = searchProducts(products, brands, { sort: 'price-asc' });
  assert.equal(results[0].id, 'p6');
  assert.deepEqual(
    products.map((p) => p.id),
    order,
  );
  assert.deepEqual(searchProducts(products, brands, { query: 'zzzzzz' }), []);
});
test('fixtures have unique IDs, valid prices and matching brand/store relationships', () => {
  for (const items of [products, brands, stores])
    assert.equal(new Set(items.map((item) => item.id)).size, items.length);
  for (const product of products) {
    assert.ok(Number.isSafeInteger(product.priceVnd) && product.priceVnd >= 0);
    assert.ok(brands.some((brand) => brand.id === product.brandId));
    for (const id of product.storeIds)
      assert.ok(stores.some((store) => store.id === id && store.brandId === product.brandId));
  }
});
