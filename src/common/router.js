import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Home from './containers/Home.vue'
import NotFound from './containers/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: Home },
    { path: '*', component: NotFound }
  ]
})
