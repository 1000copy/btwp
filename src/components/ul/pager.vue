<template>
 <ul class="pager">

   <slot></slot>
  </ul>
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
         
        }
      }
    } 
}
</script>

<style>
</style>


