import type { Brand, CatalogRepository, Product, Store } from '@/contracts/catalog';

type CatalogProductRow = Omit<Product, 'brandId' | 'priceVnd' | 'storeIds'> & {
  brand_id: string;
  price_vnd: number;
  store_ids: string[];
};
type StoreRow = Omit<Store, 'brandId'> & { brand_id: string };

const pageSize = 100;
const productColumns = 'id,brand_id,name,price_vnd,category,color,sizes,tags,description,store_ids';

function mapProduct(row: CatalogProductRow): Product {
  return {
    id: row.id,
    brandId: row.brand_id,
    name: row.name,
    priceVnd: row.price_vnd,
    category: row.category,
    color: row.color,
    sizes: row.sizes,
    tags: row.tags,
    description: row.description,
    storeIds: row.store_ids,
  };
}

export function createSupabaseCatalog(
  url: string,
  publishableKey: string,
  fetcher: typeof fetch = fetch,
) {
  async function read<T>(table: string, query: Record<string, string>): Promise<T[]> {
    if (!publishableKey.startsWith('sb_publishable_')) {
      throw new Error('SWANI requires a Supabase publishable key for its catalog.');
    }

    const endpoint = new URL('/rest/v1/' + table, url);
    endpoint.search = new URLSearchParams(query).toString();
    const response = await fetcher(endpoint.toString(), {
      headers: { apikey: publishableKey, Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`Supabase catalog request failed (${response.status}).`);
    }
    const rows: unknown = await response.json();
    if (!Array.isArray(rows)) throw new Error('Supabase catalog did not return a list.');
    return rows as T[];
  }

  async function list<T>(table: string, query: Record<string, string>): Promise<T[]> {
    const result: T[] = [];
    for (let offset = 0; ; offset += pageSize) {
      const rows = await read<T>(table, {
        ...query,
        limit: String(pageSize),
        offset: String(offset),
      });
      result.push(...rows);
      if (rows.length < pageSize) return result;
    }
  }

  return {
    async listProducts() {
      const rows = await list<CatalogProductRow>('catalog_products', {
        select: productColumns,
        order: 'featured_order.asc,id.asc',
      });
      return rows.map(mapProduct);
    },
    async getProduct(id) {
      if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/.test(id)) return;

      const [row] = await read<CatalogProductRow>('catalog_products', {
        select: productColumns,
        id: 'eq.' + id,
        limit: '1',
      });
      return row ? mapProduct(row) : undefined;
    },
    listBrands() {
      return list<Brand>('brands', {
        select: 'id,name,handle,tagline',
        status: 'eq.published',
        order: 'id.asc',
      });
    },
    async listStores() {
      const rows = await list<StoreRow>('stores', {
        select: 'id,brand_id,name,address,latitude,longitude,hours',
        status: 'eq.published',
        order: 'id.asc',
      });
      return rows.map(({ brand_id, ...store }) => ({ ...store, brandId: brand_id }));
    },
  } satisfies CatalogRepository;
}
