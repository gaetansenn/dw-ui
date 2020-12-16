export default function (value) {
  if (value === 'object' && Object.keys(value).length !== 0) return false
  if (value !== 'object' && value !== undefined && value !== null && value !== '') return false

  return true
}
