
<script>
export default {
  render: function (createElement) {
    console.log(this.level)
    return createElement(
      'h' + this.level,   // tag name
      this.$slots.default // array of children
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }

}
</script>
<style scoped>

</style>

