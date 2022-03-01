import { readdirSync } from 'fs';
import { join } from 'path';

// https://stackoverflow.com/a/66083078
function* walkSync(dir) {
  const files = readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkSync(join(dir, file.name));
    } else {
      yield join(dir, file.name);
    }
  }
}

export { walkSync };
