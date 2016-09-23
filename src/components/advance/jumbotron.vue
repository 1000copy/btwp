<template>
   <div class="jumbotron">
        <div class="container">
           <slot></slot>
        </div> 
    </div>
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
         
        }
      }
    } 
}
</script>

<style>
</style>