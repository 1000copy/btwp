<template>
  <!-- <alert type="warning" closeable>text here</alert> -->
  <img :class="cc" alt="fist">
  </img>
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
    return {
      cc:{
       'img-rounded': this.type=='round' || this.type ==undefined,
       'img-circle' : this.type=='circle' ,
       'img-thumbnail' : this.type=='thumbnail' ,
       
      }
    }
  }

}
</script>
<style scoped>

</style>




