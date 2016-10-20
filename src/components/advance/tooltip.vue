<template>
    <a  data-toggle="tooltip" data-placement="{direction}" title="title">
      <slot></slot>
    </a>
</template>

<script>

export default {
  mounted () {
    $('[data-toggle="tooltip"]').tooltip();  
  },
    props: {
        content: {
          type: String,
          require: true
        },
        direction:{
          type:String,
          require:true
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



