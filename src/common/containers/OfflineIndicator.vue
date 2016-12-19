<template>
  <div class="c-notifications">
    <transition name="slide-top">
      <div class="c-notification" v-if="offline">
        <span class="c-notification__title">No internet connection</span>
      </div>
    </transition>
  </div>
</template>

<script>
  if (typeof window !== 'undefined') {
    window.addEventListener('online', (event) => {
      this.offline = !window.navigator.onLine
    })
  }

  export default {
    name: 'offline-indicator',
    data () {
      return {
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

<style lang="sass">
  .slide-top-enter-active,
  .slide-top-leave-active {
    transition: .35s ease-in-out;
  }

  .slide-top-enter,
  .slide-top-leave-active {
    transform: translateX(0);
  }

  .slide-top-enter,
  .slide-top-leave-active {
    transform: translateY(-100%);
  }

  .c-notifications {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }

  .c-notification {
    position: relative;
    max-width: 350px;
    padding: 1rem;
    background-color: #000;
    color: #fff;
    box-shadow: 0 4px 0 -2px rgba(0, 0, 0, .1);
    pointer-events: auto;
  }
</style>
