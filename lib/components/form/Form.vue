<template>
  <form novalidate @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<script>
import mixin from './Form.mixin'

export default {
  mixins: [mixin],
  props: {
    form: {
      type: Object,
      required: true
    },
    submit: {
      type: Function,
      required: true
    }
  },
  methods: {
    onSubmit () {
      // Inject $refs from children components
      this.$refs = this.$children.reduce((accu, children) => {
        if (children.name) accu[children.name] = children

        return accu
      }, {})

      const validate = this.validate()

      if (validate) this.submit()
    }
  }
}
</script>
