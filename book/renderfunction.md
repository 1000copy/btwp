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

   http://jsbin.com/xesihujuda/1/edit?html,js,console,output
    
函数render会传入一个createElement函数作为参数，你可以使用此函数来创建标签。第一个参数就是标签名称，以及为创建的标签提供属性和内容，以及创建子标签。在render函数内，可以通过this.$slots访问slot，从而把slot内的元素插入到当前被创建的标签内。为了方便，完整的使用createElement的实例代码抄写自vue.js手册。如下 ：

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


本来使用render的理由，就是我在封装bootstrap carousel的过程中产生的需要，如下代码是一个封装carousel的实际案例：
###javascript
    function img1(createElement,s){
      return createElement('img',{attrs:{src:'https://placehold.it/'+s}})
    } 
    
    function item(createElement,isa,s){
      return createElement('div',
      	{'class':{'item':true,'active':isa}},
        [
          img1(createElement,s)
        ])
    }
    
    function inner(createElement){
      return createElement('div',{'class':{'carousel-inner':true}},[
      	item(createElement,true,'103X100')
        ,item(createElement,false,'101X100')
        ,item(createElement,false,'102X100')
        ])
    }
    function leftcontrol(createElement){
    	 return createElement('a',
       	   {
             attrs:{
               'href':'#myCarousel1',
               'data-slide':'prev',
               'class':'carousel-control left'}
           },
        [
      	left(createElement)
        ])
    }
    function rightcontrol(createElement){
    	 return createElement('a',
       	   {
             attrs:{
               'href':'#myCarousel',
               'data-slide':'prev',
               'class':'carousel-control right'}
           },
        [
      	right(createElement)
        ])
    }
    
    function right(createElement){
    	 return createElement('span',
       	   {
             attrs:{
               'class':'glyphicon glyphicon-chevron-right'}
           },
        [])
    }
    function left(createElement){
    	 return createElement('span',
       	   {
             attrs:{
               'class':'glyphicon glyphicon-chevron-left'}
           },
        [])
    }
    
    
    Vue.component('mmm', {
      render: function (createElement) {
       return createElement('div',
            {
                //'class':{'carousel':true, 'slide':true},
                attrs:{
                	id:'myCarousel1',
                  'class':'carousel slide',
                  'data-ride':'carousel'
    
                }
            },
       			[inner(createElement),
            leftcontrol(createElement),
             rightcontrol(createElement)]
       )      
      }
    })   
    new Vue({
      el: '#example'
    })
    
###html

    <div id="example">
       <mmm></mmm>
    </div>
###可执行案例

http://jsbin.com/pulohup/edit?html,js,output

#参考
https://vuejs.org/guide/render-function.html