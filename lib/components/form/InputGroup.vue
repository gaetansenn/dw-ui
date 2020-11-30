<template>
  <div v-if="config" :class="[config.fixed, config.classes]">
    <slot name="label">
      <div :class="config.label.wrapper">
        <label v-if="label" :class="[config.label.fixed, config.label.classes, config.label.size]">
          {{ label }}
          <span v-if="required" :class="config.label.star">*</span>
        </label>
      </div>
    </slot>
    <div :class="config.wrapper.classes">
      <slot />
      <p v-if="validation" :id="`${name}-error`" :class="config.wrapper.validation" class="ml-1 mt-2">
        {{ validation.description }}
      </p>
      <p v-else-if="help" :class="[config.wrapper.help.fixed, config.wrapper.help.size]">
        {{ help }}
      </p>
    </div>
  </div>
</template>

<script>
import config from '../config.mixin'
import CommonsProps from '../Commons.props'
import SizeProps from '../size.props'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import FormProps from './Form.props'

export default {
  configPath: 'InputGroup',
  mixins: [config],
  props: {
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...FormProps
  }
}
</script>
