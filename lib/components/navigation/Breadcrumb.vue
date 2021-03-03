<template>
  <div :class="config.wrapper">
    <div v-for="(item, index) in newItems" :key="index" :class="index === newItems.length - 1 ? config.item.active : config.item.class">
      <div v-if="item.separator" :class="config.item.separator">
        <div v-html="config.separator" />
      </div>
      <component :is="item.is" v-else v-bind="item.bind">
        {{ item.label }}
      </component>
    </div>
  </div>
</template>

<script>
import config from '../config.mixin'
import BreadcrumbProps from './Breadcrumb.props'

export default {
  configPath: 'Breadcrumb',
  mixins: [config],
  props: {
    ...BreadcrumbProps
  },
  computed: {
    newItems () {
      return this.items.reduce((accu, current, index) => {
        const item = {}

        if (current.href) {
          item.is = 'a'
          item.bind = {
            href: current.href,
            target: current.target
          }
        } else if (current.to) {
          item.is = 'nuxt-link'
          item.bind = {
            to: current.to
          }
        } else item.is = 'div'

        item.label = typeof current === 'string' ? current : current.label

        accu.push(item)

        if (index !== this.items.length - 1) accu.push({
          separator: true
        })

        return accu
      }, [])
    }
  }
}
</script>
