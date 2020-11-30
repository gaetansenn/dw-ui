function set (object, path, value) {
  path = path.split('.')
  let index = 0
  const length = path.length - 1

  while (object !== null && index < length)
    object = object[path[index++]]

  if (object) object[path[length]] = value
}

function loadStaticConfig (origin, target) {
  Object.keys(origin).forEach((key) => {
    if (typeof origin[key] === 'string') target[key] = origin[key]
    if (typeof origin[key] === 'object') target[key] = loadStaticConfig(origin[key], {})
    if (typeof origin[key] === 'function') target[key] = ''
  })

  return target
}

function loadDynamicConfig (origin, target, path) {
  Object.keys(origin).forEach((key) => {
    if (typeof origin[key] === 'function')
      this.$watch(origin[key].bind(this), (newValue) => {
        set(this.config, `${path}${path !== '' ? '.' : ''}${key}`, newValue)
      }, { immediate: true })

    if (typeof origin[key] === 'object')
      loadDynamicConfig.call(this, origin[key], target, `${path}${path !== '' ? '.' : ''}${key}`)
  })
}

export default {
  data () {
    // TODO: Check why storybook dont inject plugin first time
    if (!this.$dewib) return { config: false }

    return {
      config: loadStaticConfig(this.$dewib.ui.config[this.$vnode.componentOptions.Ctor.options.configPath], {})
    }
  },
  created () {
    if (this.$dewib) loadDynamicConfig.call(this, this.$dewib.ui.config[this.$vnode.componentOptions.Ctor.options.configPath], {}, '')
  }
}
