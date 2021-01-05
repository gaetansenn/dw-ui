<template>
  <div v-show="active">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DwTabPane',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    active () {
      const active = this.$parent.currentName === this.name

      return active
    }
  }
}
</script>
