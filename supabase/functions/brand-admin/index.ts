import { createBrandAdminHandler } from './handler.ts';

const url = Deno.env.get('SUPABASE_URL');
const publishableKeys = JSON.parse(Deno.env.get('SUPABASE_PUBLISHABLE_KEYS') ?? '{}') as Record<
  string,
  string
>;
const publishableKey = publishableKeys.default ?? Deno.env.get('SUPABASE_ANON_KEY');

if (!url || !publishableKey) throw new Error('Supabase function environment is missing');

Deno.serve(createBrandAdminHandler({ url, publishableKey }));
