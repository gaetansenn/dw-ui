export default {
  /**
   * Currently active panel(s)
   * Array to handle multiple active panels / String or Number according to collapse-item type provided
   */
  value: {
    type: [Array, String, Number],
    default: () => []
  },
  accordion: {
    type: Boolean,
    default: false
  }
}
