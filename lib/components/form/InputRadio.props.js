export default {
  /**
   * Add label for radio
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
   * v-model binding of all selected elements
  */
  selected: {
    type: [String, Object, Number, Boolean],
    default: 'on'
  }
}
