create schema swani_private;
revoke all on schema swani_private from public;
grant usage on schema swani_private to authenticated;

create table public.brands (
  id text primary key default gen_random_uuid()::text
    check (id ~ '^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$'),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  handle text not null unique check (handle ~ '^@[a-z0-9][a-z0-9._-]{1,38}$'),
  tagline text not null default '' check (char_length(tagline) <= 240),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 120),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.brand_members (
  brand_id text not null references public.brands (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('owner', 'editor')),
  created_at timestamptz not null default now(),
  primary key (brand_id, user_id)
);

create table public.products (
  id text primary key default gen_random_uuid()::text
    check (id ~ '^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$'),
  brand_id text not null references public.brands (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 160),
  price_vnd integer not null check (price_vnd >= 0),
  category text not null check (category in ('shirt', 'tee', 'pants', 'jacket')),
  color text not null check (color in ('blue', 'sand', 'olive', 'charcoal')),
  sizes text[] not null check (cardinality(sizes) between 1 and 24 and array_ndims(sizes) = 1)
    check (array_position(sizes, null) is null),
  tags text[] not null default '{}' check (cardinality(tags) <= 32 and coalesce(array_ndims(tags), 1) = 1)
    check (array_position(tags, null) is null),
  description text not null default '' check (char_length(description) <= 10000),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  featured_order integer not null default 0 check (featured_order >= 0),
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, brand_id)
);

create table public.stores (
  id text primary key default gen_random_uuid()::text
    check (id ~ '^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$'),
  brand_id text not null references public.brands (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 160),
  address text not null check (char_length(btrim(address)) between 1 and 500),
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  hours text not null check (char_length(btrim(hours)) between 1 and 160),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, brand_id)
);

create table public.product_stores (
  product_id text not null,
  store_id text not null,
  brand_id text not null,
  primary key (product_id, store_id),
  foreign key (product_id, brand_id) references public.products (id, brand_id) on delete cascade,
  foreign key (store_id, brand_id) references public.stores (id, brand_id) on delete cascade
);

create table public.saved_products (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  product_id text not null references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table public.followed_brands (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  brand_id text not null references public.brands (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, brand_id)
);

create index brand_members_by_user on public.brand_members (user_id, brand_id);
create index products_by_brand on public.products (brand_id, status);
create index products_by_category_price on public.products (category, price_vnd) where status = 'published';
create index products_by_feature on public.products (featured_order, id) where status = 'published';
create index stores_by_brand on public.stores (brand_id, status);
create index product_stores_by_store on public.product_stores (store_id, brand_id);
create index saved_products_by_product on public.saved_products (product_id);
create index followed_brands_by_brand on public.followed_brands (brand_id);

create function swani_private.is_brand_member(target_brand_id text)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.brand_members as membership
    where membership.brand_id = target_brand_id and membership.user_id = (select auth.uid())
  );
$$;
revoke all on function swani_private.is_brand_member(text) from public, anon, authenticated;
grant execute on function swani_private.is_brand_member(text) to authenticated;

create function swani_private.touch_updated_at()
returns trigger
language plpgsql set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
revoke all on function swani_private.touch_updated_at() from public, anon, authenticated;

create trigger touch_brand before update on public.brands
  for each row execute function swani_private.touch_updated_at();
create trigger touch_profile before update on public.profiles
  for each row execute function swani_private.touch_updated_at();
create trigger touch_product before update on public.products
  for each row execute function swani_private.touch_updated_at();
create trigger touch_store before update on public.stores
  for each row execute function swani_private.touch_updated_at();

create function swani_private.create_profile_for_user()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;
revoke all on function swani_private.create_profile_for_user() from public, anon, authenticated;

create trigger swani_create_profile after insert on auth.users
  for each row execute function swani_private.create_profile_for_user();
insert into public.profiles (id) select id from auth.users on conflict (id) do nothing;

alter table public.brands enable row level security;
alter table public.profiles enable row level security;
alter table public.brand_members enable row level security;
alter table public.products enable row level security;
alter table public.stores enable row level security;
alter table public.product_stores enable row level security;
alter table public.saved_products enable row level security;
alter table public.followed_brands enable row level security;

revoke all on public.brands, public.profiles, public.brand_members, public.products,
  public.stores, public.product_stores, public.saved_products, public.followed_brands
  from public, anon, authenticated;
grant select on public.brands, public.products, public.stores, public.product_stores to anon, authenticated;
grant select on public.profiles, public.brand_members to authenticated;
grant select, insert, delete on public.saved_products, public.followed_brands to authenticated;
grant update (display_name) on public.profiles to authenticated;
grant update (name, handle, tagline, status) on public.brands to authenticated;
grant insert (brand_id, name, price_vnd, category, color, sizes, tags, description, status, featured_order)
  on public.products to authenticated;
grant update (name, price_vnd, category, color, sizes, tags, description, status, featured_order)
  on public.products to authenticated;
grant insert (brand_id, name, address, latitude, longitude, hours, status) on public.stores to authenticated;
grant update (name, address, latitude, longitude, hours, status) on public.stores to authenticated;
grant insert, delete on public.product_stores to authenticated;
grant all on public.brands, public.profiles, public.brand_members, public.products,
  public.stores, public.product_stores, public.saved_products, public.followed_brands to service_role;

create policy "Users read their profile" on public.profiles for select to authenticated
  using ((select auth.uid()) = id);
create policy "Users update their profile" on public.profiles for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "Members read their memberships" on public.brand_members for select to authenticated
  using ((select auth.uid()) = user_id or swani_private.is_brand_member(brand_id));

create policy "Anyone reads published brands" on public.brands for select to anon, authenticated
  using (status = 'published');
create policy "Members read their brands" on public.brands for select to authenticated
  using (swani_private.is_brand_member(id));
create policy "Members update their brands" on public.brands for update to authenticated
  using (swani_private.is_brand_member(id)) with check (swani_private.is_brand_member(id));

create policy "Anyone reads published products" on public.products for select to anon, authenticated
  using (status = 'published' and exists (
    select 1 from public.brands as brand
    where brand.id = products.brand_id and brand.status = 'published'
  ));
create policy "Members read their products" on public.products for select to authenticated
  using (swani_private.is_brand_member(brand_id));
create policy "Members add their products" on public.products for insert to authenticated
  with check (swani_private.is_brand_member(brand_id));
create policy "Members update their products" on public.products for update to authenticated
  using (swani_private.is_brand_member(brand_id)) with check (swani_private.is_brand_member(brand_id));

create policy "Anyone reads published stores" on public.stores for select to anon, authenticated
  using (status = 'published' and exists (
    select 1 from public.brands as brand
    where brand.id = stores.brand_id and brand.status = 'published'
  ));
create policy "Members read their stores" on public.stores for select to authenticated
  using (swani_private.is_brand_member(brand_id));
create policy "Members add their stores" on public.stores for insert to authenticated
  with check (swani_private.is_brand_member(brand_id));
create policy "Members update their stores" on public.stores for update to authenticated
  using (swani_private.is_brand_member(brand_id)) with check (swani_private.is_brand_member(brand_id));

create policy "Anyone reads published product locations" on public.product_stores for select to anon, authenticated
  using (
    exists (
      select 1 from public.products as product
      join public.brands as brand on brand.id = product.brand_id
      where product.id = product_stores.product_id
        and product.status = 'published' and brand.status = 'published'
    )
    and exists (
      select 1 from public.stores as store
      where store.id = product_stores.store_id and store.status = 'published'
    )
  );
create policy "Members manage their product locations" on public.product_stores for all to authenticated
  using (swani_private.is_brand_member(brand_id)) with check (swani_private.is_brand_member(brand_id));

create policy "Users read their saved products" on public.saved_products for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users save published products" on public.saved_products for insert to authenticated
  with check ((select auth.uid()) = user_id and exists (
    select 1 from public.products as product
    join public.brands as brand on brand.id = product.brand_id
    where product.id = saved_products.product_id
      and product.status = 'published' and brand.status = 'published'
  ));
create policy "Users remove their saved products" on public.saved_products for delete to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users read their followed brands" on public.followed_brands for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users follow published brands" on public.followed_brands for insert to authenticated
  with check ((select auth.uid()) = user_id and exists (
    select 1 from public.brands as brand
    where brand.id = followed_brands.brand_id and brand.status = 'published'
  ));
create policy "Users unfollow their brands" on public.followed_brands for delete to authenticated
  using ((select auth.uid()) = user_id);

create view public.catalog_products with (security_invoker = true) as
select product.id, product.brand_id, product.name, product.price_vnd, product.category, product.color,
  product.sizes, product.tags, product.description, product.featured_order, product.is_demo,
  array(
    select location.store_id from public.product_stores as location
    join public.stores as store on store.id = location.store_id
    where location.product_id = product.id and store.status = 'published'
    order by location.store_id
  ) as store_ids
from public.products as product
join public.brands as brand on brand.id = product.brand_id
where product.status = 'published' and brand.status = 'published';

revoke all on public.catalog_products from public, anon, authenticated;
grant select on public.catalog_products to anon, authenticated, service_role;
