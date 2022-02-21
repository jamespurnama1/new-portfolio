<template>
  <section>
    <span>
      <h1>james</h1>
      <h1>henry</h1>
    </span>
    <button v-if="windowWidth <= 600" class="about"><p>about</p></button>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  beforeRouteLeave(to, _from, next) {
    if (to.path === '/video-reel') return false
    else this.$nuxt.$emit('microsite', to.path)
    next()
  },
  setup() {
    const windowWidth = computed(() => window.innerWidth)
    return {
      windowWidth,
    }
  },
})
</script>

<style lang="scss" scoped>
section {
  display: flex;
  z-index: 1;
  position: relative;
  padding: 20px;
  height: 100vh;
  width: 100vw;
  min-height: -webkit-fill-available;

  @include min-media(mobile) {
    padding: 50px;
  }

  span {
    h1 {
      font-size: 4em;
      line-height: 0.8em;

      @include min-media(mobile) {
        font-size: 100px;
        line-height: 0.8em;
      }

      &:last-child {
        position: relative;
        left: 0.2em;

        @include min-media(mobile) {
          left: 0.3em;
        }
      }
    }
  }

  .about {
    color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 20px;
    border: 1px solid white;
    border-radius: 20px 20px;
    background-color: rgba(0, 0, 0, 0);
    transition: background color 0.5s ease;
    cursor: pointer;

    p {
      font-size: 1.2em;
      padding: 0.5em;
    }

    &:hover {
      color: black;
      background-color: white;
    }
  }
}
</style>
