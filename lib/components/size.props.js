export default {
  /**
    * Size
  */
  size: {
    type: String,
    default: 'md',
    validator (value) {
      return ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    }
  }
}
