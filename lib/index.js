const { join } = require('path')
const defu = require('defu')

const { addVariants } = require('./utils/tailwind')

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

  // Inject i18n utils
  this.addTemplate({
    src: join(__dirname, './utils/i18n.js'),
    fileName: 'dewib/ui/utils/i18n.js'
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

    // Extend properties
    config.theme.extend = config.theme.extend || {}
    config.theme.extend.zIndex = defu(config.theme.extend.zIndex, { 'dw-modal': 9000 })
    config.theme.extend.spacing = defu(config.theme.extend.spacing, { full: '100%' })

    // Extend variants
    config.variants.backgroundColor = utils => addVariants('backgroundColor', ['disabled'], utils)
    config.variants.opacity = utils => addVariants('opacity', ['responsive', 'disabled'], utils)
    config.variants.cursor = utils => addVariants('cursor', ['responsive', 'hover', 'focus', 'disabled'], utils)

    config.plugins.push(require('@tailwindcss/custom-forms'))
  })
}
