import { get } from './object'

function applyVariables (translation, value) {
  if (Array.isArray(value)) return value.reduce((accu, variable, index) => {
    accu = accu.replace(`{${index}}`, variable)

    return accu
  }, translation)

  return translation
}

export default {
  methods: {
    translate (key, value) {
      if (this.$t) return this.$t(`dewib.ui.${key}`, value)
      else return applyVariables(get(this.$dewib.ui.config.i18n.en, key), value)
    }
  }
}
