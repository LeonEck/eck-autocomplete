import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
  {
    files: ['eck-autocomplete/**/*.{js,mjs,ts}'],
    ignores: ['**/*.test.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        module: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended[1].rules,
      ...tseslint.configs.recommended[2].rules,
    },
  },
];
