<script>
import config from '../config.mixin'
import HrefProps from '../href.props'
import ToProps from '../to.props'
import CardProps from './Card.props'

export default {
  configPath: 'Card',
  mixins: [config],
  props: {
    ...CardProps,
    ...HrefProps,
    ...ToProps
  },
  data () {
    return {
      opened: false
    }
  },
  computed: {
    is () {
      if (this.href)
        return 'a'
      else if (this.to)
        return 'nuxt-link'

      return this.submit ? 'form' : 'div'
    },
    bind () {
      switch (this.is) {
        case 'a':
          return {
            domProps: {
              href: this.href,
              target: this.target
            }
          }
        case 'nuxt-link': {
          return {
            props: {
              to: this.to
            }
          }
        }
        case 'form': {
          return {
            domProps: {
              novalidate: true
            },
            on: {
              submit: (event) => {
                this.submit()
                event.preventDefault()
              }
            }
          }
        }
        default: {
          return {}
        }
      }
    }
  },
  render (h) {
    const childrens = []
    const content = {
      class: [this.config.content.fixed, this.config.content.classes]
    }

    if (this.header || this.$slots.header) {
      const headerChildrens = []

      if (this.$slots.header) headerChildrens.push(this.$slots.header)
      else headerChildrens.push(this.header)
      if (this.collapse) headerChildrens.push(h('div', {
        class: [this.config.header.icon.fixed, this.config.header.icon.classes],
        domProps: { innerHTML: this.config.header.icon.icon }
      }))

      childrens.push(h('div', {
        class: [this.config.header.fixed, this.config.header.classes],
        on: {
          click: () => {
            this.opened = !this.opened
          }
        }
      }, headerChildrens))
    }

    if (this.collapse)
      childrens.push(h('DwCollapseTransition', [h('div', {
        directives: [{
          name: 'show',
          rawName: 'v-show',
          value: (this.opened),
          expression: 'opened'
        }],
        ...content
      }, [this.$slots.default])]))
    else
      childrens.push(h('div', content, [this.$slots.default]))

    if (this.$slots.footer) childrens.push(h('div', {
      class: [this.config.footer.fixed, this.config.footer.classes]
    }, [this.$slots.footer]))

    return h(this.is, {
      ...this.bind,
      class: this.config.fixed
    }, childrens)
  }
}
</script>
