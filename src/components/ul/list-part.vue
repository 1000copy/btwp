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
	    },
      context:{
        type:String,
        require:false
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
          'list-group-item-success':this.context =="success",
          'list-group-item-info':this.context =="info",
          'list-group-item-danger':this.context =="danger",
          'list-group-item-warning':this.context =="warning",
          'list-group-item-primary':this.context =="primary"
        }
      }
    } 
}
</script>

<style>
</style>


