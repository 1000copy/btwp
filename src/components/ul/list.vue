<template>
    <ul :class="cc">
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
          'list-inline': this.type=='inline',
          'list-group': this.type=='group',
        }
      }
    } 
}
</script>

<style>
</style>


