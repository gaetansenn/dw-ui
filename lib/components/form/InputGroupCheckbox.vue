<script>
import i18n from '../utils/i18n'
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import localProp from '../utils/localProp'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import InputMixin from './Input.mixin'
import InputGroupProps from './InputGroup.props'
import InputGroupCheckboxProps from './InputGroupCheckbox.props'
import DwInputGroup from './InputGroup'

export default {
  configPath: 'InputGroupCheckbox',
  components: {
    DwInputGroup
  },
  mixins: [i18n, config, InputMixin, localProp('validation')],
  props: {
    ...SizeProps,
    ...CommonsProps,
    ...InputGroupProps,
    ...InputGroupCheckboxProps
  },
  computed: {
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...CommonsProps, ...SizeProps, ...InputGroupCheckboxProps, ...InputGroupProps })),
        validation: this.localValidation,
        rootPath: 'InputGroupCheckbox'
      }
    }
  },
  render (h) {
    // Inject name and value to children
    this.$slots.default.forEach((node) => {
      if (node.componentOptions) {
        node.data.on = {
          input: (value) => {
            if (!Array.isArray(this.value))
              if (this.value !== node.componentInstance.value) this.$emit('input', this.value ? [this.value, node.componentInstance.value] : [node.componentInstance.value])
              else this.$emit('input', null)
            else
            if (this.value.includes(node.componentInstance.value)) this.$emit('input', this.value.filter(c => c !== node.componentInstance.value))
            else this.$emit('input', this.value.concat(node.componentInstance.value))
          }
        }
        node.componentOptions.propsData.name = this.name
        if (this.value && node.componentOptions)
          if (Array.isArray(this.value)) node.componentOptions.propsData.selected = this.value.includes(node.componentOptions.propsData.value)
          else
            node.componentOptions.propsData.selected = this.value === (node.componentOptions.propsData.value || node.componentOptions.Ctor.options.props.value.default)
      }
    })

    return h('DwInputGroup', {
      props: this.inputGroupProps
    }, [h('div', {
      class: this.config.fixed
    }, this.$slots.default)])
  }
}
</script>
