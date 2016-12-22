#路由

vue-router是一个vue官方提供的路由框架，有它来做一个SPA变得比较容易。本文使用vue-router2.0，来提供一个快速的、可以抄写的原型，帮助你快速上手单页应用。

假设我们做一个SPA，共两个页面，分为为home、about，并提供导航URL，点击后分别切换这两个页面，默认页面为home。那么

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

Bingo！。
