import { app, router, store } from './app'

export default (context) => {
  router.push(context.url)
  context.meta = app.$meta()
  const matchedComponents = router.getMatchedComponents()

  if (!matchedComponents.length) {
    return Promise.reject(new Error('Could not find matched page'))
  }

  return Promise.all(matchedComponents.map((component) => {
    if (component.preFetch) {
      return component.preFetch(store)
    }
  })).then(() => {
    context.initialState = store.state
    return app
  })
}
