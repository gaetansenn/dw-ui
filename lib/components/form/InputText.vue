<template>
  <DwInputGroup v-bind="inputGroupProps">
    <DwInput :value="value" v-bind="inputProps" type="text" @input="(value) => $emit('input', value)" />
  </DwInputGroup>
</template>

<script>
import i18n from '../utils/i18n'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import localeProp from '../utils/localeProp'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import InputMixin from './Input.mixin'
import FormProps from './Form.props'

export default {
  mixins: [i18n, InputMixin, localeProp('validation')],
  props: {
    value: {
      type: String,
      default: null
    },
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...FormProps
  },
  computed: {
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputGroupProps, ...CommonsProps, ...SizeProps })),
        validation: this.localeValidation
      }
    },
    inputProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputProps, ...CommonsProps, ...SizeProps })),
        validation: this.localeValidation,
        configPath: 'InputText'
      }
    }
  }
}
</script>
