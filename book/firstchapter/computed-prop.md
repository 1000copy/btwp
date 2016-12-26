##计算属性内幕

vue计算属性特别好用，但是它是如何做到的这一点的呢？

我们首先从一个案例开始。它有一个input可以输入货币值，另外一个span会把货币加上一￥符号。当货币值变化时，span会跟着变化：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <input v-model="money"></input>
      <span>{{RMB}}</span>
    </div>
    <script>
      new Vue({
        el:'#app',
        data:{
          money:1.10
        },
        computed:{
          RMB:function(){
            return '￥'+this.money
          }
        }
      })
    </script>
    
这里的RMB属性就是一个计算属性，依赖于this.money,伴随后者的变化而变化。

然而，这是如何做到的？难道Vue.js分析了RMB函数内的表达式吗。要知道这一点，我们得了解响应式属性的概念和技术。通过DefineProperty，可以创建一个看起来是普通数据，但是背后还有getter/setter函数的属性，像是这样：

      var bank = {moneyNormal:1};

      Object.defineProperty (bank, 'money', {
        get: function () {
          console.log ("Getting money");
          return 1;
        }
      });
      console.log ("money:", bank.money,bank.moneyNormal);
      
尽管使用起来bank.money和bank.moneyNormal差不多，实际上每次访问money会首先经过getter函数，这样就可以在此函数内做些自己想要做的事儿。vue就是会把所有在data返回的属性做一次DefineProperty处理，把它变成响应式的属性，因此每次访问此类属性，vue都可以知道的。这一点对于计算属性至关重要！

再进一步，就是当RMB计算属性被调用执行时，必然会调用到this.money，this.money会引发它自己的getter函数。因此只要在RMB属性调用this.money之前做些手脚，让this.money的getter知道此调用是从RMB getter来的即可记录以来，未来改变this.money,就可以通知依赖，由此引发连锁的更新反应。代码：

    var Dep = {
      target: null 
    }
    function defineVUEProperty (obj, key, val) {
      var deps = [];
      Object.defineProperty (obj, key, {
        get: function () {
          // 处理计算依赖
          if (Dep.target && deps.indexOf (Dep.target) == -1) {
            deps.push (Dep.target);
          }
          return val;
        },
        set: function (newValue) {
          val = newValue;
          // 处理计算依赖      
          for (var i = 0; i < deps.length; i ++) {
            deps[i]();
          }
        }
      })
    }
    function defineVUEComputed (obj, key, computeFunc) {
      var onDependencyUpdated = function () {
        var value = computeFunc ();
        console.log('dependence value:'+value)
      };
      
      Object.defineProperty (obj, key, {
        get: function () {
          // 处理计算依赖
          Dep.target = onDependencyUpdated;
          var value = computeFunc ();
          // 处理计算依赖
          Dep.target = null;
          return value;
        }
      })
    }
    //demo code
    var bank = {};
    defineVUEProperty (bank, 'money', 1);
    defineVUEComputed (bank, 'RMB', function () {
      return '$'+bank.money
    });
    console.log (bank.money,bank.RMB)
    bank.money = 22;
    
我们会发现，当执行完代码`bank.money = 22;`,确实会激发RMB的重算，因为代码打印了:

    dependence value:￥42

做出手脚的代码已经被标注出来。要点是:

1. 首先由一个全局变量Dep，它是一个单实例对象，成员为target
2. 当执行计算属性的getter时，它设置一个回调函数到Dep.target，然后调用被依赖的属性的getter，在此getter内检查Dep.target，如果有值并且没有加入当前属性的依赖列表就把它加进来。这样就把依赖此属性的计算属性指定的回调加入了依赖列表内
3. 修改属性（调用属性的setter）时，对应的setter函数调用所有前一步加入的依赖列表内的回调，等于是把控制权转移给了对应的计算属性


参考：Vue.js Internals: How computed properties work | Anirudh Sanjeev