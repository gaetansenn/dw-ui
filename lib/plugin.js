import config from './utils/config.js'

export default (ctx, inject) => {
  // TODO: Add to @dewib/core
  ctx.$dewib = ctx.$dewib || {}

  ctx.$dewib.ui = {
    config: config()
  }

  // Inject i18n
  if (ctx.app.i18n)
    Object.keys(ctx.$dewib.ui.config.i18n).forEach((key) => {
      ctx.app.i18n.mergeLocaleMessage(key, {
        dewib: {
          ui: {
            ...ctx.$dewib.ui.config.i18n[key]
          }
        }
      })
    })

  inject('dewib', ctx.$dewib)
}
