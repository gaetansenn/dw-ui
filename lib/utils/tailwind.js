const variantsOrders = ['responsive', 'group-hover', 'group-focus', 'focus-within', 'first', 'last', 'odd', 'even', 'hover', 'focus', 'active', 'visited', 'disabled']

const addVariant = function (key, variant, utils) {
  const elements = utils.variants(key)
  const indexOrder = variantsOrders.indexOf(variant)

  if (!elements.includes(variant)) {
    let i = indexOrder - 1

    while (!elements.includes(variantsOrders[i]) && i > 0)
      i--

    if (i === 0) return [[variant], undefined]
    else return [[variant], variantsOrders[i]]
  } else return false
}

const recursive = function (actions, utils) {
  if (actions.length === 1) return utils.after(...actions[0])
  else return utils.after(...actions.shift(), recursive(actions, utils))
}

export function addVariants (key, variants, utils) {
  const actions = variants.map((variant) => {
    return addVariant(key, variant, utils)
  }).filter(action => !!action)

  return recursive(actions.reverse(), utils)
}
