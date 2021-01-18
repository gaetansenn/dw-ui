<template>
  <DwConfigTransition appear :config="config.overlay.transition">
    <div
      v-show="open"
      :class="config.overlay.fixed"
      tabindex="0"
    >
      <div :class="config.wrapper">
        <div :class="config.backdrop.wrapper">
          <div :class="config.backdrop.fixed" @click="open = false" />
        </div>
        <DwConfigTransition appear :config="config.modal.transition">
          <div v-show="open" :class="config.modal.wrapper">
            <DwCard :submit="submit" config-path="Modal.Card">
              <template v-if="this.$scopedSlots.header" #header>
                <slot name="header" />
              </template>
              <template v-else-if="title || closeButton" #header>
                <slot name="header">
                  <div v-if="title" :class="config.modal.header.fixed">
                    {{ title }}
                  </div>
                  <div v-else>
                    &nbsp;
                  </div>
                  <button
                    v-if="closeButton"
                    :class="config.modal.header.icon.fixed"
                    aria-label="close"
                    @click="open = false"
                    v-html="config.modal.header.icon.icon"
                  />
                </slot>
              </template>
              <slot />
              <template v-if="$slots.footer" #footer>
                <slot name="footer" />
              </template>
            </DwCard>
          </div>
        </DwConfigTransition>
      </div>
    </div>
  </DwConfigTransition>
</template>

<script>
import config from '../config.mixin'

export default {
  configPath: 'Modal',
  name: 'DwModal',
  mixins: [config],
  props: {
    title: {
      type: String,
      default: null
    },
    /**
     * Display close button
     */
    closeButton: {
      type: Boolean,
      default: true
    },
    value: {
      type: Boolean,
      default: false
    },
    submit: {
      type: Function,
      default: null
    }
  },
  computed: {
    open: {
      get () {
        if (process.server) return this.value
        // // Change body attr
        if (this.value) document.body.classList.add('overflow-hidden')
        else document.body.classList.remove('overflow-hidden')

        return this.value
      },
      set (open) {
        if (!open) this.$emit('close')

        this.$emit('input', open)
      }
    }
  }
}
</script>
