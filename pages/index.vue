<template>
  <div>
    <section class="main">
      <div
        class="lottie"
        @click="about()"
        @mouseenter="windowWidth > 600 ? hover() : null"
        @mouseleave="windowWidth > 600 ? leave() : null"
      />
      <button class="about" @click="about()" :aria-label="opened ? 'Home' : 'About'">
        <transition name="fade">
          <p v-if="!opened">about</p>
          <p v-else>home</p>
        </transition>
      </button>
    </section>
    <section class="abt">
      <!-- <button class="close" @click="about()">
        <p>home</p>
      </button> -->
      <img class="portrait" src="~/assets/portrait.jpg" alt="James Henry Purnama" />
      <p class="text">
        Born in Jakarta, Indonesia &amp; grew up in Bandung. Took advertising
        &amp; graphic design in The One Academy, Malaysia. Always has been
        amused with design, tech, and keeping up with trends.
      </p>
      <div class="links">
        <!-- <button> -->
        <a href="http://www.instagram.com/jamespurnama1" target="_blank">
          <font-awesome-icon class="icon" icon="fa-brands fa-instagram" />
        </a>
        <!-- </button> -->
        <!-- <button> -->
        <a href="http://www.be.net/jamespurnama" target="_blank">
          <font-awesome-icon class="icon" icon="fa-brands fa-behance-square" />
        </a>
        <!-- </button> -->
        <!-- <button> -->
        <a href="http://www.linkedin.com/in/jamespurnama" target="_blank">
          <font-awesome-icon class="icon" icon="fa-brands fa-linkedin" />
        </a>
        <!-- </button> -->
        <!-- <button> -->
        <a href="http://www.github.com/jamespurnama1" target="_blank">
          <font-awesome-icon class="icon" icon="fa-brands fa-github" />
        </a>
        <!-- </button> -->
        <!-- <button> -->
        <a href="mailto:jamespurnama1@gmail.com" target="_blank">
          <font-awesome-icon class="icon" icon="fa-solid fa-envelope-open" />
        </a>
        <!-- </button> -->
      </div>
      <button class="download" aria-label="Download Resume">
        <font-awesome-icon class="icon" icon="fa-solid fa-file" />
        <a href="/james_resume.pdf" download target="_blank"
          ><p>download resume</p></a
        >
      </button>
    </section>
  </div>
</template>

<script lang="ts">
// import {
//   defineComponent,
//   computed,
//   ref,
//   onMounted,
//   wrapProperty,
// } from '@nuxtjs/composition-api'
import { useStore } from '~/store'

export const useNuxt = wrapProperty('$nuxt', false)

export default defineComponent({
  beforeRouteLeave(to, _from, next) {
    if (to.path === '/video-reel') return false
    next()
  },
  setup() {
    const { $lottie } = useNuxt() as any
    const store = useStore()
    const windowWidth = computed(() => store.windowWidth)
    // let anim
    const opened = ref(false)
    store.$patch({
      opened: opened.value,
    })

    onMounted(() => {
      $lottie.loadAnimation({
        container: document.querySelector('.lottie'),
        loop: false,
        autoplay: false,
        path: './aboutme.json',
        rendererSettings: {
          className: 'lottieRoot',
        },
      })
    })

    function about() {
      opened.value = !opened.value
      store.opened = opened.value
      const abt = document.querySelector('.abt') as HTMLTableSectionElement

      if (abt && opened.value) abt.style.transform = 'translateY(-100%)'
      else if (abt) abt.style.transform = 'translateY(0)'
      leave()
    }

    function hover() {
      if (!$lottie) return
      if (opened.value) $lottie.setSpeed(-2)
      else $lottie.setSpeed(2)
      $lottie.play()
    }

    function leave() {
      if (!$lottie) return
      if (opened.value) $lottie.setSpeed(2)
      else $lottie.setSpeed(-2)
      $lottie.play()
    }

    return {
      hover,
      leave,
      windowWidth,
      opened,
      about,
    }
  },
})
</script>

<style lang="scss">
.lottie *,
.lottieLoading,
.lottieLoading *,
.lottieRoot,
.lottieRoot * {
  fill: var(--color) !important;
}

.container,
.clip {
  transition: 1s ease;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.clipped {
  clip-path: polygon(0 0, 100% 0, 100% 0%, 0% 0%);
}
</style>

<style lang="scss" scoped>
.lottie {
  pointer-events: auto;
  cursor: pointer;
  width: 17em;
  max-height: 7em;
  margin-left: -3em;

  @include min-media(small-tablet) {
    width: 20em;
    max-height: 10em;
    margin-left: -4em;
  }

  @include min-media(tablet) {
    width: 27em;
    max-height: 13em;
    margin-left: -5em;
  }
}

section {
  z-index: 1;
  position: relative;
  padding: 20px;
  height: 100vh;
  height: calc(100vh - env(safe-area-inset-bottom));
  width: 100vw;

  @include min-media(mobile) {
    padding: 50px;
  }

  &.main {
    pointer-events: none;
    z-index: 100;
  }

  span {
    pointer-events: auto;

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

  &.abt {
    pointer-events: auto;
    position: absolute;
    transform: translateY(0);
    transition: transform 0.5s ease;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    height: calc(100vh - env(safe-area-inset-bottom));

    @include min-media(mobile) {
      padding: 50px 10vw;
    }

    .text {
      margin: 1em auto 1em 0;
      width: 20em;
      font-size: 1em;
      @include min-media(mobile) {
        width: 17em;
        font-size: 2.5em;
      }
    }
  }

  button {
    margin: 3px;
    border: 1px solid var(--color);
    border-radius: 20px 20px;
    background-color: rgba(0, 0, 0, 0);
    transition: 0.5s ease;
    cursor: pointer;
    pointer-events: auto;

    &.about {
      margin: 20px;
      margin-bottom: calc(env(safe-area-inset-bottom) + 20px);
      position: fixed;
      bottom: 0;
      left: 0;
    }

    &.download {
      margin: 20px;
      margin-bottom: calc(env(safe-area-inset-bottom) + 20px);
      position: fixed;
      bottom: 0;
      right: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-left: 0.5em;
        color: var(--color);
      }
    }

    &.close {
      margin: 0;
      position: absolute;
      bottom: 10vh;
      right: 50px;
    }

    p {
      color: var(--color);
      font-size: 1.2em;
      padding: 0.5em;
    }

    &:active {
      background-color: var(--color);

      p {
        color: var(--bg);
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color);

        .icon,
        p {
          color: var(--bg);
        }
      }
    }

    @include min-media(mobile) {
      transform: initial;
      bottom: 10vh;
      top: initial;
    }
  }

  .links {
    display: flex;

    a {
      margin-left: 0.5em;

      &:first-child {
        margin-left: 0;
      }

      svg.icon {
        height: 1em;
        width: auto;
        font-size: 3em;
        color: var(--color);
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          color: var(--bg);
        }
      }
    }
  }

  .portrait {
    position: absolute;
    clip-path: circle(50% at center);
    width: 30%;
    min-width: 100px;
    max-width: 300px;
    margin-left: auto;
    display: block;
    top: 20px;
    right: 20px;

    @include min-media(mobile) {
      top: 50px;
      right: 50px;
    }
  }
}
</style>
