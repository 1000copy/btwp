// global.jQuery = require('jquery');
import Vue from 'vue'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import listDoc from './docs/list'
import spanDoc from './docs/span'
import formDoc from './docs/form'
import buttonDoc from './docs/button'
import imageDoc from './docs/image'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = { template: '<div>home page</div>' }
const About = { template: '<div>about page</div>' }
const router = new VueRouter({
  routes :[
      { path: '/home', component: Home },
      { path: '/about', component: About },
      { path: '/', redirect: '/ul' },
      { path: '/ul', component: listDoc},
      { path: '/span', component: spanDoc},
      { path: '/image', component: imageDoc},
      { path: '/button', component: buttonDoc},
      { path: '/form', component: formDoc}
  ]
})

// new Vue({
//   el: 'App',
//   template: '<App/>',
//   components: { App }
// })

new Vue({
  el: 'App',
  template: '<App/>',
  router: router,
  components: { App }
})
