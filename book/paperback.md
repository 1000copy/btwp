
#后记

对其他框架我是佩服，对Vue.js我则是爱。我就是一眼看上了Vue.js,于是用它做各种东西，反反复复多次。然后但我觉得有些融会贯通时，我又回头去思考这样的问题：让我感觉到的Vue.js的靓丽具体是什么？

还是上案例对比说明。这次的案例，UI看起来是：

![](perface.png)

这是由一个span、两个按钮构成的界面。点击按钮会让span加1或者减1。

##vanilla.js 

vanilla.js的意思是，不使用任何框架。我们使用vanilla.js实现的代码是这样的：

    
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

第二个出场的是jquery。我个人认为前端历史上来说，有几个标志性事件:

1. 微软加入了XMLHttpRequest。从此Ajax技术一发而不可收
2. jquery。简单的Selector，精简的API，令世人只有有jquery，不知道有Vanilla.js 
3. Vue.js等相类似的框架。引入了数据绑定，以及组件技术到前端开发

jquery当然是不错的技术。那么，使用它完成一样的代码，效果会如何呢？

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

然而，内核基本不变：依然需要编码添加EventListener、依然是命令式的取值和修改值，依然需要懂得DOM的节点选择、事件监听、回调函数等。

##Vue.js

最后出场的是Vue.js，代码是这样的：

    <script src="https://unpkg.com/vue/dist/Vue.js"></script>
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

1. 规整。数据（data）方法(methods)放置的工工整整，一目了然。它充分的利用js的字面量对象的语法
2. 整个应用接口设计，基本上采用的都是极为简洁的词汇。一眼看过去，一个复合词也没有（比如getElementById就是4个词复合起来的）


现在，你看到的好处是：

1. 现在，你不需要挂接EventListener，使用`@click`语法自动绑定事件，使用{{}}自动绑定数据
2. 你不需要DOM的一系列的知识就可以构造此程序；对初学者来说，这个门槛真是降低太多

Vue.js的优美和简约，来源于声明式编程的理念。就是说我不需要通过一系列的函数调用来完成一件事儿，而是直接声明想要做到什么。具体说来：

1. 程序员直接声明{{count}}，告诉Vue此处使用Vue实例中的data对象内的count属性来填充。而不是调用.getElementById,.textContent来设置。
2. 程序员通过`@click`直接声明点击事件指向位置为Vue实例内对象methods对应的方法。而不是通过调用.addEventListener，传入回调函数的方式来实现事件监听

整个Vue.js的应用接口设计的非常优美，但是能量巨大，做到这一点需要很多功力。这就是我佩服的设计哲学。把麻烦留给自己，让开发者感受简洁。

##放松一下

所以，既然你看到了后记，我们不妨放松下。我想利用作者的权力，留下一个小小的空间来谈谈自己。

之前我完成了第一本小书，叫做《http小书》，然后，我从自己的轻度抑郁这个坑里面爬了出来。我于是爱上了写作。时隔一年，这是我的第三本小书了。它不但让我在业余时间有更多的趣味，也帮我每天都可以有一段自己的时间，可以暂时性的断离那些令人畏惧的社交。并且依靠文字的进步，我发现我的阅读能力也大幅的提高了，这真是意外之喜。

这次的写作，我还是希望继续出电子书，而不是纸质书。原因在于，我知道我的写作一本书到何时是合适的，当我说清楚了问题，文字也清晰简明，那么就到了该完成的时刻了。而出纸书就未必了，你需要一些篇幅。我不希望我为了照顾篇幅而需要凑字。而且我一旦研究完成就会进入下一个领域，除了必要的答疑和回复读者，我不希望被太多牵绊，因此电子书是我的第一选择。当然既然是书，它一定是比起文章和博客集合来说，会更系统和严谨，会做更多的文字和代码的修订，更照顾到首尾呼应的。

说起来都是写书，我会希望有何不同呢？这真是一个好问题。我的回答是，我会努力提升一本书的信息密度。我秉持的原则是用更少的文字和代码来表达更多的信息量。表现出来的就是我把这本书写的更薄，而不是相反。在信息爆炸的年代，你知道这意味着什么。

刘传君 2016年12月30日 于 成都



