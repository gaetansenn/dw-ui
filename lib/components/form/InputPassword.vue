<template>
  <DwInputGroup v-bind="inputGroupProps">
    <DwInput
      :value="value"
      v-bind="inputProps"
      :type="showPassword ? 'text' : 'password'"
      @input="(value) => $emit('input', value)"
      @trailing-click="showPassword = !showPassword"
      @focus="onFocus"
      @blur="onBlur"
    />
  </DwInputGroup>
</template>

<script>
import i18n from '../utils/i18n'
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import localeProp from '../utils/localeProp'
import confirmMixin from '../confirm.mixin'
import RoundedProps from '../rounded.props'
import InputPasswordProps from './InputPassword.props'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import InputMixin, { DEFAULT_VALIDATION, STOP_ON_EMPTY } from './Input.mixin'
import FormProps from './Form.props'

export function validate () {
  // eslint-disable-next-line
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

  const test = regex.test(this.value)

  if (!test) {
    this.localeValidation = {
      type: 'error',
      description: this.translate('InputPassword.valid')
    }

    return false
  }

  return true
}

export default {
  configPath: 'InputPassword',
  mixins: [i18n, config, InputMixin, localeProp('validation'), confirmMixin],
  props: {
    ...InputPasswordProps,
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...FormProps,
    ...RoundedProps
  },
  data () {
    return {
      showPassword: false
    }
  },
  computed: {
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputGroupProps, ...CommonsProps, ...SizeProps })),
        validation: this.localeValidation
      }
    },
    inputProps () {
      const inputProps = {
        ...syncProps.call(this, Object.keys({ ...InputProps, ...CommonsProps, ...SizeProps, ...RoundedProps })),
        validation: this.localeValidation,
        configPath: 'InputPassword'
      }

      // Inject show password icon
      if (this.eye) {
        inputProps.trailing = true
        inputProps.icon = this.config.icon[`${this.showPassword ? 'show' : 'hide'}`]
        inputProps.iconClasses = [this.config.icon.fixed, 'cursor-pointer'].filter(icon => !!icon).join(' ')
      }

      return inputProps
    }
  },
  methods: {
    validate () {
      const defaultValidate = DEFAULT_VALIDATION.call(this)

      if (!defaultValidate) return false

      // Case not required and empty (avoid continue checking)
      if (STOP_ON_EMPTY.call(this)) return true

      if (this.validatePassword) {
        const passwordValidate = typeof this.config.validate === 'function' ? this.config.validate.call(this) : validate.call(this)

        if (!passwordValidate) return false

        return this.validateConfirm('InputPassword.confirm')
      }
    }
  }
}
</script>
