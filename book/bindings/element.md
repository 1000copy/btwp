
##元素绑定

不但可以做属性绑定，元素可以绑定的。比如根据表达式条件的不同来绑定不同的元素，或者循环绑定元素。

###v-if

指令v-if可以完成条件化的元素绑定。比如：

    <h1 v-if="false">h1</h1>
    <h2 v-else>h2</h2>

当然，如果不必要，v-else是可以不写的：

    <h1 v-if="true">h1</h1>

如果需要条件化绑定的是一组元素，可以使用`<template>`来打包分组：

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
