export default {
  /**
   * The default behavior of the button
   */
  type: {
    type: String,
    default: 'button',
    validator (value) {
      return ['button', 'reset', 'submit'].includes(value)
    }
  },
  /**
   * Display loading
   */
  loading: {
    type: Boolean,
    default: false
  },
  /** Display as block */
  block: {
    type: Boolean,
    default: false
  }
}
