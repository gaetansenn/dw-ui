<script>
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import localeProp from '../utils/localeProp'
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
  mixins: [config, InputMixin, localeProp('validation')],
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
        validation: this.localeValidation
      }
    }
  },
  render (h) {
    // Inject name and value to children
    this.$slots.default.forEach((node) => {
      if (node.componentOptions) {
        node.data.on = {
          input: (value) => {
            if (!Array.isArray(this.value)) {
              if (this.value !== node.componentInstance.value) this.value = this.value ? [this.value, node.componentInstance.value] : [node.componentInstance.value]
              else this.value = null

              this.$emit('input', this.value)
            } else
            if (this.value.includes(node.componentInstance.value)) this.value = this.value.filter(c => c !== node.componentInstance.value)
            else this.value = this.value.concat(node.componentInstance.value)

            this.$emit('input', this.value)
          }
        }
        node.componentOptions.propsData.name = this.name
        if (this.value && node.componentInstance) node.componentOptions.propsData.selected = this.value.includes(node.componentInstance.value)
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
