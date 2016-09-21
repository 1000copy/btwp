<template>
  <ul class="nav" :class="cc">
    	<slot></slot>

    </ul>

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



