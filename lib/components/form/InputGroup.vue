<template>
  <div :class="[config.fixed, config.classes]">
    <slot name="label">
      <div :class="config.label.wrapper">
        <label v-if="label" :class="[config.label.fixed, config.label.classes, config.label.size]" :for="name">
          {{ label }}
          <span v-if="required" :class="config.label.star">*</span>
        </label>
      </div>
    </slot>
    <div :class="config.wrapper.classes">
      <slot />
      <p v-if="validation" :id="`${name}-error`" :class="[config.wrapper.validation.fixed, config.wrapper.validation.classes]">
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
import CommonsProps from '../commons.props'
import SizeProps from '../size.props'
import localProp from '../utils/localProp'
import InputProps from './Input.props'
import InputGroupProps from './InputGroup.props'
import FormProps from './Form.props'

export default {
  configPath: 'InputGroup',
  mixins: [config, localProp('focused')],
  props: {
    ...SizeProps,
    ...CommonsProps,
    ...InputProps,
    ...InputGroupProps,
    ...FormProps
  }
}
</script>
