export default {
  /**
   * Number of lines to display before truncate
   */
  lines: {
    type: Number,
    default: 2
  },
  /**
   * The text you want to display
   */
  text: {
    type: String,
    default: undefined
  },
  /**
   * Expand to see more
   */
  expandable: {
    type: Boolean,
    default: true
  },
  /**
   * Default label seeMore
   */
  seeMore: {
    type: String,
    default: undefined
  },
  /**
   * Default label seeLess
   */
  seeLess: {
    type: String,
    default: undefined
  }
}
