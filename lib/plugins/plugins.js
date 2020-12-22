export default function (ctx, inject) {
  if (process.server) return false

  // Inject body components
  const plugins = Object.values(ctx.$dewib.ui.config).filter(component => component.plugin).map((component) => {
    return require(`~dewib/dw-ui/components/${component.plugin}/plugin`).default(ctx, inject)
  })

  if (!plugins.length) return false

  // TOOD: Tricks as onNuxtReady is not called by @nuxtjs/storybook
  if (process.env.storybook)
    ctx.app.mounted = [ctx.app.mounted, function () {
      plugins.forEach((plugin) => {
        document.getElementById('root').appendChild(plugin)
      })
    }]
  else window.onNuxtReady((nuxt) => {
    plugins.forEach((plugin) => {
      nuxt.$el.appendChild(plugin)
    })
  })
}
