<script>
import i18n from '../utils/i18n'
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import localeProp from '../utils/localeProp'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import InputMixin from './Input.mixin'
import InputGroupProps from './InputGroup.props'
import InputGroupRadioProps from './InputGroupRadio.props'
import DwInputGroup from './InputGroup'

export default {
  configPath: 'InputGroupRadio',
  components: {
    DwInputGroup
  },
  mixins: [i18n, config, InputMixin, localeProp('validation')],
  props: {
    ...SizeProps,
    ...CommonsProps,
    ...InputGroupProps,
    ...InputGroupRadioProps
  },
  computed: {
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...CommonsProps, ...SizeProps, ...InputGroupRadioProps, ...InputGroupProps })),
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
            this.$emit('input', node.componentInstance.value)
          }
        }
        node.componentOptions.propsData.name = this.name
        node.componentOptions.propsData.selected = this.value
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
