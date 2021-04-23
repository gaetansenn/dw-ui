export default {
  props: {
    /**
   * Compare with other InputPassword
   * Type: Reference of another InputPassword
   */
    confirm: {
      type: Object,
      default: null
    }
  },
  methods: {
    validateConfirm (label) {
      // Inject password confirm if present
      if (this.confirm != null && this.confirm.value !== this.value) {
        this.localValidation = {
          type: 'error'
        }
        this.confirm.validation = {
          type: 'error',
          // TODO: Handle i18n if provided
          description: this.translate(label)
        }

        return false
      } else
        this.confirm.validation = false

      return true
    }
  }
}
