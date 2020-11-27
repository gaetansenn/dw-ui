const { join } = require('path')
// const logger = require('consola').withTag('@dewib/dw-ui')

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
    dirs.push({
      path: join(__dirname, 'components'),
      extensions: ['vue'],
      prefix: 'dw'
    })
  })
}
