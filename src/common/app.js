import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './containers/App.vue'
import store from './store'
import router from './router'

sync(store, router)

const app = new Vue({ router, store, ...App })

export { app, router, store }
