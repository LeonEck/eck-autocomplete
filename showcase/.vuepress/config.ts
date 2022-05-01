import { defaultTheme, defineUserConfig, viteBundler } from 'vuepress';
import { path } from '@vuepress/utils';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { shikiPlugin } from '@vuepress/plugin-shiki';

const isProd = process.env['NODE_ENV'] === 'production';

export default defineUserConfig({
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
  ],
  theme: defaultTheme({
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
        text: 'Docs',
        link: '/docs/',
      },
      {
        text: 'Demos',
        link: 'https://eck-autocomplete.leoneck.de/storybook/',
      },
      {
        text: 'Changelog',
        link: 'https://github.com/LeonEck/eck-autocomplete/blob/main/CHANGELOG.md',
      },
    ],
  }),
  bundler: viteBundler(),
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    // only enable shiki plugin in production mode
    isProd ? shikiPlugin({ theme: 'dark-plus' }) : [],
  ],
});
