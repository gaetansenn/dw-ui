export default {
  /**
     * Unique identification of the panel
     */
  name: {
    type: [String, Number],
    default () {
      return this._uid
    }
  },
  /**
     * Title of the panel
     */
  title: {
    type: [Boolean, String],
    default: false
  },
  /**
     * Disable the collapse item
     */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * Hide dropdown icon
   */
  noIcon: {
    type: Boolean,
    default: false
  }
}
