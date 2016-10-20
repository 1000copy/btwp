<template>
    <div class="form-group">
        <label >{{label}}</label>
        <input :type="type" class="form-control">
    </div>
        
</template>

<script>
export default {
    components:{
    },
    props: {
        type: {
          type: String,
          require: true
        },
        label: {
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