<template>
  <!-- <alert type="warning" closeable>text here</alert> -->
  <span class="label" :class="cc" >
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
        'label-success': this.type=='success',
        'label-info': this.type=='info',
        'label-warning': this.type=='warning',
        'label-danger': this.type=='danger',
        'label-primary': this.type=='primary',
        'label-default':this.type=='default',
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
