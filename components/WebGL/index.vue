<template>
  <div class="parent">
    <Loading :check-ready="checkReady" :ready="ready" @next="next" />
    <button aria-label="Switch dark/light theme" v-show="loaded && checkReady >= 100" v-posthog-capture="'switch theme'"
      class="fixed z-[41] bg-transparent top-0 left-0 cursor-pointer group" @click="invert()">
      <transition name="slide-bottom" mode="out-in">
        <div v-if="store.dark" key="dark">
          <font-awesome
            class="absolute top-0 left-0 text-2xl dark:text-black text-white m-[3px] transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:translate-y-[5px] group-hover:translate-x-[5px]"
            icon="sun" />
        </div>
        <div v-else key="light">
          <font-awesome
            class="absolute top-0 left-0 text-2xl dark:text-black text-white m-[3px] transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:translate-y-[5px] group-hover:translate-x-[5px]"
            icon="moon" />
        </div>
      </transition>
      <div
        class="transition-all duration-500 ease-in-out h-0 w-0 border-solid border-b-[3.5em] border-l-[3.5em] group-hover:border-b-[5em] group-hover:border-l-[5em] border-transparent dark:border-l-white border-l-black" />
    </button>
    <div
      class="canvas-container fixed z-40 pointer-events-none overflow-hidden opacity-0 top-0 left-0 w-screen h-safe-height">
      <transition name="fade">
        <canvas class="w-full h-full" v-show="loadedDelay && checkReady >= 100" />
      </transition>
    </div>
    <transition name="fade">
      <div v-show="loadedDelay && checkReady >= 100">
        <slot :page-key="$route.fullPath" />
      </div>
    </transition>
    <transition name="fade">
      <div v-if="showVid"
        class="absolute flex z-50 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-screen h-safe-height items-center justify-center">
        <video controls class="reel-overlay max-w-[80%] max-h-[80%]">
          <source :src="posts[0].thumbnail.asset.url" />
        </video>
        <div class="absolute bg-black opacity-90 w-screen h-screen z-[-1]" @click="hideVideo()" />
      </div>
    </transition>
    <div v-if="routePath === '/'" class="absolute duration-500 w-screen top-0 h-safe-height"
      :class="opened ? 'opacity-0' : 'opacity-100'">
      <ul v-show="loadedDelay &&
        routePath === '/' &&
        windowWidth > 600 &&
        checkReady >= 100
        "
        class="absolute top-1/2 -translate-y-1/2 right-0 z-40 cursor-pointer w-1/4 pr-8 group/nav transition-all duration-500 ease-in-out flex flex-col"
        @mouseover="attractMode = true" @mouseleave="attractMode = false">
        <li v-for="(work, index) in posts" :key="index"
          :style="attractMode ? `transform: translateY(${5 * ((index / 2) - index + (index - attractTo))}px)` : ''"
          class="flex flex-row-reverse items-center group/bullet hover:opacity-100 transition-all duration-100 ease-in-out"
          :class="[attractTo === index ? 'opacity-100' : 'opacity-30']" :data-nav="index" @click="clicked(index)"
          @mouseover="attractTo = index">
          <div
            class="transition-all duration-500 ease-in-out bullet h-4 w-1 m-2 rounded-2xl dark:bg-white bg-black group-hover/nav:h-6" />
          <transition name="slide-left">
            <div v-show="attractMode" class="dark:text-white text-black h-6">
              <p class="text-right leading-none">
                <strong>{{ work.title }}</strong>
              </p>
              <p class="text-right leading-none">
                {{ work.role ? work.role[0] : '2025' }}
              </p>
            </div>
          </transition>
        </li>
      </ul>
      <div class="opacity-0 pointer-events-none absolute max-w-[50vw] max-h-[50vh]">
        <span v-if="posts && posts.length > 0">
          <video id="reel" class="cardImg relative h-1/2 w-auto" autoplay muted playsinline loop preload="auto"
            crossorigin="anonymous">
            <source :src="posts[0].thumbnail.asset.url" />
          </video>
          <NuxtImg provider="sanity" v-for="(work, index) in posts.slice(1)"
            sizes="xs:100vw sm:50vw md:33vw lg:25vw xl:20vw 2xl:15vw" :modifiers="{ fit: 'crop' }" :key="index"
            crossorigin="anonymous" class="cardImg" :src="work.thumbnailImage.asset._id" :alt="work.title"
            @load="thumbLoaded()" />
        </span>
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="
          !attractMode &&
          loaded &&
          checkReady >= 100 &&
          posts &&
          posts[attractTo] &&
          route.path === '/'
        " :key="posts[attractTo]._id"
          class="title dark:text-white text-black duration-500 absolute md:-translate-x-1/2 -translate-y-1/2 left-5 md:left-[20%] top-1/2 md:text-right z-10 w-14 md:w-64 lg:w-72 cursor-pointer"
          @click="clicked(attractTo)">
          <h2 class="!leading-[0.75] font-semibold text-xl md:text-lg lg:text-5xl xl:text-7xl"
            @click="!attractTo ? clicked(attractTo) : null">
            {{ posts[attractTo].title.toLowerCase() }}
          </h2>
          <p v-if="attractTo" class="!leading-none md:text-base text-sm">
            {{ posts[attractTo].role[0] }}
            <span v-if="windowWidth > 600">
              <br />
              {{ posts[attractTo].type }}
            </span>
            <br />
            {{ posts[attractTo].year }}
          </p>
          <p class="!leading-none md:text-base text-sm" v-else>works in 2022</p>
        </div>
      </transition>
    </div>
    <div
      class="background fixed z-[-1] pointer-events-none overflow-hidden opacity-0 top-0 left-0 w-screen h-safe-height">
      <canvas class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import Sketch from './sketch'
import Grain from './grain'
import { useStore } from '~/store'
const { $clientPosthog } = useNuxtApp();

const store = useStore()
const route = useRoute()
const { posts } = storeToRefs(store)
const attractMode = ref(false)
const attractTo = ref(0)
let position = 0
let rounded = 0
let objs
const rafInit = ref(false)
const opened = computed(() => store.opened)
const routePath = computed(() => route.path)
// const dark = ref(true)
const persistent = ref(false)
const loaded = ref(false)
const loadedDelay = ref(false)
const attached = ref(false)
const ready = ref(false)
let touchY: number
let start: number
let duration: number

function touchStart(e) {
    if (e.touches[0]) {
      touchY = e.touches[0].clientY
      start = performance.now();
    }
  }

function touchMove(e) {
  if (e.touches[0] && !showVid.value && !store.opened && routePath.value === '/')
    duration = performance.now() - start;
  speed -= gsap.utils.clamp(-10, 2 * (e.touches[0].clientY - touchY) / (duration * 20), 10);
  moved = true
}

function touchEnd(e) {
  if (!moved && routePath.value === '/' && !showVid.value) {
    const pos = {
      x: e.changedTouches[e.changedTouches.length - 1].pageX,
      y: e.changedTouches[e.changedTouches.length - 1].pageY,
    }
    const clickedObject = sketch.handleMouse(pos)
    if (clickedObject === attractTo.value) {
      clicked(clickedObject)
    } else {
      // speed = (clickedObject - attractTo.value) * 0.2
    }
  }
  moved = false
  duration = 0
}

function next() {
  grain.in()
  loaded.value = true
  store.$patch({ loaded: loaded.value })
  if (!attached.value) {
    window.addEventListener(
      'click',
      (e) => {
        const pos = {
          x: e.clientX,
          y: e.clientY,
        }
        if (routePath.value === '/' && !showVid.value) {
          const clickedObject = sketch.handleMouse(pos)
          if (clickedObject === attractTo.value) {
            clicked(clickedObject)
          } else if (typeof clickedObject === 'number')
            position = clickedObject
        }
      },
      false
    )

    window.addEventListener('wheel', (e) => {
      if (routePath.value !== '/' || showVid.value || store.opened) return
      speed += e.deltaY * 0.001
    })

    window.addEventListener('touchstart', touchStart)
    window.addEventListener('touchmove', touchMove)
    window.addEventListener('touchend', touchEnd)

    window.addEventListener('keydown', (event) => {
      if (routePath.value !== '/' || showVid.value || store.opened) return
      if (event.key === 'ArrowUp' && attractTo.value) {
        speed = -0.25
      } else if (
        event.key === 'ArrowDown' &&
        attractTo.value < posts.value.length - 1
      ) {
        speed = 0.25
      } else if (event.key === 'Enter' || event.key === 'Space') {
        clicked(attractTo.value)
      }
    })
    attached.value = true
  }

  setTimeout(() => {
    loadedDelay.value = true
  }, 1000)
}

function invert() {
  if (store.dark) lightTheme()
  else darkTheme()
  persistent.value = true
}

function lightTheme() {
  gsap.to('html', {
    '--bg': '#F2F2F2',
    '--bg-transparent': 'rgba(242, 242, 242, 0)',
    duration: 1,
  })
  gsap.to('html', {
    '--color': 'black',
    duration: 1,
  })
  gsap.to(grain.material.uniforms.color3.value, {
    r: 1,
    g: 1,
    b: 1,
    duration: 1,
  })
  grain.material.uniforms.needsUpdate = true
  store.dark = false
  document.documentElement.setAttribute('data-theme', 'light')
}

function darkTheme() {
  gsap.to('html', {
    '--bg': 'black',
    '--bg-transparent': 'rgba(0,0,0,0)',
    duration: 1,
  })
  gsap.to('html', {
    '--color': 'white',
    duration: 1,
  })
  store.dark = true
  document.documentElement.setAttribute('data-theme', 'dark')
  if (!grain) return
  gsap.to(grain.material.uniforms.color3.value, {
    r: 0,
    g: 0,
    b: 0,
    duration: 1,
  })
  grain.material.uniforms.needsUpdate = true
}

function checkProjectTheme() {
  const projectTheme = posts.value.find((el) => {
    return el.slug ? el.slug.current === routePath.value.substring(1) : null
  })
  if (!persistent.value && projectTheme && projectTheme.theme === 'light')
    lightTheme()
  else if (!persistent.value) {
    darkTheme()
  }
}

watch(opened, () => {
  objs.forEach((_o, i: number) => {
    gsap.to(sketch.meshes[i].material.uniforms.opacity, {
      value: opened.value ? 0.0 : 1.0,
      duration: 0.5,
      onUpdate: () => {
        sketch.meshes[i].material.needsUpdate = true
      }
    })
  })
})

watch([routePath, ready], () => {
  if (routePath.value === '/' || routePath.value === '/404') {
    
    window.addEventListener('touchstart', touchStart)
    window.addEventListener('touchmove', touchMove)
    window.addEventListener('touchend', touchEnd)
    gsap.to('.canvas-container, .clip', {
      opacity: 1,
      duration: 1,
    })
    if (persistent.value && store.dark) darkTheme()
    else lightTheme()
  } else {
    window.removeEventListener('touchstart', touchStart)
    window.removeEventListener('touchmove', touchMove)
    window.removeEventListener('touchend', touchEnd)
    checkProjectTheme()
    dispose()
  }
})

let grain
let sketch
const imagesCount = ref(0)
const load = ref(0)
const showVid = ref(false)
const thumbLoaded = () => {
  imagesCount.value += 1
  load.value = (imagesCount.value / (posts.value.length - 1)) * 100
  store.$patch({
    loadHome: load.value,
  })

  if (
    posts.value.length === imagesCount.value + 1 &&
    routePath.value === '/'
  ) {
    setTimeout(() => {
      sketch.handleImages()
    }, 1000);
  }
}

objs = Array(posts.value.length).fill({ dist: 0 })
if (routePath.value !== '/' && routePath.value !== '/404') {
  checkProjectTheme()
}

function dispose() {
  imagesCount.value = 0
  sketch.dispose()
}

function showVideo() {
  showVid.value = true
  const elem = document.querySelector('.reel-overlay')
  if (elem && elem.requestFullscreen && windowWidth.value <= 600)
    elem.requestFullscreen()
}

function hideVideo() {
  showVid.value = false
}

function clicked(index: number) {
  $clientPosthog?.capture('watch reel');
  if (opened.value && checkReady.value < 100) return
  if (!index) {
    showVideo()
  } else {
    gsap.to('.canvas-container, .clip', {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        dispose()
        navigateTo({ path: store.slugs[index] })
      },
    })
  }
}

function init() {
  objs = Array(posts.value.length).fill({ dist: 0 })
  sketch = new Sketch({
    dom: document.querySelector('.canvas-container'),
  })
  grain = new Grain({
    dom: document.querySelector('.background'),
  })
  if (
    routePath.value === '/' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    lightTheme()
  }
  raf()
  rafInit.value = true
  store.$patch({
    loadWebGL: 100,
  })
  gsap.to(['.canvas-container', '.background'], {
    opacity: 1,
    duration: 5,
  })
}

const mouse = {
  x: 0,
  y: 0,
}

let disableMouse = false

function requestPerm() {
  window.addEventListener(
    'deviceorientation',
    (event) => {
      if (!event && !grain) return
      disableMouse = true
      const rot = (x) => (-Math.abs(x - 180) + 180) * 0.05
      gsap.to(grain.env.rotation, {
        x: rot(event.alpha!),
        y: Math.abs(event.beta!) * 0.05,
        z: Math.abs(event.gamma!) * 0.05,
        duration: 1,
        ease: 'power1',
      })
    },
    false
  )
}

requestPerm()

window.addEventListener(
  'mousemove',
  (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  },
  false
)

let speed = 0
let moved = false

function raf() {
  if (opened.value || route.path !== '/') speed = 0;
  position += speed
  speed *= 0.8

  objs.forEach((o: { dist: number }, i: number) => {
    o.dist = Math.min(Math.abs(position - i), 1)
    o.dist = 1 - o.dist ** 2
    const scale = 1 + 0.2 * o.dist

    if (sketch.meshes.length > 0) {
      sketch.meshes[i].scale.set(scale, scale, scale)
      sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist
    }
  })

  rounded = Math.round(position)
  const diff = rounded - position

  if (loaded.value && attractMode.value && sketch.meshes.length > 0) {
    position += -(position - attractTo.value) * 0.04

    // TODO: don't think this is supposed to be inside RAF
    objs.forEach((_o, i: number) => {
      gsap.to(sketch.meshes[i].rotation, {
        duration: 0.3,
        x: 0.5 * (attractTo.value - i),
        y: 0,
        z: 0,
      })

      gsap.to(sketch.meshes[i].position, {
        duration: 0.2,
        z: -1200 / window.innerWidth - 0.5 * Math.abs(attractTo.value - i),
        x: 0,
        y: -(i - position),
      })
    })

    sketch.meshes.map((s) => (s.material.uniforms.sat.value = 0))
    sketch.meshes[attractTo.value].material.uniforms.sat.value = 1.0
  } else if (
    loaded.value &&
    sketch.meshes.length > 0 &&
    routePath.value === '/'
  ) {
    position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.035
    position = Math.min(Math.max(position, 0), posts.value.length - 1)
    attractTo.value = Math.round(position)

    // TODO: don't think this is supposed to be inside RAF
    objs.forEach((_o, i: number) => {
      gsap.to(sketch.meshes[i].rotation, {
        duration: 0.5,
        x: Math.max(Math.min(0.5 * (attractTo.value - i), 1), -1),
        y: -0.5,
        z: 0.2 * (attractTo.value - i),
      })
      gsap.to(sketch.meshes[i].position, {
        duration: 0.5,
        z: Math.max(
          Math.min(
            (960 / window.innerWidth) * -2.5 -
            0.01 * Math.abs(attractTo.value - i),
            9
          ),
          -9
        ),
        x: Math.min(
          (window.innerWidth / 1920) * 1.1 +
          0.15 * Math.abs(attractTo.value - i),
          window.innerWidth
        ),
        y: -0.6 * (i - position),
      })
    })

    sketch.meshes.map((s) => (s.material.uniforms.sat.value = 0))
    sketch.meshes[attractTo.value].material.uniforms.sat.value = 1.0
  }
  if (
    loaded.value &&
    attractTo.value >= 0 &&
    attractTo.value < posts.value.length
  ) {
    function projectColor(): number {
      return posts.value.findIndex((el) =>
        el.slug ? el.slug.current === routePath.value.substring(1) : null
      )
    }

    const index = routePath.value === '/' ? attractTo.value : projectColor()

    gsap.to(grain.material.uniforms.color1.value, {
      r: posts.value[index].color.rgb.r / 255,
      g: posts.value[index].color.rgb.g / 255,
      b: posts.value[index].color.rgb.b / 255,
      duration: 2,
    })
    gsap.to(grain.material.uniforms.color2.value, {
      r: posts.value[index].color.rgb.r / 255,
      g: posts.value[index].color.rgb.g / 255,
      b: posts.value[index].color.rgb.b / 255,
      duration: 2,
    })
  }

  if (!disableMouse) {
    gsap.to(grain.env.rotation, {
      y: Math.abs(mouse.x) * 0.5,
      x: Math.abs(mouse.y) * 0.5,
      z: Math.abs(mouse.y) * 0.5,
      duration: 1,
      ease: 'power1',
    })
  }

  window.requestAnimationFrame(raf)
}

const windowWidth = ref(0)
const windowHeight = ref(0)

function getWidth() {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
  store.$patch({ windowWidth: windowWidth.value })
  const section: null | HTMLElement = document.querySelector('section')
  const parent: null | HTMLElement = document.querySelector('.parent')
  const nuxtEl: null | HTMLElement = document.querySelector('#__nuxt')
  if (section) section.style.height = `${windowHeight}px`
  if (parent) parent.style.height = `${windowHeight}px`
  if (nuxtEl) nuxtEl.style.height = `${windowHeight}px`
}

const checkReady = computed(() => {
  if (routePath.value === '/404') {
    return store.loadWebGL
  } else if (routePath.value === '/') {
    return (store.loadWebGL + store.loadHome) / 2
  } else if (routePath.value !== '/') {
    return store.loadWorks
  }
  return 0
})

onMounted(() => {
  init()

  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  if (prefersDarkScheme.matches) {
    darkTheme();
  } else {
    lightTheme();
  }

  prefersDarkScheme.addEventListener('change', (e) => {
    if (e.matches) {
      darkTheme();
    } else {
      lightTheme();
    }
  });

  getWidth()

  window.addEventListener('resize', () => {
    getWidth()
  })

  setTimeout(() => {
    ready.value = true
  }, 1500)
})

onUnmounted(() => {
  window.removeEventListener('resize', getWidth)
})
</script>
