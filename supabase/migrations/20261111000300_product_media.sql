create table public.product_images (
  product_id text not null,
  brand_id text not null,
  storage_path text primary key check (
    split_part(storage_path, '/', 1) = brand_id
    and split_part(storage_path, '/', 2) = product_id
    and storage_path ~ '^[^/]+/[^/]+/[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$'
  ),
  alt_text text not null default '' check (char_length(alt_text) <= 240),
  position integer not null default 0 check (position >= 0),
  foreign key (product_id, brand_id) references public.products (id, brand_id) on delete cascade
);

create index product_images_by_product on public.product_images (product_id, position);
alter table public.product_images enable row level security;

revoke all on public.product_images from public, anon, authenticated;
grant select on public.product_images to anon, authenticated;
grant insert, delete on public.product_images to authenticated;
grant update (alt_text, position) on public.product_images to authenticated;
grant all on public.product_images to service_role;

create policy "Anyone reads published image metadata" on public.product_images
  for select to anon, authenticated using (exists (
    select 1 from public.catalog_products as product
    where product.id = product_images.product_id
  ));
create policy "Members manage their image metadata" on public.product_images for all to authenticated
  using (swani_private.is_brand_member(brand_id)) with check (swani_private.is_brand_member(brand_id));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-media', 'product-media', false, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

create function swani_private.can_manage_product_media(object_name text)
returns boolean
language sql stable set search_path = ''
as $$
  select object_name ~ '^[^/]+/[^/]+/[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$'
    and exists (
      select 1 from public.products as product
      where product.brand_id = split_part(object_name, '/', 1)
        and product.id = split_part(object_name, '/', 2)
        and swani_private.is_brand_member(product.brand_id)
    );
$$;
revoke all on function swani_private.can_manage_product_media(text) from public, anon, authenticated;
grant execute on function swani_private.can_manage_product_media(text) to authenticated;

create policy "Anyone reads attached published images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'product-media' and exists (
    select 1 from public.product_images as image
    join public.catalog_products as product on product.id = image.product_id
    where image.storage_path = objects.name
  ));
create policy "Members read their brand images" on storage.objects
  for select to authenticated using (
    bucket_id = 'product-media' and swani_private.can_manage_product_media(name)
  );
create policy "Members upload their brand images" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'product-media' and swani_private.can_manage_product_media(name)
  );
create policy "Members update their brand images" on storage.objects
  for update to authenticated using (
    bucket_id = 'product-media' and swani_private.can_manage_product_media(name)
  ) with check (
    bucket_id = 'product-media' and swani_private.can_manage_product_media(name)
  );
create policy "Members delete their brand images" on storage.objects
  for delete to authenticated using (
    bucket_id = 'product-media' and swani_private.can_manage_product_media(name)
  );
