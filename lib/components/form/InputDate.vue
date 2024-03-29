<template>
  <DwInputGroup v-bind="inputGroupProps">
    <DwInput
      :value="value"
      v-bind="inputProps"
      type="date"
      @input="value => $emit('input', value)"
      @leading-click="$emit('leading-click')"
      @trailing-click="$emit('trailing-click')"
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
import InputMixin, { DEFAULT_VALIDATION, STOP_ON_EMPTY } from './Input.mixin'
import FormProps from './Form.props'

export function validate () {
  // eslint-disable-next-line
  const regex = /((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/

  const test = regex.test(this.value)

  if (!test) {
    this.localValidation = {
      type: 'error',
      description: this.translate('InputDate.valid')
    }

    return false
  }

  return true
}

export default {
  mixins: [i18n, InputMixin, localProp('validation')],
  inheritAttrs: false,
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
        configPath: 'InputDate',
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

      return validate.call(this)
    }
  }
}
</script>
