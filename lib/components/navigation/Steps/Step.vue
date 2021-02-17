
<script>
import config from '../../config.mixin'
import ToProps from '../../to.props'

export default {
  configPath: 'Step',
  mixins: [config],
  inject: ['steps'],
  props: {
    /** Steps size */
    size: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    ...ToProps
  },
  computed: {
    clickEvent () {
      return !!this.$vnode.data.on?.click
    },
    is () {
      if (this.to && this.steps.value > this.index + 1) return 'nuxt-link'
      else return 'div'
    },
    eventClick () {
      if (this.is === 'nuxt-link') return 'click.native'
      else return 'click'
    },
    props () {
      if (this.is === 'nuxt-link') return { to: this.to }

      return {}
    }
  },
  methods: {
    select () {
      if (!this.disabled) this.steps.select(this.index + 1)
    }
  },
  render (h) {
    const childrens = []
    const headerChildrens = [h('div', {
      class: [this.config.number.fixed, this.config.number.classes]
    }, [h('div', {
      class: [this.config.number.content]
    }, this.index + 1)])]

    if (this.index !== this.size - 1) headerChildrens.push(h('div', {
      class: [this.config.line.fixed, this.config.line.classes],
      style: this.config.line.style
    }))

    childrens.push(h('div', {
      class: this.config.number.wrapper
    }, headerChildrens))

    if (this.$scopedSlots.title) childrens.push(this.$scopedSlots.title({ title: this.title }))
    else childrens.push(h('div', {
      class: [this.config.title.fixed, this.config.title.classes]
    }, this.title))

    if (this.$scopedSlots.desription) childrens.push(this.$scopedSlots.description({ description: this.description }))
    else childrens.push(h('div', {
      class: [this.config.description.fixed, this.config.description.classes]
    }, this.description))

    const parentOptions = {
      props: this.props,
      class: [this.config.fixed, this.config.classes]
    }

    if (this.is === 'nuxt-link') {
      if (this.disabled) parentOptions.props.event = ''
      else parentOptions.props.event = 'click'
      parentOptions.nativeOn = { click: this.select }
    } else parentOptions.on = { click: this.select }

    return h(this.is, parentOptions, childrens)
  }
}
</script>
