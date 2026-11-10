import test from 'node:test';
import assert from 'node:assert/strict';
import { readSavedState, SAVED_STATE_STORAGE_KEY } from '../src/state/saved-storage.ts';

test('existing SWANI data takes precedence over legacy saved items', async () => {
  const current = JSON.stringify({ savedIds: [], followedIds: ['b2'] });
  const calls = [];
  const raw = await readSavedState({
    async getItem(key) {
      calls.push(key);
      return current;
    },
  });
  assert.equal(raw, current);
  assert.deepEqual(calls, [SAVED_STATE_STORAGE_KEY]);
});

test('first SWANI launch restores saved and followed items from the old app', async () => {
  const legacy = JSON.stringify({ savedIds: ['p1'], followedIds: ['b1'] });
  const calls = [];
  const raw = await readSavedState({
    async getItem(key) {
      calls.push(key);
      return key === 'localbrand-demo:v1' ? legacy : null;
    },
  });
  assert.equal(raw, legacy);
  assert.deepEqual(calls, [SAVED_STATE_STORAGE_KEY, 'localbrand-demo:v1']);
});

test('a fresh install has no saved state', async () => {
  assert.equal(await readSavedState({ getItem: async () => null }), null);
});

test('storage failures reach the existing hydration error handler', async () => {
  const failure = new Error('Storage unavailable');
  await assert.rejects(
    readSavedState({
      async getItem() {
        throw failure;
      },
    }),
    (error) => error === failure,
  );
});
