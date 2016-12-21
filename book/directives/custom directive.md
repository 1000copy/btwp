指令允许当它的值改变时对元素应用任何DOM操作。比如我们做一个指令v-hidden，当值改变时，更新元素的style值，切换它的可见性。可以这样：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <button @click="f=!f">toggle</button>
      <input v-hidden="f"></input>
    </div>
    <script>
    Vue.directive('hidden', {
      update:function(el,binding){
        el.style.display = binding.value?'none':'inline'
      }
    })
    new Vue(
      {
        el:'#app',
        data(){
          return{f:false}  
        }
      })
    </script>

解释如下:

1. 通过Vue.directive(name,options)注册一个指令。name为指令名，options为指令选项，其中可以加入钩子函数，比如update。还有更多的钩子函数
2. 使用指令时，必须在名字前加上前缀v，比如v-hidden

所有的钩子函数都有如下的参数：

1. el: 指令所绑定的元素，可以用来直接操作 DOM 。
2. binding: 一个对象，包含以下属性：
    name: 指令名，不包括v-前缀
    value: 指令的绑定值
    oldValue: 指令绑定的前一个值
    expression: 绑定值的未求值形式
    arg: 传给指令的参数
    modifiers: 包含修饰符的对象。 比如v-my-directive.foo.bar,修饰符对象是{ foo: true, bar: true }。
3. vnode: Vue 编译生成的虚拟节点
4. oldVnode: 上一个虚拟节点

更多到钩子函数：

1. bind: 指令第一次绑定到元素时调用
2. inserted: 指令所属元素插入父节点时调用
3. update: 指令所属元素绑定值变化是更新
4. componentUpdated: 被绑定元素所在模板完成一次更新周期时调用
5. unbind: 指令与元素解绑时调用

指令可局部化注册到特定组件上，只要在组件内使用：

    directives: {
      focus: {
        // 指令的定义
      }
    }

还是以v-hidden为例：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <comp></comp>
    </div>
    <script>
    Vue.directive('hidden', {
      update:function(el,binding){
        el.style.display = binding.value?'none':'inline'
      }
    })
    
    Vue.component('comp', {
      template:'<div><button @click="hate=!hate">toggle</button><div v-hidd="hate">{{msg}}</div></div>',
      directives:{
        hidd:{
           update:function(el,binding){
             console.log(binding.value)
              el.style.display = binding.value?'none':'block'
            }
        }
      },
      data(){
        return{hate:false,msg:1}
      }
    })
    
    new Vue(
      {
        el:'#app',
        data(){
          return{f:false}  
        }
      })
    </script>
