<template>
  <div>
    <span>{{count}}</span>
    <button v-on:click="inc">+</button>
  </div>
</template>
<script>
export default {
   data () {
      return {count: 0}
    },
    methods: {
      inc () {this.count++}
    }
}
</script>  
<style scoped>
  span{color:red}
</style>