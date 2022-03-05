import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const headers = `
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
/assets/*.js
  Cache-Control: public, max-age=31536000, s-max-age=31536000
  Vary: Accept-Encoding
`;

writeFileSync(resolve(__dirname, '../www/_headers'), headers.trim());

const robots = `
User-agent: *
Allow: /
`;

writeFileSync(resolve(__dirname, '../www/robots.txt'), robots.trim());
