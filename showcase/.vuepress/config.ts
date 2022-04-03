import { defineUserConfig, ViteBundlerOptions } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import { path } from '@vuepress/utils';

const isProd = process.env['NODE_ENV'] === 'production';

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  title: `eck-autocomplete`,
  description: 'Autocomplete web component. Suggests options for an input.',
  dest: path.resolve(__dirname, '../../www'),
  head: [
    [
      'meta',
      {
        name: 'robots',
        content: 'index, follow',
      },
    ],
    [
      'meta',
      {
        name: 'author',
        content: 'Leon Eck',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
    [
      'script',
      {
        src: 'https://unpkg.com/eck-autocomplete@0.1.0/min/eck-autocomplete.js',
      },
    ],
    ['style', {}, 'eck-autocomplete:not(:defined) {display: none;}'],
  ],
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: './assets/eck-autocomplete.svg',
    logoDark: './assets/eck-autocomplete-dark.svg',
    repo: 'LeonEck/eck-autocomplete',
    editLink: false,
    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      // use shiki plugin in production mode instead
      prismjs: !isProd,
    },
    navbar: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Changelog',
        link: 'https://github.com/LeonEck/eck-autocomplete/blob/main/CHANGELOG.md',
      },
    ],
  },
  bundler: '@vuepress/vite',
  bundlerConfig: {
    vuePluginOptions: {
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => {
            return tag.startsWith('eck-');
          },
        },
      },
    },
  },
  plugins: [
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    // only enable shiki plugin in production mode
    [
      '@vuepress/plugin-shiki',
      isProd
        ? {
            theme: 'dark-plus',
          }
        : false,
    ],
  ],
});
