我们从一个实际的app开始介绍vue.js。这个app就是一个todo管理的应用,它看起来是这样的：

![todoapp.png](todoapp.png)

作为一个可以使用的app，它可以：
1. 点击按钮add，可以把第一个input内的文字作为内容创建一个新的todo条目
2. 点击按钮X，可以删除对应的条目

如果你很性急，那么可以直接看代码：

http://codepen.io/1000copy/pen/ZBbdBp

首先是要html快速编写一个界面原型：

    
    <div id="todo-app">
        <h1>todo app</h1>
        <input type="text" placeholder='new todo'/><button>add</button>
        <ul>
          <li>item 1<button>X</button></li>
          <li>item 2<button>X</button></li>
          <li>item 3<button>X</button></li>
        </ul>
    <div>

现在我们加入vuejs的脚本文件。

    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.5/vue.common.js"></script>

随后，我们在script内创建Vue实例，并绑定到div#todo-app上，并且把静态的li换成动态的。这里同时添加了一个Vue实例方法，放在methods属性内，方法名为rm，以备删除事件发生时调用：
    
    var app= new Vue({
      el:'#todo-app',
      data:{
        items:['item 1','item 2','item 3'],
        todo:''
      },
      methods:{
        rm:function(i){
          this.items.splice(i,1)
        }
      }
    })
    
在html内，使用指令v-for从Vue实例内加载数据：

       <ul>
          <li v-for="(item, index) in items">{{item}}
            <button @click="rm(index)">X</button></li>
        </ul>
        
指令v-for会把当前所在元素（li）循环items长度指定的次数，把li重复多次渲染出来。因为当前Vue实例内的items长度为3，所以循环三次，和最初的html模板显示的内容是一致的。v-for不但可以按照每次循环取得当前项目item，还可以同时取出当前循环索引值，因为button内删除事件需要使用当前索引，这里把它取出来备用。注意另外一个特别的指令@click，它是v-on:click的缩写，标识绑定事件到rm方法上，参数为index。执行后，点击按钮x，我们就可以删除一个todo条目。

同样的，通过v-model指令，把input绑定到this.todo，把事件add绑定到按钮`add`:

    <input type="text" placeholder='new todo' v-model='todo'/> <button @click="add">add</button> 

并对应加入方法：

    methods:{
        add:function(){
          if(this.todo){
            this.items.push(this.todo)
            this.todo =''
          }
        },
    }

一个可以显示、添加、删除的todo应用就这样完成了。

