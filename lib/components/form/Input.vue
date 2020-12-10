<template>
  <div class="relative">
    <!-- TODO: Inject leading config -->
    <input
      ref="component"
      :class="[config.fixed, config.variant, config.size, config.validation, config.icon]"
      :type="type"
      v-bind="bind"
      @input="$emit('input', $event.target.value)"
      @click="$emit('click')"
    >
    <div
      v-if="isTrailing"
      :class="config.trailing"
      @click="$emit('trailing-click')"
    >
      <div :class="[iconClasses, icon.classes, icon.size]" v-html="icon" />
    </div>
  </div>
</template>

<script>

// import syncProps from '../utils/syncProps'
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import SizeProps from '../size.props'
import bindProps from '../utils/bindProps'
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
  computed: {
    isLeading () {
      return this.icon && this.leading
    },
    isTrailing () {
      return this.icon && this.trailing
    }
  },
  created () {
    this.bind = bindProps.call(this, InputProps)
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
