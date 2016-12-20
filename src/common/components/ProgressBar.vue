<template>
  <div class="c-progress" :style="{ width: width + '%' }" :class="classes"></div>
</template>

<script>
  let timer = null

  export default {
    name: 'progress-bar',
    data () {
      return {
        width: 0,
        show: false,
        error: false
      }
    },
    computed: {
      classes () {
        return {
          'c-progress--hidden': !this.show,
          'c-progress--error': this.error
        }
      }
    },
    methods: {
      reset () {
        this.width = 0
        this.error = false
        this.show = false
      },
      start () {
        this.reset()
        this.show = true

        timer = setInterval(() => {
          let delta = Math.random() * 3

          if (this.width >= 100) {
            this.finish()
            return
          }

          if (this.width >= 80) {
            delta = Math.random()
          }

          if (this.width >= 95) {
            this.width = 98
            this.stop()
            return
          }

          this.width += delta
        }, 100)
      },
      stop () {
        if (!this.show) return

        clearInterval(timer)
      },
      finish (error = false) {
        if (!this.show) return

        clearInterval(timer)
        this.error = error
        this.width = 100

        // Wait for progressbar to be full width
        setTimeout(() => {
          this.show = false

          // Wait for progressbar to hide
          setTimeout(() => {
            this.reset()
          }, 100)
        }, error ? 1000 : 350)
      },
      errored () {
        this.finish(true)
      }
    },
    mounted () {
      this.$router.beforeEach((to, from, next) => {
        this.reset()
        this.start()
        next()
      })

      this.$router.afterEach((to, from) => {
        this.finish()
      })
    }
  }
</script>

<style lang="sass">
  .c-progress {
    position: fixed;
    left: 0;
    top: 0;
    width: 0;
    height: 3px;
    background-color: #000;
    transform: translateY(0);
    transition: .2s ease-in-out;

    &--hidden {
      transform: translateY(-100%);
    }

    &--error {
      background-color: #f00;
    }
  }
</style>
