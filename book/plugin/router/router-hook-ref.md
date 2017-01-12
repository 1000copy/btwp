
###路由钩子函数

路由钩子主要用来拦截导航（URL切换），在此处有一个完成跳转或取消的机会。

钩子类型有多种：

1. 全局路由钩子
2. 独享路由钩子
3. 组件路由钩子

####全局路由钩子

如下案例展示了一个全局钩子的使用方法：

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
		const Home = { template: '<div>home</div>' }
		const About = { template: '<div>about</div>' }
		const routes = [
		{ path: '/home', component: Home },
		{ path: '/about', component: About },
		]
		const router = new VueRouter({
			routes :routes
		})
		router.beforeEach((to, from, next) => {
		    console.log(to.path,from.path,)
		    next()
		});
		const app = new Vue({
		  router
		}).$mount('#app')

		</script>

正常的路由创建和挂接都是类似的。多出来的是一个beforeEach的函数调用，注册了一个钩子方法：

		(to, from, next) => {
		  // ...
		}
当点击home和about链接时，URL发生了切换，并且每次调用钩子函数，此时案例会打印出router切换的来源URL和去向URL。并调用next()函数完成本次导航。钩子的参数有三个：

1. to: 路由对象。至少来源
2. from:路由对象。指示来源
3. next：函数。如果是next（），就完成跳转到to指示的路由对象。如果传递参数为false，而取消此次导航；如果指定了地址或者路由对象，就跳到指定的地址或者对象。

####路由对象

之前提到的to、from都是路由对象。对象内属性有：
1. path。路径，总是解析为绝对路径
2. matched。数组，包含全部路径的路由记录。比如嵌套路由定义为：

 routes: [
    { 
      path: '/user/:id', component: User,
      children: [
        { path: 'posts', component: UserPosts }
      ]
    }

那么，如果导航到/user/foo/posts时，match会是两个路由对象，分别指向user/foo、user/foo/posts

####用法

典型的情况下，可以使用钩子做登录验证。假设有一个app，栏目为列表list、和创建add。list用来显示内容清单且无需登录，add用来添加一个条目需要登录。那么可以使用如下代码：


		<script src="https://unpkg.com/vue/dist/vue.js"></script>
		<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

		<div id="app">
		  <h1>Router test</h1>
		  <p>
		    <router-link to="/list">Go list</router-link>
		    <router-link to="/add">Go add</router-link>
		  </p>
		  <router-view></router-view>
		</div>
		<script>
      		var login = false
			const List = { template: '<div>list</div>' }
			const Add = { template: '<div>add</div>' }
			const Login = { template: '<div>Login</div>' }
			const routes = [
			{ path: '/list', component: List },
			{ path: '/login', component: Login },
			{ path: '/add', component: Add, meta: { needLogin: true } },
			]
			const router = new VueRouter({
				routes :routes
			})
			router.beforeEach((to, from, next) => {
			if(to.meta.needLogin && !login)
			  	next({path:'/login'})
			else
			    next()
			});
			const app = new Vue({
			  router
			}).$mount('#app')
		</script>


如果没有钩子beforeEach的代码，那么点击Go list就会导航到`/list`，点击Go add就会导航到`/add`。有了beforeEach，当点击链接Go add导航到`/login`。

路由对象的meta被称为元信息，它可以放置任何对象，并且随同路由对象，在钩子函数内传递而来。


####独享路由钩子

你可以在路由配置上直接定义 beforeEnter 钩子：

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

这些钩子与全局钩子的方法参数是一样的。等效之前的案例的代码是：

		<script src="https://unpkg.com/vue/dist/vue.js"></script>
		<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

		<div id="app">
		  <h1>Router test</h1>
		  <p>
		    <router-link to="/list">Go list</router-link>
		    <router-link to="/add">Go add</router-link>
		  </p>
		  <router-view></router-view>
		</div>
		<script>
		const List = { template: '<div>list</div>' }
		const Add = { template: '<div>add</div>' }
		const Login = { template: '<div>Login</div>' }
		var login = false
		const routes = [
		{ path: '/list', component: List },
		{ path: '/login', component: Login },
		{ path: '/add', component: Add,beforeEnter:(to, from, next) => {
		if (!login)
		  next({path:'/login'})
		}},
		]
		const router = new VueRouter({
			routes :routes
		})

		const app = new Vue({
		  router
		}).$mount('#app')

		</script>

####组件内的钩子

最后，你可以使用beforeRouteEnter和beforeRouteLeave，在路由组件内直接定义路由导航钩子，

		const Foo = {
		  template: `...`,
		  beforeRouteEnter (to, from, next) {
		  },
		  beforeRouteLeave (to, from, next) {
		  }
		}

这些钩子与全局钩子的方法参数是一样的。等效登录代码如下：

		<script src="https://unpkg.com/vue/dist/vue.js"></script>
		<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

		<div id="app">
		  <h1>Router test</h1>
		  <p>
		    <router-link to="/list">Go list</router-link>
		    <router-link to="/add">Go add</router-link>
		  </p>
		  <router-view></router-view>
		</div>
		<script>
		var login = false
		const List = { template: '<div>list</div>' }
		const Login = { template: '<div>Login</div>' }
		const Add = { 
			template: '<div>add</div>' ,
		beforeRouteEnter:(to, from, next) => {
		if (!login)
		  next({path:'/login'})
		}}
		const routes = [
		{ path: '/list', component: List },
		{ path: '/login', component: Login },
		{ path: '/add', component: Add},
		]
		const router = new VueRouter({
			routes :routes
		})

		const app = new Vue({
		  router
		}).$mount('#app')

		</script>