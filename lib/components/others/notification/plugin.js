import Vue from 'vue'

import Timer from '../../utils/timer'
import WrapperComponent from './NotificationWrapper'

const timeout = 5000
const notifications = []

export default function (ctx, inject) {
  if (process.server) return false

  const WrapperConstrutor = Vue.extend(WrapperComponent)

  const component = new WrapperConstrutor({ $dewib: ctx.$dewib, router: ctx.app.router, i18n: ctx.app.i18n, store: ctx.store, props: { notifications } }).$mount()

  // Bind notifications
  component.notifications = notifications

  const notification = {}
  const types = ['info', 'success', 'error']

  types.forEach((type) => {
    notification[type] = (notification) => {
      notification.id = Date.now().toString()
      notification.type = type
      const index = notifications.unshift(notification)

      if (!notification.to && !notification.keep)
        notification.timer = new Timer(() => {
          notifications.splice(index - 1, 1)
        }, notification.timeout || timeout)
    }
  })

  ctx.$notification = notification
  inject('notification', notification)

  return component.$el
}
