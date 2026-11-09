import ts from 'typescript';

const nativePrimitives = new Set([
  'Text',
  'TextInput',
  'Pressable',
  'TouchableOpacity',
  'TouchableHighlight',
  'TouchableWithoutFeedback',
  'Button',
]);
const identity = new Set(['fontSize', 'fontFamily', 'fontWeight', 'lineHeight', 'letterSpacing']);
const visual =
  /^(color|backgroundColor|border.*Color|borderRadius|gap|rowGap|columnGap|padding.*|margin.*)$/;

export function auditFeatureSource(source, filename = 'feature.tsx') {
  const file = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const findings = [];
  const add = (node, message) => {
    const { line } = file.getLineAndCharacterOfPosition(node.getStart(file));
    findings.push(`${filename}:${line + 1} ${message}`);
  };
  function visit(node) {
    if (ts.isImportDeclaration(node) && node.moduleSpecifier.text === 'react-native') {
      const bindings = node.importClause?.namedBindings;
      if (bindings && ts.isNamespaceImport(bindings))
        add(node, 'Use named RN imports; shared UI owns interactive primitives.');
      if (bindings && ts.isNamedImports(bindings)) {
        for (const item of bindings.elements) {
          const original = (item.propertyName ?? item.name).text;
          if (nativePrimitives.has(original))
            add(item, `Use shared UI instead of react-native ${original}.`);
        }
      }
    }
    if (ts.isPropertyAssignment(node)) {
      const name = node.name.getText(file).replace(/['"]/g, '');
      if (identity.has(name)) add(node, `Use AppText variants instead of ${name}.`);
      const raw =
        ts.isStringLiteral(node.initializer) ||
        ts.isNumericLiteral(node.initializer) ||
        ts.isPrefixUnaryExpression(node.initializer);
      if (visual.test(name) && raw) add(node, `Use a theme token instead of a literal ${name}.`);
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return findings;
}
