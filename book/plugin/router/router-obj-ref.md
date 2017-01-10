
本文针对路由构造对象，做完整的介绍。充分利用它们可以创建更加灵活的SPA程序。通常看到的：

    const routes = [
      { path: '/foo', component: Foo },
      { path: '/bar', component: Bar }
    ]

数组内承载的就是被称为路由构造的对象。对象内属性除了最常见的path和component之外，还有更多：

1. name路由名称
2. components?: 命名视图组件
3. redirect重定向
4. alias别名
5. children嵌套路由
6. beforeEnter 钩子
7. meta元数据

## 路径

路径可以是绝对路径，比如/a/b/c，或者是相对路径a/b/c，并且路径内可以使用`:`来设置参数。比如/user/:id，这里的:id就是一个参数。有了参数化能力，就可以做动态的路由匹配。

        const router = new VueRouter({
          routes: [
            // 动态路径参数 以冒号开头
            { path: '/user/:id', component: User }
          ]
        })

此处的/user/:id会匹配如下的模式：
    
        /user/foo 
        /user/bar 

并且在代码中可以使用

     $route.params.id 

获得匹配参数，这里的情况下，匹配参数为

    foo
    bar
    
## 名称

通过名称来标识路由有时候很方便:

    const router = new VueRouter({
      routes: [
        {
          path: '/user/:id',
          name: 'user',
          component: User
        }
      ]
    })
要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：

    <router-link :to="{ name: 'user', params: { id: 123 }}">User</router-link>

会把路由导航到`/user/123`。

##别名

假设有一个路径为A，它有一个别名为B，当用户访问B时，URL保持为B，但是实际访问的是A。此功能让你可以自由地将UI结构映射到任意的URL，特别是在嵌套路由结构的情况下。

约定A的路径为`/a`,别名B为`/b`，那么对应的路由配置为：

    const router = new VueRouter({
      routes: [
        { path: '/a', component: A, alias: '/b' }
      ]
    })

如下代码演示多种别名使用的案例：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
      <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
      
     <div id="app">
              <h1>Route Alias</h1>
              <ul>
                <li><router-link to="/foo">
                  /foo (renders /home/foo)
                </router-link></li>
                <li><router-link to="/home/bar-alias">
                  /home/bar-alias (renders /home/bar)
                </router-link></li>
                <li><router-link to="/baz">
                  /baz (renders /home/baz)</router-link>
                </li>
                <li><router-link to="/home/baz-alias">
                  /home/baz-alias (renders /home/baz)
                </router-link></li>
              </ul>
              <router-view class="view"></router-view>
            </div>
      <script>
        const Home = { template: '<div><h1>Home</h1><router-view></router-view></div>' }
        const Foo = { template: '<div>foo</div>' }
        const Bar = { template: '<div>bar</div>' }
        const Baz = { template: '<div>baz</div>' }
    
        const router = new VueRouter({
          // mode: 'history', 
          routes: [
            { path: '/home', component: Home,
              children: [
                // absolute alias
                { path: 'foo', component: Foo, alias: '/foo' },
                // relative alias (alias to /home/bar-alias)
                { path: 'bar', component: Bar, alias: 'bar-alias' },
                // multiple aliases
                { path: 'baz', component: Baz, alias: ['/baz', 'baz-alias'] }
              ]
            }
          ]
        })
    
        new Vue({
          router
        }).$mount('#app')
    </script>
    
## children

实际的路由URL常常是由多层组件构成。比如：
    
        /user/:id/profile                     
        /user/:id/posts

这样的嵌套结构可以用children属性来完成：

    const router = new VueRouter({
      routes: [
        { path: '/user/:id', component: User,
          children: [
            {
              path: 'profile',
              component: UserProfile
            },
            {
              path: 'posts',
              component: UserPosts
            }
          ]
        }
      ]
    })

匹配到`/user/:id/profile`的话，渲染UserProfile，匹配到`/user/:id/posts`的话，渲染UserPosts。

## redirect

此属性可以把指定的路径（path）重定向到此路径（redirect）上。比如：

const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})

会重定向`/a`到`/b`。

## 导航钩子

导航钩子主要用来拦截导航，让它完成跳转或取消。配置如下:

      const router = new VueRouter({
          routes: [
            {
              path: '/foo',
              component: Foo,
              beforeEnter: (to, from, next) => {
                // ...
              }
            }
          ]
        })
参数说明：

1. to:    即将要进入路由对象
2. from: 将要离开的路由对象
3. next： 一定要调用该方法来 resolve 这个钩子，可以有三种调用方式：
    next(): 进行管道中的下一个钩子。
    next(false): 中断当前的导航。
    next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。

##meta

定义路由的时候可以配置 meta 字段：

    const router = new VueRouter({
      routes: [
        {
          path: '/foo',
          component: Foo,
          children: [
            {
              path: 'bar',
              component: Bar,
              // a meta field
              meta: { requiresAuth: true }
            }
          ]
        }
      ]
    })

那么如何访问这个meta字段呢？随后可以在路由对象中使用此字段信息。典型情况是在beforeEach钩子函数内使用此数据。可以看钩子函数一节。

##matched

首先，我们称呼routes配置中的每个路由对象为 路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录

例如，根据上面的路由配置，/foo/bar 这个 URL 将会匹配父路由记录以及子路由记录。

一个路由匹配到的所有路由记录会暴露为 $route 对象（还有在导航钩子中的 route 对象）的 $route.matched 数组。因此，我们需要遍历 $route.matched 来检查路由记录中的 meta 字段。

下面例子展示在全局导航钩子中检查 meta 字段：

    router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth.loggedIn()) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        next() // 确保一定要调用 next()
      }
    })

##components?: 命名视图组件

有时候想同时（同级）展示多个视图。例如创建一个布局，有 sidebar（侧导航） 和 main（主内容） 两个视图，这个时候命名视图就派上用场了。

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    
    <div id="app">
      <h1>Named Views</h1>
      <ul>
        <li>
          <router-link to="/">/</router-link>
        </li>
        <li>
          <router-link to="/other">/other</router-link>
        </li>
      </ul>
      <ul>
        <li>
      <router-view ></router-view> </li>
        <li>  <router-view  name="a"></router-view> </li>
        <li>  <router-view name="b"></router-view> </li>
      </ul>
    </div>
    <script>
    const Foo = { template: '<div>foo</div>' }
    const Bar = { template: '<div>bar</div>' }
    const Baz = { template: '<div>baz</div>' }
    
    const router = new VueRouter({
      mode: 'history',
      routes: [
        { path: '/',
          // a single route can define multiple named components
          // which will be rendered into <router-view>s with corresponding names.
          components: {
            default: Foo,
            a: Bar,
            b: Baz
          }
        },
        {
          path: '/other',
          components: {
            default: Baz,
            a: Bar,
            b: Foo
          }
        }
      ]
    })
    
    new Vue({
    	router,
      el: '#app'
    })
    
    </script>