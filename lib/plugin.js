import config from './utils/config.js'
import i18n from './utils/i18n'

export default (ctx, inject) => {
  // TODO: Add to @dewib/core
  ctx.$dewib = ctx.$dewib || {}

  ctx.$dewib.ui = {
    config: config()
  }

  // Load i18n
  i18n(ctx)

  inject('dewib', ctx.$dewib)
}
