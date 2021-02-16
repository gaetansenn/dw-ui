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
  /** Enable or disable password regex validation */
  validatePassword: {
    type: Boolean,
    default: true
  }
}
