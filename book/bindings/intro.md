
#绑定

Vue.js拥有了绑定，从而和以往的Vanilla.js，jquery有了重要的区别。这意味着，使用Vue.js我可以从命令式编程走向声明式编程的跨越。以设置DOM数据为例，使用命令式的做法：

1. 找到DOM项目
2. 设置值

使用声明式的步骤只需要一步：

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

首先，我只需要在插值的地方使用形如{{}}的符号，声明此值绑定到一个成员变量，Vue就会知道:

1. 需要从对应Vue实例中的data函数返回的对象内查找value，并使用它的值来填充占位
2. DOM的标签会跟着value的变化而变化;

绑定包括数据绑定、事件绑定、元素绑定。其中的数据绑定又有细分。我会一个个的展示它们出来。

##数据绑定

我们已经看到了一种特别的数据绑定：插入值绑定。具体说来，就是把实例内的数据成员绑定到插入值指定的位置。我们在进一步考察它。

`绑定到插入值`使用Mustache语法设置绑定。Mustache代表的就是双大括号({{}})：

    <span>Message: {{ msg }}</span>

插入值绑定将会把数据对象上的属性值插入到Mustache指示的位置。且绑定的数据对象的变化会导致插值的变化。

如果不希望后续的变化会修改插值，那么可以使用v-once指令。就是修改一行代码
    
    <div id="app">{{value}}</div>

为：

    <div id="app" v-once>{{value}}</div>

在Mustache内还可以使用JavaScript表达式，比如：

    {{ value + 1 }}

但是每个绑定都只能包含单个表达式。语句或者多个表达式是不可以的。

Mustache内使用表达式有时候带来方便，有时候，特别是表达式比较复杂时，在HTML内会有代码，体现出一种杂糅的坏味道，此时可以使用计算属性。有了它，你可以把表达式搬移到代码内，并且依然享受响应型绑定的效果。比如:

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <input v-bind:value="finalvalue">
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

如果你的数据成员内容是HTML片段，并且希望插入这个片段到DOM内，那么使用指令v-html:

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

使用v-html动态渲染的用户提供的内容插值是需要小心的，至少不要把用户输入内容作为值来插入，否则是很容易导致XSS攻击的。

插入值绑定是无法处理HTML元素属性的，就是说，以下代码：

    <input value="{{value}}">

是无法达到你的预期目的的。想要绑定到属性，就得使用指令v-bind:

    <input v-bind:value="value">

作为对比，案例如下：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <input v-bind:value="value">
      <input value="{{value}}">
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

在v-bind用于class和style两个属性时，Vue.js针对它们有更好的做法。

###针对class的情况

针对标签属性class，v-bind可以直接传入一个对象作为属性值，像是这样：

    <div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

如果isActive为true，那么active作为字符串拼接结果的一部分；如果hasError为true，则text-danger为字符串拼接结果的一部分。因此：

    data: {
      isActive: true,
      hasError: false
    }

得到的渲染结果为：

    <div class="active"></div>

也可以传入一个数组作为class属性的值：

    <div v-bind:class="[active,text-danger]"></div>

得到的渲染结果为：

    <div class="active text-danger"></div>

你可以继续使用一般属性的绑定方法，然而使用新方法可以在代码中避免字符串拼接这样恼人的情况。

###针对style的情况

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

指令v-on会把参数（click）指定的事件挂接到属性值指定的方法（who）上。方法who的参数event为原生的JavaScript事件对象。

指令v-on可以使用修饰符。可以选这些修饰符

    .stop
    .prevent
    .capture
    .self

还有一类特别的修饰符用于键盘事件的修饰，类似这样：

    .keyup.enter

表示侦听enter键的keyup事件。还有更多按键的：

    .enter
    .tab
    .delete
    .esc
    .space
    .up
    .down
    .left
    .right

也可以在keyup修饰符后跟着一个数字表示按键的ASCII码：

    .13 等同于.enter


