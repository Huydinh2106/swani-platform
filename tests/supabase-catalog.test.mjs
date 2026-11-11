import assert from 'node:assert/strict';
import test from 'node:test';
import { createSupabaseCatalog } from '../src/services/supabase-catalog.ts';

const projectUrl = 'https://example.supabase.co';
const publicKey = 'sb_publishable_test';
const product = {
  id: 'p1',
  brand_id: 'b1',
  name: 'Sơ mi',
  price_vnd: 420000,
  category: 'shirt',
  color: 'blue',
  sizes: ['M'],
  tags: [],
  description: '',
  store_ids: ['s1'],
};

test('Supabase product pages preserve IDs, price and store relationships', async () => {
  const offsets = [];
  const source = createSupabaseCatalog(projectUrl, publicKey, async (url, request) => {
    const endpoint = new URL(url);
    assert.equal(endpoint.pathname, '/rest/v1/catalog_products');
    assert.equal(request.headers.apikey, publicKey);
    const offset = Number(endpoint.searchParams.get('offset'));
    offsets.push(offset);
    const count = offset === 0 ? 100 : 1;
    return Response.json(
      Array.from({ length: count }, (_, i) => ({ ...product, id: 'p' + (offset + i + 1) })),
    );
  });
  const rows = await source.listProducts();
  assert.deepEqual(offsets, [0, 100]);
  assert.equal(rows.length, 101);
  assert.deepEqual(rows[100], {
    id: 'p101',
    brandId: 'b1',
    name: 'Sơ mi',
    priceVnd: 420000,
    category: 'shirt',
    color: 'blue',
    sizes: ['M'],
    tags: [],
    description: '',
    storeIds: ['s1'],
  });
});

test('Supabase product misses resolve to undefined and API errors surface', async () => {
  const empty = createSupabaseCatalog(projectUrl, publicKey, async (url) => {
    assert.equal(new URL(url).searchParams.get('id'), 'eq.missing');
    return Response.json([]);
  });
  assert.equal(await empty.getProduct('missing'), undefined);
  assert.equal(await empty.getProduct('bad/id'), undefined);

  const unavailable = createSupabaseCatalog(projectUrl, publicKey, async () =>
    Response.json({ message: 'unavailable' }, { status: 503 }),
  );
  await assert.rejects(unavailable.listStores(), /request failed \(503\)/);
});
