<template>
<div >
  <slot></slot>
</div>
</template>
<script>



export default {
    components:{

    },
    render: function (createElement) {

        // var header = this.$slots.header
        var body   = this.$slots
        console.log(body)
        // var footer = this.$slots.footer
        return createElement('h3', "this.$slots.default")
    },
    props: {
        type: {
          type: String,
          require: false
        }
    },
    data () {
      return {
       
        cc:{
         
        }
      }
    }
    
}
//How to access item in <slot> inside v-for (vue.js)
</script>

<style>
</style>



