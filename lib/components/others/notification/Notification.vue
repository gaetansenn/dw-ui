<template>
  <div
    :class="config.wrapper"
    @mouseover="$emit('pause')"
    @mouseout="$emit('resume')"
    @click="to && $emit('close')"
  >
    <component :is="is" v-bind="bind" :class="component ? '' : config.fixed">
      <div :class="[config.type.classes, config.type.fixed]" v-html="config.type.icon" />
      <div :class="config.body.fixed">
        <p v-if="title" :class="config.body.title" v-html="title" />
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
    /* { name: String, bind: any } */
    component: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    to: {
      type: [String, Object],
      default: null
    }
  },
  computed: {
    bind () {
      if (this.component) return this.component.bind
      if (this.to) return { to: this.to }

      return {}
    },
    is () {
      return this.component?.name || (this.to ? 'NuxtLink' : 'div')
    }
  }
}
</script>
