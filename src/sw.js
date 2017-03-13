const { version } = require('../package.json')
const DIST_URL = `${global.location.origin}/dist/`
const CACHE_NAME = `vue-ssr-template-${version}`
const { assets } = global.serviceWorkerOption
const staticAssets = assets.map((path) => {
  return new URL(path, DIST_URL).toString()
})

const assetsToCache = [
  ...staticAssets,
  new URL('./', global.location).toString()
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(assetsToCache)
      })
  )
})

// Delete previous caches and run idb migrations
self.addEventListener('activate', (event) => {
  console.log(assetsToCache)

  event.waitUntil(
    global.caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return false // todo: add filter
            })
            .map((cacheName) => {
              return global.caches.delete(cacheName)
            })
        )
      })
  )
})

// Return the cache if we're offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    global.fetch(event.request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()

        global.caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache)
          })

        return response
      })
      .catch(() => {
        return global.caches.match(event.request)
      })
  )
})
