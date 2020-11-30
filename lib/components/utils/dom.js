export function addClass (el, ...cls) {
  if (!el || !cls) return

  el.classList.add(...cls)
}

export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.includes(' ')) throw new Error('className should not contain space.')
  if (el.classList)
    return el.classList.contains(cls)
  else
    return (' ' + el.className + ' ').includes(' ' + cls + ' ')
}

export function removeClass (el, cls) {
  if (!el || !cls) return

  el.classList.remove(cls)
}
