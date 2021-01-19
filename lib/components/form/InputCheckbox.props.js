export default {
  /**
   * Add label for checkbox
   */
  label: {
    type: String,
    default: null
  },
  /**
   * v-model binding of all selected elements
  */
  value: {
    type: [String, Object, Number, Boolean],
    default: 'on'
  },
  /**
   * v-model binding of checked checkbox
  */
  selected: {
    type: [Boolean, String, Object, Number, Array],
    default: null
  },
  /**
   * Boolean. A value is required or must be check for the form to be submittable
   */
  required: {
    type: Boolean,
    default: false
  }
}
