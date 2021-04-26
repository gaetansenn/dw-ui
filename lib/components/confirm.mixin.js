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
      if (!this.confirm) return true

      if (this.confirm != null && this.confirm.value !== this.value) {
        this.localValidation = {
          type: 'error'
        }
        this.$nextTick(() => {
          this.confirm.setValidation({
            type: 'error',
            // TODO: Handle i18n if provided
            description: this.translate(label)
          })
        })

        return false
      } else if (this.confirm && this.confirm.localValidation && this.confirm.localValidation.description === this.translate(label))
        this.$nextTick(() => this.confirm.setValidation(undefined))

      return true
    }
  }
}
