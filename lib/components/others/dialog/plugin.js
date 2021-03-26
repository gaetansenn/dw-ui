import Vue from 'vue'
import DialogComponent from './Dialog'

export default function (ctx, inject) {
  if (process.server) return false

  const DialogConstrutor = Vue.extend(DialogComponent)
  // See i18n workaround here: https://github.com/kazupon/vue-i18n/issues/276#issuecomment-359009223
  const vm = new DialogConstrutor({ $dewib: ctx.$dewib, i18n: ctx.app.i18n, ctx }).$mount()

  // { title, body, submit, onClose, onSubmit }
  const instance = function (context) {
    Object.assign(vm, context)

    // Overide onClose/onSubmit if not provided
    if (context && !context.onClose) vm.onClose = null
    if (context && !context.onSubmit) vm.onSubmit = null

    vm.ongoing = {
      submit: false,
      cancel: false
    }
    vm.opened = true

    return vm
  }

  ctx.$dialog = instance
  inject('dialog', instance)

  return vm
}
