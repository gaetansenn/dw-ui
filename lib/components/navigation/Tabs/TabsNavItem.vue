<template>
  <li :class="config.fixed">
    <div :class="[config.wrapper.fixed, config.wrapper.classes]">
      {{ tab.label }}
      <div :class="[config.border.fixed, config.border.classes]" />
    </div>
  </li>
</template>

<script>
import config from '../../config.mixin'

export default {
  configPath: 'TabsNavItem',
  mixins: [config],
  props: {
    currentName: {
      type: String,
      required: true
    },
    tab: {
      type: Object,
      required: true
    }
  },
  computed: {
    active () {
      return this.currentName === this.tab.name
    }
  }
}
</script>
