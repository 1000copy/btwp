<template>
   <div class="dropdown">
      <a href="#" data-toggle="dropdown" class="dropdown-toggle">Dropdown <b class="caret"></b></a>
      <ul class="dropdown-menu">
        <slot></slot>
      </ul>
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



