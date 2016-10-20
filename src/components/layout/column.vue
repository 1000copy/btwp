<template>
  <div :class="cc">
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
    var delim = ' '
    var arr = this.type.split(delim)
    for(var i=0;i<arr.length;i++){
      arr[i] = 'col-'+arr[i] 
    }
    var v = arr.join(delim)
    return {
      cc:v
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
