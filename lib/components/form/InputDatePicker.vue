<template>
  <DwInputGroup v-bind="inputGroupProps">
    <div
      v-click-away="{
        exclude: [],
        handler: 'close'
      }"
      class="relative"
    >
      <DwInput
        :value="formatedValue"
        v-bind="inputProps"
        type="text"
        readonly
        trailing
        :icon="config.icon.icon"
        @click.native="toggle"
        @focus="onFocus"
        @blur="onBlur"
      />
      <DwDatePicker
        v-if="opened"
        v-model="localeValue"
        v-bind="datePickerProps"
        :class="config.DatePicker.fixed"
        @click.native="toggle"
        @input="(value) => $emit('input', value)"
      />
    </div>
  </DwInputGroup>
</template>

<script>

import i18n from '../utils/i18n'
import CommonsProps from '../commons.props'
import ClickAway from '../directives/click-away'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import localeProp from '../utils/localeProp'
import config from '../config.mixin'
import RoundedProps from '../rounded.props'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import InputDatePickerProps from './InputDatepicker.props'
import DatePickerProps from './DatePicker/DatePicker.props'
import InputMixin, { DEFAULT_VALIDATION, STOP_ON_EMPTY } from './Input.mixin'
import FormProps from './Form.props'

export function validate () {
  if ((new Date(this.value)).toString() === 'Invalid Date') {
    this.localeValidation = {
      type: 'error',
      description: this.translate('InputDatePicker.valid')
    }

    return false
  }

  return true
}

export default {
  configPath: 'InputDatePicker',
  directives: {
    'click-away': ClickAway
  },
  mixins: [config, i18n, InputMixin, localeProp('value'), localeProp('validation')],
  props: {
    ...InputDatePickerProps,
    ...DatePickerProps,
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...FormProps,
    ...RoundedProps
  },
  data () {
    return {
      opened: false
    }
  },
  computed: {
    formatedValue () {
      if (!this.localeValue) return ''

      return new Date(this.localeValue).toLocaleDateString(this.locale, this.format || {})
    },
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputGroupProps, ...CommonsProps, ...SizeProps })),
        validation: this.localeValidation
      }
    },
    inputProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputProps, ...CommonsProps, ...SizeProps, ...RoundedProps })),
        validation: this.localeValidation,
        configPath: 'InputDatePicker'
      }
    },
    datePickerProps () {
      return {
        ...syncProps.call(this, Object.keys(DatePickerProps))
      }
    }
  },
  methods: {
    toggle () {
      this.opened = !this.opened
    },
    close () {
      this.opened = false
    },
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
