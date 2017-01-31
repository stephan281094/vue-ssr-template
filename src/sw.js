const DIST_URL = global.location.origin + '/dist/'
const CACHE_NAME = 'vue-ssr-template-' + (new Date()).toISOString()
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
