<template>
	<span class="badge">
		<slot></slot>
	</span>
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



