const { join } = require('path')

module.exports = {
  purge: {
    content: [join(__dirname, '../lib/components/**/*.stories.js')]
  }
}
