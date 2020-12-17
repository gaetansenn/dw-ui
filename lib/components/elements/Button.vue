<template>
  <component :is="is" v-bind="props" :class="[config.fixed, config.classes, config.size, config.variant, config.rounded]">
    <slot />
    <div v-if="loading" :class="[config.loading.fixed, config.loading.size]" v-html="config.loading.icon" />
  </component>
</template>

<script>
import config from '../config.mixin'
import SizeProps from '../size.props'
import HrefProps from '../href.props'
import ToProps from '../to.props'
import RoundedProps from '../rounded.props'
import CommonsProps from '../commons.props'
import ButtonProps from './Button.props'

export default {
  configPath: 'Button',
  mixins: [config],
  props: {
    ...SizeProps,
    ...RoundedProps,
    ...CommonsProps,
    ...ButtonProps,
    ...HrefProps,
    ...ToProps
  },
  computed: {
    is () {
      if (this.href)
        return 'a'
      else if (this.to)
        return 'nuxt-link'

      return 'button'
    },
    props () {
      switch (this.is) {
        case 'a':
          return {
            href: this.href,
            target: this.target
          }
        case 'nuxt-link': {
          return {
            to: this.to
          }
        }
        default: {
          return {
            disabled: this.disabled || this.loading,
            type: this.type
          }
        }
      }
    }
  }
}
</script>
