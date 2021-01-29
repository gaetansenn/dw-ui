<template>
  <div>
    <div ref="text" :class="config.fixed" class="dw-truncate-text" :style="!opened ? `-webkit-line-clamp: ${lines}`: ''">
      <slot>
        {{ text }}
      </slot>
    </div>
    <div v-if="more" :class="config.action" @click="toggle">
      <slot :opened="opened" name="more">
        {{ opened ? seeLessLabel : seeMoreLabel }}
      </slot>
    </div>
  </div>
</template>

<script>
import i18n from '../utils/i18n'
import config from '../config.mixin'
import TruncateText from './TruncateText.props'

// TODO: add animation for collapse https://medium.com/@jonaskkristensen/toggle-read-more-less-with-line-clamps-and-keyframes-20fdde9c9fa8

export default {
  configPath: 'TruncateText',
  mixins: [i18n, config],
  props: {
    ...TruncateText
  },
  data () {
    return {
      more: false,
      opened: false
    }
  },
  computed: {
    seeLessLabel () {
      return this.seeLess || this.translate('TruncateText.seeLess')
    },
    seeMoreLabel () {
      return this.seeMore || this.translate('TruncateText.seeMore')
    }
  },
  mounted () {
    if (this.expandable) {
      const elm = this.$refs.text

      if (elm.scrollHeight > elm.getBoundingClientRect().height) this.more = true
    }
  },
  methods: {
    toggle () {
      this.opened = !this.opened
    }
  }
}
</script>

<style>
.dw-truncate-text {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
</style>
