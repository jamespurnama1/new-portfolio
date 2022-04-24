<template>
  <div class="loading">
    <transition name="fade">
      <div v-if="!fullReady" class="anim">
        <p v-if="Math.round(checkReady)">{{ Math.round(checkReady) - 1 }}%</p>
        <p v-else>0%</p>
      </div>
    </transition>
    <div v-show="fullReady && route.path === '/'">
      <div class="content__item">
        <h2 class="content__paragraph" data_splitting>grain traction</h2>
      </div>
      <div class="content__item">
        <h2 class="content__paragraph" data_splitting>&amp; make some</h2>
      </div>
      <div class="content__item">
        <h2 class="content__paragraph" data_splitting>beautiful noise.</h2>
      </div>
      <div class="content__item">
        <button @click="next()">
          <div />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useRoute,
  onMounted,
  wrapProperty,
  watch,
} from '@nuxtjs/composition-api'
export const useNuxt = wrapProperty('$nuxt', false)
import { gsap } from 'gsap'


export default defineComponent({
  props: ['checkReady', 'ready'],
  setup(props, { emit }) {
    const route = useRoute()
    const { $Splitting } = useNuxt() as any
    const { $lottie } = useNuxt() as any

    const timelineSettings = {
      staggerValue: 0.014,
      charsDuration: 2
    }

    let split = [] as any

    function animateInit() {

      const timeline = gsap.timeline({ paused: true }).to(['.char', 'button'], {
        ease: "Power3.easeIn",
        y: "-100%",
        duration: timelineSettings.charsDuration,
        opacity: 0,
        stagger: timelineSettings.staggerValue,
        delay: 1,
      })
      timeline.reverse(0)
    }

    function next() {
      try {
        (DeviceOrientationEvent as any).requestPermission()
      }
      catch (error) {
      }
      gsap.to('.loading', {
        autoAlpha: 0,
      })
      emit('next')
    }

    onMounted(() => {
      $Splitting({
        whitespace: true,
        target: document.querySelectorAll('h2.content__paragraph')
      })

      $lottie.loadAnimation({
        container: document.querySelector(".anim"),
        loop: true,
        autoplay: true,
        path: "./loading.json",
        rendererSettings: {
          className: "lottieLoading",
        },
      })
    })

    const fullReady = computed(() => props.checkReady === 100 && props.ready)

    watch(fullReady, () => {
      if (fullReady && route.value.path === '/') {
        animateInit()
      } else if (fullReady) {
        next()
      }
    })

    return {
      fullReady,
      next,
      route,
    }
  }
})
</script>

<style lang="scss">
.lottieLoading {
  max-width: 6em;
  mix-blend-mode: difference;
}
</style>

<style lang="scss" scoped>
.loading {
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;

  .anim {
    position: absolute;
    display: flex;
    flex-flow: column-reverse;
    margin: auto;
    align-items: center;
    justify-content: center;

    p {
      margin-top: 2em;
      color: var(--color);
    }
  }

  .content__item {
    position: relative;
    overflow: hidden;

    &:last-child {
      width: 4.74em; //5.74em - 1em

      @include min-media(desktop) {
        width: 12.7em;
      }
    }

    h2 {
      font-size: 3em;

      @include min-media(desktop) {
        font-size: 8em;
      }
    }
  }

  button {
    height: 3em;
    width: 30vw;
    border: none;
    mask-repeat: repeat-x;
    mask-position: 0 50%;
    mask-size: 5.74em 3em;
    mask-image: url(@/assets/arrow.svg);
    margin: 0;
    padding: 0;
    cursor: pointer;

    @keyframes next {
      from {
        mask-position: 0 50%;
      }
      to {
        mask-position: 5.74em 50%;
      }
    }

    @include min-media(desktop) {
      height: 8em;
      mask-size: 15.31em;


      @keyframes next {
        from {
          mask-position: 0 50%;
        }
        to {
          mask-position: 15.31em 50%;
        }
      }
    }

    &:hover {
      animation: next 0.5s;
    }

    div {
      width: 100%;
      height: 100%;
      background-color: var(--color);
    }
  }
}
</style>
