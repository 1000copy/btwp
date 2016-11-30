vue.js引入的组件让分解单一HTML到独立组件成为可能。组件可以`自定义元素`形式使用，或者使用原生元素但是以is特性做扩展。

##注册和引用

使用组件之前，首先需要注册。可以注册为全局的或者是局部的。全局注册可以使用

    Vue.component(tag, options)

注册一个组件。tag为`自定义元素`的名字，options同创建Vue实例的选项。注册完成后，即可以`<tag></tag>`形式引用此组件。如下是一个完整可运行的案例：

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

你也可以局部注册，这样注册的组件，仅仅限于执行注册的组件或者实例内。

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

我们注意到，<tag></tag>是HTML本身并不具备的标签，现在因为Vue的组件技术，引入了自定义的标签。这些自定义标签之后可能是一组嵌套标签、脚本、css的集合体，它内部可以非常复杂，但是对外则以大家习惯的简单的标签呈现。通过这个小小案例，组件技术的一角已经展现出来了。

##动态挂接

多个组件可以使用同一个挂载点，然后动态地在它们之间切换。元素<component>可以用于此场景，修改属性is即可。

  <component v-bind:is="current"></component>

可以修改对应Vue实例的current值来切换组件。假设我们有三个组件home、posts、archives，我们可以设置一个定时器，没过2秒修改一次current，把三个组件的一个切入到当前挂接点：

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

