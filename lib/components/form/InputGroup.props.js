export default {
  /**
   * Name of the form group
   */
  name: {
    type: String,
    default: null
  },
  /**
   * A value is required or must be check for the form to be submittable
   * If a string is provided the validation error will use it.
   */
  required: {
    type: [Boolean, String],
    default: false
  },
  inline: {
    type: Boolean,
    default: false
  },
  inlineBlock: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  help: {
    type: String,
    default: null
  },
  focused: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Number, Object, Boolean, Date, Array],
    default: undefined
  }
}
