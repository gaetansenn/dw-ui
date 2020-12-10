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
    return h(this.is, {
      ...this.bind,
      class: this.config.fixed
    }, this.$slots.default)
  }
}
</script>
