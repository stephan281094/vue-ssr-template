<template>
  <transition name="slide-top">
    <div class="c-notification" v-if="offline && !dismissed"
      @click="dismissed = true">
      <span class="c-notification__title">No internet connection</span>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'offline-indicator',
    data () {
      return {
        dismissed: false,
        offline: false
      }
    },
    methods: {
      updateStatus () {
        if (typeof window.navigator.onLine === 'undefined') {
          this.offline = false
        } else {
          this.offline = !window.navigator.onLine
        }

        this.dismissed = false
      }
    },
    mounted () {
      this.updateStatus()

      // Add event listeners
      window.addEventListener('online', this.updateStatus)
      window.addEventListener('offline', this.updateStatus)
    },
    destroyed () {
      // Remove event listeners
      window.removeEventListener('online', this.updateStatus)
      window.removeEventListener('offline', this.updateStatus)
    }
  }
</script>

<style lang="scss">
  .slide-top-enter,
  .slide-top-leave-active {
    opacity: 1;
    transform: translateX(0);
  }

  .slide-top-enter,
  .slide-top-leave-active {
    opacity: 0;
    transform: translateX(100%);
  }

  .c-notification {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    padding: 1rem;
    background-color: #000;
    color: #fff;
    box-shadow: 0 4px 0 -2px rgba(0, 0, 0, .1);
    z-index: 200;
    transition: .35s cubic-bezier(.87, -.41, .19, 1.44);
    cursor: pointer;

    &:active {
      transform: scale(.95);
    }
  }
</style>
