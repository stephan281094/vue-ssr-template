<template>
  <div class="o-app">
    <offline-indicator />
    <nav>
      <router-link to="/" exact>Home</router-link>
      <router-link to="/foo">Foo</router-link>
      <a href="https://github.com/stephan281094/vue-ssr-template">Repository</a>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import OfflineIndicator from '~components/OfflineIndicator.vue'

  export default {
    name: 'app',
    context: {
      head: {
        title: 'Vue SSR template',
        meta: [
          { name: 'mobile-web-app-capable', content: 'yes' },
          { 'http-equiv': 'x-ua-compatible', conent: 'ie=edge' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
          { name: 'description', content: 'Welcome to the Vue SSR template!' },
          { name: 'theme-color', content: '#000' }
        ],
        link: [
          { rel: 'manifest', href: '/manifest.json' },
          { rel: 'icon', href: '/favicon.ico' }
        ]
      }
    },
    components: {
      'offline-indicator': OfflineIndicator
    }
  }
</script>

<style lang="scss">
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    font: 16px / 1.5 'Helvetica Neue', sans-serif;
    padding: 2rem;
  }

  nav {
    margin-bottom: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: #000;
    margin-right: 1rem;
    padding-bottom: .2rem;

    &.active {
      border-bottom: 2px solid #000;
    }
  }
</style>
