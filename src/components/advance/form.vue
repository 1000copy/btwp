<template>
    <form :class="cc"> 
        <slot></slot>
    </form>
</template>

<script>

export default {
    components:{
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
            'form-vertical':this.type=='vertical',
            'form-inline':this.type=='inline'
        }
      }
    } 
}
</script>

<style>
</style>