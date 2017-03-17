import Vue from 'vue'
import Router from 'vue-router'
import has from 'lodash/has'

Vue.use(Router)

import Home from '~pages/Home.vue'
import NotFound from '~pages/NotFound.vue'

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: Home },
    { path: '*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  const component = to.matched.length && to.matched[0].components.default

  // Set the title dynamically
  if (typeof document !== 'undefined' && has(component, 'context.head.title')) {
    document.title = component.context.head.title
  }

  next()
})

export default router
