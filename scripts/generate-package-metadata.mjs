import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, '../package.json')).toString()
);

delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson.engines;

packageJson.type = 'module';

writeFileSync(
  resolve(__dirname, '../dist/package.json'),
  JSON.stringify(packageJson, null, 2)
);

copyFileSync(
  resolve(__dirname, '../LICENSE'),
  resolve(__dirname, '../dist/LICENSE')
);

copyFileSync(
  resolve(__dirname, '../README.md'),
  resolve(__dirname, '../dist/README.md')
);
