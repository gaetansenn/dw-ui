import { capitalize } from './string'

export default function (prop) {
  const localKey = `locale${capitalize(prop)}`

  return {
    data () {
      return {
        [`${localKey}`]: this[prop]
      }
    },
    watch: {
      [`${prop}`] (newValue) {
        this[localKey] = newValue
      }
    }
  }
}
