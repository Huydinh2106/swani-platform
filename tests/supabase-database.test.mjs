import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import { PGlite } from '@electric-sql/pglite';
import { products } from '../src/fixtures/catalog.ts';

const userA = '10000000-0000-4000-8000-000000000001';
const userB = '10000000-0000-4000-8000-000000000002';
const migrations = new URL('../supabase/migrations/', import.meta.url);

// Match the managed Auth and Storage objects referenced by the migrations.
const supabaseBootstrap = `
  create role anon;
  create role authenticated;
  create role service_role bypassrls;
  create schema auth;
  grant usage on schema auth to anon, authenticated;
  create table auth.users (id uuid primary key);
  create function auth.uid() returns uuid language sql stable
    as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  create function auth.jwt() returns jsonb language sql stable
    as $$ select nullif(current_setting('request.jwt.claims', true), '')::jsonb $$;
  create schema storage;
  grant usage on schema storage to anon, authenticated;
  create table storage.buckets (
    id text primary key, name text not null, public boolean not null,
    file_size_limit bigint, allowed_mime_types text[]
  );
  create table storage.objects (
    bucket_id text not null references storage.buckets (id),
    name text not null,
    primary key (bucket_id, name)
  );
  alter table storage.objects enable row level security;
  grant select on storage.objects to anon;
  grant select, insert, update, delete on storage.objects to authenticated;
`;

test('Supabase migrations, demo seed and role isolation on PostgreSQL', async (t) => {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(supabaseBootstrap);
  await db.query('insert into auth.users values ($1)', [userA]);
  for (const filename of (await readdir(migrations)).sort()) {
    if (filename.endsWith('.sql')) {
      await db.exec(await readFile(new URL(filename, migrations), 'utf8'));
    }
  }
  const seed = await readFile(new URL('../supabase/seed.sql', import.meta.url), 'utf8');
  await db.exec(seed);
  await db.exec(seed);
  await db.query('insert into auth.users values ($1)', [userB]);
  await db.query(
    "insert into public.brand_members (brand_id, user_id, role) values ('b1', $1, 'owner'), ('b2', $2, 'owner')",
    [userA, userB],
  );

  async function assume(role, user = '') {
    await db.exec('reset role');
    await db.query("select set_config('request.jwt.claim.sub', $1, false)", [user]);
    await db.exec(role === 'anon' ? 'set role anon' : 'set role authenticated');
  }

  await t.test('published catalog matches fixture ordering and store links', async () => {
    await assume('anon');
    const { rows } = await db.query(
      'select id, name, price_vnd, store_ids, is_demo from public.catalog_products order by featured_order',
    );
    assert.deepEqual(
      rows,
      products.map((product) => ({
        id: product.id,
        name: product.name,
        price_vnd: product.priceVnd,
        store_ids: product.storeIds,
        is_demo: true,
      })),
    );
    await assert.rejects(db.query('select * from public.profiles'), { code: '42501' });
    await assert.rejects(db.query("select public.create_brand('Test', 'test')"), { code: '42501' });
  });

  await t.test('profiles and saved state are private to each user', async () => {
    await assume('authenticated', userA);
    await db.query("update public.profiles set display_name = 'A'");
    await db.query("insert into public.saved_products (product_id) values ('p1')");
    await db.query("insert into public.followed_brands (brand_id) values ('b1')");
    await assume('authenticated', userB);
    assert.deepEqual((await db.query('select id from public.profiles')).rows, [{ id: userB }]);
    assert.equal((await db.query('select * from public.saved_products')).rows.length, 0);
    assert.equal((await db.query('select * from public.followed_brands')).rows.length, 0);
    await assert.rejects(
      db.query("insert into public.saved_products (user_id, product_id) values ($1, 'p2')", [
        userA,
      ]),
      { code: '42501' },
    );
    assert.equal(
      (await db.query("delete from public.saved_products where product_id = 'p1'")).affectedRows,
      0,
    );
    await assume('authenticated', userA);
    assert.deepEqual((await db.query('select id, display_name from public.profiles')).rows, [
      { id: userA, display_name: 'A' },
    ]);
    assert.deepEqual((await db.query('select product_id from public.saved_products')).rows, [
      { product_id: 'p1' },
    ]);
  });

  await t.test('brand owners can delegate editing without crossing tenant boundaries', async () => {
    await assume('authenticated', userA);
    const {
      rows: [brand],
    } = await db.query("select * from public.create_brand('Local Brand', 'Local.Brand')");
    assert.equal(brand.handle, '@local.brand');
    assert.equal(brand.status, 'draft');
    assert.deepEqual(
      (
        await db.query(
          'select role from public.brand_members where brand_id = $1 and user_id = $2',
          [brand.id, userA],
        )
      ).rows,
      [{ role: 'owner' }],
    );
    await db.query(
      "insert into public.products (brand_id, name, price_vnd, category, color, sizes, status) values ($1, 'Hidden product', 1, 'tee', 'olive', array['M'], 'published')",
      [brand.id],
    );
    assert.equal(
      (await db.query("update public.products set name = 'Denied' where id = 'p2'")).affectedRows,
      0,
    );
    await assert.rejects(
      db.query(
        "insert into public.product_stores (product_id, store_id, brand_id) values ('p1', 's2', 'b1')",
      ),
      { code: '23503' },
    );
    await assert.rejects(db.query("update public.products set price_vnd = -1 where id = 'p1'"), {
      code: '23514',
    });
    await assert.rejects(
      db.query(
        "insert into public.brand_members (brand_id, user_id, role) values ('b2', $1, 'owner')",
        [userA],
      ),
      { code: '42501' },
    );
    await db.query("select public.set_brand_editor('b1', $1, true)", [userB]);
    await assume('authenticated', userB);
    assert.equal(
      (await db.query("update public.products set description = 'Edited' where id = 'p1'"))
        .affectedRows,
      1,
    );
    await assert.rejects(db.query("select public.set_brand_editor('b1', $1, false)", [userA]), {
      code: '42501',
    });
    assert.equal(
      (await db.query('select id from public.brands where id = $1', [brand.id])).rows.length,
      0,
    );
    await assume('authenticated', userA);
    await db.query("select public.set_brand_editor('b1', $1, false)", [userB]);
    await assume('authenticated', userB);
    assert.equal(
      (await db.query("update public.products set description = 'Denied' where id = 'p1'"))
        .affectedRows,
      0,
    );
    await assume('anon');
    assert.equal(
      (await db.query('select id from public.catalog_products where brand_id = $1', [brand.id]))
        .rows.length,
      0,
    );
    assert.equal(
      (await db.query('select id from public.products where brand_id = $1', [brand.id])).rows
        .length,
      0,
    );
  });

  await t.test('Storage hides drafts and rejects uploads for another brand', async () => {
    await assume('authenticated', userA);
    await db.query(
      "insert into storage.objects (bucket_id, name) values ('product-media', 'b1/p1/cover.webp'), ('product-media', 'b1/p1/unattached.webp')",
    );
    await db.query(
      "insert into public.product_images (product_id, brand_id, storage_path) values ('p1', 'b1', 'b1/p1/cover.webp')",
    );
    await assert.rejects(
      db.query(
        "insert into storage.objects (bucket_id, name) values ('product-media', 'b2/p2/cover.webp')",
      ),
      { code: '42501' },
    );
    await assume('anon');
    assert.deepEqual((await db.query('select name from storage.objects')).rows, [
      { name: 'b1/p1/cover.webp' },
    ]);
    await assume('authenticated', userA);
    await db.query("update public.products set status = 'draft' where id = 'p1'");
    assert.equal((await db.query('select name from storage.objects')).rows.length, 2);
    await assume('anon');
    assert.equal((await db.query('select name from storage.objects')).rows.length, 0);
    assert.equal((await db.query('select * from public.product_images')).rows.length, 0);
  });
});
