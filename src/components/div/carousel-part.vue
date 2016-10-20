<template>
    <ol :class="cc" class="carousel-indicators" v-if="this.type=='indicators'">
       <slot></slot>
    </ol>   
    <div :class="cc" class='carousel-inner' v-if="this.type=='inner'"> 
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



