<script>
export default {
  functional: true,
  props: {
    appear: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: null
    },
    config: {
      type: Object,
      required: true
    }
  },
  render (h, context) {
    return h('transition', {
      props: {
        appear: context.props.appear,
        mode: context.props.mode,
        'enter-active-class': context.props.config.enter.fixed,
        'enter-class': context.props.config.enter.from,
        'enter-to-class': context.props.config.enter.to,
        'leave-active-class': context.props.config.leave.fixed,
        'leave-class': context.props.config.leave.from,
        'leave-to-class': context.props.config.leave.to
      }
    }, context.children)
  }
}
</script>
