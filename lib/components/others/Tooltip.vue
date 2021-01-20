<template>
  <span
    v-click-away="{
      exclude: [],
      handler: 'close'
    }"
    :class="config.wrapper"
    @mouseenter="event === 'hover' && toggle(true)"
    @mouseleave="event === 'hover' && toggle(false)"
  >
    <span ref="content" @click="event === 'click' && toggle(!active)">
      <!-- @slot default wrapped tooltip content -->
      <slot />
    </span>
    <DwFadeTransition>
      <div
        v-if="!disabled && active"
        ref="tooltip"
        :style="style.body"
        :class="config.content.overlay"
        @mouseenter="event === 'hover' && toggle(true)"
        @mouseleave="event === 'hover' && toggle(false)"
      >
        <div :class="config.content.wrapper">
          <div :class="config.content.body">
            <!-- @slot slot to overide content from content prop -->
            <slot name="content">
              {{ content }}
            </slot>
          </div>
          <div :class="config.content.arrow.shadow" :style="style.arrow" />
          <div :class="config.content.arrow.fixed" :style="style.arrow" />
        </div>
      </div>
    </DwFadeTransition>
  </span>
</template>

<script>
import ClickAway from '../directives/click-away'
import config from '../config.mixin'

const mappingBody = {
  top (content, tooltip, arrowSize) {
    return {
      left: `-${(tooltip.width / 2) - (content.width / 2)}px`,
      top: `-${tooltip.height + arrowSize}px`
    }
  },
  topRight (content, tooltip, arrowSize) {
    return {
      right: 0,
      top: `-${tooltip.height + arrowSize}px`
    }
  },
  right (content, tooltip, arrowSize) {
    return {
      top: `${-(tooltip.height / 2) + (content.height)}px`,
      left: `${content.width + arrowSize}px`
    }
  },
  bottomRight (content, tooltip, arrowSize) {
    return {
      right: 0,
      bottom: `-${tooltip.height + arrowSize}px`
    }
  },
  bottom (content, tooltip, arrowSize) {
    return {
      left: `-${(tooltip.width / 2) - (content.width / 2)}px`,
      bottom: `-${tooltip.height + arrowSize}px`
    }
  },
  bottomLeft (content, tooltip, arrowSize) {
    return {
      left: 0,
      bottom: `-${tooltip.height + arrowSize}px`
    }
  },
  left (content, tooltip, arrowSize) {
    return {
      top: `${-(tooltip.height / 2) + (content.height)}px`,
      right: `${content.width + arrowSize}px`
    }
  },
  topLeft (content, tooltip, arrowSize) {
    return {
      left: 0,
      top: `-${tooltip.height + arrowSize}px`
    }
  }
}

const mappingArrow = {
  top (content, tooltip, arrowSize) {
    return {
      width: `${arrowSize}px`,
      height: `${arrowSize}px`,
      right: `calc(${tooltip.width / 2}px - ${arrowSize / 2}px`,
      bottom: `calc(-${arrowSize}px / 2)`
    }
  },
  topRight (content, tooltip, arrowSize) {
    return {
      width: `${arrowSize}px`,
      height: `${arrowSize}px`,
      right: `calc(${content.width / 2}px - ${arrowSize / 2}px)`,
      bottom: `calc(-${arrowSize}px / 2)`
    }
  },
  right (content, tooltip, arrowSize) {
    return {
      width: `${arrowSize}px`,
      height: `${arrowSize}px`,
      left: `-${arrowSize / 2}px`,
      top: `calc(${tooltip.height / 2}px - ${arrowSize / 2}px)`
    }
  },
  bottomRight (content, tooltip, arrowSize) {
    return {
      width: `${arrowSize}px`,
      height: `${arrowSize}px`,
      right: `calc(${content.width / 2}px - ${arrowSize / 2}px)`,
      top: `calc(-${arrowSize}px / 2)`
    }
  },
  bottom (content, tooltip, arrowSize) {
    return {
      width: `${arrowSize}px`,
      height: `${arrowSize}px`,
      right: `calc(${tooltip.width / 2}px - ${arrowSize / 2}px`,
      top: `calc(-${arrowSize}px / 2)`
    }
  },
  bottomLeft (content, tooltip, arrowSize) {
    return {
      width: `${arrowSize}px`,
      height: `${arrowSize}px`,
      left: `calc(${content.width / 2}px - ${arrowSize / 2}px)`,
      top: `calc(-${arrowSize}px / 2)`
    }
  },
  left (content, tooltip, arrowSize) {
    return {
      width: `${arrowSize}px`,
      height: `${arrowSize}px`,
      right: `-${arrowSize / 2}px`,
      top: `calc(${tooltip.height / 2}px - ${arrowSize / 2}px)`
    }
  },
  topLeft (content, tooltip, arrowSize) {
    return {
      width: `${arrowSize}px`,
      height: `${arrowSize}px`,
      left: `calc(${content.width / 2}px - ${arrowSize / 2}px)`,
      bottom: `calc(-${arrowSize}px / 2)`
    }
  }
}

export default {
  configPath: 'Tooltip',
  directives: {
    'click-away': ClickAway
  },
  mixins: [config],
  props: {
    /**
     * Event to display
     *
     * `click, hover`
     */
    event: {
      type: String,
      default: 'click',
      validation: value => ['click', 'hover'].includes(value)
    },
    /**
     * Disable tooltip
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Where tooltip is positioned
     *
     * `top, topRight, right, left, bottom, bottomRight`
     */
    position: {
      type: String,
      default: 'top',
      validation: value => ['top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left', 'topLeft']
    },
    /**
     * Content to display in tooltip
     */
    content: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      timer: false,
      active: false,
      style: {
        body: false,
        arrow: false
      }
    }
  },
  methods: {
    close () {
      this.toggle(false)
    },
    toggle (value) {
      if (this.disabled) return false

      const change = (active) => {
        if (active)
          this.$nextTick(() => {
            const content = this.$refs.content.getBoundingClientRect()
            const tooltip = this.$refs.tooltip.getBoundingClientRect()

            this.style.body = mappingBody[this.position](content, tooltip, this.config.content.arrow.size)
            this.style.arrow = mappingArrow[this.position](content, tooltip, this.config.content.arrow.size)
          })
        else {
          this.style.body = false
          this.style.arrow = false
        }
      }

      if (this.timer) clearTimeout(this.timer)
      if (value) {
        this.active = true

        change(true)
      } else this.timer = setTimeout(() => {
        this.active = false

        change(false)
      }, this.toggle === 'hover' ? 500 : 0)
    }
  }
}
</script>
