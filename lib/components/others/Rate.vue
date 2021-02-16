<template>
  <div :class="config.wrapper">
    <div
      v-for="(star, index) in stars"
      :key="index"
      :class="[config.fixed, config.classes, config.size]"
      @mouseover="onHover(index)"
      @mouseleave="onBlur(index)"
      @click="!readonly && $emit('input', index + 1)"
      v-html="config.icon[star]"
    />
  </div>
</template>

<script>
import Timer from '../utils/timer'
import SizeProps from '../size.props'
import config from '../config.mixin'
import localProp from '../utils/localProp'

export default {
  configPath: 'Rate',
  mixins: [config, localProp('value')],
  props: {
    value: {
      type: Number,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    ...SizeProps
  },
  data () {
    return {
      timer: false
    }
  },
  computed: {
    stars () {
      return Array.from(Array(5).keys()).map((index) => {
        if (Math.floor(this.localValue) === index && this.localValue - Math.floor(this.localValue) !== 0)
          return 'half'

        return (this.localValue >= index + 1) ? 'full' : 'empty'
      })
    }
  },
  methods: {
    onHover (index) {
      if (!this.readonly) {
        if (this.timer) {
          this.timer.stop()
          this.timer = false
        }
        this.localValue = index + 1
      }
    },
    onBlur () {
      if (!this.readonly)
        if (!this.timer) this.timer = new Timer(() => {
          this.localValue = this.value
        }, 150)
    }
  }
}
</script>
