<script>
import i18n from '../utils/i18n'
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import RoundedProps from '../rounded.props'
import localProp from '../utils/localProp'
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
  mixins: [
    i18n,
    config,
    InputMixin,
    localProp('validation'),
    localProp('value')
  ],
  inheritAttrs: false,
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
    localOptions () {
      return this.options.map((item) => {
        if (typeof item === 'string' || typeof item === 'number')
          return { [this.valueKey]: item, [this.labelKey]: item }
        return item
      })
    }
  },
  watch: {
    localValue: 'onLocalValueChanged'
  },
  methods: {
    onLocalValueChanged (newValue) {
      this.$emit('input', newValue)
    },
    inputGroupProps () {
      return {
        ...syncProps.call(
          this,
          Object.keys({ ...InputGroupProps, ...CommonsProps, ...SizeProps })
        ),
        validation: this.localValidation
      }
    }
  },
  render (h) {
    const selectChildrens = this.localOptions.map((option) => {
      const isSelected = typeof this.value === 'object' && this.value && this.valueKey
        ? option[this.valueKey] === this.value[this.valueKey]
        : option[this.valueKey] === this.value

      return h(
        'option',
        {
          attrs: {
            selected: isSelected ? 'selected' : null,
            value: option[this.valueKey],
            disabled: option.disabled ? 'disabled' : null
          },
          domProps: {
            value: option[this.valueKey]
          }
        },
        option[this.labelKey]
      )
    })

    if (this.placeholder !== false)
      selectChildrens.unshift(
        h(
          'option',
          {
            domProps: {
              value: null
            }
          },
          this.placeholder || this.config.placeholder
        )
      )

    const select = h(
      'select',
      {
        domProps: {
          value: this.value,
          disabled: this.disabled
        },
        attrs: this.$attrs,
        on: {
          input: (event) => {
            this.$emit('change', event.target.value)
            this.$emit('input', event.target.value)
          }
        },
        class: [
          this.config.fixed,
          this.config.size,
          this.config.variant,
          this.config.rounded,
          this.config.validation
        ]
      },
      selectChildrens
    )

    return h(
      'DwInputGroup',
      {
        attrs: this.inputGroupProps()
      },
      [
        h(
          'div',
          {
            class: this.config.wrapper
          },
          [
            select,
            h(
              'span',
              {
                class: [
                  this.config.icon.fixed,
                  this.config.icon.size,
                  this.config.icon.classes
                ],
                domProps: {
                  innerHTML: !this.$slots.arrow
                    ? this.config.icon.icon
                    : undefined
                }
              },
              this.$slots.arrow ? this.$slots.arrow : []
            )
          ]
        )
      ]
    )
  }
}
</script>
