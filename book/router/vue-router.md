#路由

vue-router是一个vue官方提供的路由框架，使用它让完成一个SPA（Single Page App ，单页应用）变得更加容易。本文使用vue-router2.0，创建一个快速的、可以抄写的原型，帮助你快速上手SPA类型应用。

假设我们做一个SPA，共两个页面，分为为home、about，并提供导航URL，点击后分别切换这两个页面，默认页面为home。那么，可以有两种方法完成此路由应用，差别在于是否使用脚手架。

## 不使用脚手架

创建SPA应用是非常简单的，我们只要把组件和URL做好映射，并通知vue-router知道即可。代码如下:


    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

    <div id="app">
      <h1>Router test</h1>
      <p>
        <router-link to="/home">Go home</router-link>
        <router-link to="/about">Go about</router-link>
      </p>
      <router-view></router-view>
    </div>
    <script>
    //首先创建组件Home和About
    const Home = { template: '<div>home</div>' }
    const About = { template: '<div>about</div>' }
    //其次，做好组件和URL的映射
    const routes = [
      { path: '/home', component: Home },
      { path: '/about', component: About },
    ]
    //通知router映射关系
    const router = new VueRouter({
      routes :routes
    })
    // 把router注册到app内，让app可以识别路由
    const app = new Vue({
      router
    }).$mount('#app')

    </script>

关于HTML标签的代码，稍作解释：

1. 首先引入Vue.js和Vue-router.js文件。为了方便，我们依然使用来自unpkg.com的js文件
2. 使用自定义组件router-link来指定页面导航，通过属性to指定页面导航的URL。组件router-link会被渲染为`<a>`标签
3. 使用自定义组件`<router-view>`作为组件渲染的定界标记，符合当前导航URL的组件将会被渲染到此处

针对其中的js代码的解释见标注。

## 使用脚手架

首先，初始化开发环境。我们使用vue-cli工具来做一个vue工程脚手架。如果你还没有安装vue-cli，那么首先：

    npm install -g vue-cli

创建脚手架：

    vue init webpack vuetest

随即：

    cd vuetest
    npm i 
    npm run dev

此时可以看到命令行会自动打开一个浏览器窗口，并显示出默认的vue模板化的UI。现在关闭当前命令执行(使用ctrl+c）。接下来，需要安装依赖：

    npm i vue-router --save
    
现在，用如下内容替代默认的main.js文件：

    import Vue from 'vue'
    import App from './App'
    
    import VueRouter from 'vue-router'
    Vue.use(VueRouter)
    
    const Home = { template: '<div>home page</div>' }
    const About = { template: '<div>about page</div>' }
    const router = new VueRouter({
      routes :[
    	  { path: '/home', component: Home },
    	  { path: '/about', component: About },
    	  { path: '/', redirect: '/home' }
      ]
    })
    new Vue({
      el: '#app',
      template: '<App/>',
      router: router,
      components: { App }
    })
    
使用如下代码替代app.vue文件内容：

    <template>
      <div id="app"><p>hi</p>
        <router-link to="/home">Home2</router-link>
        <router-link to="/about">About1</router-link>
        <router-view></router-view>
      </div>
    </template>
    
    <script>
    
    </script>
    
    <style>
    
    </style>

再次执行

    npm run dev

看到的页面有了两个链接，点击这两个链接，可以在SPA内切换页面。

完成。
