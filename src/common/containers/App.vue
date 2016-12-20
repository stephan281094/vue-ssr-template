<template>
  <div class="o-app">
    <progress-bar />
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
  import OfflineIndicator from '../components/OfflineIndicator.vue'

  export default {
    name: 'app',
    components: {
      'offline-indicator': OfflineIndicator
    }
  }
</script>

<style lang="sass">
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
