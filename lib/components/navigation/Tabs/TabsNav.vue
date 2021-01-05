<template>
  <ul :class="[config.fixed, config.classes]">
    <DwTabsNavItem v-for="(tab, index) in tabs" :key="index" :current-name="currentName" :tab="tab" @click.native="$emit('change', tab.name)" />
  </ul>
</template>

<script>
import config from '../../config.mixin'

export default {
  configPath: 'TabsNav',
  mixins: [config],
  props: {
    tabs: {
      type: Array,
      required: true
    },
    currentName: {
      type: String,
      required: true
    }
  }
}
</script>
