<script>
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import InputGroupProps from './InputGroup.props'
import InputGroupRadioProps from './InputGroupRadio.props'

export default {
  configPath: 'InputGroupRadio',
  mixins: [config],
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
        validation: this.localeValidation,
        name: this.name,
        required: this.required
      }
    }
  },
  methods: {
    validate () {
      console.log(this.$slots)
      // Validate slots
    }
  },
  render (h) {
    // Inject name to children
    this.$slots.default.forEach((node) => {
      node.componentOptions.propsData.name = this.name
    })

    return h('DwInputGroup', {
      props: this.inputGroupProps
    }, [h('div', {
      class: this.config.fixed
    }, this.$slots.default)])
  }
}
</script>
