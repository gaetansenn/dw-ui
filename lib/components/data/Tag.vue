<template>
  <span :class="[config.fixed, config.rounded, config.variant, config.size]">
    <slot />
  </span>
</template>

<script>
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import RoundedProps from '../rounded.props'
import SizeProps from '../size.props'

export default {
  configPath: 'Tag',
  mixins: [config],
  props: {
    ...RoundedProps,
    ...CommonsProps,
    ...SizeProps
  }
}
</script>
