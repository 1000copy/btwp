
## 插槽

vue.js内容分发把组件上下文的内容注入到组件。

###定义解析

现在我们看一个架空的例子，帮助理解刚刚说过的严谨而难懂的定义。假设有一个组件名为my-component，其使用上下文如下：

      <my-component>
        <p>hi,slots</p>
      </my-component>  

再假设此组件的模板为：

      <div>
        <slot></slot>
      <div>

那么注入后的组件HTML相当于：

      <div>
         <p>hi,slots</p>
      <div>

标签`<slot>`会把组件使用上下文的内容注入到此标签所占据的位置上。组件分发的概念简单而强大，因为它意味着对一个隔离的组件除了通过属性、事件交互之外，还可以注入内容。

此案例变成可以执行的代码，就是这样的：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div class="" id="app">
      <my-component>
        <p>hi,slots</p>
      </my-component>  
    </div>
    <script>
       Vue.component('my-component', {
          template: `
          <div>
            <slot></slot>
          <div>
        `
        });

    
        new Vue({
          el: "#app"
      });
    </script>

一个组件如果需要外部传入简单数据如数字、字符串等等的时候，可以使用property，如果需要传入js表达式或者对象时，可以使用事件，如果希望传入的是HTML标签，那么使用内容分发就再好不过了。所以，尽管内容分发这个概念看起来极为复杂，而实际上可以简化了解为把HTML标签传入组件的一种方法。所以归根结底，内容分发是一种为组件传递参数的方法。

###命名插槽

刚刚的案例通过slot标签，一股脑的把组件上下文的内容全部注入到组件内的规定位置。vue.js也提供了命名插槽（named slot）的技术，可以把上下文内的内容分成多个有名字的部分，然后插入到组件的不同位置：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div class="" id="app">
      <my-component>
        <p slot='slot1'>hi,slot1</p>
        <p slot='slot2'>hi,slot2</p>
      </my-component>  
    </div>
    <script>
       Vue.component('my-component', {
          template: `
          <div>
            <slot name='slot1'></slot>
            <slot name='slot2'></slot>
          <div>
        `
        });
    
        new Vue({
          el: "#app"
      });
    </script>

此案例使用了两个插槽分别为slot1，slot2，并且把它们放到组件的不同位置。

###综合案例

现在我们看一个高级的案例，我来做一个即时贴(sticky)组件，用来显示一个有标题和主体的即时贴。组件会定义好即时贴的结构，外观，而具体的标题和内容，而使用内容分发技术传入的HTML标签：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div class="" id="app">
      <sticky>
        <div slot="title">
        <h3>Title</h3></div>
        <div slot="body"><p>
          Body foo bar baz  ddd
        </p></div>
      </sticky>
    </div>
    <script>
      Vue.component('sticky', {
      template: `
      <div>
        <div class="wrapper">  
          <div>
            <div class="title">
                <slot name="title"></slot>
            </div>
            <div class="body">
                <slot name="body"></slot>
            </div>
          </div>
        </div>
      </div>`
    });
    
    new Vue({
      el: "#app"
    });
    </script>
    <style>
    .wrapper {
      display: flex;
      width: 180px;
      height: 150px;
      background: yellow;
      border-radius: 10px;
    }
    
    .title {
      border-bottom:1px solid red
    }
    .body {
      border-bottom:1px solid blue
    }
    </style>

本案例内，使用上下文通过属性slot创建了两个插槽，分别为title和body，在组件的模板内（template成员）通过`<slot>`标签的name属性引用title和body，并把它注入且放入到合适的位置上。

