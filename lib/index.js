const { join } = require('path')
const defu = require('defu')
const tailwind = require('../storybook/tailwind.config')

module.exports = function (moduleOptions) {
  // Inject plugin
  this.addPlugin({
    src: join(__dirname, './plugin.js'),
    fileName: 'dewib/ui/plugin.js'
  })

  // Inject config utils
  this.addTemplate({
    src: join(__dirname, './utils/config.js'),
    fileName: 'dewib/ui/utils/config.js'
  })

  // Inject modules
  this.nuxt.hook('components:dirs', (dirs) => {
    // Add vue components
    dirs.push({
      path: join(__dirname, 'components'),
      extensions: ['vue'],
      prefix: 'dw'
    })
  })

  // Add purgeCSS content for tailwindcss
  this.nuxt.hook('tailwindcss:config', (config) => {
    // merge config
    config = defu({}, tailwind, config)
    config.purge.content.push(join(__dirname, 'utils/config.js'))
    config.purge.content.push(join(this.nuxt.options.rootDir, 'dewib/config.js'))
  })
}
