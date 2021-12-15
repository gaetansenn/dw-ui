<template>
  <DwInputGroup v-bind="inputGroupProps">
    <DwInput
      :value="value"
      v-bind="inputProps"
      type="time"
      @input="(value) => $emit('input', value)"
      @focus="onFocus"
      @blur="onBlur"
    />
  </DwInputGroup>
</template>

<script>
import i18n from '../utils/i18n'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import localProp from '../utils/localProp'
import RoundedProps from '../rounded.props'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import InputMixin from './Input.mixin'
import FormProps from './Form.props'

export default {
  mixins: [i18n, InputMixin, localProp('validation')],
  props: {
    value: {
      type: String,
      required: true
    },
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...FormProps,
    ...RoundedProps
  },
  computed: {
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputGroupProps, ...CommonsProps, ...SizeProps })),
        validation: this.localValidation
      }
    },
    inputProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputProps, ...CommonsProps, ...SizeProps, ...RoundedProps })),
        validation: this.localValidation,
        configPath: 'InputTime'
      }
    }
  }
}
</script>
