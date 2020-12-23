export default {
  /**
   * v-model default value
   */
  value: {
    type: [Object, String, Number]
  },
  /**
   * Options (items to iterate throw)
   * { id: identifier, label: value to display } or String
   */
  options: {
    type: Array,
    required: true,
    default: () => [],
    validator (value) {
      if (!value.length) return true
      return typeof value[0] === 'object' || typeof value[0] === 'string' || typeof value[0] === 'number' // Check that we have an array of object or string
    }
  },
  /**
     * Set identifier for value item selected
     * Use if options is an array of object
     */
  valueKey: {
    type: String,
    default: 'id'
  },
  /**
     * Set key used to display value
     * Use if options is an array of object
     */
  labelKey: {
    type: String,
    default: 'label'
  }
}
