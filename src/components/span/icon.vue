<template>
  <!-- <alert type="warning" closeable>text here</alert> -->
  <span  class="glyphicon glyphicon-home"  >
    <slot></slot>
  </span>
</template>

<script>
export default {
 props: {
    type: {
      type: String,
      require: true
    }
  },
  data () {
    // console.log(this.closeable)
    return {
      cc:{
        'glyphicon-home': this.type=='home'
      }
    }
  }

}
</script>
<style scoped>

</style>
