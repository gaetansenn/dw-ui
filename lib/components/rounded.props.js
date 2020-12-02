export default {
  /**
    * Rounded size
  */
  rounded: {
    type: String,
    default: null,
    validator (value) {
      if (!value) return true
      return ['xs', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
    }
  }
}
