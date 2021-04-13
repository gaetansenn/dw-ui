<template>
  <li :class="config.fixed">
    <component :is="tab.attribute" :class="[config.wrapper.fixed, config.wrapper.classes]">
      {{ tab.label }}
      <div :class="[config.border.fixed, config.border.classes]" />
    </component>
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
