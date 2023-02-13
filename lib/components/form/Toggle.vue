<template>
  <label
    :class="[config.wrapper.fixed, config.wrapper.classes, config.wrapper.size]"
    tabindex="0"
  >
    <input
      type="checkbox"
      v-bind="$attrs"
      :class="config.input"
      :checked="checked"
      @click="toggle"
    >
    <div :class="config.toggle.wrapper">
      <div :class="[config.toggle.fixed, config.toggle.classes]" />
    </div>
  </label>
</template>

<script>
import config from '../config.mixin'
import SizeProps from '../size.props'

export default {
  configPath: 'Toggle',
  mixins: [config],
  inheritAttrs: false,
  model: {
    prop: 'selected',
    event: 'input'
  },
  props: {
    /**
     * v-model binding of checked element
     */
    selected: {
      type: [Boolean, String],
      default: null
    },
    value: {
      type: [String, Boolean],
      default: true
    },
    uncheckedValue: {
      type: [String, Boolean],
      default: false
    },
    ...SizeProps
  },
  computed: {
    checked () {
      return this.value === this.selected
    }
  },
  methods: {
    toggle () {
      this.$emit('input', this.checked ? this.uncheckedValue : this.value)
    }
  }
}
</script>
