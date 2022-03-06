import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliArguments = process.argv.slice(2);

const backstopJsonFile = resolve(__dirname, '../../backstop.json');

if (cliArguments.length !== 1) {
  console.error('Error in CLI arguments');
  process.exit(1);
}

const backstopJson = JSON.parse(
  await readFile(backstopJsonFile, {
    encoding: 'utf8',
  })
);

backstopJson['engineOptions']['browser'] = cliArguments[0];

/**
 * Webkit doesn't understand the sandbox flag so we delete it.
 */
if (cliArguments[0] === 'webkit') {
  delete backstopJson['engineOptions']['args'];
}

await writeFile(backstopJsonFile, JSON.stringify(backstopJson, null, 2));
