<template>
  <div role="tablist" aria-multiselectable="true">
    <slot />
  </div>
</template>

<script>
import config from '../../config.mixin'
import CollapseProps from './Collapse.props'

export default {
  name: 'DwCollapse',
  configPath: 'Input',
  mixins: [config],
  props: {
    ...CollapseProps
  },
  data () {
    return {
      activeNames: [].concat(this.value)
    }
  },
  provide () {
    return {
      collapse: this
    }
  },
  watch: {
    value (value) {
      this.activeNames = [].concat(value)
    }
  },
  created () {
    this.$on('item-click', this.handleItemClick)
  },
  methods: {
    setActiveNames (activeNames) {
      activeNames = [].concat(activeNames)
      const value = this.accordion ? activeNames[0] : activeNames

      this.activeNames = activeNames
      this.$emit('input', value)
      this.$emit('change', value)
    },
    handleItemClick (item) {
      if (this.accordion)
        this.setActiveNames(
          (this.activeNames[0] || this.activeNames[0] === 0) &&
            this.activeNames[0] === item.name
            ? '' : item.name
        )
      else {
        const activeNames = this.activeNames.slice(0)
        const index = activeNames.indexOf(item.name)
        if (index > -1)
          activeNames.splice(index, 1)
        else
          activeNames.push(item.name)

        this.setActiveNames(activeNames)
      }
    }
  }
}
</script>
