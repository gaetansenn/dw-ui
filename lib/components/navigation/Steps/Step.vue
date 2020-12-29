<template>
  <div :class="[config.fixed, config.classes]">
    <div :class="[config.number.wrapper]">
      <div :class="[config.number.fixed, config.number.classes]">
        <div :class="[config.number.content]">
          {{ index + 1 }}
        </div>
      </div>
      <div v-if="index !== size - 1" :class="[config.line.fixed, config.line.classes]" />
    </div>
    <slot name="title" :title="title">
      <div :class="[config.title.fixed, config.title.classes]">
        {{ title }}
      </div>
    </slot>
    <slot name="description" :description="description">
      <div :class="[config.description.fixed, config.description.classes]">
        {{ description }}
      </div>
    </slot>
  </div>
</template>

<script>
import config from '../../config.mixin'

export default {
  configPath: 'Step',
  mixins: [config],
  inject: ['steps'],
  props: {
    /** Steps size */
    size: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    clickEvent () {
      return !!this.$vnode.data.on?.click
    }
  }
}
</script>
