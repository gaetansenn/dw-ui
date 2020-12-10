export default {
  /** Binded value */
  value: {
    type: String,
    required: true
  },
  /** Eye option to show password */
  eye: {
    type: Boolean,
    default: false
  },
  /**
   * Compare password confirmation
   */
  same: {
    type: String,
    default: null
  }
}
