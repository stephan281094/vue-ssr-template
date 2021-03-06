const fs = require('fs')
const path = require('path')
const express = require('express')
const compression = require('compression')
const resolve = (file) => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

let renderer
if (isProd) {
  const bundle = require('./dist/vue-ssr-bundle.json')
  const template = fs.readFileSync(resolve('./dist/_index.html'), 'utf-8')
  renderer = createRenderer(bundle, template)
} else {
  require('./setup-dev-server')(app, (bundle, template) => {
    renderer = createRenderer(bundle, template)
  })
}

function createRenderer (bundle, template) {
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    template,
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(serve('./public', true))
app.use(compression({ threshold: 0 }))
app.use('/service-worker.js', serve('./dist/service-worker.js'))
app.use('/dist', serve('./dist', true))

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  const s = Date.now()

  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Server', serverInfo)

  const errorHandler = err => {
    if (err && err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err)
    }
  }

  renderer.renderToStream({ url: req.url })
    .on('error', errorHandler)
    .on('end', () => console.log(`whole request: ${Date.now() - s}ms`))
    .pipe(res)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
