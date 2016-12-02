vue拥有了绑定，从而和以往的native js，jquery有了重要的区别。这意味着，我可以从命令式编程走向声明式编程的跨越。以设置DOM数据为例，使用命令式的做法：

1. 找到DOM项目
2. 设置值

使用声明式的步骤：
1. 直接声明绑定

使用声明编程后，编写此类代码的好处:

1. 不必访问DOM API即可修改DOM
2. 响应式的风格；不但第一次给设置好，而且当绑定的数据值变化了的话DOM显示会跟着变化

如下代码展示我提到的绑定的两个特征：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">{{value}}</div>
    <script>
    new Vue({
      el: '#app',
      data(){
        return {value:42}
      },
      mounted(){
        setTimeout(this.a,1000)
      },
      methods:{
        a(){
          this.value++
          console.log(this.value)
          setTimeout(this.a,1000)
        }
      }
    })
    </script> 

首先，我只需要在插值的地方使用形如{{}}的符号，声明我的这个值和value绑定，Vue就知道:

1. 这个value需要从对应Vue实例中的data函数返回的对象内查找value，并填充此值
2. 我使用了一个定时器，每秒钟去修改一次value数据成员，我会发现DOM的标签会跟着value的变化而变化

绑定包括数据绑定、事件绑定、元素绑定。其中的数据绑定又有细分。我会一个个的展示它们出来。

##数据绑定

刚刚的案例，已经展示了一种特别的数据绑定：插入值绑定。完整的说来，是把实例内的数据成员绑定到插入值指定的位置。我们在进一步考察它。

###绑定到插入值

使用Mustache语法设置绑定。Mustache代表的就是双大括号({{}})：

    <span>Message: {{ msg }}</span>

插入值绑定将会替代吧对应数据对象上的属性的值插入到Mustache指示的位置。且绑定的数据对象的变化会导致插值的变化。

如果不希望后续的变化会修改插值，那么可以使用v-once指令。就是该一行代码
    
    <div id="app">{{value}}</div>
为：
    <div id="app" v-once>{{value}}</div>

在Mustache内，不仅仅可以使用实例数据成员，还可以使用JavaScript表达式，比如：

    {{ value + 1 }}

但是每个绑定都只能包含单个表达式。语句或者多个表达式是不可以的。

Mustache内使用表达式有时候带来方便，有时候，特别是表达式比较复杂时，在HTML内会提现出一种杂糅代码的感受，并不符合分离关注点的原则，此时可以使用计算属性。有了它，你可以把表达式搬移到代码内，并且依然享受响应型绑定的效果。比如:

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <input v-bind:value="finalvalue"></input>
    </div>

    <script>
    var a = new Vue({
      el: '#app',
      computed: {
          finalvalue: function () {
            return this.value + 1
          }
        },
      data(){
        return {
          value:41
        }
      }
    })
    </script> 

你可以在console上设置a.value的方式来查看响应效果。如：

    a.value = 42

如果你的数据成员内容是HTML片段，并且希望插入这个片段到DOM内，而不是被Escape为文本，那么使用指令v-html:

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <div v-html="raw"></div>
    </div>
    <script>
    new Vue({
      el: '#app',
      data(){
        return {
          raw:'<h2>42</h2>'
        }
      }
    })
    </script> 

使用v-html动态渲染的用户提供的内容插值可能会非常危险，因为它很容易导致XSS攻击。

###绑定到属性

插入值绑定是无法处理HTML元素的属性的，因此你无法通过：

    <input value="{{value}}"></input>

达到你的预期目的。想要绑定到属性，就得使用指令v-bind，而不是插入值绑定:

    <input v-bind:value="value"></input>

作为对比，案例如下：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <input v-bind:value="value"></input>
      <input value="{{value}}"></input>
    </div>

  <script>
    new Vue({
      el: '#app',
      data(){
        return {
          value:'42'
        }
      }
    })
    </script>   

在v-bind用于class和style时，Vue.js针对这两个属性，有更好的做法。

####针对class的情况

v-bind针对class可以直接传入一个对象作为属性的值，比如：

  <div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

如果isActive为true，那么active作为字符串拼接结果的一部分；如果hasError为true，则text-danger为字符串拼接结果的一部分。因此：

  data: {
    isActive: true,
    hasError: false
  }

得到的渲染结果为：

  <div class="active"></div>

v-bind针对class可以直接传入一个数组作为属性的值：

  <div v-bind:class="[active,text-danger]"></div>

得到的渲染结果为：

  <div class="active text-danger"></div>

你可以继续使用一般属性的绑定方法，但是使用新方法可以在代码中避免字符串拼接这样恼人的情况。

####针对style的情况

也可以如针对class那样，传入对象或者数组，对象就是一个style对象，数组这是多个style对象。我们看案例：

  <div v-bind:style="styleObject"></div>

  data: {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }

渲染出来的结果为：

  <div style="color:red;fontSize:13px; ">abc</div>

完整演示对象和数组的代码为：

  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <div id="app">
    <div style="color:red;fontSize:13px; ">abc</div>
    <div v-bind:style="[s1,s2]">abc</div>
    <div v-bind:style="styleObject">abc</div>
  </div>
  <script>
    var a= new Vue({
      el: '#app',
       data: {
        styleObject: {
          color: 'red',
          fontSize: '13px'
        },
        s1: {
          color: 'red',
        },
        s2: {
          fontSize: '13px'
        }
      }
    })
  </script> 

##事件绑定

指令v-on可以监听DOM事件。如下案例，可以显示一个按钮，点击此按钮会在控制台打印"BUTTON"：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <button v-on:click="who">who</button>
    </div>
    <script>
      var a= new Vue({
        el: '#app',
        methods: {
          who: function (event) {
            console.log(event.target.tagName)
          }    
        }
      })
    </script> 

指令v-on会把参数（click）指定的事件挂接到属性值（who）指定的方法上。方法who的参数event为原生的JavaScript事件对象。

指令v-on可以使用修饰符。可以选这些修饰符

  .stop
  .prevent
  .capture
  .self

还有一类特别的修饰符，专门用于键盘事件，类似

  .keyup.enter

表示侦听enter键的keyup事件。还有更多：

  .enter
  .tab
  .delete
  .esc
  .space
  .up
  .down
  .left
  .right

也可以在keyup修饰符后跟着一个数字表示键盘的ASCII码：

  .13 等同于.enter


###应用：绑定表单控件

绑定表单控件和绑定普通控件并无二致。但是因为控件绑定常常涉及到双向绑定，此时使用v-model让它更加简单。比如checkbox：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <input type="checkbox" v-bind:checked="checked">v-bind</input><br/>
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
      <input type="checkbox" ref="c2"v-bind:checked="checked" @change="change">v-bind</input><br/>
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
      <input type="checkbox" v-model="checked">v-model</input><br/>
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


####表单控件：text


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


###表单控件radio

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
###表单控件select

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

##元素绑定

不但可以做属性绑定，元素可以绑定的。比如根据表达式条件的不同来绑定不同的元素，或者循环绑定元素。

###v-if

指令v-if可以完成条件化的元素绑定。比如：

    <h1 v-if="false">h1</h1>
    <h2 v-else>h2</h2>

当然，如果不必要，v-else是可以不写的：

    <h1 v-if="true">h1</h1>

如果需要条件化绑定的是一组元素，可以使用<template>来打包分组：

      <template v-if="true">
         <h1>h1</h1>
         <p>big title</p>
      </template>
      <template v-else>
         <h1>h2</h1>
         <p>second title</p>
      </template>

有一个叫做v-show的指令，类似v-if的指令，即使表达式是假值，元素依然会绑定到DOM中，只是并不显示：

  <h1 v-show="false">h1</h1>

因此，严格来说，它并不是一个元素绑定指令。

###v-for

指令v-for基于一个数组渲染一组元素。这个指令的表达式使用特殊的语法，形式为 

1. item in items。
2. 或者 (item, index) in items;如果你需要循环索引的话

就像这样：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app"><ul>
        <li v-for="(item, index)in items">{{ item }}，{{ index }}</li>
    </ul></div>
    <script>
      var a= new Vue({
          el: '#app',
          data(){return {items :[1,2,3]} } 
        }
      )
    </script> 

输出：

    1，0
    2，1
    3，2
其中的in可以换成of，不影响功能，但是更加符合js迭代器语法。

指令v-for也可以对对象迭代，每个迭代项目就是一组（属性+值)的对：


  <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app"><ul>
        <li v-for="(v,k) in person">{{ k }}:{{ v }}</li>
    </ul></div>
    <script>
      var a= new Vue({
          el: '#app',
          data(){return {
            person :{
              name:'frodo',
              group:'ring fellow'
            } 
          } 
        }}
      )
    </script> 

指令v-for也可以对整数迭代，等于循环整数次：

  <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app"><ul>
        <li v-for="v in 3">{{ v }}</li>
    </ul></div>
    <script>
      var a= new Vue({
          el: '#app'
        }
      )
    </script> 
##数组的响应

在第一个v-for的案例中，我们对一个数组（items）进行迭代，创建了元素绑定。现在或许有人会怀疑:如果我修改了数组，是否也可以因此影响到DOM呢。比如我增加一个数组元素，DOM会响应式的跟随变化吗。答案是可能。我写了一个案例，其中添加了一个定时器，每秒钟调用一个函数，函数内有不同的数组方法：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app"><ul>
      <li v-for="item in items">{{ item }}</li>
      </ul></div>
    <script>
      var a= new Vue({
        el: '#app',
        mounted(){
          this.funcs[0] = this.b
          this.funcs[1] = this.c
          this.funcs[2] = this.d
          this.funcs[3] = this.e
          this.funcs[4] = this.f
          this.funcs[5] = this.g
          this.funcs[6] = this.h
          this.funcs[7] = this.i
          this.funcs[8] = this.j
          setTimeout(this.a,1000)
        },
        data(){return {
          items :[1,2,3],
          funcs:[],
          funcIndex : 0 
        }}, 
        methods:{
          a(){ 
            this.funcs[this.funcIndex]()
            this.funcIndex++
            if (this.funcIndex < this.funcs.length)
              setTimeout(this.a,1000) 
          },
          b(){
            this.items.push(4)
          },
          c(){
            this.items.pop() 
          },
          d(){
            this.items.shift() 
          },
          e(){
            this.items.unshift(1) 
          },
          f(){
            this.items.splice(1,1)  
          },
          g(){
            this.items.reverse()  
          },
          h(){
            this.items.sort()  
          },
          i(){
            // this.items[0] = 111  
            Vue.set(this.items,0,111)
          },
          j(){
            // this.items.length = 1
            this.items.splice(1,1)  
          }
        }
      })
    </script> 

测试表明，对以下方法的调用，Vue确实会做响应的修改：

    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()

但是需要留意最后两个函数，i(),j(),其中的i()函数内如果使用：

    this.items[0] = 111 

并不会引发响应变化。这是vue的一个限制，如果需要这样做，必须改代码为：

    Vue.set(this.items,0,111)

另外一个是数组的length属性，修改它DOM并不会跟随变化，如果你想要的是删除一个元素，可以用：

    this.items.splice(1,1)  

来做替代。


