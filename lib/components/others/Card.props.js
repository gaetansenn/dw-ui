export default {
  /* Submit method for form */
  submit: {
    type: Function,
    default: null
  },
  /** Handle collapse */
  collapse: {
    type: Boolean,
    default: false
  },
  /**
   * Is collapsed
   */
  collapsed: {
    type: Boolean,
    default: false
  },
  /**
   * Header content
   */
  header: {
    type: String,
    default: null
  },
  /**
   * Display or not the arrow icon if collapsed it true
   */
  arrow: {
    type: Boolean,
    default: true
  }
}
