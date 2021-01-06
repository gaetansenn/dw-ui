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
import i18n from '../utils/i18n'
import SizeProps from '../size.props'
import { DEFAULT_VALIDATION } from './Input.mixin'
import InputCheckbox from './InputCheckbox.props'
import InputProps from './Input.props'

export default {
  configPath: 'InputCheckbox',
  mixins: [i18n, config],
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
  computed: {
    isChecked () {
      return Array.isArray(this.selected) ? this.selected.includes(this.value) : !!this.selected
    },
    inputProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputProps, ...CommonsProps, ...SizeProps })),
        validation: this.localeValidation,
        checked: this.isChecked,
        configPath: 'InputCheckbox'
      }
    }
  },
  methods: {
    validate () {
      return DEFAULT_VALIDATION.call(this, 'selected')
    },
    onChange () {
      if (Array.isArray(this.selected))
        if (this.isChecked) this.$emit('input', this.selected.filter(item => item !== this.value))
        else this.$emit('input', [...this.selected, this.value])
      else this.$emit('input', this.isChecked ? null : this.value)
    }
  }
}
</script>
