##绑定控件

绑定表单控件和绑定普通组件并无二致。但是因为控件绑定常常涉及到双向绑定，此时使用v-model让它更加简单。比如：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <input type="checkbox" v-bind:checked="checked">v-bind<br><br/>
      <label>{{ checked }}</label>
    </div>
    <script>
      var a= new Vue({
        el: '#app',
        data(){
          return {checked : true} 
        }
      }
    )
    </script> 

把checked数据绑定到input的checked属性上。然而，这样的绑定都是单向的，就是说：

1. 如果checked数据修改了，那么DOM属性就会修改
2. 如果DOM属性修改了，checked数据并不会修改

所以，当我们点击界面上的输入控件时，尽管此控件会打钩或者去掉打钩，但是label的文字并不会更新。如果想要使用v-bind做到双向绑定的话，可以加入事件来监视变化，并更新checked数据即可：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <label><input type="checkbox" ref="c2"v-bind:checked="checked" @change="change">v-bind</label><br/>
    <label for="checkbox">{{ checked }}</label>
    </div>
    <script>
      var a= new Vue({
        el: '#app',
        data(){
          return {checked : true} 
        },
        methods:{
          change(){
            this.checked = this.$refs.c2.checked
          }
        }
      }
    )
    </script> 


这样做也太麻烦了。鉴于双向绑定也比较常用的，因此vue引入了一个指令v-model,可以使用它简化此工作：


    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <label><input type="checkbox" v-model="checked">v-model</label><br/>
      <label for="checkbox">{{ checked }}</label>
    </div>
    <script>
      var a= new Vue({
          el: '#app',
          data(){return {checked : true} }
        }
      )
    </script> 

可以用v-model指令在控件上创建双向数据绑定。正如我们已经看到的：v-model是v-bind和v-on的语法糖。但是这个语法糖确实很甜。

接下来我们考察具体的控件的绑定，包括text、checkbox、select、radio、textarea等。

###text

控件text是最常见的了，可以这样做双向绑定：

    <input type="text" v-model="message">


###checkbox

在单个checkbox的情况下：

    <input type="checkbox" v-model="checked">

此checkbox会和数据项checked形成双向绑定:

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <input type="checkbox" v-model="checked">
    </div>
    <script>
      var a= new Vue({
          el: '#app',
          data(){return {checked :true} } 
        }
      )
    </script> 

在多个checkbox的情况下：

    <input type="checkbox" value="1" v-model="checks">
    <input type="checkbox" value="2" v-model="checks">
    <input type="checkbox" value="3" v-model="checks">

会和checks形成双向绑定。checks是一个数组，案例：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
        <input type="checkbox" value="1" v-model="checks">
        <input type="checkbox" value="2" v-model="checks">
        <input type="checkbox" value="3" v-model="checks">
        <label for="checkbox">{{ checks }}</label>
    </div>
    <script>
      var a= new Vue({
          el: '#app',
          data(){return {checks :[ "1", "2" ]} }
        }
      )
    </script> 

你可以测试下，选择checkbox，看插入值{{checks}}的变化。在全选的情况下，checks应该是[ "1", "2", "3" ]才对。

###radio

此控件可以成组使用，组内互斥选择，最后只能选择一项目：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
       <input type="radio" value="1" v-model="which">
       <input type="radio" value="2" v-model="which">
       <span>{{ which }}</span>
    </div>
    <script>
      var a= new Vue({
          el: '#app',
          data(){return {which :"2"} }
        }
      )
    </script> 

###select

此控件允许多选和单选。在单选的情况下，v-model指向到单项数据：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
        <select v-model="which" >
          <option which>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <span>which: {{ which }}</span>
    </div>
    <script>
      var a= new Vue({
          el: '#app',
          data(){return {which :"2"} }
        }
      )
    </script> 

多选情况下，则v-model对应的是一个数组：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
        <select v-model="which" multiple>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <span>which: {{ which }}</span>
    </div>
    <script>
      var a= new Vue({
          el: '#app',
          data(){return {which :["2","3"] } } 
        }
      )
    </script> 

### textarea

作为多行文本区的textarea，可以这样绑定：

    <textarea v-model="msg"></textarea>

如下是一个可运行的代码：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <textarea v-model="msg" placeholder="input some lines"></textarea>
      <p style="white-space: pre">message:<br>{{ msg }}</p>
    <div>
     <script>
        new Vue({
          el:'#app',
          data:{msg:''}
        })
    </script>

你可以在文本区内输入多行文本，内容会照搬到p标签内。

