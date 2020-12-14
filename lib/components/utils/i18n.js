export default {
  methods: {
    translate (key) {
      if (this.$t) return this.$t(`dewib.ui.${key}`)
      else return this.$dewib.ui.i18n.en[key]
    }
  }
}
