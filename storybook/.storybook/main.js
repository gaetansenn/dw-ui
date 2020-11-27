const path = require('path')
const { nuxifyStorybook } = require('../.nuxt-storybook/storybook/main.js')

module.exports = nuxifyStorybook({
  webpackFinal (config) {
    config.resolve.alias['@dewib/dw-ui'] = path.resolve(__dirname, '../../lib')

    return config
  },
  stories: [path.join(__dirname, '../../lib/components/**/**.stories.js')],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        vueDocgenOptions: {
          alias: {
            '@': path.resolve(__dirname, '../../'),
          },
        },
      }
    },
    '@storybook/addon-controls',
    '@storybook/addon-viewport'
  ]
})
