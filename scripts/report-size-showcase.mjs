import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { statSync, createReadStream, createWriteStream, readdirSync } from 'fs';
import { createBrotliCompress } from 'zlib';
import { walkSync } from './utils/walkSync.mjs';
import { formatBytes } from './utils/formatBytes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const wwwFolder = resolve(__dirname, '../www');
const buildArtifactsFolder = resolve(__dirname, '../build-artifacts');
const brotliSizeReportFileIndexJS = resolve(
  buildArtifactsFolder,
  'size-report-brotli-index.js'
);
const brotliSizeReportFileVendorJS = resolve(
  buildArtifactsFolder,
  'size-report-brotli-vendor.js'
);
const brotliSizeReportFileHTML = resolve(
  buildArtifactsFolder,
  'size-report-brotli.html'
);
const assetsFolder = resolve(wwwFolder, 'assets');
const indexHtmlFile = resolve(wwwFolder, 'index.html');
const indexJSFileName = readdirSync(assetsFolder).filter(
  (file) => file.startsWith('index.') && file.endsWith('.js')
)[0];
const vendorJSFileName = readdirSync(assetsFolder).filter(
  (file) => file.startsWith('vendor.') && file.endsWith('.js')
)[0];
const minIndexJSFile = resolve(assetsFolder, indexJSFileName);
const minVendorJSFile = resolve(assetsFolder, vendorJSFileName);

let amountOfFiles = 0;
let wwwFolderSize = 0;

for (const filePath of walkSync(wwwFolder)) {
  wwwFolderSize += statSync(filePath).size;
  amountOfFiles++;
}

const readStreamIndexJS = createReadStream(minIndexJSFile);
const writeStreamIndexJS = createWriteStream(brotliSizeReportFileIndexJS);
const brotliIndexJS = createBrotliCompress();

const readStreamVendorJS = createReadStream(minVendorJSFile);
const writeStreamVendorJS = createWriteStream(brotliSizeReportFileVendorJS);
const brotliVendorJS = createBrotliCompress();

const readStreamHTML = createReadStream(indexHtmlFile);
const writeStreamHTML = createWriteStream(brotliSizeReportFileHTML);
const brotliHTML = createBrotliCompress();

readStreamHTML
  .pipe(brotliHTML)
  .pipe(writeStreamHTML)
  .on('finish', () => {
    readStreamVendorJS
      .pipe(brotliVendorJS)
      .pipe(writeStreamVendorJS)
      .on('finish', () => {
        readStreamIndexJS
          .pipe(brotliIndexJS)
          .pipe(writeStreamIndexJS)
          .on('finish', () => {
            const { size: minHTMLFileSize } = statSync(indexHtmlFile);
            const { size: brotliHTMLFileSize } = statSync(
              brotliSizeReportFileHTML
            );
            const { size: minIndexJSFileSize } = statSync(minIndexJSFile);
            const { size: minVendorJSFileSize } = statSync(minVendorJSFile);
            const { size: brotliIndexJSFileSize } = statSync(
              brotliSizeReportFileIndexJS
            );
            const { size: brotliVendorJSFileSize } = statSync(
              brotliSizeReportFileVendorJS
            );
            console.log(
              `
| File & Mode                  |    Size |
|:-----------------------------|--------:|
| index.html (Minified)        | ${formatBytes(minHTMLFileSize)} |
| index.js Minified            | ${formatBytes(minIndexJSFileSize)} |
| vendor.js Minified           | ${formatBytes(minVendorJSFileSize)} |
| index.html Brotli compressed | ${formatBytes(brotliHTMLFileSize)} |
| index.js Brotli compressed   | ${formatBytes(brotliIndexJSFileSize)} |
| vendor.js Brotli compressed  | ${formatBytes(brotliVendorJSFileSize)} |
| Total Minified               | ${formatBytes(
                minIndexJSFileSize + minVendorJSFileSize + minHTMLFileSize
              )} |
| Total Brotli compressed      | ${formatBytes(
                brotliIndexJSFileSize +
                  brotliVendorJSFileSize +
                  brotliHTMLFileSize
              )} |

Amount of files in www/: ${amountOfFiles}
Size of all files in www/: ${formatBytes(wwwFolderSize)}
`.trim()
            );
          });
      });
  });
