module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  typescript: { reactDocgen: 'react-docgen' },
  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true,
  },
}
