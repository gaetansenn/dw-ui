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
  data () {
    return {
      isChecked: this.selected
    }
  },
  computed: {
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
      this.isChecked = !this.isChecked
      this.$emit('input', this.isChecked ? this.value : null)
    }
  }
}
</script>
