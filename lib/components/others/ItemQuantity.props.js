export default {
  value: {
    type: [Number, String],
    required: true
  },
  /** The min quantity */
  min: {
    type: Number,
    default: 0
  },
  /** The max quantity */
  max: {
    type: Number,
    default: null
  },
  /** The add function */
  add: {
    type: Function,
    default: null
  },
  /** The remove function */
  remove: {
    type: Function,
    default: null
  }
}
