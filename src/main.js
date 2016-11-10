// global.jQuery = require('jquery');
import Vue from 'vue'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import  {listDoc,spanDoc,formDoc,buttonDoc,imageDoc,dropdownDoc,
  jumbotromDoc,carouselDoc,navbarDoc,navDoc,alertDoc,carousel1,
  panelDoc,wellDoc,tooltipDoc,modalDoc,selectionDoc} from './docs'

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
      { path:'/carouseltest', component: carousel1},
      { path: '/selection', component: selectionDoc},
      { path: '/well', component: wellDoc},
      { path: '/tooltip', component: tooltipDoc},
      { path: '/modal', component: modalDoc},
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
