<template>
  <div :class="cc" class='item' > 
        <img :src="src" >
  </div>
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
        // index: {
        //   type: Number,
        //   require: true
        // },
        // type: {
        //   type: String,
        //   require: true
        // },
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



