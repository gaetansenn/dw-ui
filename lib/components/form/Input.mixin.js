import isEmpty from '../utils/isEmpty'

export const DEFAULT_VALIDATION = function (key = 'value') {
  // Reset validation
  this.localeValidation = undefined

  // Case required but empty
  if (this.required && isEmpty(this[key])) {
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
  data () {
    return {
      uuid: `${this.name}-${this._uid}`
    }
  },
  methods: {
    validate () {
      return DEFAULT_VALIDATION.bind(this)()
    }
  },
  mounted () {
    if (!this.$children.length || !this.$children[0].$children.length) return

    const InputGroup = this.$children[0]

    this.$children[0].$children[0].$on('focus', () => {
      InputGroup.localeFocused = true
    })

    this.$children[0].$children[0].$on('blur', () => {
      InputGroup.localeFocused = false
    })
  }
}
