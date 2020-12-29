<script>
import config from '../../config.mixin'

export default {
  configPath: 'Steps',
  mixins: [config],
  props: {
    /**
     * Active step from 1
     */
    value: {
      type: Number,
      required: true
    }
  },
  provide () {
    return {
      steps: this
    }
  },
  render (h) {
    const items = this.$slots.default.filter(function (n) {
      return n.componentOptions && n.componentOptions.tag === 'DwStep'
    })

    items.forEach((node, index) => {
      node.componentOptions.propsData.index = index
      node.componentOptions.propsData.size = items.length
    })

    return h('div', {
      class: this.config.fixed
    }, this.$slots.default)
  }
}
</script>
