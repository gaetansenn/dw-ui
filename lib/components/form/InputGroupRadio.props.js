export default {
  /**
   * v-model binding of all selected elements
  */
  value: {
    type: [String, Object, Number, Boolean],
    default: null
  },
  /**
   * Commons name injected to radio
   */
  name: {
    type: String,
    required: true
  },
  /**
   * Label
   */
  label: {
    type: String,
    required: true
  },
  /**
   * Boolean. A value is required
   */
  required: {
    type: Boolean,
    default: false
  }
}
