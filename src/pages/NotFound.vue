<template>
  <div>
    <h1>Page not found</h1>
    <p>The page you were looking for could not be found.</p>
  </div>
</template>

<script>
  export default {
    name: 'page-notfound',
    context: {
      head: {
        title: '404 - Vue SSR template',
        meta: [
          { name: 'description', content: 'Page not found' }
        ]
      }
    }
  }
</script>
