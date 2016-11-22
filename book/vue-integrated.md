Vue是一个专注于前端UI的框架。它的主要能力是：

1. 声明式绑定。包括数据绑定、事件绑定
2. 基于组件的编程。让开发者可以把整个应用分为若干组件，分而治之

本篇文字会讲解声明式绑定，并且会谈及Vue的引入、数据绑定、事件绑定、Vue实例、指令。特别的，同样的案例，我也用来讲解Vue最为引以为傲的组件技术。案例是一个微小的叫做counter的应用，看起来是这样的：

![clipboard.png](/img/bVFTaM)

有一个标签显示数字0，当点击按钮“+”，数字会每次加1。代码如下。你可以直接保存代码到html文件中，然后用浏览器打开，如果是IE的话必须是IE8或者或以上版本：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
        <span>{{count}}</span>
        <button @click="inc">+</button>
    </div>
    <script>
    new Vue({
      el:'#app',
      data () {
        return {count: 0}
      },
      methods: {
        inc () {this.count++}
      }
    })
    </script>
    
你可以实际的操作，看到按钮和数字的互动变化。然后我们来看Vue如何做到的。
首先，必须引入Vue.js库。我们使用<script>，像是任何古老的js库或者框架的引入一样，引入Vue.js。为了方便，我们没有下载vue.js ,而是使用了vue.js的一个网上提供的拷贝。此拷贝由http://unpkg.com/提供。接下来的代码分为HTML标签和放置于<script>内的js代码。

随后我们看HTML。它就是有一个div标签内嵌套button和span标签，看起来和普通HTML别无二致。除了{{count}}、和@click属性之外。形如{{key}}的符号，是一种特殊的记号，表示的含义是：

    从该标签所在的Vue实例内的data函数返回的对象内查找名为‘key’的项目值，把这个值拿来填充{{key}}所占据的位置的内容。

具体到本案例，在创建Vue实例的时候，

    new Vue({
          el:'#app',
          ...
          
Vue通过el成员的值#app，关联到div#app上。而{{count}}最终定位得到返回对象，{count: 0}，从而得到值0，并使用0填充到<span>标签的内容上。这就是<span>{{count}}</span>的填充过程。

而@click表示的含义是：

  把button的onclick事件挂接到对应Vue实例的methods对象内的指定方法上。这里就是inc()方法。

真正神奇的地方来了，这就是Vue的响应式编程特性。我们看到inc()方法内只是修改了this.count这个数字，UI上的<span>内容就会变化呢？我们本来以为的流程应该是：“我们首先修改this.count,然后拿这个修改过的值通过DOM API去更新<span>”。然而{{count}}这样的数据绑定，不仅仅意味着把this.count的值显示出来，也意味着当this.count被修改的时候，<span>的内容会跟着更新。这就是响应式编程，具体的魔法由Vue内部完成。开发者只要通过{{}}形式的声明，告诉Vue说，“我的这块内容应该显示Vue实例内的某个数据，并且当Vue实例数据更新时，这里的显示也要更新”即可。

Vue实例还做的另外一件事，是托管了data()返回的数据对象。数据对象的方法本来的做法是：
    
    this.$data.count
    
因为Vue实例的托管，你可以通过

    this.count

访问达到data对象的count。这样的简易设计，真是讨人喜欢。

再看下@click，它其实是v-on:click的简写，就是说本来应该写为：

    <button v-on:click="inc">+</button>

这里就需要引出一个非常常用的、叫做“指令”的概念。指令是带有v-前缀的特殊HTML标签属性。。指令的职责就是当其表达式的值改变时相应地将某些行为应用到DOM 上。

1. 指令能接受一个参数，在指令后以“：”指明。
2. 指令能接受一个修饰符，是以“.”指明的特殊后缀
3. 指令能接受一个属性值，预期是单一JavaScript表达式

让我们回顾一下在介绍里的例子：v-on就是一个指令，它接受一个参数为click，接受的属性值为inc。语义我们已经在上文提及，就是把onclick事件绑定到inc方法上。

指令的概念非常重要，也是扩展和复用代码的一种方式，除了我们看到的v-on，还有很多可以使用的指令，比如v-for用于循环复制当前标签等等。我会在后文继续提及。

在新的vue版本中组件被认为更好的复用代码和分离关注点的方式。接下来，我们使用同样的案例，讲解组件。我们可以看到HTML代码：

    <div id="app">
        <span>{{count}}</span>
        <button @click="inc">+</button>
    </div>

标签<span>和<button>其实一起合作，完成一个完整的功能，它们是内聚的；因此组件的基础概念，如果可以使用一个`自定义标签`，把它们两个包装到一个组件内会是一种更好的实践。以此观念，做完后应该得到这样的代码：

    <div id="app">
        <counter></counter>
    </div>
 
实际上开发起来并不困难，只是需要创建一个组件，把本来在Vue实例内的方法和数据，移动到此组件内，把在HTML内的两个标签也移动到组件的模板内。以下代码是可以直接保存为html文件，并使用浏览器来打开运行的：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <counter></counter>
    </div>
    <script>
    var counter = {
            'template':'<div><span>{{count}}</span><button v-on:click="inc">+</button></div>',
             data () {
                return {count: 0}
              },
              methods: {
                inc () {this.count++}
              }
        }
      
    new Vue({
      el:'#app',
      components:{
        counter : counter
       }}
    )
    
    </script>

这一次，我们见到了新的内容:

1. Vue的新属性template。它的值用来加载html模板代码。本案例中，就是放置本来在主HTML内的两个标签。需要注意的是，它们之外包括了一个div标签。因为Vue2.0版本要求作为模板的html必须是单根的。
2. Vue的新属性components，用来注册一个局部组件。正是在此处，组件counter被注册，从而在html标签内可以直接使用<counter></counter>来引用组件counter的。

尽管这个案例太小了，还看不出太大的好处。但是这样的组件引入，让相关性强的html元素和对应的数据、代码内聚到了一起，这是符合软件工程原则的、因此是值得鼓励的行为。

新组件完全可以分离到另外一个script文件内，从而达到不仅仅是逻辑上的代码和主html分离，也做到了物理上的分离。

另外，使用template在代码内些html，还是比较烦人：

1. 你得小心的在外层使用单引号，在内部使用双引号
2. 混杂js和html观感不佳

此时，可以使用的替代方法：
1. render函数。实际上所有的template字符串本来在内部就被编译为render函数的
2. 单文件组件技术
3. 或者vue支持的JSX。

当然，后两种方法就需要转译器和打包工具的配合。比如Babel和webpack的。这些内容，请搜索参考

1. vue.js - advance - render 函数小抄
2. vue.js的起步

暂时不在讨论之列。

