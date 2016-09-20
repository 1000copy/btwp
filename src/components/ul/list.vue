<template>
    <ul :class="cc">
      <slot></slot>
    </ul>
</template>

<script>

export default {
  ready () {
    return
    if (this.type == "group"){
      // 动态改class，就是不能在UI上生效。奇怪！
      var nodes1 = this
      console.log(nodes1)
      console.log(this.$el)
      var nodes = this._slotContents.default.children
      for (var i= 0 ;i<nodes.length ;i++){
        var n = nodes[i]
        var a = n.getAttribute("class")
        console.log(a)
      }
      for (var i= 0 ;i<nodes.length ;i++){
        var n = nodes[i]
        n.setAttribute("class","list-group-item")
      }
      for (var i= 0 ;i<nodes.length ;i++){
        var n = nodes[i]
        var a = n.getAttribute("class")
        console.log(a)
      }
    }
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
          'list-inline': this.type=='inline',
          'list-group': this.type=='group',
        }
      }
    } 
}
</script>

<style>
</style>


