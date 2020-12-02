export default {
  /**
   * Name of the form control
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
  /**
   * Short hint that describes the expected value of an input field
   */
  placeholder: {
    type: [String, Boolean],
    default: null
  }
}
