import Vue from 'vue'

function mergeMessage (ctx) {
  const locale = ctx.app.i18n.locale

  if (ctx.$dewib.ui.config.i18n[locale]) ctx.app.i18n.mergeLocaleMessage(locale, {
    dewib: {
      ui: {
        ...ctx.$dewib.ui.config.i18n[locale]
      }
    }
  })
}

export default function (ctx) {
  if (ctx.app.i18n) {
    mergeMessage(ctx)
    /* eslint-disable-next-line */
    const vm = new Vue({
      created () {
        this.$watch(() => ctx.app.i18n.locale, () => {
          mergeMessage(ctx)
        })
      }
    })
  }
}
