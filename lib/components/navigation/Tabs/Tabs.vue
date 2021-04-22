<template>
  <div>
    <dw-tabs-nav :tabs="tabs" :current-name="currentName" @change="tabChange" />
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      tabs: false,
      currentName: this.value
    }
  },
  watch: {
    value: 'onValueChanged'
  },
  created () {
    if (this.$slots.default) {
      const paneSlots = this.$slots.default.filter(vnode => vnode.tag &&
            vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'DwTabsPane')

      this.tabs = paneSlots.map(slot => ({
        label: slot.componentOptions.propsData.label,
        name: slot.componentOptions.propsData.name,
        attribute: slot.componentOptions.propsData.attribute || slot.componentOptions.Ctor.options.props.attribute.default
      }))
    }
  },
  methods: {
    onValueChanged () {
      this.currentName = this.value
    },
    tabChange (tab) {
      this.currentName = tab
      this.$emit('input', tab)
    }
  }
}
</script>
