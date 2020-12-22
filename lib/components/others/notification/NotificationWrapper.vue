<template>
  <DwConfigTransition type="transition-group" :class="config.fixed" :config="config.transition" tag="div">
    <DwNotification
      v-for="notification in notifications"
      :key="notification.id"
      class="mb-3"
      v-bind="notification"
      @close="remove(notification)"
      @resume="resume(notification)"
      @pause="pause(notification)"
    />
  </DwConfigTransition>
</template>

<script>
import config from '../../config.mixin'

export default {
  configPath: 'NotificationWrapper',
  mixins: [config],
  props: {
    notifications: {
      type: Array,
      required: true
    }
  },
  methods: {
    remove ({ timer, id }) {
      timer && timer.stop()
      this.notifications.splice(this.notifications.findIndex(notification => notification.id === id), 1)
    },
    resume ({ timer, id }) {
      timer && timer.resume()
    },
    pause ({ timer, id }) {
      timer && timer.pause()
    }
  }
}
</script>
