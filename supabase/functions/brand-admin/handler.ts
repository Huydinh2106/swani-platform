type BrandAdminConfig = {
  url: string;
  publishableKey: string;
  fetcher?: typeof fetch;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const maxBodyBytes = 4096;
const brandIdPattern = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;
const userIdPattern = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

function json(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: { ...corsHeaders, 'Cache-Control': 'no-store' },
  });
}

function parseAction(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return;

  const body = input as Record<string, unknown>;
  if (body.action === 'create_brand') {
    const { name, handle, tagline = '' } = body;
    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof handle !== 'string' ||
      !/^@?[a-z0-9][a-z0-9._-]{1,38}$/i.test(handle.trim()) ||
      typeof tagline !== 'string'
    ) {
      return;
    }
    return {
      rpc: 'create_brand',
      params: { brand_name: name, brand_handle: handle, brand_tagline: tagline },
      status: 201,
    };
  }

  if (body.action === 'set_brand_editor') {
    const { brandId, userId, enabled } = body;
    if (
      typeof brandId !== 'string' ||
      !brandIdPattern.test(brandId) ||
      typeof userId !== 'string' ||
      !userIdPattern.test(userId) ||
      typeof enabled !== 'boolean'
    ) {
      return;
    }
    return {
      rpc: 'set_brand_editor',
      params: { target_brand_id: brandId, target_user_id: userId, enabled },
      status: 200,
    };
  }
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  let bytes = 0;
  let text = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return JSON.parse(text + decoder.decode());
    bytes += value.byteLength;
    if (bytes > maxBodyBytes) {
      await reader.cancel();
      throw new RangeError('Request body is too large');
    }
    text += decoder.decode(value, { stream: true });
  }
}

export function createBrandAdminHandler({
  url,
  publishableKey,
  fetcher = fetch,
}: BrandAdminConfig) {
  return async function handleBrandAdmin(request: Request) {
    if (request.method === 'OPTIONS')
      return new Response(null, { status: 204, headers: corsHeaders });
    if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

    const authorization = request.headers.get('Authorization');
    if (!authorization || !/^Bearer [^\s]+$/i.test(authorization)) {
      return json({ error: 'authentication_required' }, 401);
    }

    let action;
    try {
      action = parseAction(await readBody(request));
    } catch (error) {
      return error instanceof RangeError
        ? json({ error: 'request_too_large' }, 413)
        : json({ error: 'invalid_json' }, 400);
    }
    if (!action) return json({ error: 'invalid_action' }, 400);

    const headers = { apikey: publishableKey, authorization };
    try {
      const user = await fetcher(new URL('/auth/v1/user', url), {
        headers,
        signal: AbortSignal.timeout(8000),
      });
      if (user.status === 401 || user.status === 403)
        return json({ error: 'invalid_session' }, 401);
      if (!user.ok) return json({ error: 'auth_unavailable' }, 502);
      await user.body?.cancel();

      const result = await fetcher(new URL('/rest/v1/rpc/' + action.rpc, url), {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(action.params),
        signal: AbortSignal.timeout(8000),
      });
      if (result.ok) {
        const body = await result.text();
        return json({ data: body ? JSON.parse(body) : null }, action.status);
      }

      const error = await result.json();
      if (error.code === '42501') return json({ error: 'permission_denied' }, 403);
      if (error.code === '23505') return json({ error: 'handle_in_use' }, 409);
      if (error.code === '23503') return json({ error: 'user_not_found' }, 404);
      if (['22023', '22P02', '23502', '23514'].includes(error.code)) {
        return json({ error: 'invalid_action' }, 400);
      }
      return json({ error: 'database_unavailable' }, 502);
    } catch {
      return json({ error: 'backend_unavailable' }, 502);
    }
  };
}
