<template>
  <div :class="config.wrapper">
    <slot v-if="index" name="prev" :prev="prev">
      <div :class="config.navigation.prev.wrapper" @click="prev">
        <div :class="config.navigation.prev.fixed" v-html="config.navigation.prev.icon" />
      </div>
    </slot>
    <div ref="content" :class="config.fixed">
      <slot name="default" />
    </div>
    <slot v-if="index < positions.length - 1" name="next" :next="next">
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
      positions: []
    }
  },
  mounted () {
    // Disable if not scrollable
    if (this.$refs.content.offsetWidth === this.$refs.content.scrollWidth) return

    const parentWidth = this.$el.offsetWidth
    this.positions = this.$slots.default.map(children => ({
      offset: children.elm.offsetLeft,
      width: children.elm.offsetWidth
    })).reduce((accu, item, index, origin) => {
      accu.push({
        from: item.offset,
        to: index !== origin.length - 1 ? origin[index + 1].offset - 1 : item.offset + item.width
      })

      return accu
    }, []).filter(item => item.to <= parentWidth)

    // Scroll to index
    if (this.index) this.$el.scrollTo(this.index)

    // Update current index according to scroll x position
    this.$refs.content.addEventListener('scroll', (event) => {
      // Find index according to scroll value
      const index = this.positions.findIndex((value) => {
        return value.from <= event.target.scrollLeft && event.target.scrollLeft <= value.to
      })

      this.index = index !== -1 ? index : this.positions.length - 1
    })
  },
  methods: {
    scrollToIndex (index) {
      if (this.positions.length - 1 < index) return

      this.$refs.content.scrollTo({
        left: index > this.positions.length - 1 ? this.positions[this.positions.length - 1].to + 10000 : this.positions[index].from,
        behavior: 'smooth'
      })
    },
    prev () {
      if (this.index !== 0) {
        this.index--
        this.scrollToIndex(this.index)
      }
    },
    next () {
      if (this.index + 1 < this.positions.length) {
        this.index++
        this.scrollToIndex(this.index)
      }
    }
  }
}
</script>
