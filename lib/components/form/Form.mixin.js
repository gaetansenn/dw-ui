// This mixin handle validation for children's
export default {
  methods: {
    /**
     * Default reference is `this.form`
     */
    validate (reference = 'form', scroll) {
      let validated = true

      if (!scroll) scroll = window

      /* eslint-disable-next-line */
      if (!this[reference]) return console.warn(`Unable to find data from this.${reference}`)

      const iterate = Array.isArray(this[reference]) ? this[reference] : Object.keys(this[reference])

      iterate.forEach((input) => {
        const component = (Array.isArray(this.$refs[input])) ? this.$refs[input][0] : this.$refs[input]

        if (component) {
          // Validate children
          const validation = component.validate()

          // Handle auto scroll to first component with failed validation
          // TODO: Fix scroll smooth after focus
          if (!validation && validated) component.$el ? component.$el.scrollTo(scroll) : component.scrollTo(scroll)

          if (!validation) validated = false
        }
      })

      return validated
    },

    getFields (reference = 'form') {
      /* eslint-disable-next-line */
      if (!this[reference]) return console.warn(`Unable to find data from this.${reference}`)

      const result = {}

      this[reference].forEach((item) => {
        result[item.name] = item.value
      })

      return result
    },

    /**
     * Remove value key in form item
     */
    resetValues (reference = 'form') {
      /* eslint-disable-next-line */
      if (!this[reference]) return console.warn(`Unable to find data from this.${reference}`)

      this[reference].forEach(item => delete item.value)
    }
  }
}
