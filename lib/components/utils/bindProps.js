export default function (props) {
  return Object.keys(props).reduce((acc, value) => {
    acc[value] = this[value]

    return acc
  }, {})
}
