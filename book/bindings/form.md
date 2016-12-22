##绑定控件

绑定表单控件和绑定普通控件并无二致。但是因为控件绑定常常涉及到双向绑定，此时使用v-model让它更加简单。比如checkbox：

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

所以，当我们点击界面上的输入控件时，尽管此控件会打钩或者去掉打钩，但是label的文字并不会更新。

之前有的.sync修饰符本来可以做双向绑定，但是此特性在vue2.0中已经被删除，所以如果想要使用v-bind做到双向绑定的话，可以加入事件来监视变化，并更新checked数据即可：

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


这样做也太麻烦了，鉴于双向绑定也比较常用的，因此vue引入了一个指令v-model,可以使用它简化此工作：


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

可以用v-model指令在控件上创建双向数据绑定。正如我们已经看到的v-model是v-bind和v-on的语法糖，但是确实很甜。


###text


    <input type="text" v-model="message">


####表单控件：checkbox

在单个checkbox的情况下：

    <input type="checkbox" v-model="checked">

此checkbox会和数据项checked形成双向绑定。

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

你可以测试下，选择checkbox，看checks的变化，，全选的情况下，checks =[ "1", "2", "3" ]。


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

仅仅单选的情况下，v-model指向的数据为单项数据：

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

多选情况下，同样的控件，外观会有变化，并且v-model对应的是一个数组：

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

