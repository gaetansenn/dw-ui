export default {
  props: {
    /**
   * Compare value with another field
   */
    same: {
      type: String,
      default: null
    }
  },
  methods: {
    validateConfirm (label) {
      // Inject password compare if present
      if (this.same != null && this.same !== this.value) {
        this.localValidation = {
          type: 'error',
          // TODO: Handle i18n if provided
          description: this.translate(label)
        }

        return false
      }

      return true
    }
  }
}
