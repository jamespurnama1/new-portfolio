<template>
  <div class="loading fixed z-[1000] w-screen h-safe-height flex justify-center items-center flex-col-reverse">
    <transition name="fade">
      <div v-if="!fullReady || (routePath !== '/' && checkReady < 100)" ref="anim"
        class="anim absolute flex flex-col-reverse items-center justify-center m-auto text-black dark:text-white">
        <p class="mt-8 text-xl 2xl:text-4xl" v-if="Math.round(checkReady)">{{ Math.min(Math.round(checkReady) - 1, 99)
        }}%</p>
        <p v-else class="mt-8 text-xl 2xl:text-4xl">0%</p>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="fullReady && once" class="font-medium text-3xl md:text-5xl 2xl:text-7xl text-black dark:text-white">
        <div class="relative overflow-hidden">
          <h2 class="content__paragraph" data_splitting>grain traction</h2>
        </div>
        <div class="relative overflow-hidden">
          <h2 class="content__paragraph" data_splitting>&amp; make some</h2>
        </div>
        <div class="relative overflow-hidden">
          <h2 class="content__paragraph" data_splitting>beautiful noise.</h2>
        </div>
        <button class="relative arrow-button group overflow-hidden flex" aria-label="Continue"
          v-posthog-capture="'continue'" @click="() => {
            next()
            req()
          }">
          <img src="@/assets/arrow.svg" alt="Arrow Icon"
            class="dark:invert h-8 md:h-12 2xl:h-18 w-auto transition-none group-hover:translate-x-full group-active:translate-x-full group-hover:transition-transform group-hover:duration-500 group-hover:ease-in-out" />
          <img src="@/assets/arrow.svg" alt="Arrow Icon"
            class="dark:invert h-8 md:h-12 2xl:h-18 w-auto transition-none -translate-x-full absolute group-hover:translate-x-0 group-active:translate-x-0 group-hover:transition-transform group-hover:duration-500 group-hover:ease-in-out" />
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~/store'

const anim = ref()
const route = useRoute()
const props = defineProps(['checkReady', 'ready'])
const emit = defineEmits(['next'])
const { $lottie, $Splitting } = useNuxtApp()
const { $gsap } = useNuxtApp()
const store = useStore()
const routePath = computed(() => route.path)

const timelineSettings = {
  staggerValue: 0.014,
  charsDuration: 2,
}

function animateInit() {
  const timeline = $gsap.timeline({ paused: true }).to(['.char', 'button'], {
    ease: 'Power3.easeIn',
    y: '-100%',
    duration: timelineSettings.charsDuration,
    opacity: 0,
    stagger: timelineSettings.staggerValue,
    delay: 1,
  })
  timeline.reverse(0)
}

const once = ref(true)

function req() {
  try {
    ; (DeviceOrientationEvent as any).requestPermission()
  } catch (error) { }
}

function next() {
  window.removeEventListener('keydown', () => { })
  $gsap.to('.loading', {
    autoAlpha: 0,
  })
  once.value = false
  emit('next')
}

onMounted(() => {
  if (navigator.userAgent.includes('Safari')) {
    ; (document.querySelector(
      '.loading button'
    ) as HTMLButtonElement)!.style.maskSize =
      window.innerWidth >= 1280 ? '18.79em' : '6.74em 3em'
  }

  window.addEventListener('keydown', (event) => {
    if ((fullReady && event.key === 'Enter') || event.key === 'Space') {
      next()
    }
  })

  $Splitting({
    whitespace: true,
    target: document.querySelectorAll('h2.content__paragraph'),
  })

  // loadAnim();
})

watch(anim, () => {
  // await nextTick();
  loadAnim()
})

const loadAnim = () => {
  $lottie.loadAnimation({
    container: anim.value,
    loop: true,
    autoplay: true,
    path: './loading.json',
    rendererSettings: {
      className: 'lottieLoading',
    },
  })
}

const fullReady = computed(() => props.checkReady >= 100 && props.ready)

watch(fullReady, () => {
  if (fullReady.value && once.value) {
    animateInit()
  } else if (fullReady.value && !once.value) {
    next()
  } else if (!fullReady.value) {
    $gsap.to('.loading', {
      autoAlpha: 1,
      duration: 0.1,
    })
  }
})
</script>

<style>
/* stylelint-disable-next-line selector-class-pattern */
svg.lottieLoading {
  max-width: 6em;
}

@media (width >=96rem
  /* 1536px */
) {
  /* stylelint-disable-next-line selector-class-pattern */
  svg.lottieLoading {
    max-width: 12em;
  }
}
</style>