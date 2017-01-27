import 'es6-promise/auto'
import { app, store } from './app'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'

store.replaceState(window.__INITIAL_STATE__)
app.$mount('.o-app')

// if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js')
// }

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  runtime.register()
}
