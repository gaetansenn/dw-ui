import isEmpty from '../utils/isEmpty'

export const DEFAULT_VALIDATION = function (key = 'value') {
  // Reset validation
  this.localValidation = undefined

  // Case required but empty
  if (this.required && isEmpty(this[key])) {
    this.localValidation = {
      type: 'error',
      description: typeof this.required === 'string' ? this.required : this.translate('Input.required')
    }

    return false
  }

  return true
}

export const STOP_ON_EMPTY = function (key = 'value') {
  return !this.required && isEmpty(this[key])
}

export default {
  data () {
    return {
      uuid: `${this.name}-${this._uid}`
    }
  },
  methods: {
    setValidation (value) {
      this.localValidation = value
    },
    validate () {
      return DEFAULT_VALIDATION.bind(this)()
    },
    onFocus () {
      this.$children[0].localFocused = true

      this.$emit('focus')
    },
    onBlur () {
      this.$children[0].localFocused = false

      this.$emit('blur')
    }
  }
}
