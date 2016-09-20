<template>
  <div class="well" :class="cc">
      <slot></slot>
  </div>
    

</template>

<script>

export default {
	props: {
	    size: {
	      type: String,
	      require: true
	    }
	},
 	data () {
      return {
        cc:{
          'well-lg': this.size=='large',
          'well-sm': this.size=='small'
        }
      }
    } 
}
</script>

<style>
</style>


