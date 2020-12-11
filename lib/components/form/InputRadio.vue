<template>
  <label :class="config.fixed">
    <DwInput :value="value" v-bind="inputProps" type="radio" @change="(value) => $emit('input', value)" />
    <span v-if="label" :class="[config.label, config.label.size]">{{ label }}</span>
  </label>
</template>

<script>
import config from '../config.mixin'
import CommonsProps from '../commons.props'
import syncProps from '../utils/syncProps'
import SizeProps from '../size.props'
import InputRadio from './InputRadio.props'
import InputProps from './Input.props'

export default {
  configPath: 'InputRadio',
  mixins: [config],
  model: {
    prop: 'selected',
    event: 'input'
  },
  props: {
    ...InputRadio,
    ...SizeProps,
    ...CommonsProps,
    ...InputProps
  },
  computed: {
    inputProps () {
      return {
        ...syncProps.call(this, Object.keys({ ...InputProps, ...CommonsProps, ...SizeProps })),
        validation: this.localeValidation,
        configPath: 'InputRadio'
      }
    }
  }
}
</script>