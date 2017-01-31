import 'es6-promise/auto'
import { app, store } from './app'

store.replaceState(window.__INITIAL_STATE__)
app.$mount('.o-app')

// Register the service worker runtime
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  require('serviceworker-webpack-plugin/lib/runtime').register()
}
