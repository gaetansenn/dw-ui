export default {
  /**
   * Name of the form group
   */
  name: {
    type: String,
    required: true
  },
  /**
   * Boolean. A value is required or must be check for the form to be submittable
   */
  required: {
    type: Boolean,
    default: false
  },
  inline: {
    type: Boolean,
    default: false
  },
  inlineBlock: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  help: {
    type: String,
    default: null
  }
}
