<script>
export default {
  props: {
    template: {
      type: String,
      required: true
    }
  },
  render (h) {
    return h({ template: this.template })
  }
}
</script>
