<script>
import i18n from '../utils/i18n'
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import RoundedProps from '../rounded.props'
import localeProp from '../utils/localeProp'
import DisabledProps from '../disabled.props'
import DwInputGroup from './InputGroup'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import InputMixin from './Input.mixin'
import FormProps from './Form.props'
import SelectProps from './Select.props'

export default {
  configPath: 'Select',
  components: {
    DwInputGroup
  },
  mixins: [i18n, config, InputMixin, localeProp('validation'), localeProp('value')],
  props: {
    ...SelectProps,
    ...SizeProps,
    ...RoundedProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...DisabledProps,
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
  },
  render (h) {
    const selectChildrens = this.localeOptions.map((option) => {
      return h('option', {
        domProps: {
          value: option[this.valueKey],
          disabled: option.disabled
        }
      }, option[this.labelKey])
    })

    if (this.placeholder !== false) selectChildrens.unshift(h('option', {
      domProps: {
        value: this.emptyLocaleValue
      }
    }, this.placeholder || this.config.placeholder))

    const select = h('select', {
      domProps: {
        value: this.value,
        disabled: this.disabled
      },
      on: {
        input: (event) => {
          this.$emit('input', event.target.value)
        }
      },
      class: [this.config.fixed, this.config.size, this.config.variant, this.config.rounded]
    }, selectChildrens)

    return h('DwInputGroup', {
      attrs: this.inputGroupProps
    }, [h('div', {
      class: this.config.wrapper
    }, [select, h('span', {
      class: [this.config.icon.fixed, this.config.icon.size, this.config.icon.classes],
      domProps: {
        innerHTML: !this.$slots.arrow ? this.config.icon.icon : undefined
      }
    }, this.$slots.arrow ? this.$slots.arrow : [])])])
  }
}
</script>
