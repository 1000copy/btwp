<template>
  <ol :class="cc" class="carousel-indicators">
     <slot></slot>
  </ol>      
</template>

<script>

export default {
    props: {
        type: {
          type: String,
          require: false
        }
    },
    data () {
      return {
        cc:{
          // 'carousel-indicators':this.type=='indicators',
          // 'carousel-inner':this.type=='inner'
        }
      }
    }
}
</script>

<style>
</style>



