#脚手架

稍微像样一点的vuejs的开发过程几乎总是需要使用脚手架的。使用它可以解锁新的可能：

1. Single-file components(单文件组件)。因为它可以把HTML，CSS，JavaScript放到一起，以一个组件形式出现
2. 可以使用你喜爱的脚本。ES6、Coffee等，都可以通过脚手架提供的代码把它们翻译成浏览器可以识别的格式

然后，随即带来的就是急剧增长的复杂性：

1. 需要模块打包工具。本书使用webpack
2. 需要学习ES6。单文件组件内默认的js代码需要使用的是ES6的类
3. 需要学习node、npm方面的知识

##单文件组件

我们依然采用案例说明问题。以往我们曾经创建过这样的组件：

1. 一个span，红色，初始值为0
2. 一个按钮
2. 点击按钮，span内数字加1

过往的程序是这样的：

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
    <style>
      span{color:red}
    </style>

如果使用一般的组件编写方法，可以把混合在HTML内的组件相关的标签、代码、css整体的搬移出来，放到一个单独的、扩展名为vue的文件。代码如下：

      <template>
        <div>
          <span>{{count}}</span>
          <button v-on:click="inc">+</button>
        </div>
      </template>
      <script>
      export default {
         data () {
            return {count: 0}
          },
          methods: {
            inc () {this.count++}
          }
      }
      </script>  
      <style scoped>
        span{color:red}
      </style>

文件内分为三个部分，`<template>`标签包围内的是模板代码；  `<script>`内包围的是js代码，并且可以使用ES6的语法。 `<style>`内的则是css代码。于是只要一个vue文件，就可以集中放置和组件相关的全部js、css、html，从而变成完整的、自包含的组件了。

然而，浏览器是无法识别这个看起来简单但是却不真实的组件的。因此Vue.js需要做打包，一个预处理工作，把这样组件转换成为浏览器可以识别的格式。其中包括：

1. 创建一个vue-loader的工具，首先抽取vue文件的各个部分把它打包成js
2. 工具babel把ES6语法的js转换为浏览器支持的ES6代码。
3. 打包工具webpack组合两者的工作。

于是webpack首先调用vue-loader，vue-loader会调用babel转换ES6代码为ES5代码，并且把css和html作为模块也转换为客户端js代码。这些js代码浏览器就可以识别了。

##vue-cli脚手架工具

把webpack、babel搭配起来需要很多配置，极为繁琐的。幸好vue.js 提供了一个工具，叫做vue-cli，它可用于快速搭建应用起步代码。只需一分钟即可启动常用的开发特性：

1. 可用的脚手架代码。
2. 热重载。组件代码更新后自动重新加载
3. 静态代码检查。
4. ES6语言特性

我们就以此组件为例，介绍vue-cli的使用。


确认好node版本的。我的版本是

    $ node -v
    v5.0.0
    $ npm -v
    3.10.6

很多问题如果出现，可能和版本有关，建议和我一致 。

随后首先当然是安装vue-cli：

    $ npm install -g vue-cli


使用vue-cli创建新项目。执行：

    $ vue init webpack my-project

第二个参数webpack，指明创建一个基于 "webpack" 模板的vuejs项目。此模板会创建一个webpack的脚手架代码。webpack是一个打包工具，可以把js、css、image打包成一个或者多个js文件，并且可以支持各种loader作为插件对不同类型的文件做转换处理。实际上webpack就是通过插件vue-loader在加载vue类型的文件时做格式转换，把vue类型文件翻译为浏览器可以识别的js文件。webpack的详细信息会单独介绍，这里你只要知道webpack是一个打包工具，有了它（或者类似的工具）单文件组件.vue才成为可能。

当前可以使用的模板有：

1. webpack - 通过webpack和vue-loader插件，可以调用babel把.vue文件编译为客户端可以识别的js文件。默认还可以提供热加载、代码检查、测试。
2. webpack-simple - 最简单的webpack和vue-loader插件。
3. browserify - 通过Browserify + vueify 的组合，可以调用babel把.vue文件编译为客户端可以识别的js文件。默认还可以提供热加载、代码检查、测试。
4. browserify-simple - 最简单的Browserify + vueify 插件。

理论上webpack和browserify的功能类似，都可以做打包工具。webpack功能强大并且非常的热门。所以，我们就先使用webpack。

然后，安装npm的惯例，首先把依赖安装起来：

    $ cd my-project
    $ npm install
    $ npm run dev

完成后，此时服务器已经启动并监听到8080端口，现在使用浏览器访问http://localhost:8080，你可以看到vue-cli默认的界面。

##应用单文件组件

使用编辑器打开src/components/Hello.vue文件，删除其内全部内容，代之以如下代码：

    <template>
      <div>
        <span>{{count}}</span>
        <button v-on:click="inc">+</button>
      </div>
    </template>
    <script>
    export default {
       data () {
          return {count: 0}
        },
        methods: {
          inc () {this.count++}
        }
    }
    </script>  
    <style scoped>
      span{color:red}
    </style>

在浏览器内应该可以看到如下界面：

    [](scaffold/webpack/sfc.png)



### 热加载测试

我们之前提到了热加载，意思是如果代码被改动了，并不需要你去刷新浏览器，它会自动的更新最新的代码过来的。现在，你可以把组件的count默认值改改然后保存，我们可以看到浏览器会自动刷新新的值的。有了热加载，调试和修改代码会变得轻松些。


### 回归日常

我们所有的编辑修改一旦完成需要更新网站时，最终需要把所有的vue，ES6代码等编译出来到ES5的js文件。现在可以构建这些webpack代码：

    npm run build

此命令会把我们已经有的开发成果，编译到dist目录下，就是说编译成前端可以直接使用的html、js、css。

有了它们，我就可以使用一个http 静态服务器，在dist目录内执行：

    cd dist 
    npm install http-server -g
    http-server

然后，到http://localhost:8080查看效果。和运行`npm run dev`看到的一模一样。

### 查看vue文件

vue文件是三位一体的。就是说css、html、js都在一个文件内，这意味着一般的编辑器并不能对它进行语法高光显示。为了更好的查看结构，建议首先安装对应编辑器的高光插件，便于代码的阅读和编写。这个插件叫做vue-syntax-highlight，是vuejs官方提供的。它位于github.com。

我习惯使用的编辑器是sublime text，这里以此编辑器为例。只要把仓库vue-syntax-highlight克隆到你的Sublime包目录内。在我的电脑上，Sublime包目录是

  /Users/lcj/Library/Application\ Support/Sublime\ Text\ 3/Packages ，

所以安装的过程就是：

    cd /Users/lcj/Library/Application\ Support/Sublime\ Text\ 3/Packages 
    git clone https://github.com/vuejs/vue-syntax-highlight

然后重新启动sublime text即可。

