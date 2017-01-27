import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)

import Home from '~pages/Home.vue'
import NotFound from '~pages/NotFound.vue'

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: Home },
    { path: '*', component: NotFound }
  ]
})
