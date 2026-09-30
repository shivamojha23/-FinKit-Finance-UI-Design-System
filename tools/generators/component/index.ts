import {
  Tree,
  generateFiles,
  formatFiles,
  names,
  readJson,
  joinPathFragments,
} from '@nx/devkit';
import * as path from 'path';

interface Schema {
  name: string;
}

export default async function componentGenerator(tree: Tree, schema: Schema) {
  const n = names(schema.name); // { name, className, propertyName, constantName, fileName }
  const componentDir = joinPathFragments('packages/ui/src', n.className);

  // Generate component, CSS, test, and story files from templates
  generateFiles(tree, path.join(__dirname, 'files'), componentDir, {
    name: n.className,
    fileName: n.fileName,
    tmpl: '',
  });

  // Update the barrel export in packages/ui/src/index.ts
  const indexPath = 'packages/ui/src/index.ts';
  const currentContent = tree.read(indexPath, 'utf-8') ?? '';

  const exportLines = [
    `export { ${n.className} } from './${n.className}/${n.className}.js';`,
    `export type { ${n.className}Props } from './${n.className}/${n.className}.js';`,
  ].join('\n');

  tree.write(indexPath, `${currentContent}\n${exportLines}\n`);

  await formatFiles(tree);
}
