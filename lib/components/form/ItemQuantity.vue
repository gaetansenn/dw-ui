<template>
  <DwInputGroup v-bind="inputGroupProps">
    <div :class="config.wrapper">
      <slot name="remove">
        <button :class="config.remove.fixed" :disabled="localValue === min" @click="localRemove" v-html="config.remove.icon" />
      </slot>
      <div :class="config.fixed">
        {{ localValue }}
      </div>
      <slot name="add">
        <button :class="config.add.fixed" :disabled="localValue === max" @click="localAdd" v-html="config.add.icon" />
      </slot>
    </div>
  </DwInputGroup>
</template>

<script>
import config from '../config.mixin'
import localProp from '../utils/localProp'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import ItemQuantityProps from './ItemQuantity.props'
import InputGroupProps from './InputGroup.props'

export default {
  configPath: 'ItemQuantity',
  mixins: [config, localProp('value')],
  props: {
    ...InputGroupProps,
    ...ItemQuantityProps,
    ...SizeProps
  },
  computed: {
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputGroupProps, ...SizeProps }))
      }
    }
  },
  methods: {
    localAdd () {
      if (this.add) this.add()

      else this.$emit('input', this.localValue + 1)
    },
    localRemove () {
      if (this.remove) this.remove()

      else this.$emit('input', this.localValue - 1)
    }
  }
}
</script>
