
<script>
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import SizeProps from '../size.props'
import bindProps from '../utils/bindProps'
import RoundedProps from '../rounded.props'
import InputProps from './Input.props'
import FormProps from './Form.props'

export default {
  mixins: [config],
  props: {
    value: {
      type: [String, Number, Object, Boolean],
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
  computed: {
    isLeading () {
      return this.icon && this.leading
    },
    isTrailing () {
      return this.icon && this.trailing
    }
  },
  created () {
    this.bind = bindProps.call(this, InputProps)
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
    const childrens = [h('input', {
      ref: 'component',
      class: [this.config.Input.fixed, this.config.Input.variant, this.config.Input.size, this.config.Input.validation, this.config.Input.rounded],
      attrs: {
        type: this.type,
        ...this.bind
      },
      domProps: {
        value: this.value,
        checked: this.checked
      },
      on: {
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

    if (this.isTrailing)
      childrens.push(h('div', {
        class: [this.config.Input.trailing.fixed, this.config.Input.trailing.classes],
        on: {
          click: () => {
            this.$emit('trailing-click')
          }
        }
      }, [h('div', {
        class: [this.config.Input.icon.fixed, this.config.Input.icon.size],
        domProps: {
          innerHTML: this.icon
        }
      })]))

    return h('div', {
      class: this.config.Input.wrapper
    }, childrens)
  }
}
</script>
