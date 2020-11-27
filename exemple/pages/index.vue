<template>
  <div>
    <dw-input-text
      ref="input"
      v-model="value"
      label="Label is"
      help="this is help content"
      :name="name"
      required
    />
    <button class="mt-10" @click="validate">
      Validation
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'test',
      value: '',
      validation: null
    }
  },
  methods: {
    validate () {
      this.$refs.input.validate()
    }
  }
}
</script>
