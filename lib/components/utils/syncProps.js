export default function (props) {
  return props.reduce((acc, value) => {
    acc[value] = this.$props[value]

    return acc
  }, {})
}
