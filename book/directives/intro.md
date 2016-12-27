
#指令

本章将会详细讨论“指令”这一概念。指令是带有v-前缀的特殊HTML标签属性。指令的职责就是当其属性值改变时将某些行为应用到DOM上。这里提到的`将某些行为应用到DOM上`这句话，感觉是模糊不清的，这是因为不同的指令会应用不同的行为到DOM上，具体的行为只能个案分析。我们随后会有分析。

##概述

指令是扩展和复用代码的一种方式，比如指令v-text可以用属性值设置元素的内容：

    <span v-text="value"></span>

可执行的代码为：

	<script src="https://unpkg.com/vue/dist/vue.js"></script>
	<div id="app">
	  <span v-text="value"></span>
	</div>
	<script>
	  var a= new Vue({
	    el: '#app',
	    data(){
	      return {
	        value:42
	      }
	    }
	  })
	</script> 

回到我们提到的`相应地将某些行为应用到DOM上`，v-text应用了什么行为到DOM上呢？

我们来具体分析：当value修改时v-text会修改当前所在元素的内容，这就是v-text的`某些应用到DOM的行为`。再以v-bind为例说明，此案例会把value和url的href属性绑定起来：

	<script src="https://unpkg.com/vue/dist/vue.js"></script>
	<div id="app">
	  <a v-bind:href="value">url</span>
	</div>
	<script>
	  var a= new Vue({
	    el: '#app',
	    data(){
	      return {
	        value:'http://t.cn/#42'
	      }
	    }
	  })
	</script> 

指令v-bind会在绑定的属性值修改时同步修改由参数（href）指定的属性。

指令是有格式的：

1. 指令能接受一个参数，在指令后以“:”指明。
2. 指令能接受一个或者多个修饰符，是以“.”指明的特殊后缀
3. 指令能接受一个单一JavaScript表达式，最常见的表达式就是一个属性值

Vue内置的v-on指令可以探讨指令格式的一个不错的案例。v-on可以声明式的把Vue实例方法挂接到DOM标签的事件上，比如：

	<script src="https://unpkg.com/vue/dist/vue.js"></script>
	<div id="app" @click="t1" >
	    <a href="http://t.cn" v-on:click.prevent.stop="t2">t.cn</span>
	</div>
	<script>
	var app = new Vue({
	  methods: {
	    t1 () {console.log("t1")},
	    t2 () {console.log("t2")},
	  }
	})
	app.$mount('#app')
	</script>

此案例中，v-on对照我们的格式：

1. 接受一个参数。参数在这里为click
2. 接受一个或者多个修饰符。这里的修饰符为prevent、stop
3. 接受一个表达式。这里的表达式为t2。

此指令的语义就是把onclick事件绑定到t2方法上。特别对此处的修饰符做具体的说明：

1. 修饰符prevent等同于执行preventDefault方式，意思是阻止默认行为，这里默认行为是URL被点击后会在浏览器内打开此URL
2. 修饰符stop等同于执行stopPropagation，意思是停止扩散，这里停止的是向上一级元素的扩散，因此div内的t1事件并不会被执行

##简写

Vue.js为两个最为常用的指令提供了特别的缩写：

v-bind：

	<a v-bind:href="url"></a>

v-bind简写：

	<a :href="url"></a>

v-on：

	<a v-on:click="doSomething"></a>

v-on缩写使用@符号：

	<a @click="doSomething"></a>

简写语法是完全可选的，但是极为方便并且简洁。




