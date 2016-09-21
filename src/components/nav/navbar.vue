<template>
	<nav class="navbar" :class="cc">
		<slot></slot>
	</nav>
</template>

<script>

export default {
  ready () {
   
  },
	props: {
	    type: {
	      type: String,
	      require: true
	    }
	},
 	data () {
      return {
         cc:{
          'nav-pills': (this.type=='pill') 
          ,
          'nav-tabs':this.type=='tab'  || (this.type=='') 
          || (this.type==undefined) 
        }
      }
    } 
}
</script>

<style>
</style>



