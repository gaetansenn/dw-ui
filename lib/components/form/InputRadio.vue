<template>
  <label :class="config.fixed">
    <DwInput :value="value" v-bind="inputProps" type="radio" @change="(value) => $emit('input', value)" />
    <span v-if="label" :class="[config.label.fixed, config.label.size, config.label.validation]">
      {{ label }}
      <span v-if="required" :class="config.label.star">*</span>
    </span>
  </label>
</template>

<script>
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import i18n from '../utils/i18n'
import localProp from '../utils/localProp'
import SizeProps from '../size.props'
import InputRadio from './InputRadio.props'
import { DEFAULT_VALIDATION } from './Input.mixin'
import InputProps from './Input.props'
import FormProps from './Form.props'

export default {
  configPath: 'InputRadio',
  mixins: [i18n, config, localProp('validation')],
  model: {
    prop: 'selected',
    event: 'input'
  },
  props: {
    ...InputRadio,
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...FormProps
  },
  computed: {
    inputProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputProps, ...CommonsProps, ...SizeProps })),
        validation: this.localValidation,
        checked: JSON.stringify(this.selected) === JSON.stringify(this.value),
        configPath: 'InputRadio'
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
