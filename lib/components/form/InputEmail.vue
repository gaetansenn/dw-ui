<template>
  <DwInputGroup v-bind="inputGroupProps">
    <DwInput
      :value="value"
      v-bind="inputProps"
      type="email"
      @input="value => $emit('input', value)"
      @leading-click="$emit('leading-click')"
      @trailing-click="$emit('trailing-click')"
      @focus="onFocus"
      @blur="onBlur"
    />
  </DwInputGroup>
</template>

<script>
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import confirmMixin from '../confirm.mixin'
import SizeProps from '../size.props'
import localProp from '../utils/localProp'
import i18n from '../utils/i18n'
import RoundedProps from '../rounded.props'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import InputMixin, { DEFAULT_VALIDATION, STOP_ON_EMPTY } from './Input.mixin'
import FormProps from './Form.props'

export function validate () {
  // eslint-disable-next-line
  const regex = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

  const test = regex.test(this.value.toLowerCase())

  if (!test) {
    this.localValidation = {
      type: 'error',
      description: this.translate('InputEmail.valid')
    }

    return false
  }

  return true
}

export default {
  mixins: [i18n, InputMixin, localProp('validation'), confirmMixin],
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true
    },
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...RoundedProps,
    ...InputGroupProps,
    ...FormProps
  },
  computed: {
    inputGroupProps () {
      return {
        ...syncProps.call(
          this,
          Object.keys({ ...InputGroupProps, ...CommonsProps, ...SizeProps })
        ),
        validation: this.localValidation
      }
    },
    inputProps () {
      return {
        ...syncProps.call(
          this,
          Object.keys({
            ...InputProps,
            ...CommonsProps,
            ...SizeProps,
            ...RoundedProps
          })
        ),
        validation: this.localValidation,
        configPath: 'InputEmail',
        ...this.$attrs
      }
    }
  },
  methods: {
    validate () {
      const defaultValidate = DEFAULT_VALIDATION.call(this)

      if (!defaultValidate) return false
      // Case not required and empty (avoid continue checking)
      if (STOP_ON_EMPTY.call(this)) return true

      if (!validate.call(this)) return false

      return this.validateConfirm('InputEmail.confirm')
    }
  }
}
</script>
