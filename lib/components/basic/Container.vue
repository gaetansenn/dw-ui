<template>
  <component :is="attribute" :class="[config.fixed]">
    <slot />
  </component>
</template>

<script>
import config from '../config.mixin'
import ContainerProps from './Container.props'

export default {
  configPath: 'Container',
  mixins: [config],
  props: ContainerProps
}
</script>
