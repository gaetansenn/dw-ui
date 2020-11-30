<template>
  <div :class="[config.fixed]">
    <slot />
  </div>
</template>

<script>
import config from '../config.mixin'

export default {
  configPath: 'Container',
  mixins: [config]
}
</script>
