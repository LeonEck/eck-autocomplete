import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { statSync, createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distFolder = resolve(__dirname, '../dist');
const wwwFolder = resolve(__dirname, '../www');
const buildArtifactsFolder = resolve(__dirname, '../build-artifacts');
const brotliSizeReportFile = resolve(
  buildArtifactsFolder,
  'size-report-brotli.js'
);
const minFile = resolve(distFolder, 'min/eck-autocomplete.js');

// https://stackoverflow.com/a/18650828
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

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
`.trim()
    );
  });
