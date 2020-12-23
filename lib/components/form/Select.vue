<template>
  <DwInputGroup v-bind="inputGroupProps">
    {{ value }}
    <select v-model="localeValue" :class="[config.fixed, config.variant, config.size]">
      <option v-if="placeholder !== false" :value="emptyLocaleValue">
        {{ placeholder || config.placeholder }}
      </option>
      <option v-for="(option, index) in localeOptions" :key="index" :value="option[valueKey]">
        {{ option[labelKey] }}
      </option>
    </select>
  </DwInputGroup>
</template>

<script>
import i18n from '../utils/i18n'
import config from '../config.mixin'
import CommonsProps from '../commons.props'
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
  mixins: [i18n, config, InputMixin, localeProp('validation'), localeProp('value')],
  props: {
    ...SelectProps,
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...FormProps
  },
  computed: {
    emptyLocaleValue () {
      if (!this.localeOptions.find(item => item[this.valueKey] === this.localeValue)) return this.localeValue
      return ''
    },
    localeOptions () {
      return this.options.map((item) => {
        if (typeof item === 'string' || typeof item === 'number') return { [this.valueKey]: item, [this.labelKey]: item }
        return item
      })
    },
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputGroupProps, ...CommonsProps, ...SizeProps })),
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
