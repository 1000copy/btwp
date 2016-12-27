##组件编码风格

Vue组件是很好的复用代码的方法。接下来，我们使用一个微小的案例来讲解组件。我们可以看到HTML代码：

    <div id="app">
        <span>{{count}}</span>
        <button @click="inc">+</button>
    </div>

标签`<span>`和`<button>`其实一起合作，完成一个完整的功能，它们是内聚的；因此可以利用组件的概念，用一个语义化的`自定义标签`，把两个标签包装到一个组件内。以此观念，做完后应该得到这样的代码：

    <div id="app">
        <counter></counter>
    </div>
 
为此，我们需要创建一个组件，它可以容纳两个标签以及和它们有关的方法和数据在一起。我们会采用多种方案来完成此组件，从而了解组件的多种编码风格。首先，我们从使用`集中template`的组件编码风格开始。

###集中模板式

以下代码是可以直接保存为html文件，并使用浏览器来打开运行的：

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
      
    var app = new Vue({
      components:{
        counter : counter
       }}
    )
    app.$mount('#app')
    </script>

我们对代码稍作解释:

1. Vue的实例属性template。它的值用来承载模板代码，本来放置在主HTML内的两个标签现在搬移到此处。需要注意的是，两个标签外套上了一个div标签，因为Vue2.0版本要求作为模板的html必须是单根的。
2. Vue的实例属性components。它可以被用来注册一个局部组件。正是在此处，组件counter被注册，从而在html标签内可以直接使用标签`<counter>`来引用组件counter的。

引入组件技术后，强相关性的html标签和对应的数据、代码内聚到了一起，这是符合软件工程的分治原则的行为。

另外，使用template在代码内混合html字符串还是比较烦人的：

1. 你得小心的在外层使用单引号，在内部使用双引号
2. 如果html比较长，产生了跨行的话，那么这样的字符串书写比较麻烦

我们继续查看其它方案。

###分离模板式

为了增加可读性，模板字符串内的HTML可以使用多种方式从代码中分离出来。比如采用x-template方法:

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script type="x-template" id="t">
        <div>
          <span>{{count}}</span>
          <button v-on:click="inc">+</button>
        </div>
    </script>
    
    <div id="app">
      <counter></counter>
    </div>
    <script>
    var counter = {
              'template':'#t',
             data () {
                return {count: 0}
              },
              methods: {
                inc () {this.count++}
              }
        }
      
    var app = new Vue({
      components:{
        counter : counter
       }}
    )
    app.$mount('#app')
    </script>

模板x-template使用标签script，因为这个标签的类型是浏览器无法识别的，故而浏览器只是简单的放在DOM节点上。这样你可以使用getElementById方法获得此节点，把它作为HTML片段使用。

或者使用在HTML5引入的新标签template，看起来稍微干净些：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <template id="t">
        <div>
          <span>{{count}}</span>
          <button v-on:click="inc">+</button>
        </div>
    </template>
    
    <div id="app">
      <counter></counter>
    </div>
    <script>
    var counter = {
              'template':'#t',
             data () {
                return {count: 0}
              },
              methods: {
                inc () {this.count++}
              }
        }
      
    var app = new Vue({
      components:{
        counter : counter
       }}
    )
    app.$mount('#app')
    </script>

或者如果组件内容并不需要做`分发`的话，可以通过inline-template标记它的内容，把它当作模板：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <counter  inline-template>
        <div>
          <span>{{count}}</span>
          <button v-on:click="inc">+</button> 
        </div>
      </counter>
    </div>
    <script>
    var counter = {
             data () {
                return {count: 0}
              },
              methods: {
                inc () {this.count++}
              }
        }
      
    var app = new Vue({
      components:{
        counter : counter
       }}
    )
    app.$mount('#app')
    </script>


###函数式

Render函数可以充分利用JavaScript语言在创建HTML模板方面的灵活性。实际上，组件的Template最终都会转换为Render函数的。对于同一的需求，使用Render函数的代码如下：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <counter></counter>
    </div>
    <script>
        var a = {
               data () {
                  return {count: 1}
                },
                methods: {
                  inc () {this.count++}
                },
                render:function(h){
                  // var self = this;
                  var buttonAttrs = {
                      on: { click: this.inc },
                      domProps: {
                          innerHTML: '+'
                      },
                  };
                  var spanAttrs = {
                      on: { click: this.inc },
                      domProps: {
                          innerHTML: this.count.toString()
                      },
                  };
                  var span = h('span', spanAttrs, []);
                  var button = h('button', buttonAttrs, []);
                  return h('div' 
                    ,{},
                    [
                      span,
                      button
                    ])
    
                 }
          }
    
      new Vue({
        el:'#app',
        components:{
          counter : a
         }}
      )
    
    </script>

函数render的参数h，其实是一个名为createElement 的函数，可以用来创建元素。此函数的具体说明，请参考官方手册即可。为了方便，完整的使用createElement的实例代码抄写自vue.js手册。如下 ：

    createElement(
      // {String | Object | Function}
      // An HTML tag name, component options, or function
      // returning one of these. Required.
      'div',
      // {Object}
      // A data object corresponding to the attributes
      // you would use in a template. Optional.
      {
        // (see details in the next section below)
      },
      // {String | Array}
      // Children VNodes. Optional.
      [
        createElement('h1', 'hello world'),
        createElement(MyComponent, {
          props: {
            someProp: 'foo'
          }
        }),
        'bar'
      ]
    )


如果我需要标签名本身都是可以动态的话，怎么办？比如我希望提供一个标签，可以根据属性值动态选择head的层级，像是把

    <h1>header1</h1>
    <h2>header2</h2>  
    
可以替代为：

       <hdr :level="1">header1</hdr>
       <hdr :level="2">header2</hdr>

使用`render`函数解决此类问题是非常便利的。具体做法就是首先注册一个组件：

    Vue.component('hdr', {
      render: function (createElement) {
        return createElement(
          'h' + this.level,   // tag name
          this.$slots.default // array of children
        )
      },
      props: {
        level: {
          type: Number,
          required: true
        }
      }
    })
    
随后在html内使用此组件：

    //javascript
    new Vue({
      el: '#example'
    })
    
    // html
    <div id="example">
       <hdr :level="1">abc</hdr>
       <hdr :level="2">abc</hdr>
    </div>

可以执行的代码在此：

    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.3/vue.js">
    </script>
    <div id="example">
       <hdr :level="1">abc</hdr>
       <hdr :level="2">abc</hdr>
    </div>
    <script type="text/javascript"> Vue.component('hdr', {
      render: function (createElement) {
        console.log(this.level)
        return createElement(
          'h' + this.level,   
          this.$slots.default 
        )
      },
      props: {
        level: {
          type: Number,
          required: true
        }
      }
    })
    new Vue({
      el: '#example'
    })
    </script>

    
函数render会传入一个createElement函数作为参数，你可以使用此函数来创建标签。在render函数内，可以通过this.$slots访问slot，从而把slot内的元素插入到当前被创建的标签内。

