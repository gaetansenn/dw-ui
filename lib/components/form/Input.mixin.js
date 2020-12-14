import isEmpty from '../utils/isEmpty'

export const DEFAULT_VALIDATION = function () {
  // Reset validation
  this.localeValidation = undefined

  // Case required but empty
  if (this.required && isEmpty(this.value)) {
    this.localeValidation = {
      type: 'error',
      description: this.translate('Input.required')
    }

    return false
  }

  return true
}

export const STOP_ON_EMPTY = function (key = 'value') {
  return !this.required && isEmpty(key)
}

export default {
  methods: {
    validate () {
      return DEFAULT_VALIDATION.bind(this)()
    }
  }
}
