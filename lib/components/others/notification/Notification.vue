<template>
  <div
    :class="config.wrapper"
    @mouseover="$emit('pause')"
    @mouseout="$emit('resume')"
    @click="to && $emit('close')"
  >
    <component :is="to ? 'nuxt-link' : 'div'" :to="to" :class="config.fixed">
      <div :class="[config.type.classes, config.type.fixed]" v-html="config.type.icon" />
      <div :class="config.body.fixed">
        <p :class="config.body.title">
          {{ title }}
        </p>
        <!-- eslint-disable-next-line -->
        <p v-if="description" :class="config.body.description" v-html="description" />
      </div>
      <button
        :class="config.close.fixed"
        @click.prevent="$emit('close')"
        v-html="config.close.icon"
      />
    </component>
  </div>
</template>

<script>
import config from '../../config.mixin'

export default {
  configPath: 'Notification',
  mixins: [config],
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      default: 'info',
      validator (value) {
        return ['info', 'success', 'error'].includes(value)
      }
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: null
    },
    to: {
      type: [String, Object],
      default: null
    }
  }
}
</script>
