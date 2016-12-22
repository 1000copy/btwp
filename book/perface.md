% Vue.js小书
% 刘传君


#前言 

对其他框架我是佩服，对vue.js我则是爱。我就是一眼看上了vue.js,于是用它做各种东西，反反复复多次，然后觉得有些融会贯通，然后，我稍微细的思量了下，到底vue.js靓丽在哪？

还是上案例对比说明。这次的案例，UI看起来是：

![](perface.png)

一个span，两个按钮，点击按钮会让span加1或者减1。它简单到你不需要分心关注，但是由足够说明典型的html场景——就是既有数据呈现也有按钮操作。

##vanilla.js 

首先出场的是vanilla.js(vanilla.js的意思是，不使用任何框架） ，代码是这样的：

    
    <div id="app">
    <p><span id="count">0</span>
        <button id="inc">+</button>
        <button id="dec">-</button>
      </p>
    </div>
    <script>
        var counter = document.getElementById('count');
        var btn1 = document.getElementById('inc');
        var btn2 = document.getElementById('dec');
        var count = 0;
        btn1.addEventListener('click',function (){
                    counter.innerHTML = ++count;
                }
        )
        btn2.addEventListener('click',function (){
                    counter.innerHTML = --count;
                }
        )
    </script>
    
    
   
代码行数倒是不算多，但是看起来的感受是:

1. 使用了多个DOM API(getElementById,innerHTML)
2. DOM API设计的复合词太长

我偏爱简洁的代码，而使用DOM API就构成了一种代码的臭味，让我喜欢不起来。

##jquery

第二个出场的是jquery。我个人认为前端历史上来说，有几个标志性事件
1. 微软加入了XMLHttpRequest。从此Ajax技术一发而不可收
2. jquery。简单的Selector，精简的API，令世人只有有jquery，不知道有Vanilla.js 
3. Vue.js等相类似的框架。引入了数据绑定，以及组件技术到前端开发
所有，jquery当然是排的上好的技术了。那么，使用jq，效果如何呢？

      <script
      src="https://code.jquery.com/jquery-3.1.1.js"
      integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA="
      crossorigin="anonymous"></script>
    <div id="app">
    <p><span id="count">0</span>
        <button id="inc">+</button> 
        <button id="dec">-</button>
      </p>
    </div>
    <script>
    var count = 0 
    $('#inc').click(function(){
      $("#count").html(++count)
    })
    $('#dec').click(function(){
      $("#count").html(--count)
    })
    </script>
分析一下：

1. jquery的选择器比起原生的更好，即使和querySelector相比也更简洁
2. 使用精简的API替代Vanilla的。比如.html()比起.getElementById（）来说，是要看着舒服点的

然而，内核基本不变：依然是添加EventListener，命令式的取值和修改值，依然你得懂得DOM的节点选择、事件监听、回调函数等。

##Vue.js

最后出场的是vue，代码是这样的：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <div id="app">
      <p>{{count}}
        <button @click="inc">+</button>
        <button @click="dec">-</button>
      </p>
    </div>
    <script>
    new Vue({
      el:'#app',
      data () {
        return {
          count: 0
        }
      },
      methods: {
        inc () {
          this.count++
        },
        dec () {
          this.count--
        }
      }
    })
    </script>
    
第一感觉就是：
1. 规整。数据（data），方法(methods)放置的工工整整，一目了然。它充分的利用js的字面量对象的语法
2. 整个应用接口设计，基本上采用的都是简单。一眼看过去，一个复合词也没有（比如getElementById就是4个复合词）


好处是：

1. 现在，你不需要挂接EventListener，使用@click语法自动绑定事件，使用{{}}自动绑定数据
2. 你不需要DOM的一系列的知识就可以构造此程序；对初学者来说，这个门槛真是降低太多

Vue.js的优美和简约，来源于声明式编程的理念。就是说我不需要通过一系列的函数调用来完成一件事儿，而是直接声明想要什么事儿。比如：

1. 程序员直接声明{{count}}，告诉Vue，此处使用Vue实例中的data对象内的count属性来填充。而不是调用.getElementById,.textContent来设置。
2. 程序员通过@click直接声明点击事件指向位置为Vue实例内对象methods对应的方法。而不是通过调用.addEventListener，传入回调函数的方式来实现事件监听

整个Vue.js的应用接口设计的非常优美，但是能量巨大，做到这一点需要很多功力。这就是我佩服的设计哲学。把麻烦留给自己，让开发者感受简洁。

##作者介绍

刘传君。

创建过产品，创过业。好读书，求甚解。
可以通过 1000copy#gmail.com 联系到我

