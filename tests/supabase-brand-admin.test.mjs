import assert from 'node:assert/strict';
import test from 'node:test';
import { createBrandAdminHandler } from '../supabase/functions/brand-admin/handler.ts';

const projectUrl = 'https://example.supabase.co';
const publishableKey = 'sb_publishable_test';
const action = { action: 'create_brand', name: 'Nếp', handle: 'nep.test' };

function request(body, token) {
  return new Request(projectUrl + '/functions/v1/brand-admin', {
    method: 'POST',
    headers: token ? { Authorization: 'Bearer ' + token } : {},
    body: JSON.stringify(body),
  });
}

test('brand-admin rejects requests without a valid Supabase user', async () => {
  const calls = [];
  const handler = createBrandAdminHandler({
    url: projectUrl,
    publishableKey,
    fetcher: async (url) => {
      calls.push(url.pathname);
      return new Response(null, { status: 401 });
    },
  });
  assert.equal((await handler(request(action))).status, 401);
  assert.equal((await handler(request(action, 'invalid'))).status, 401);
  assert.deepEqual(calls, ['/auth/v1/user']);
});

test('brand-admin uses the caller token and preserves the database permission check', async () => {
  const handler = createBrandAdminHandler({
    url: projectUrl,
    publishableKey,
    fetcher: async (url, options) => {
      assert.equal(options.headers.authorization, 'Bearer signed-user');
      assert.equal(options.headers.apikey, publishableKey);
      if (url.pathname === '/auth/v1/user') return Response.json({ id: 'caller' });
      assert.equal(url.pathname, '/rest/v1/rpc/set_brand_editor');
      assert.deepEqual(JSON.parse(options.body), {
        target_brand_id: 'b2',
        target_user_id: '10000000-0000-4000-8000-000000000001',
        enabled: true,
      });
      return Response.json({ code: '42501' }, { status: 403 });
    },
  });
  const response = await handler(
    request(
      {
        action: 'set_brand_editor',
        brandId: 'b2',
        userId: '10000000-0000-4000-8000-000000000001',
        enabled: true,
      },
      'signed-user',
    ),
  );
  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), { error: 'permission_denied' });
});
