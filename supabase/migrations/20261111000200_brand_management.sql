create function swani_private.create_brand(brand_name text, brand_handle text, brand_tagline text)
returns public.brands
language plpgsql security definer set search_path = ''
as $$
declare
  caller_id uuid := auth.uid();
  new_brand public.brands;
begin
  if caller_id is null or (select auth.jwt() ->> 'is_anonymous') = 'true' then
    raise exception 'A registered account is required' using errcode = '42501';
  end if;

  insert into public.brands (name, handle, tagline)
  values (btrim(brand_name), '@' || lower(ltrim(btrim(brand_handle), '@')), btrim(brand_tagline))
  returning * into new_brand;

  insert into public.brand_members (brand_id, user_id, role)
  values (new_brand.id, caller_id, 'owner');

  return new_brand;
end;
$$;

create function swani_private.set_brand_editor(target_brand_id text, target_user_id uuid, enabled boolean)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.brand_members as membership
    where membership.brand_id = target_brand_id
      and membership.user_id = (select auth.uid()) and membership.role = 'owner'
  ) then
    raise exception 'Only a brand owner can manage editors' using errcode = '42501';
  end if;

  if enabled is null then
    raise exception 'An editor status is required' using errcode = '22023';
  end if;

  if enabled then
    insert into public.brand_members (brand_id, user_id, role)
    values (target_brand_id, target_user_id, 'editor')
    on conflict (brand_id, user_id) do nothing;
  else
    delete from public.brand_members as membership
    where membership.brand_id = target_brand_id and membership.user_id = target_user_id
      and membership.role = 'editor';
  end if;
end;
$$;

create function public.create_brand(brand_name text, brand_handle text, brand_tagline text default '')
returns public.brands
language sql set search_path = ''
as $$
  select * from swani_private.create_brand(brand_name, brand_handle, brand_tagline);
$$;

create function public.set_brand_editor(target_brand_id text, target_user_id uuid, enabled boolean)
returns void
language sql set search_path = ''
as $$
  select swani_private.set_brand_editor(target_brand_id, target_user_id, enabled);
$$;

revoke all on function swani_private.create_brand(text, text, text),
  swani_private.set_brand_editor(text, uuid, boolean),
  public.create_brand(text, text, text), public.set_brand_editor(text, uuid, boolean)
  from public, anon, authenticated;
grant execute on function swani_private.create_brand(text, text, text),
  swani_private.set_brand_editor(text, uuid, boolean),
  public.create_brand(text, text, text), public.set_brand_editor(text, uuid, boolean)
  to authenticated;
