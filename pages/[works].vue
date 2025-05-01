<template>
  <div id="container2" class="opacity-0 overflow-x-hidden">
    <div ref="no01"
      class="no01 mix-blend-difference fixed w-safe-height overflow-hidden -bottom-10 -rotate-90 origin-top-left z-10 text-2xl pointer-events-none left-2 md:left-[initial]">
      <div class="text-white relative -left-64 h-10">
        <span v-for="(number, i) in noBoxes" ref="box" :key="i"
          class="box absolute block h-10 font-bold text-3xl text-center text-nowrap leading-10">
          {{ posts[index].title.toLowerCase() }}
        </span>
      </div>
    </div>
    <div
      class="no02 mix-blend-difference fixed w-safe-height overflow-hidden -bottom-10 -rotate-90 origin-top-left z-10 text-2xl pointer-events-none left-2 md:left-6 invisible md:visible">
      <div class="text-white relative -left-64 h-10">
        <span v-for="(number, i) in noBoxes" ref="no02" :key="i"
          class="box absolute block h-10 font-bold text-3xl text-center text-nowrap leading-10">
          {{ posts[index].title.toLowerCase() }}
        </span>
      </div>
    </div>
    <NuxtLink to="/">
      <button
        class="absolute right-0 top-0 md:top-4 md:right-4 z-30 mix-blend-difference flex items-center justify-center border-solid border rounded-2xl bg-transparent transition-all duration-500 ease-in-out pointer-events-auto cursor-pointer border-white text-white hover:text-white hover:bg-white pt-2 pb-[0.15rem] px-4 m-5"
        v-posthog-capture="'go back'" aria-label="Back">
        <p>← Back</p>
      </button>
    </NuxtLink>
    <div ref="content" class="ml-12 w-[calc(100vw-2.5em)]">
      <client-only>
        <div class="relative top-0 -left-12 w-screen overflow-hidden z-10 mb-4">
          <video v-if="posts" muted="true" autoplay loop playsinline preload="true"
            class="hero w-full max-h-[56.3vw] h-auto object-cover top-0 -z-10"
            :src="posts[index].thumbnail.asset.url" />
        </div>
        <div class="pin ml-4 mr-8 md:mx-16 relative max-w-6xl lg:mx-auto">
          <div
            class="info flex relative items-center flex-col md:mx-16 ml-4 mr-8 mb-2 md:mb-4 md:flex-row md:items-start gap-4 md:gap-12 md:justify-between pointer-events-none text-black dark:text-white max-w-6xl">
            <!-- description -->
            <p v-if="posts[index].description" class="relative lg:w-[80ch] lg:max-w-[50vw]">
              {{ posts[index].description }}
            </p>
            <!-- Tools / Role / Link / Year / Type -->
            <div class="flex flex-col md:gap-8 w-full md:w-[initial]">
              <div class="grid grid-rows-[2fr_1fr_2fr] grid-cols-[minmax(1fr, 2fr)_1fr] md:gap-2 mb-0">
                <div class=" row-span-2">
                  <h4 class="font-bold">tools used</h4>
                  <p>
                    {{ posts[index].tools.map(String).join(', ') }}
                  </p>
                </div>
                <div class=" col-start-2" :class="[posts[index].link ? '' : 'row-span-2']">
                  <h4 class="font-bold">role</h4>
                  <p>
                    {{ posts[index].role.map(String).join(', ') }}
                  </p>
                </div>
                <NuxtLink v-if="posts[index].link" class="pointer-events-auto col-start-2 self-center" external
                  :to="posts[index].link">
                  <button class="external font-bold text-black dark:text-white hover:underline"
                    v-posthog-capture="'visit real project'" :aria-label="`visit ${posts[index].title}`">
                    <h4>
                      visit website
                      <font-awesome class="icon" icon="arrow-up-right-from-square" />
                    </h4>
                  </button>
                </NuxtLink>
                <div class="">
                  <h4 class="font-bold">type</h4>
                  <p>
                    {{ posts[index].type }}
                  </p>
                </div>
                <div class="">
                  <h4 class="font-bold">year</h4>
                  <p>
                    {{ posts[index].year }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Carousel -->
          <div ref="horizontal" class="pointer-events-none pl-4 pr-8 md:px-16 mask-left-right left-0 w-full">
            <div v-if="posts[index].carousel && posts[index].carousel.length" ref="carousel"
              class="flex overflow-x-hidden w-fit h-[50vh]">
              <span class="h-full mr-4 select-none last:mr-0" v-for="carousel in posts[index].carousel"
                :key="carousel.image.asset ? carousel.image.asset._id : carousel.video.asset._id">
                <video class="h-full w-auto object-contain max-w-[80vw]" v-if="carousel.video.asset" ref="carouselVid"
                  muted autoplay loop playsinline preload=true :src="carousel.video.asset.url" />
                <NuxtImg provider="sanity" sizes="xs:100vw sm:50vw md:33vw lg:25vw xl:20vw 2xl:15vw"
                  :modifiers="{ fit: 'crop' }" class="h-full w-auto object-contain max-w-[80vw]" v-else
                  :src="carousel.image.asset._id" :alt="carousel.image.asset._id" @load="e => incrementCounter(e)"
                  @error="onError()" />
              </span>
            </div>
          </div>
          <!-- Contents -->
          <div class="flex flex-col gap-4 md:gap-12 pt-[calc(50vh+16px)] md:pt-[calc(25vh+48px)]">
            <div class="pinned flex flex-col text-black dark:text-white" v-for="item in posts[index].content">
              <h3 class="font-bold text-2xl" v-if="item.headline">{{ item.headline }}</h3>
              <video v-if="item.video.asset" :muted="item.caption === 'autoplay'"
                :autoplay="item.caption === 'autoplay'" :loop="item.caption === 'autoplay'"
                :controls="item.caption !== 'autoplay'" playsinline :src="item.video.asset.url" />
              <NuxtImg provider="sanity" sizes="xs:100vw sm:50vw md:33vw lg:25vw xl:20vw 2xl:15vw"
                :modifiers="{ fit: 'crop' }" v-else-if="!store.dark && item.imageLight.asset"
                :src="item.imageLight.asset._id" :alt="item.caption" @load="e => incrementCounter(e)"
                @error="onError()" />
              <NuxtImg provider="sanity" sizes="xs:100vw sm:50vw md:33vw lg:25vw xl:20vw 2xl:15vw"
                :modifiers="{ fit: 'crop' }" v-else :src="item.image.asset._id" :alt="item.caption"
                @load="e => incrementCounter(e)" @error="onError()" />
              <p class="mt-3 mb-2 md:max-w-[75ch]" v-if="item.body">{{ item.body.replace(/\s(?=\S*$)/, '&nbsp;') }}
              </p>
            </div>
          </div>
          <!-- Next Project -->
          <div class="h-[40vh] flex flex-col justify-center items-center text-black dark:text-white">
            <h4 class="cursor-pointer pointer-events-auto hover:underline" @click="next">
              <font-awesome class="icon arrowDown" icon="arrow-down" />
              next project: {{ nextWorkTitle.toLowerCase() }}
            </h4>
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '~/store'

definePageMeta({
  name: 'works'
})

const noBoxes = 25
const route = useRoute()
const store = useStore()
const { posts } = storeToRefs(store)
const routePath = computed(() => route.path)

const waitUntil = (condition) => {
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (!condition()) return
      clearInterval(interval)
      resolve()
    }, 100)
  })
}

/**
 * Get Data
 */
const id = ref('')
const load = ref(0)
const index = ref(1)
const nextWork = ref('')
const nextWorkTitle = ref('')
const counter = ref(0);
const len = ref(0);

async function pushTo() {
  await waitUntil(() => store.posts.length > 1)
  const [getID] = store.posts.filter((obj) => {
    return obj.slug.current === routePath.value.substring(1)
  })
  if (!getID) {
    showError({ statusCode: 404 })
    navigateTo({ path: '/404' })
  } else {
    id.value = getID.slug.current
    index.value = store.posts.indexOf(getID)
    nextWork.value =
      store.posts.length === index.value + 1
        ? store.posts[1].slug.current
        : store.posts[index.value + 1].slug.current
    nextWorkTitle.value =
      store.posts.length === index.value + 1
        ? store.posts[1].title
        : store.posts[index.value + 1].title

    if (store.posts) {
      nextTick(() => {
        const imgs = document.images
        len.value = imgs.length

        // let counter = 0

        // imgsArr.forEach((img: HTMLImageElement) => {
        //   imgsArr.length
        //   // if (img.complete) incrementCounter(img.src)
        //   // else
        //   //   img.addEventListener('load', incrementCounter, { once: true })
        // })
      })
    }
  }
}

async function incrementCounter(_event) {
  counter.value++
  // console.log(_event.target)
  // console.log(counter.value, len.value)

  if (counter.value === (len.value - 2)) {
    load.value = 100
    store.$patch({
      loadWorks: load.value,
    })
    await waitUntil(() => store.loaded)
    await wait(1000)
    init()
  } else {
    load.value = 100 * (counter.value / len.value)
    store.$patch({
      loadWorks: load.value,
    })
  }
  // await nextTick()
}

/**
 * Infinite Marquee
 */
const no01 = ref(null)
const no02 = ref(null)
const boxWidth = computed(() =>
  box.value && box.value.length ? box.value[0].getBoundingClientRect().height + 20 : 0
)
const totalWidth = computed(() => boxWidth.value * noBoxes)
const dirFromLeft = computed(() => '+=' + totalWidth.value)
const dirFromRight = computed(() => '-=' + totalWidth.value)
const from = computed(() => [dirFromLeft.value, dirFromRight.value])
const dur = [60, 60]
const box = ref(null as HTMLSpanElement[] | null)
const mm = gsap.matchMedia()

function mod(int, max) {
  return gsap.utils.wrap(0, max, int)
}

function marquee(which, time, direction, scale, max) {
  gsap.set(which, {
    x(i) {
      return i * boxWidth.value
    },
  })
  const action = gsap
    .timeline({
      overwrite: true,
    })
    .to(which, {
      x: direction,
      modifiers: {
        x: (x) => mod(parseFloat(x), max) + 'px',
      },
      duration: time,
      ease: 'none',
      repeat: -1,
    })
    .timeScale(scale)

  return action
}

const wait = (timeToDelay: number) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay))

/**
 * Carousel
 */

const carousel = ref(null as HTMLDivElement | null)
const carouselWidth = () => carousel.value ? carousel.value.offsetWidth : 0
const horizontal = ref(null as HTMLDivElement | null)
const content = ref(null as HTMLDivElement | null)
const horizontalWidth = () => horizontal.value ? parseFloat(window.getComputedStyle(horizontal.value).width) - parseFloat(window.getComputedStyle(horizontal.value).paddingLeft) - parseFloat(window.getComputedStyle(horizontal.value).paddingRight) : 0
const carouselVid = ref(null as NodeListOf<HTMLVideoElement> | null)

function init() {

  useSeoMeta({
    title: () => `${store.posts[index.value].title} | James Henry Portfolio`,
    themeColor: [{
      content: store.posts[index.value].color.hex,
      media: '(prefers-color-scheme: light)',
    },
    {
      content: store.posts[index.value].color.hex,
      media: '(prefers-color-scheme: dark)',
    }],
    description: () => store.posts[index.value].description,
    ogUrl: () => `https://jameshenry.site/project/${id.value}`,
    ogTitle: () => `${store.posts[index.value].title} | James Henry Portfolio`,
    ogDescription: () => store.posts[index.value].description,
    ogImage: () => store.posts[index.value].thumbnail.asset.url,
    twitterCard: 'summary_large_image',
    twitterCreator: '@jamespurnama1',
    twitterSite: '@jamespurnama1',
  });

  if (import.meta.client) {
    /**
     * Marquee
     */
    gsap.registerPlugin(ScrollTrigger)

    if (no01.value && boxWidth.value) {
      const marquee01 = gsap
        .timeline()
        .add(marquee(box.value, dur[0], from.value[0], 1, totalWidth.value))
      marquee01.play()
    }

    mm.add("(min-width: 768px)", () => {
      const marquee02 = gsap
        .timeline()
        .add(
          marquee(no02.value, dur[1], from.value[1], 1, totalWidth.value),
          0
        )
      marquee02.play()
    })

    /**
     * Carousel
     */
    let tl = gsap.timeline({ paused: true })
    if (carousel.value && horizontal.value) {
      tl.to(carousel.value, {
        x: () => -carouselWidth() + horizontalWidth(),
        ease: 'power1.inOut',
      })
        .to(
          '.background',
          {
            opacity: 0.2,
          },
          '<'
        )
    }

    if (content.value && horizontal.value) {
      ScrollTrigger.create({
        trigger: horizontal.value,
        start: 'top 20%',
        end: () => `+=${carouselWidth() - 5}px`,
        scrub: true,
        // anticipatePin: 1,
        pin: true,
        pinType: 'fixed',
        invalidateOnRefresh: true,
        animation: tl,
      })
    }
    gsap.to('#container2', {
      opacity: 1,
      duration: 1,
    })
  }
}

onMounted(() => {
  pushTo();

  document.documentElement.style.overflowY = 'scroll'
});

onUnmounted(() => {
  ScrollTrigger.killAll()
  gsap.to('.background', {
    opacity: 1,
  })
  document.documentElement.style.overflowY = 'initial'
})

function next() {
  navigateTo({ path: nextWork.value })
}

function onError() {
  throw createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error',
    fatal: true
  })
}
</script>

<style scoped>
.hero {
  mask-image: linear-gradient(to bottom,
      rgb(0 0 0 / 100%) 80%,
      rgb(0 0 0 / 0%));
}
</style>
