<template>
  <DwConfigTransition :config="config" :appear="appear" :mode="mode">
    <slot />
  </DwConfigTransition>
</template>

<script>
import config from '../config.mixin'

export default {
  configPath: 'Transitions.Fade',
  mixin: [config],
  props: {
    appear: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: null
    }
  }
}
</script>
