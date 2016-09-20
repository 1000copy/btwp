<template>
 <ul class="pagination" :class="cc">
   <slot></slot>
  </ul>
</template>

<script>

export default {
  ready () {
   
  },
	props: {
      size:{
        type:String,
        require:false
      }
	},
 	data () {
      return {
        cc:{
         'pagination-sm': (this.size=='small') 
          || (this.size=='') 
          || (this.size==undefined) 
          ,
          'pagination-lg':this.size=='large'
        }
      }
    } 
}
</script>

<style>
</style>


