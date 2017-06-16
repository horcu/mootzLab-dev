// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import the vue instance
//import 'bootstrap'
// import slimscroll from '../node_modules/jquery-slimscroll/jquery.slimscroll'

import Vue from 'vue'

import VueFire from 'vuefire'

//import the App component
import App from './App'
//import the vue router
import VueRouter from 'vue-router'
//tell vue to use the router
Vue.use(VueRouter)
Vue.use(VueFire)
/* eslint-disable no-new */
//import the hello component
import Hello from './components/Hello'
//import the about component
import About from './components/About'
//import the ;lab component
import Lab from './components/Lab'

import jQuery from 'jquery'
global.jQuery = jQuery

require('bootstrap')

//Vue.use(Bootstrap)
//define your routes
const routes = [
  //route for the home route of the webpage
  {name: 'login' ,path: '/', component: Hello},
  //route for the about route of the webpage
  {path: '/about', component: About},
  //route for the labs
  {name: 'lab', path: '/lab', component: Lab},
  //route for a lab with a given id
  {name: 'session', path: '/lab/:id', component: Lab}
]

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'hash'
})

//instatinat the vue instance
new Vue({
  //define the selector for the root component
  el: '#app',
  //pass the template to the root component
  render: a => a(App),
  //declare components that the root component can access
  components: {App, jQuery},
  //pass in the router to the vue instance
  router
}).$mount('#app')//mount the router on the app
