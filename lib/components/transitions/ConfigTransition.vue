<script>
export default {
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    type: {
      type: String,
      default: 'transition'
    },
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
    const data = {
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
    }

    if (context.data.class) data.class = context.data.class
    if (context.props.type === 'transition-group') data.props.tag = context.props.tag

    return h(context.props.type, data, context.children)
  }
}
</script>
