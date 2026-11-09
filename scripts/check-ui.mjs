import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditFeatureSource } from './ui-rules.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(path.join(directory, entry.name))
          : path.join(directory, entry.name),
      ),
    )
  ).flat();
}
const files = (await walk(path.join(root, 'src/features'))).filter((file) => /\.tsx?$/.test(file));
const results = await Promise.all(
  files.map(async (file) =>
    auditFeatureSource(await readFile(file, 'utf8'), path.relative(root, file)),
  ),
);
const findings = results.flat();
if (findings.length) {
  console.error(findings.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`UI rules passed for ${files.length} feature files.`);
}
