<template>
  <div :class="config.wrapper">
    <slot v-if="scrollPosition > scrollStart" name="prev" :prev="prev">
      <div :class="config.navigation.prev.wrapper" @click="prev">
        <div :class="config.navigation.prev.fixed" v-html="config.navigation.prev.icon" />
      </div>
    </slot>
    <div ref="content" :class="config.fixed" @scroll="onScroll">
      <slot name="default" />
    </div>
    <slot v-if="scrollPosition !== scrollMax" name="next" :next="next">
      <div :class="config.navigation.next.wrapper" @click="next">
        <div :class="config.navigation.next.fixed" v-html="config.navigation.next.icon" />
      </div>
    </slot>
  </div>
</template>

<script>
import config from '../config.mixin'

export default {
  configPath: 'ScrollWrapper',
  mixins: [config],
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      index: this.activeIndex,
      positions: [],
      scrollable: false,
      scrollPosition: 0,
      scrollStart: 0,
      scrollMax: 0,
      parentWidth: 0
    }
  },
  mounted () {
    // Disable if not scrollable
    this.scrollable = (this.$refs.content.offsetWidth !== this.$refs.content.scrollWidth)

    if (!this.scrollable) return

    this.scrollMax = this.$refs.content.scrollWidth - this.$refs.content.clientWidth
    this.parentWidth = this.$refs.content.offsetWidth
    this.positions = this.$slots.default.map(children => ({
      offset: children.elm.offsetLeft,
      width: children.elm.offsetWidth
    })).reduce((accu, item, index, origin) => {
      accu.push({
        from: item.offset,
        to: index !== origin.length - 1 ? origin[index + 1].offset - 1 : item.offset + item.width
      })

      return accu
    }, []).filter(item => item.to <= this.parentWidth)

    this.scrollStart = this.positions[0].from

    // Scroll to index
    if (this.index) this.$el.scrollTo(this.index)
  },
  methods: {
    onScroll (event) {
      this.scrollPosition = event.target.scrollLeft
      // Find index according to scroll value
      const index = this.positions.findIndex((value) => {
        return value.from <= event.target.scrollLeft && event.target.scrollLeft <= value.to
      })

      if (index === -1 && event.target.scrollLeft < this.positions[0].from) this.index = 0
      else this.index = index !== -1 ? index : this.positions.length - 1
    },
    scrollToIndex (index) {
      if (!this.scrollable) return true

      this.$nextTick(() => {
        this.$refs.content.scrollTo({
          left: index > this.positions.length - 1 ? this.positions[this.positions.length - 1].to + 10000 : this.positions[index].from,
          behavior: 'smooth'
        })
      })

      return true
    },
    prev () {
      this.scrollToIndex(this.index ? this.index - 1 : 0)
    },
    next () {
      this.scrollToIndex(this.index + 1)
    }
  }
}
</script>
