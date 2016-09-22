<template>
  <!-- <alert type="warning" closeable>text here</alert> -->
  <img class="img-circle" alt="fist">
  </img>
</template>

<script>
export default {
 props: {
    type: {
      type: String,
      require: true
    }
  },
  ready(){
  	// console.log(this.type,this.src)
  },
  data () {
    // console.log(this.closeable)
    return {
      cc:{
       'img-rounded': this.type=='round' || this.type ==undefined,
       'img-circle' : this.type=='circle' ,
       'img-thumbnail' : this.type=='thumbnail' ,
       
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>




