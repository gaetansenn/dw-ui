import config from '../utils/config.js'

export default (ctx, inject) => {
  // TODO: Add to @dewib/core
  ctx.$dewib = ctx.$dewib || {}

  ctx.$dewib.ui = {
    config: config()
  }

  inject('dewib', ctx.$dewib)
}
