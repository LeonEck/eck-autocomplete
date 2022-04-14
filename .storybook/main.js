module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/html',
  core: {
    builder: 'webpack5',
  },
  /**
   * https://github.com/storybookjs/storybook/issues/1291#issuecomment-891379856
   */
  webpackFinal: async (config, { configType }) => {
    config.output.publicPath = '/storybook/';
    return config;
  },
  managerWebpack: async (config) => {
    config.output.publicPath = '/storybook/';
    return config;
  },
};
