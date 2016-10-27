<template>
    <li data-target="#myCarousel" :data-slide-to="index" :class="cc"></li>        
</template>

<script>

export default {
    mounted () {
      if (this.type == undefined || this.type =='')
        this.type = 'image'
    },
    props: {
        active: {
          type: Boolean,
          require: false
        },
        index: {
          type: Number,
          require: true
        },
        type: {
          type: String,
          require: false
        },
        src: {
          type: String,
          require:false
        }
    },
    data () {
      return {
        cc:{
          'active':this.active
        }
      }
    } 
}
</script>

<style>
</style>



