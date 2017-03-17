<template>
  <div>
    <h1>Welcome</h1>
    <p>Welcome to the Vue SSR template!</p>
  </div>
</template>

<script>
  export default {
    name: 'page-home',
    context: {
      head: {
        title: 'Home - Vue SSR template'
      }
    }
  }
</script>
