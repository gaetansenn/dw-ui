export default {
  /**
    * Size
  */
  size: {
    type: String,
    default: 'md',
    validator (value) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    }
  }
}
