import test from 'node:test';
import assert from 'node:assert/strict';
import { auditFeatureSource } from '../scripts/ui-rules.mjs';

test('catches aliased raw interactive primitives', () => {
  const errors = auditFeatureSource("import { Text as Label, View } from 'react-native';");
  assert.equal(errors.length, 1);
  assert.match(errors[0], /Text/);
});
test('catches raw identity and visual values inside nested styles', () => {
  const errors = auditFeatureSource(
    "const s = { title: { fontSize: 22, color: '#fff', padding: 16 } };",
  );
  assert.equal(errors.length, 3);
});
test('allows shared components, token values and structural dimensions', () => {
  const source =
    "import { View } from 'react-native'; import { AppText } from '@/components/ui/app-text'; const s = { wrap: { gap: spacing.md, color: colors.ink, flex: 1, width: '100%' } };";
  assert.deepEqual(auditFeatureSource(source), []);
});
