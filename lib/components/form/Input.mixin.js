import { isEmpty } from 'lodash'

export const DEFAULT_VALIDATION = function () {
  // Reset validation
  this.localeValidation = undefined

  // Case required but empty
  if (this.required && isEmpty(this.value)) {
    this.localeValidation = {
      type: 'error',
      // TODO: Handle i18n if provided
      description: 'This field is required'
    }

    return false
  }

  return true
}

export default {
  methods: {
    validate () {
      return DEFAULT_VALIDATION.bind(this)()
    }
  }
}
