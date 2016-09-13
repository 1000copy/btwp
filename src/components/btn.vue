<template>
  <!-- <alert type="warning" closeable>text here</alert> -->
  <button class="btn" :class="cc" >
    <slot></slot>
  </div>
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
        'btn-success': this.type=='success',
        'btn-info': this.type=='info',
        'btn-warning': this.type=='warning',
        'btn-danger': this.type=='danger',
        'btn-primary': this.type=='primary',
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
