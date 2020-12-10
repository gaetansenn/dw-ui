<template>
  <DwInputGroup v-bind="inputGroupProps">
    <DwInput :value="value" v-bind="inputProps" :type="showPassword ? 'text' : 'password'" @input="(value) => $emit('input', value)" @trailing-click="showPassword = !showPassword" />
  </DwInputGroup>
</template>

<script>
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import localeProp from '../utils/localeProp'
import InputPasswordProps from './InputPassword.props'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import InputMixin, { DEFAULT_VALIDATION, STOP_ON_EMPTY } from './Input.mixin'
import FormProps from './Form.props'

export function validate () {
  // eslint-disable-next-line
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

  const test = regex.test(this.value)

  if (!test) {
    this.localeValidation = {
      type: 'error',
      // TODO: Handle i18n if provided
      description: 'Please provide a valid password'
    }

    return false
  }

  return true
}

export function validateConfirm () {
  // Inject password compare if present
  if (this.same && this.value && this.same !== this.value) {
    this.localeValidation = {
      type: 'error',
      // TODO: Handle i18n if provided
      description: 'The password confirmation is not the same'
    }

    return false
  }

  return true
}

export default {
  configPath: 'InputPassword',
  mixins: [config, InputMixin, localeProp('validation')],
  props: {
    ...InputPasswordProps,
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...FormProps
  },
  data () {
    return {
      showPassword: false
    }
  },
  computed: {
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputGroupProps, ...CommonsProps, ...InputProps, ...SizeProps })),
        validation: this.localeValidation
      }
    },
    inputProps () {
      const inputProps = {
        ...syncProps.call(this, Object.keys({ ...InputProps, ...CommonsProps, ...SizeProps })),
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

      const passwordValidate = typeof this.config.validate === 'function' ? this.config.validate.call(this) : validate.call(this)

      if (!passwordValidate) return false

      return validateConfirm.call(this)
    }
  }
}
</script>
