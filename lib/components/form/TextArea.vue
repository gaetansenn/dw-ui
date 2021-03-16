<template>
  <DwInputGroup v-bind="inputGroupProps">
    <div :class="config.wrapper">
      <textarea
        ref="input"
        :value="value"
        v-bind="inputProps"
        :class="[config.fixed, config.Input.validation, config.Input.rounded, config.remaining.input]"
        :maxlength="maxlength"
        @input="(event) => $emit('input', event.target.value)"
        @focus="onFocus"
        @blur="onBlur"
      />
      <div v-if="displayRemaining" :class="config.remaining.fixed">
        {{ translate('TextArea.remaining', [remainingCharacters]) }}
      </div>
    </div>
  </DwInputGroup>
</template>

<script>
import i18n from '../utils/i18n'
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import localProp from '../utils/localProp'
import RoundedProps from '../rounded.props'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import TextAreaProps from './TextArea.props'
import InputMixin from './Input.mixin'
import FormProps from './Form.props'

export default {
  configPath: 'TextArea',
  mixins: [i18n, config, InputMixin, localProp('validation')],
  props: {
    value: {
      type: String,
      default: null
    },
    ...TextAreaProps,
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...FormProps,
    ...RoundedProps
  },
  computed: {
    displayRemaining () {
      return this.remaining && this.maxlength
    },
    remainingCharacters () {
      if (!this.value) return this.maxlength

      const limit = this.maxlength - this.value.length

      return limit < 0 ? 0 : limit
    },
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputGroupProps, ...CommonsProps, ...SizeProps })),
        validation: this.localValidation
      }
    },
    inputProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputProps, ...CommonsProps, ...SizeProps, ...RoundedProps, ...TextAreaProps })),
        validation: this.localValidation,
        configPath: 'InputText'
      }
    }
  }
}
</script>
