<template>
  <div class="panel" :class="cc">
  <!--     <slot name="header"></slot>
      <slot name="body"></slot>
      <slot name="footer"></slot> -->
      <slot ></slot>
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
        'panel-default': this.type=='default',
        'panel-primary': this.type=='primary',
        'panel-success': this.type=='success',
        'panel-info': this.type=='info',
        'panel-warning': this.type=='warning',
        'panel-danger': this.type=='danger'
      },
      header:true,
      footer:true
    }
  }

}
</script>

<style scoped>

</style>
