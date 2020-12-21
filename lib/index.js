const { join } = require('path')
const defu = require('defu')

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
    config.purge.content.push(join(__dirname, 'utils/config.js'))
    config.purge.content.push(join(this.nuxt.options.rootDir, 'dewib/config.js'))

    // Extend theme
    config.theme.extend = config.theme.extend || {}
    config.theme.extend.zIndex = defu(config.theme.extend.zIndex, { 'dw-modal': 9000 })
    config.theme.extend.spacing = defu(config.theme.extend.spacing, { full: '1000%' })

    config.theme.extend.variants = config.theme.extend.variants || {}
    config.theme.extend.variants.opacity = defu.arrayFn(config.theme.extend.variants.opacity, ['responsive', 'hover', 'focus', 'disabled'])
    config.theme.extend.variants.cursor = defu.arrayFn(config.theme.extend.variants.cursor, ['responsive', 'disabled'])
    config.plugins.push(require('@tailwindcss/custom-forms'))
  })
}
