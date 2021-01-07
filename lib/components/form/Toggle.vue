<template>
  <label :class="config.wrapper" tabindex="0">
    <input type="checkbox" :class="config.input" :checked="checked" @click="toggle">
    <div :class="config.toggle.wrapper">
      <div :class="[config.toggle.fixed, config.toggle.classes]" />
    </div>
  </label>
</template>

<script>
import config from '../config.mixin'

export default {
  configPath: 'Toggle',
  mixins: [config],
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
    }
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
