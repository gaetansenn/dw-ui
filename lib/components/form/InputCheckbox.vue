<template>
  <label :class="config.fixed">
    <DwInput :value="value" v-bind="inputProps" type="checkbox" @change="onChange" />
    <span v-if="label" :class="[config.label.fixed, config.label.size]">{{ label }}</span>
  </label>
</template>

<script>
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import InputCheckbox from './InputRadio.props'
import InputProps from './Input.props'

export default {
  configPath: 'InputCheckbox',
  mixins: [config],
  model: {
    prop: 'selected',
    event: 'input'
  },
  props: {
    ...InputCheckbox,
    ...SizeProps,
    ...CommonsProps,
    ...InputProps
  },
  data () {
    return {
      isChecked: false
    }
  },
  computed: {
    // isChecked () {
    //   return Array.isArray(this.selected) ? this.selected.includes(this.value) : this.selected === this.value
    // },
    inputProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputProps, ...CommonsProps, ...SizeProps })),
        validation: this.localeValidation,
        configPath: 'InputCheckbox'
      }
    }
  },
  methods: {
    onChange () {
      this.isChecked = !this.isChecked
      this.$emit('input', this.isChecked)
    }
  }
}
</script>
