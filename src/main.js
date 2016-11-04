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
import dropdownDoc from './docs/dropdown'
import jumbotromDoc from './docs/jumbotrom'
import carouselDoc from './docs/carousel'
import navbarDoc from './docs/navbar'
import navDoc from './docs/nav'
import alertDoc from './docs/alert'
import carousel1 from './test/carousel'
// import popupDoc from './docs/popup'

// import layoutDoc from './docs/layout'

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
      { path: '/form', component: formDoc},
      { path: '/dropdown', component: dropdownDoc},
      { path: '/jumbotrom', component: jumbotromDoc},
      { path: '/carousel', component: carouselDoc},
      { path: '/nav', component: navDoc},
      { path: '/alert', component: alertDoc},
      { path: '/navbar', component: navbarDoc},
      { path:'/carouseltest', component: carousel1}
      // { path: '/popup', component: popupDoc},
      // { path: '/layout', component: layoutDoc}
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
