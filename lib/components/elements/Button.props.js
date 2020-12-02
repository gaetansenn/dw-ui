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
  /**
   * Href link
   */
  href: {
    type: String,
    default: null
  },
  /**
   * Nuxt Link type
   */
  to: {
    type: [String, Object],
    default: null
  },
  /**
   * Href target attribute
   * Specifies where to open the linked document
   */
  target: {
    type: String,
    default: null
  },
  /** Display as block */
  block: {
    type: Boolean,
    default: false
  }
}
