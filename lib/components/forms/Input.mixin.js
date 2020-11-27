import { isEmpty } from 'lodash'

export const DEFAULT_VALIDATION = function () {
  // Reset validation
  this.localeValidation = undefined

  // Case required but empty
  if (this.required && isEmpty(this.value)) {
    this.localeValidation = {
      type: 'error',
      description: 'form.input.required'
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
