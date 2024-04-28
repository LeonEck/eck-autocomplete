import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'eck-autocomplete',
  description: 'Autocomplete web component. Suggests options for an input.',
  outDir: '../www',
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
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/img/eck-autocomplete.svg',
      dark: '/img/eck-autocomplete-dark.svg',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LeonEck/eck-autocomplete' },
    ],
    nav: [
      {
        text: 'Docs',
        link: '/docs/',
      },
      {
        text: 'Stackblitz',
        link: 'https://stackblitz.com/edit/eck-autocomplete?file=index.html',
      },
      {
        text: 'Storybook',
        link: 'https://eck-autocomplete.leoneck.de/storybook/',
      },
      {
        text: 'Changelog',
        link: 'https://github.com/LeonEck/eck-autocomplete/blob/main/CHANGELOG.md',
      },
    ],
    footer: {
      message: 'Created by <a href="https://leoneck.de">Leon Eck</a>',
    },
    search: {
      provider: 'local',
    },
  },
});
