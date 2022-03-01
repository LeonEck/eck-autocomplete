import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { statSync, createReadStream, createWriteStream, readdirSync } from 'fs';
import { createBrotliCompress } from 'zlib';
import { walkSync } from './utils/walkSync.mjs';
import { formatBytes } from './utils/formatBytes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const wwwFolder = resolve(__dirname, '../www');
const buildArtifactsFolder = resolve(__dirname, '../build-artifacts');
const brotliSizeReportFileJS = resolve(
  buildArtifactsFolder,
  'size-report-brotli.js'
);
const brotliSizeReportFileHTML = resolve(
  buildArtifactsFolder,
  'size-report-brotli.html'
);
const assetsFolder = resolve(wwwFolder, 'assets');
const indexHtmlFile = resolve(wwwFolder, 'index.html');
const jsFileName = readdirSync(assetsFolder).filter(
  (file) => file.startsWith('index.') && file.endsWith('.js')
)[0];
const minJSFile = resolve(assetsFolder, jsFileName);

let amountOfFiles = 0;
let wwwFolderSize = 0;

for (const filePath of walkSync(wwwFolder)) {
  wwwFolderSize += statSync(filePath).size;
  amountOfFiles++;
}

const readStreamJS = createReadStream(minJSFile);
const writeStreamJS = createWriteStream(brotliSizeReportFileJS);
const brotliJS = createBrotliCompress();

const readStreamHTML = createReadStream(indexHtmlFile);
const writeStreamHTML = createWriteStream(brotliSizeReportFileHTML);
const brotliHTML = createBrotliCompress();

readStreamHTML
  .pipe(brotliHTML)
  .pipe(writeStreamHTML)
  .on('finish', () => {
    readStreamJS
      .pipe(brotliJS)
      .pipe(writeStreamJS)
      .on('finish', () => {
        const { size: minHTMLFileSize } = statSync(indexHtmlFile);
        const { size: brotliHTMLFileSize } = statSync(brotliSizeReportFileHTML);
        const { size: minJSFileSize } = statSync(minJSFile);
        const { size: brotliJSFileSize } = statSync(brotliSizeReportFileJS);
        console.log(
          `
| File & Mode                  |    Size |
|:-----------------------------|--------:|
| index.html (Minified)        | ${formatBytes(minHTMLFileSize)} |
| index.js Minified            | ${formatBytes(minJSFileSize)} |
| index.html Brotli compressed | ${formatBytes(brotliHTMLFileSize)} |
| index.js Brotli compressed   | ${formatBytes(brotliJSFileSize)} |
| Total Minified               | ${formatBytes(
            minJSFileSize + minHTMLFileSize
          )} |
| Total Brotli compressed      | ${formatBytes(
            brotliJSFileSize + brotliHTMLFileSize
          )} |

Amount of files in www/: ${amountOfFiles}
Size of all files in www/: ${formatBytes(wwwFolderSize)}
`.trim()
        );
      });
  });
