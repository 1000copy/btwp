<template>
  <div :class="cc">
    <slot></slot>
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
          'panel-heading': this.type=='header',
          'panel-body': this.type=='body',
          'panel-footer': this.type=='footer'
        }
      }
    }

  }
</script>

<style scoped>

</style>
