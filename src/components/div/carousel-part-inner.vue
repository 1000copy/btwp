<template>
  <div :class="cc" class='carousel-inner'> 
      <slot></slot>
  </div>
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



