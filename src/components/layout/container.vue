<template>
  <nav class="container">
      <slot></slot>
  </nav> 
  <!-- <button class="btn" :class="cc">
    <slot></slot>
  </div> -->
</template>

<script>
export default {
 props: {
    type: {
      type: String,
      require: true
    },
    span: {
      type: Number,
      require: false
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
