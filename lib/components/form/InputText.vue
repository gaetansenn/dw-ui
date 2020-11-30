<template>
  <DwInputGroup v-bind="inputGroupProps">
    <DwInput :value="value" v-bind="inputProps" type="text" @input="(value) => $emit('input', value)" />
  </DwInputGroup>
</template>

<script>
import CommonsProps from '../Commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import localeProp from '../utils/localeProp'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import InputMixin from './Input.mixin'
import FormProps from './Form.props'

export default {
  mixins: [InputMixin, localeProp('validation')],
  props: {
    value: {
      type: String,
      required: true
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
        ...syncProps.call(this, Object.keys({ ...InputGroupProps, ...CommonsProps, ...InputProps, ...SizeProps })),
        validation: this.localeValidation
      }
    },
    inputProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputProps, ...CommonsProps, ...SizeProps })),
        validation: this.localeValidation
      }
    }
  }
}
</script>
