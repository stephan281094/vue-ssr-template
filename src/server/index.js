import { app, router, store } from '../common/app'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  router.push(context.url)

  const s = isDev && Date.now()

  return Promise.all(router.getMatchedComponents().map(component => {
    if (component.preFetch) {
      return component.preFetch(store)
    }
  })).then(() => {
    context.initialState = store.state

    return app
  })
}
