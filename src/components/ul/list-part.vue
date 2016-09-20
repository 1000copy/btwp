<template>
    <li :class="cc">
      <slot></slot>
    </li>
</template>

<script>

export default {
	props: {
	    type: {
	      type: String,
	      require: false
	    }
	},
 	data () {
      return {
        cc:{
          'list-group-item': (this.type=='vested') 
          || (this.type=='') 
          || (this.type==undefined) 
          ,
          '':this.type=='naked',
        }
      }
    } 
}
</script>

<style>
</style>


