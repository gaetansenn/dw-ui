<script type="module">
import { addClass, removeClass } from '../utils/dom'

import config from '../config.mixin'

const transition = function () {
  const context = {
    beforeEnter (el) {
      addClass(el, ...this.config.beforeEnter.split(' '))
      if (!el.dataset) el.dataset = {}

      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom

      el.style.height = '0'
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },
    enter (el) {
      el.dataset.oldOverflow = el.style.overflow
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px'
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      } else {
        el.style.height = ''
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }

      el.style.overflow = 'hidden'
    },
    afterEnter (el) {
    // for safari: remove class then reset height is necessary
      removeClass(el, ...this.config.afterEnter.split(' '))
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
    },
    beforeLeave (el) {
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow

      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    },
    leave (el) {
      if (el.scrollHeight !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
        addClass(el, ...this.config.leave.split(' '))
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      }
    },
    afterLeave (el) {
      removeClass(el, ...this.config.afterLeave.split(' '))
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }
  }

  // Bind context
  Object.keys(context).forEach((key) => {
    context[key] = context[key].bind(this)
  })

  return context
}

export default {
  configPath: 'Transitions.Collapse',
  name: 'DwCollapseTransition',
  mixins: [config],
  render (h) {
    const data = {
      on: transition.call(this)
    }

    return h('transition', data, this.$slots.default)
  }
}
</script>
