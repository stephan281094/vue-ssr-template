import { app, router, store } from './app'

export default (context) => {
  return new Promise((resolve, reject) => {
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      let head = app.$options.context && app.$options.context.head

      if (!matchedComponents.length) {
        reject({ code: 404 })
      }

      Promise.all(matchedComponents.map((component) => {
        if (component.preFetch) {
          component.preFetch(store)
        }

        if (component.context && component.context.head) {
          head = Object.assign({}, head, component.context.head)
        }
      }))
        .then(() => {
          context.state = store.state
          context.head = parseToHtml(head)

          resolve(app)
        })
        .catch(reject)
    })
  })
}

// Parse metadata to HTML
const parseToHtml = (obj) => {
  let output = []

  // Parse title
  if (typeof obj.title === 'string') {
    output.push(`<title>${obj.title}</title>`)
  }

  // Parse meta tags
  if (obj.meta && obj.meta.length) {
    obj.meta.forEach((node) => {
      output.push(`<meta${parseAttributes(node)}>`)
    })
  }

  // Parse link tags
  if (obj.link && obj.link.length) {
    obj.link.forEach((node) => {
      output.push(`<link${parseAttributes(node)}/>`)
    })
  }

  return output.join('')
}

// Parse attributes to HTML
const parseAttributes = (node) => {
  let attrs = ''

  for (let key in node) {
    attrs += ` ${key}="${node[key]}"`
  }

  return attrs
}
