<template>
  <div class="relative">
    <!-- TODO: Inject leading config -->
    <input
      ref="component"
      :class="[config.fixed, config.variant, config.size, config.validation]"
      :type="type"
      @input="$emit('input', $event.target.value)"
      @click="$emit('click')"
    >
    <!-- TODO: Inject trailing config -->
  </div>
</template>

<script>

// import syncProps from '../utils/syncProps'
import config from '../config.mixin'
import CommonsProps from '../Commons.props'
import SizeProps from '../size.props'
import InputProps from './Input.props'
import FormProps from './Form.props'

export default {
  configPath: 'Input',
  mixins: [config],
  props: {
    value: {
      type: [String, Number, Object],
      default: ''
    },
    type: {
      type: String,
      required: true
    },
    ...InputProps,
    ...CommonsProps,
    ...SizeProps,
    ...FormProps
  },
  methods: {
    focus () {
      // TODO: Check if can be global
      // Force focus of component
      const component = this.$refs.component

      if (component) component.focus()

      this.$emit('focus')
    }
  }
}
</script>
