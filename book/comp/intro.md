
#组件

Vue.js引入的组件让分解单一HTML到独立组件成为可能。组件可以`自定义元素`形式使用，或者使用原生元素但是以is特性做扩展。

##注册和引用

使用组件之前，首先需要注册。可以注册为全局的或者是局部的。全局注册可以使用:

    Vue.component(tag, options)

注册一个组件。tag为`自定义元素`的名字，options同为创建组件的选项。注册完成后，即可以`<tag>`形式引用此组件。如下是一个完整可运行的案例：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <tag></tag>  
    </div>
    <script>
      Vue.component('tag', {
        template: `<div>one component rule all other<div>`
      })
      new Vue({
        el: "#app"
      });
    </script>

你也可以局部注册，这样注册的组件，仅仅限于执行注册的Vue实例内：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <tag></tag>  
    </div>
    <script>
       var tag = {
          template: `<div>one component rule all other<div>`
        }
        new Vue({
          el: "#app",
          components: {tag}
      });
    </script>

我们注意到，`<tag>`是HTML本身并不具备的标签，现在因为Vue的组件技术由此引入的，因此被称为是`自定义标签`。这些自定义标签的背后实现常常是标签、脚本、css的集合体。它的内部可以非常复杂，但是对外则以大家习惯的简单的标签呈现。通过本节这个小小案例，组件技术带来的抽象价值已经展现出来一角了。

##动态挂接

多个组件可以使用同一个挂载点，然后动态地在它们之间切换。元素`<component>`可以用于此场景，修改属性is即可达成动态切换的效果：

    <component v-bind:is="current"></component>

假设我们有三个组件home、posts、archives，我们可以设置一个定时器，每隔2秒修改一次current，把三个组件的逐个切入到当前挂接点：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <component v-bind:is="current">
      </component>
    </div>
    <script>
   
    var app = new Vue({
      el: '#app',
      data: {
        current: 'archive',
        i :0,
        b : ['home','posts','archive']
      },
      components: {
        home: { template:'<h1>home</h1>'},
        posts: { template:'<h1>posts</h1>' },
        archive: {template:'<h1>archive</h1>'}
      },
      methods:{
        a(){
          this.i = this.i % 3
          this.current = this.b[this.i]
          this.i++
          setTimeout(this.a,2000)
        }
      },
      mounted(){
        setTimeout(this.a,2000)
      }
    })
    </script>

##引用组件

一个父组件内常常有多个子组件，有时候为了个别处理，需要在父组件代码内引用子组件实例。Vue.js可以通过指令v-ref设置组件的标识符，并在代码内通过`$refs+标识符`来引用特定组件。接下来举例说明。

假设一个案例有三个按钮。其中前两个按钮被点击时，每次对自己的计数器累加1；另外一个按钮可以取得前两个按钮的计数器值，并加总后设置{{total}}的值。此时在第三个按钮的事件代码中，就需要引用前两个按钮的实例。代码如下：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      {{ total }}
      <count ref="b1"></count>
      <count ref="b2"></count> 
      <button v-on:click="value">value</button>
    </div>
    <script>
     Vue.component('count', {
      template: '<button v-on:click="inc">{{ count }}</button>',
      data: function () {
        return {count: 0}
      },
      methods: {
        inc: function () {
          this.count+= 1
        }
      },
    })
    new Vue({
      el: '#app',
      data: {total:0},
      methods: {
        value: function () {
          this.total = this.$refs.b1.count+this.$refs.b2.count
        }
      }
    })
    </script>

标签button使用ref设置两个按钮分为为b1、b2，随后在父组件代码内通过$refs引用它们。
