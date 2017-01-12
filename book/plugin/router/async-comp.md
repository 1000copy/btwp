### 异步组件

可以在路由切换时才装入需要的组件，从而有效的提高首次装入页面的速度。

#### 异步组件的实现

Vue.js允许将组件定义为一个工厂函数，动态地解析组件的定义。工厂函数接收一个resolve回调，成功获取组件定义时调用。也可以调用reject(reason)指示失败。

假设我们有两个组件Home、About。Home组件和首页同步加载，而About组件则按需加载。案例的代码有首页index.html，组件代码about.js构成。

首先是about.js代码：

    Vue.component('about', {
      template: '<div>About page</div>'
    });

接下来是index.html代码：

    <html>
    <head>
      <title>Async Component test</title>
    </head>
    <body>

      <div id="app">
        <router-link to="/home">/home</router-link>
        <router-link to="/about">/about</router-link>
        <router-view></router-view>
      </div>

      <script src="https://unpkg.com/vue/dist/vue.js"></script>
      <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
      <script>
        function load(componentName, path) {
          return new Promise(function(resolve, reject) {
            var script = document.createElement('script');
            script.src = path;
            script.async = true;
            script.onload = function() {
              var component = Vue.component(componentName);
              if (component) {
                resolve(component);
              } else {
                reject();
              }
            };
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }
        var router = new VueRouter({
          routes: [
            {
              path: '/',
              redirect:'/home'
            },
            {
              path: '/home',
              component: {
                template: '<div>Home page</div>'
              },
            },
            {
              path: '/about',
              component: function(resolve, reject) {
                load('about', 'about.js').then(resolve, reject);
              }
            }
          ]
        });
        var app = new Vue({
          el: '#app',
          router: router,
        });
      </script>

    </body>
    </html>

为了加载在服务器的js文件，我们需要一个HTTP服务器。可以使用node.js的http-server实现。安装并启动一个服务器的方法：

    npm install http-server -g
    http-server

访问：

    http://127.0.0.1:8080

我们即可在首页看到home和about的链接，点击home可以显示home组件，点击about，如果还没有加载过，就加载about组件。

对index.html内的代码稍作解释:

1. 组件定义为`function(resolve, reject) {}`函数，其内调用load函数，成功后resolve，否则reject
2. 函数load内通过创建标签`script`加载指定文件，并通过onload事件当加载完成后，通过`Vue.component`验证组件，存在就resolve,否则reject

#### 异步组件的webpack方案

如果使用webpack脚手架的方式，加载异步组件将会更加直观。本节会用同样的案例，使用webpack做一次演示。

首先创建脚手架，并安装依赖

    vue init webpack vuetest
    cd vuetest
    npm i
    npm run dev

访问localhost:8080，可以看到Vue的默认页面。然后替换main.js文件为：

    import Vue from 'vue'
    import App from './App'

    import VueRouter from 'vue-router'
    import About from './components/about'
    Vue.use(VueRouter)

    const Home = { template: '<div>home page</div>' }
    // const About = { template: '<div>about page</div>' }
    const router = new VueRouter({
      routes :[
        { path: '/home', component: Home },
        { path: '/about', component: function (resolve) {
            require(['./components/about'], resolve)
            } 
        },
        { path: '/', redirect: '/home' }
      ]
    })
    new Vue({
      el: '#app',
      template: '<App/>',
      router: router,
      components: { App }
    })
并添加组件about到`src/components/about.vue`:

    <template>
      <div>about page</div>
    </template>

再次访问localhost:8080，可以看到Home组件和about组件的链接，点击链接试试，可以看到组件home和about都是可以加载的。

这里特别要解释的是代码：

    component: function (resolve) {
        require(['./components/about'], resolve)
        } 
    }

Vue.js支持component定义为一个函数：`function (resolve) {}`，在函数内，可以使用类似node.js的库引入模式

   require(['./components/about'], resolve)

从而大大的简化了异步组件的开发。当然，代价是你需要使用脚手架代码。这个特殊的require语法告诉webpack自动将编译后的代码分割成不同的块，这些块将通过按需自动下载。






