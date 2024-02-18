import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { statSync, createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { walkSync } from './utils/walkSync.js';
import { formatBytes } from './utils/formatBytes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distFolder = resolve(__dirname, '../dist');
const buildArtifactsFolder = resolve(__dirname, '../build-artifacts');
const brotliSizeReportFile = resolve(
  buildArtifactsFolder,
  'size-report-brotli.js',
);
const minFile = resolve(distFolder, 'min/eck-autocomplete.js');

let amountOfFiles = 0;
let distFolderSize = 0;

for (const filePath of walkSync(distFolder)) {
  distFolderSize += statSync(filePath).size;
  amountOfFiles++;
}

const readStream = createReadStream(minFile);
const writeStream = createWriteStream(brotliSizeReportFile);

const brotli = createBrotliCompress();

readStream
  .pipe(brotli)
  .pipe(writeStream)
  .on('finish', () => {
    const { size: minFileSize } = statSync(minFile);
    const { size: brotliFileSize } = statSync(brotliSizeReportFile);
    console.log(
      `
| Mode              |    Size |
|:------------------|--------:|
| Minified          | ${formatBytes(minFileSize)} |
| Brotli compressed | ${formatBytes(brotliFileSize)} |

Amount of files in dist/: ${amountOfFiles}
Size of all files in dist/: ${formatBytes(distFolderSize)}
`.trim(),
    );
  });
