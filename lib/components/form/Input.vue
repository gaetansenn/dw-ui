
<script>
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import SizeProps from '../size.props'
import bindProps from '../utils/bindProps'
import RoundedProps from '../rounded.props'
import InputProps from './Input.props'
import FormProps from './Form.props'

const DwTooltip = () => import('../others/Tooltip')

export default {
  components: {
    DwTooltip
  },
  mixins: [config],
  props: {
    value: {
      type: [String, Number, Object, Boolean, Date],
      default: ''
    },
    type: {
      type: String,
      required: true
    },
    configPath: {
      type: String,
      required: true
    },
    ...InputProps,
    ...CommonsProps,
    ...SizeProps,
    ...RoundedProps,
    ...FormProps
  },
  data () {
    return {
      focused: false
    }
  },
  computed: {
    bind () {
      return bindProps.call(this, InputProps)
    }
  },
  methods: {
    focus () {
      // TODO: Check if can be global
      // Force focus of component
      const component = this.$refs.component

      if (component) component.focus()

      this.$emit('focus')
    }
  },
  render (h) {
    const attrs = {
      type: this.type,
      ...this.bind,
      id: this.name,
      'aria-required': (!!this.required).toString(),
      'aria-invalid': this.validation && this.validation.type === 'error'
    }

    if (this.$parent.help) attrs.describedby = `${this.name}-hint`

    const childrens = [h('input', {
      ref: 'component',
      class: [this.config.Input.fixed, this.config.Input.classes, this.config.Input.variant, this.config.Input.size, this.config.Input.validation, this.config.Input.rounded],
      attrs,
      domProps: {
        value: this.value,
        checked: this.checked
      },
      on: {
        blur: () => {
          this.focused = false
          this.$emit('blur')
        },
        focus: () => {
          this.focused = true
          this.$emit('focus')
        },
        input: ($event) => {
          this.$emit('input', $event.target.value)
        },
        change: () => {
          this.$emit('change', this.value)
        },
        click: () => {
          this.$emit('click')
        }
      }
    })]

    if (this.trailing || this.helpTooltip) {
      const icon = h('div', {
        class: [this.config.Input.icon.fixed, this.config.Input.icon.size],
        domProps: {
          innerHTML: this.trailing || this.config.Input.help.icon
        }
      })

      const trailingWrapper = {
        class: [this.config.Input.icon.trailing.fixed, this.config.Input.icon.trailing.classes],
        on: {
          click: () => {
            this.$emit('trailing-click')
          }
        }
      }

      if (this.helpTooltip)
        childrens.push(h('div', trailingWrapper, [h('DwTooltip', {
          props: {
            position: 'bottomRight',
            content: this.helpTooltip
          }
        }, [icon])]))
      else
        childrens.push(h('div', trailingWrapper, [icon]))
    }

    if (this.leading) {
      const icon = h('div', {
        class: [this.config.Input.icon.fixed, this.config.Input.icon.size],
        domProps: {
          innerHTML: this.leading
        }
      })

      const leadingWrapper = {
        class: [this.config.Input.icon.leading.fixed, this.config.Input.icon.leading.classes],
        on: {
          click: () => {
            this.$emit('leading-click')
          }
        }
      }

      childrens.push(h('div', leadingWrapper, [icon]))
    }

    return h('div', {
      class: this.config.Input.wrapper
    }, childrens)
  }
}
</script>
