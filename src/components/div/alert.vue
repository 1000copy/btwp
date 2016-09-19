<template>
  <!-- <btn type="warning" closeable>text here</alert> -->
  <div class="alert" :class="cc"  v-show="visible" >
    <button v-show="closeable" type="button" class="close" 
      v-on:click="close">
      <span >&times;</span>
    </button>
    <slot></slot>
  </div>
</template>

<script>
export default {
 props: {
    type: {
      type: String,
      require: true
    },
    closeable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close: function (event) { 
      this.visible = false
    }
  },
  data () {
    return {
      cc:{
        'alert-success': this.type=='success',
        'alert-info': this.type=='info',
        'alert-warning': this.type=='warning',
        'alert-danger': this.type=='danger'
      },
      visible:true
    }
  }

}
</script>

<style scoped>

</style>
