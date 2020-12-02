<template>
  <DwInputGroup v-bind="inputGroupProps">
    <select v-model="localeValue" :class="[config.fixed, config.variant]">
      <option value="">
        {{ placeholder || config.placeholder }}
      </option>
      <option v-for="(option, index) in localeOptions" :key="index" :value="option[valueKey]">
        {{ option[labelKey] }}
      </option>
    </select>
  </DwInputGroup>
</template>

<script>
import config from '../config.mixin'
import CommonsProps from '../Commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import localeProp from '../utils/localeProp'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import InputMixin from './Input.mixin'
import FormProps from './Form.props'
import SelectProps from './Select.props'

export default {
  configPath: 'Select',
  mixins: [config, InputMixin, localeProp('validation'), localeProp('value')],
  props: {
    ...SelectProps,
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...FormProps
  },
  computed: {
    localeOptions () {
      return this.options.map((item) => {
        if (typeof item === 'string') return { [this.valueKey]: item, [this.labelKey]: item }
        return item
      })
    },
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputGroupProps, ...CommonsProps, ...InputProps, ...SizeProps })),
        validation: this.localeValidation
      }
    }
  },
  watch: {
    localeValue: 'onLocaleValueChanged'
  },
  methods: {
    onLocaleValueChanged (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>
