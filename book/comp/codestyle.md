##组件编码风格

Vue组件被认为更好的复用代码和分离关注点的方式。接下来，我们使用同样的案例，讲解组件。我们可以看到HTML代码：

    <div id="app">
        <span>{{count}}</span>
        <button @click="inc">+</button>
    </div>

标签`<span>`和`<button>`其实一起合作，完成一个完整的功能，它们是内聚的；因此组件的基础概念，如果可以使用一个`自定义标签`，把它们两个包装到一个组件内会是一种更好的实践。以此观念，做完后应该得到这样的代码：

    <div id="app">
        <counter></counter>
    </div>
 
实际上开发起来并不困难，只是需要创建一个组件，把本来在Vue实例内的方法和数据，移动到此组件内，把在HTML内的两个标签也移动到组件的模板内。我从最简单的、使用template字符串的组件开始。

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

这一次，我们见到了新的内容:

1. Vue的新属性template。它的值用来加载html模板代码。本案例中，就是放置本来在主HTML内的两个标签。需要注意的是，它们之外包括了一个div标签。因为Vue2.0版本要求作为模板的html必须是单根的。
2. Vue的新属性components，用来注册一个局部组件。正是在此处，组件counter被注册，从而在html标签内可以直接使用<counter></counter>来引用组件counter的。

尽管这个案例太小了，还看不出太大的好处。但是这样的组件引入，让相关性强的html元素和对应的数据、代码内聚到了一起，这是符合软件工程原则的、因此是值得鼓励的行为。

新组件完全可以分离到另外一个script文件内，从而达到不仅仅是逻辑上的代码和主html分离，也做到了物理上的分离。

另外，使用template在代码内些html，还是比较烦人：

1. 你得小心的在外层使用单引号，在内部使用双引号
2. 混杂js和html观感不佳

###分离模板式

模板内的HTML，可以由多种方式从代码中分离出来，以便增加可读性。第一种方式采用x-template:

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

模板x-template使用标签script，因为这个类型是浏览器无法识别的，因此浏览器只是简单的放在DOM节点上，你可以同一般的getElementById方法获得此节点，把它作为HTML片段使用。

或者使用在HTML5引入的新标签template，看起来更干净些：

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

模板是组件的一部分，它应该是和组件的其他定义内聚在一起。所以，应该尽量避免使用这两种模板方案，除非这是一个小应用或者演示程序代码。

###函数式

Render函数可以充分利用JavaScript语言在创建HTML模板方面的灵活性。实际上，组件的HTML模板最终都会转换为Render函数类型。对于同一的需求，使用Render函数的代码如下：

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



vue.js推荐使用的扩展名为vue的组件模板，可以让标签的属性和内容都变得动态，这是很强大也很已用的能力。但是，如果我需要标签名本身都是可以动态的话，怎么办？

比如我希望提供一个标签，可以根据属性值动态选择head的层级，像是把

    <h1>header1</h1>
    <h2>header2</h2>  
    
可以替代为：

       <hdr :level="1">header1</hdr>
       <hdr :level="2">header2</hdr>

答案就是`render`函数。具体做法就是首先注册一个组件：

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

    
函数render会传入一个createElement函数作为参数，你可以使用此函数来创建标签。第一个参数就是标签名称，以及为创建的标签提供属性和内容，以及创建子标签。在render函数内，可以通过this.$slots访问slot，从而把slot内的元素插入到当前被创建的标签内。