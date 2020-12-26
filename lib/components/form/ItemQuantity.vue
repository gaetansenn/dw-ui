<template>
  <DwInputGroup v-bind="inputGroupProps">
    <div :class="config.wrapper">
      <slot name="remove">
        <button :class="config.remove.fixed" :disabled="localeValue === min" @click="localeRemove" v-html="config.remove.icon" />
      </slot>
      <div :class="config.fixed">
        {{ localeValue }}
      </div>
      <slot name="add">
        <button :class="config.add.fixed" :disabled="localeValue === max" @click="localeAdd" v-html="config.add.icon" />
      </slot>
    </div>
  </DwInputGroup>
</template>

<script>
import config from '../config.mixin'
import localeProp from '../utils/localeProp'
import syncProps from '../utils/syncProps'
import ItemQuantityProps from './ItemQuantity.props'
import InputGroupProps from './InputGroup.props'

export default {
  configPath: 'ItemQuantity',
  mixins: [config, localeProp('value')],
  props: {
    ...InputGroupProps,
    ...ItemQuantityProps
  },
  computed: {
    inputGroupProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputGroupProps }))
      }
    }
  },
  methods: {
    localeAdd () {
      if (this.add) this.add()

      else this.$emit('input', this.localeValue + 1)
    },
    localeRemove () {
      if (this.remove) this.remove()

      else this.$emit('input', this.localeValue - 1)
    }
  }
}
</script>
