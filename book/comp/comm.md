## 组件之间的协作

按照组件分解的愿景，一个大型的HTML会按照语义划分为多个组件，那么组件之间必然存在协作的问题。一个组件需要传递数据给另外一个组件，从而达到协同的效果。Vue.js提供的协作方式有属性传递、事件传递和内容分发。

###使用属性

此方法用于父组件传递数据给子组件。每个组件的作用域都是和其他组件隔离的，因此，子组件不应该直接访问父组件的数据，而是通过属性传递数据过来。如下案例传递一个字符串到子组件：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <child message="hello"></child>
    </div>
    <script>
      Vue.component('child', {
        props: ['message'],
        template: '<span>{{ message }}</span>'
      })
    	new Vue({el:'#app'})
    </script>

本案例会显示

    hello

在页面上。这里，父组件为挂接在#app上的Vue实例，子组件为child。child使用props声明一个名为message的属性，此属性可以通过child标签的属性传递数据到组件内。

如果不是传递一个静态的字符串，而是传递javascript表达式，那么可以使用指令v-bind:    

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <child v-bind:message="hello+',world'"></child>
    </div>
    <script>
      Vue.component('child', {
        props: ['message'],
        template: '<span>{{ message }}</span>'
      })
    	new Vue({
        el:'#app',
        data:{hello:'hi'}
      })
    </script>
运行结果为：
    
    hi,world   
    
本案例把父组件内的hello成员传递给子组件。出现在属性内的hello不再指示字面上的字符串，而是指向一个表达式，因此传递进来的是表达式的求值结果。为了方便起见，v-bind:message可以缩写为:message。

####属性验证

当通过属性传递表达式时，有些时候类型是特定的，比如传递年龄进来的话，要求应该是整数。Vue提供了属性的验证，包括类型验证，范围验证等。比如：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <child v-bind:age="age"></child>
    </div>
    <script>
      Vue.component('child', {
        props: {'age':Number},
        template: '<span>you are {{ age }}</span>'
      })
    	new Vue({
        el:'#app',
        data:{age:'30'}
      })
    </script>

如果你使用的是开发版本的vue.js，那么会在控制台得到一个警告,Vue 将拒绝在子组件上设置此值：

    [Vue warn]: Invalid prop: type check failed for prop "age". Expected Number, got String. 
    (found in component <child>)

当把age的那一行修改为数字，即：

    data:{age:30}
    
警告就会消失。属性名称后可以加入类型，类型检查除了使用Number，还可以有更多，完整类型列表如下：

    String
    Number
    Boolean
    Function
    Object
    Array
    
你还可以在属性名后跟一个对象，在此对象内指定范围检查，提供默认值，或者要求它是必选属性：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <child v-bind:age="age"></child>
    </div>
    <script>
      Vue.component('child', {
        props: {'age':{
                  type:Number,
                  validator: function (value) {
                    return value > 0 && value<150
                  },
                  required:true,
    				          default:50
               }
    				},
        template: '<span>you are {{ age }}</span>'
      })
    	new Vue({
        el:'#app',
        data:{age:'149'}
      })
    </script>

官方手册提供了一个相对全面的验证样例：

    Vue.component('example', {
      props: {
        // 基础类型检测 （`null` 意思是任何类型都可以）
        propA: Number,
        // 多种类型
        propB: [String, Number],
        // 必传且是字符串
        propC: {
          type: String,
          required: true
        },
        // 数字，有默认值
        propD: {
          type: Number,
          default: 100
        },
        // 数组／对象的默认值应当由一个工厂函数返回
        propE: {
          type: Object,
          default: function () {
            return { message: 'hello' }
          }
        },
        // 自定义验证函数
        propF: {
          validator: function (value) {
            return value > 10
          }
        }
      }
    })

###使用事件

每个Vue实例都有事件接口，组件是一个具体的Vue实例，因此也有事件接口，用来发射和接收事件：

1. 发射事件:$on(event)
2. 接收事件:$emit(event)

我们假设一个案例，一个父组件#app，两个按钮组件，点击任何一个按钮让自己的计数器加1，并且让父组件内的一个计数器加1。图例：

![](comp/comp1.png)

使用一个案例，来演示事件的使用：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      {{ total }}
      <count ref="b1" ></count>
      <count ref="b2" ></count> 
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
          this.$emit('inc')
        }
      },
    })
    new Vue({
      el: '#app',
      data: {total: 0},
      mounted(){
        this.$refs.b1.$on('inc',this.inc)
        this.$refs.b2.$on('inc',this.inc)
      },
      methods: {
        inc: function () {
          this.total += 1
        }
      }
    })
    </script>
在父组件,也就是挂接于#app的Vue实例上，在绑定完后（mounted钩子）的函数内，通过$on方法监听inc事件到this.inc，也就是methods.inc内。在子组件count内，完成对自己的计数器count加1后随即使用$emit发射事件给父组件。另外，我们使用了ref属性为每一个子组件一个引用标识符，从而在代码内可以使用形如:

    this.$refs.childRefName 

来引用子组件实例。除了在js代码内通过$on方法设置监听代码外，也可以使用指令v-on在HTML内达成类似效果：

        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      {{ total }}
      <count v-on:inc='inc'></count>
      <count v-on:inc='inc'></count> 
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
          this.$emit('inc')
        }
      },
    })
    new Vue({
      el: '#app',
      data: {total: 0},
      methods: {
        inc: function () {
          this.total += 1
        }
      }
    })
    </script>
    
后一种方法的好处：

1.省下了ref属性的声明，因为不必在代码中引用组件
2.在HTML就可以一目了然的看到监听的是哪个子组件



###内容分发

可以利用组件，把较大的HTML分解为一个个的自洽的组件。比如常见的论坛首页在忽略内容的情况下，我们只留下导航区、内容区（包括讨论主题区和用户信息区），那么架构可能是这样的：

    <div class='wrapper'>
        <div class='navigator'>navigator...</div>
        <div class='content'>
            <div class='topics'>topics...</div>
            <div class='userinfo'>userinfo...</div>
        </div>
    </div>        
    
所有的内容全部呈现在一个HTML内。可以想见此文件巨大，并且还会继续增长。如果使用组件来做分解，那么首页可以变为：

    <wrapper>
      <navigator></navigator>
      <content1>
          <topics><topics>
          <userinfo></userinfo>
      </content1>
    <wrapper>
注意：使用标签content1，而不是content，是因为后者是html内置的标签，我们的自定义标签不应该和内置标签冲突。

本来嵌入在div内的内容，现在可以分解到一个个的组件内。比如topics，形如：

    var topics = {
      template: `<div class='topics'>topics...</div>`
    }

如下是一个可运行的案例：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <wrapper>
          <navi></navi>
          <content1>
              <topics></topics> 
              <userinfo></userinfo>
          </content1>
        <wrapper>
    </div>
    <script>
      Vue.component('topics',{
        template: `<div class="topics">topics ...<div>`
      })
      Vue.component('userinfo',{
        template: `<div class="userinfo">userinfo ...<div>`
      })
      Vue.component('content1',{
        template: `<div class="content"><slot></slot><div>`,
      })
      var navi = Vue.component('navi',{
        template: `<div class="navigator">navigator ...<div>`
      })
      var wrapper = Vue.component('wrapper',{
        template: `<div class="wrapper"><slot></slot><div>`,
      })
      new Vue({
        el: "#app",
        components:{
         wrapper
        }
      });
    </script>


请留意到wrapper组件模板内使用了`<slot>`标签，content1组件内也使用了`<slot>`。标签`<slot>`的语义是，请把使用此组件自定义标签内的全部内容抓取过来，放置到`<slot>`所在的位置上。以content1为例，它在自定义标签内的全部内容为：

    <topics></topics> 
    <userinfo></userinfo>

这里内容会直接被抓取过来，放置到`<slot>`处，从而混合得到content最终的模板：

    <div class="content">
      <topics></topics> 
      <userinfo></userinfo>
    <div>

这个过程很奇妙，也不太容易理解，但是非常有用。这意味着，可以通过`<slot>`，把父组件内的、在引用自定义标签的内容，可以通过此技术传递到组件内，从而完成一种另类的父子数据传递。

尽管不再和`<slot>`有关，随即发生的，是`<topics>`和`<userinfo>`代表的组件也混入到content1内，变成

    <div class="content">
      <div class="topics">topics ...<div> 
      <div class="userinfo">userinfo ...<div>
    <div>
就这样通过`<slot>`技术，一步步的从组件最后在还原出最初的HTML。这个技术，被称为`内容分发`。它让组件可以组合，并且可以混合父组件的内容到子组件自己的模板内。

####单个slot

子组件模板包含至少一个`<slot>`，父组件的内容就会被插入到`<slot>`位置上并替换掉`<slot>`标签本身，否则父组件内的内容将会被丢弃。

如果`<slot>`标签中本身是有内容的，那么这些内容如何和插入的内容合并呢？这些本有的内容被视为备用内容。也就是说，如果父组件内元素为空，备用内容会保留，否则就会被丢弃。

假定子组件foo有下面模板：

    <div>
      <slot>
        备用内容
      </slot>
    </div>

父组件内容如下：

    <div>
      <foo>
        <p>parent content</p>
      </foo>
    </div>

渲染结果：

    <div>
      <div>
        <p>parent content</p>
      </div>
    </div>
如果父组件为：

    <div>
      <foo>
      </foo>
    </div>
那么渲染结果为：


    <div>
      <div>
        备用内容
      </div>
    </div>

如下是一个整合后的案例：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <foo><p>parent content</p></foo>
    </div>
    <script>
     Vue.component('foo', {
      template: `
          <div>
            <slot>
              备用内容
            </slot>
          </div>`,
    })
    new Vue({
      el: '#app'
    })
    </script>

你可以试试删除`<p>parent content</p>`,对比父组件有无内容带来的差别。

####多个slot

引用子组件的父组件中嵌入到子组件自定义标签内的内容，可以通过给予属性slot的不同的值来区别多个插槽，而在子组件内使用`<slot name=''>`方式来引用。从而让父组件内容和子组件的内容分发变得更加灵活。在多个插槽的场景下，找不到匹配的插槽的情况下，可以使用一个备用的插槽来承载内容。如果内容既找不到命名插槽，也没有备用插槽的话就会被丢弃。

假设一个子组件`<app-layout>`模板为：

    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <body>
        <slot></slot>
      </body>
    </div>

父组件模板为：

    <app-layout>
      <h1 slot="header">title</h1>
      <p>content</p>
    </app-layout>

那么渲染结果：

    <div class="container">
      <header>
        <h1>title</h1>
      </header>
      <body>
        <p>content</p>
      </body>
    </div>

在组合组件时，`内容分发`是非常简单而强大的机制。

###使用事件总线

我们已经提到了父子通讯的方法，包括从父到子的属性方法，从子到父的事件方法。如果两个组件之间没有父子关系，但是也需要通讯，可以使用事件总线。具体做法就是创建一个空的Vue实例作为中介，事件发起方调用此实例的$emit方法，需要监听此事件的，使用此实例的$on方法。

可以虚拟一个案例，它有两个按钮，点击一个按钮会让另一个按钮的组件的count加1。


    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <foo></foo>
      <bar></bar>
    </div>
    <script>
     var bus = new Vue({})
     Vue.component('foo', {
      template: '<button v-on:click="inc">{{ count }}</button>',
      data: function () {
        return {count: 0}
      },
      mounted(){
        bus.$on('foo-inc',this.doinc)
      },
      methods: {
        inc: function () {
          bus.$emit('bar-inc',this)
        },
        doinc: function () {
          this.count++
        }
      }, 
    })
    Vue.component('bar', {
      template: '<button v-on:click="inc">{{ count }}</button>',
      data: function () {
        return {count: 0}
      },
      mounted(){
        bus.$on('bar-inc',this.doinc)
      },
      methods: {
        inc: function () {
          bus.$emit('foo-inc',this)
        },
        doinc: function () {
          this.count++
        }
      }})
    new Vue({
      el: '#app'
    })
    </script>

这里列出的案例，是同属一个父组件的两个兄弟组件的通讯方法。实际上作为总线方式的Vue实例，可以用于任何组件之间的通讯。


###综合案例

为了演示说明vue的组件通讯，我们从一个假设的todo应用开始（再次：）。UI当然还是类似这样的：

![todoapp.png](firstchapter/todoapp.png)

但是这次的新意在于，我们会把整个app分为三个组件，层次关系如下：

    app
    --newTodo
    --todoList

app作为父应用组件，newTodo作为一个子组件负责用户输入，并且获取新的todo，而todoList作为另外一个子组件则负责显示全部todo。

这样的分工在稍微大的app中非常常见，由此达成分而治之的目的。但是组件之间势必需要通讯，比如newTodo组件必须把新的todo字符串通知到todoList组件，以便后者更新todo列表并由此更新用户界面。

####基于组件结构的通讯

从子组件到父组件的通讯，vue.js提供了$dispatch方法，而从父组件到子组件则是通过 $broadcast方法。我们在如下的代码中使用了此技术：

    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/vue/1.0.28/vue.min.js"></script>
      </head>
    <body>
      <div id="todo-app">
          <h1>todo app</h1>
          <new-todo></new-todo>
          <todo-list></todo-list>
      <div>
      <script>
      var newTodo = {
            template:'<div><input type="text" autofocus v-model="newtodo"/><button @click="add">add</button></div>',
            data(){
              return{
                newtodo:''
              }
            }, 
            methods:{
              add:function(){
                this.$dispatch('newtodo',this.newtodo)
                this.newtodo = ''
              }
          }
      }
      var todoList = {
          template:'<ul> \
            <li v-for="(index,item) in items">{{item}} \
              <button @click="rm(index)">X</button></li> \
            </ul>',
          data(){
            return{
              items:['item 1','item 2','item 3'],
            }
          },
          methods:{
           rm:function(i){
              this.items.splice(i,1)
            }
          },
          events: {
            'newtodo': function (newtodo) {
              this.items.push(newtodo)
            }
          },
      }
      var app= new Vue({
        el:'#todo-app',
        components:{
          newTodo:newTodo,
          todoList:todoList
        },
        events: {
          'newtodo': function (newtodo) {
            this.$broadcast('newtodo',newtodo)
          }
        }
      })
      </script>
    </body>
    </html>
    
组件newTodo在用户点击按钮后会把新的todo字符串通过$dispatch发出，而父组件app在event内截获此事件，随即通过$broadcast方法发送到子组件，子组件todoList在event内截获此事件取出payload，加入它到数据items内。这就是组件通讯的方法。vue.js并没有提供兄弟组件直接的直接通讯方法，如果兄弟组件之间需要通讯，只能首先发给父组件，父组件想子组件广播，侦听此事件的子组件随后获取此事件。

通过$broadcast+$dispatch完成组件通讯是可行的，但是问题不少:

1. 依赖于树形组件结构，你得知道组件的结构是怎么样的
2. 组件结构复杂的话，必然降低通讯效率
3. 兄弟组件直接不能直接通讯，必须通过父组件间接完成

#### 集中化的eventBus

实际上，我们只是为了让两个组件交换数据，这个过程并不应该和组件的结构（父子关系的组件，兄弟关系的组件）捆绑在一起。因此，一个变化的结构，是引入一个新的组件，此组件脱离组件关系，作为兄弟关系的组件之间的通讯中介。此技术被称为Event Bus。如下代码正式利用了此技术：

    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/vue/1.0.28/vue.min.js"></script>
      </head>
    <body>
      <div id="todo-app">
          <h1>todo app</h1>
          <new-todo></new-todo>
          <todo-list></todo-list>
      <div>
      <script>
      var eventHub =new Vue( {
        data(){
          return{
            todos:['A','B','C']
          }
        },
        created: function () {
          this.$on('add', this.addTodo)
          this.$on('delete', this.deleteTodo)
        },
        beforeDestroy: function () {
          this.$off('add', this.addTodo)
          this.$off('delete', this.deleteTodo)
        },
        methods: {
          addTodo: function (newTodo) {
            this.todos.push(newTodo)
          },
          deleteTodo: function (i) {
            this.todos.splice(i,1)
          }
        }
      })
      var newTodo = {
            template:'<div><input type="text" autofocus v-model="newtodo"/><button @click="add">add</button></div>',
            data(){
              return{
                newtodo:''
              }
            }, 
            methods:{
              add:function(){
                eventHub.$emit('add', this.newtodo)
                this.newtodo = ''
              }
          }
      }
      var todoList = {
          template:'<ul> \
            <li v-for="(index,item) in items">{{item}} \
              <button @click="rm(index)">X</button></li> \
            </ul>',
          data(){
            return{
              items:eventHub.todos
            }
          },
          methods:{
           rm:function(i){
              eventHub.$emit('delete', i)
            }
          }
      }
      var app= new Vue({
        el:'#todo-app',
        components:{
          newTodo:newTodo,
          todoList:todoList
        }
      })
      </script>
    </body>
    </html>

由此代码我们可以看到：

1. app组件不再承担通讯中介功能，而只是简单的作为两个子组件的容器
2. EventBus组件承载了全部的数据（todos），以及对数据的修改，它监听事件add和delete，在监听函数内操作数据
3. 子组件todoList的data成员的数据来源改为从eventBus获取，删除todo的方法内不再操作数据，而是转发给eventBus来完成删除
4. 子组件newTodo的按钮不再添加数据，而是转发事件给eventBus，由后者完成添加

这样做就把本来捆绑到组件结构上的通讯还原为单纯的通讯，并且集中数据和操作到一个对象（eventBus）也就有利于组件的数据共享。

当我们谈到eventBus的时候，我们离vuex就比较近了。我会随后谈及vuex。
