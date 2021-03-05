import defu from 'defu'
import { set } from './utils/object'

function loadStaticConfig (origin, target) {
  Object.keys(origin).forEach((key) => {
    if (typeof origin[key] === 'string') target[key] = origin[key]
    if (typeof origin[key] === 'object') target[key] = loadStaticConfig(origin[key], {})
    if (typeof origin[key] === 'function') target[key] = ''
    if (typeof origin[key] === 'number') target[key] = origin[key]
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
  props: {
    /**
   * Custom config
   *  */
    customConfig: {
      type: Object,
      default: undefined
    },
    configPath: {
      type: String,
      default: null
    },
    rootPath: {
      type: String,
      default: null
    }
  },
  data () {
    const configPathProp = this.$vnode ? this.$vnode.componentOptions.propsData.configPath : false

    let path = configPathProp || this.$options.configPath || this.$vnode.componentOptions.Ctor.options.configPath

    if (this.rootPath) path = `${this.rootPath}.${path}`

    const config = defu({}, this.customConfig || {}, this.readPath(path))

    return {
      path: config,
      config: loadStaticConfig(config, {})
    }
  },
  methods: {
    readPath (path) {
      return path.split('.').reduce((accu, value) => {
        return accu[value]
      }, this.$dewib.ui.config)
    }
  },
  created () {
    loadDynamicConfig.call(this, this.path, {}, '')
  }
}
