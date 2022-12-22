module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  /**
   * https://github.com/storybookjs/storybook/issues/1291#issuecomment-891379856
   */
  docs: {
    docsPage: 'automatic',
  },
};
