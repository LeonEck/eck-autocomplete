import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
  {
    ignores: [
      '.github/',
      '.husky/',
      '.run/',
      '.storybook/',
      'backstop_data/',
      'coverage/',
      'build-artifacts/',
      'dist/',
      'docs/',
      'showcase/.vitepress/',
    ],
  },
  {
    files: ['eck-autocomplete/**/*.{js,mjs,ts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
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
