export function set (object, path, value) {
  path = path.split('.')
  let index = 0
  const length = path.length - 1

  while (object !== null && index < length)
    object = object[path[index++]]

  if (object) object[path[length]] = value
}

export function get (object, path, defaulValue = undefined) {
  let index = 0
  path = path.split('.')
  const length = path.length

  while (object != null && index < length)
    object = object[path[index++]]

  return (index && index === length) ? object : defaulValue
}
