<template>
 <li class="pager">
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
          'previous': (this.type=='prev') 
          || (this.type=='') 
          || (this.type==undefined) 
          ,
          'next':this.type=='next'
        }
      }
    } 
}
</script>

<style>
</style>


