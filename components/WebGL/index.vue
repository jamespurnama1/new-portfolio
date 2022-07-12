<template>
  <div class="parent">
    <Loading :check-ready="checkReady" :ready="ready" @next="next" />
    <button
      aria-label="Switch dark/light theme"
      v-show="loaded && checkReady === 100"
      class="switcher"
      @click="invert()"
    >
      <transition name="slide-bottom" mode="out-in">
        <span v-if="dark" key="dark">
          <font-awesome-icon class="icon" icon="fa-solid fa-sun" />
        </span>
        <span v-else key="light">
          <font-awesome-icon class="icon" icon="fa-solid fa-moon" />
        </span>
      </transition>
      <div class="triangle" />
    </button>
    <div class="container" :class="{ clipped: opened }">
      <transition name="fade">
        <canvas v-show="loadedDelay && checkReady === 100" />
      </transition>
    </div>
    <transition name="fade">
      <Nuxt v-show="loadedDelay && checkReady === 100" :key="$route.path" />
    </transition>
    <transition name="fade">
      <div v-if="showVid" class="over">
        <video controls class="reelOverlay">
          <source
            src="https://imgix.cosmicjs.com/11e5cb50-f603-11ec-a2eb-c1653f3f9199-reel.webm"
          />
          <source
            src="https://imgix.cosmicjs.com/21fac4a0-f603-11ec-a2eb-c1653f3f9199-reel.mp4"
          />
        </video>
        <div class="dim" @click="hideVideo()" />
      </div>
    </transition>
    <div v-if="routePath === '/'" class="clip" :class="{ clipped: opened }">
      <ul
        v-show="
          loadedDelay &&
          routePath === '/' &&
          windowWidth > 600 &&
          checkReady === 100
        "
        class="nav"
        @mouseover="attractMode = true"
        @mouseleave="attractMode = false"
      >
        <li
          v-for="(work, index) in works"
          :key="index"
          class="projects"
          :class="{ active: index === attractTo }"
          :data-nav="index"
          @click="clicked(index)"
          @mouseover="attractTo = index"
        >
          <div class="bullet" :class="{ activeLength: attractMode }" />
          <transition name="slide-left">
            <div>
              <p v-show="attractMode">
                <strong>{{ work.title }}</strong>
              </p>
              <p v-show="attractMode" v-if="work.metadata.role">
                {{
                  work.metadata.role.includes(',')
                    ? work.metadata.role.split(',', 1)[0]
                    : work.metadata.role
                }}
              </p>
            </div>
          </transition>
        </li>
      </ul>
      <div id="wrap" class="hide">
        <video
          id="reel"
          class="cardImg"
          autoplay
          muted
          playsinline
          loop
          preload="auto"
          crossorigin="anonymous"
        >
          <source
            src="https://imgix.cosmicjs.com/11e5cb50-f603-11ec-a2eb-c1653f3f9199-reel.webm"
          />
          <source
            src="https://imgix.cosmicjs.com/21fac4a0-f603-11ec-a2eb-c1653f3f9199-reel.mp4"
          />
        </video>
        <span v-if="works && works.length > 0">
          <img
            v-for="(work, index) in img"
            :key="index"
            crossorigin="anonymous"
            class="cardImg"
            :src="`${work.metadata.thumbnail.imgix_url}?auto=format&q=90`"
            :alt="work.title"
            @load="imageLoaded()"
          />
        </span>
      </div>
      <transition name="fade" mode="out-in">
        <div
          v-if="
            !attractMode &&
            loaded &&
            checkReady === 100 &&
            works &&
            works[attractTo] &&
            route.path === '/'
          "
          :key="works[attractTo].id"
          class="title"
          @click="clicked(attractTo)"
        >
          <h2 @click="!attractTo ? clicked(attractTo) : null">
            {{ works[attractTo].title.toLowerCase() }}
          </h2>
          <p v-if="attractTo" class="types">
            {{
              works[attractTo].metadata.role.includes(',')
                ? works[attractTo].metadata.role.split(',', 1)[0]
                : works[attractTo].metadata.role
            }}
            <span v-if="windowWidth > 600">
              <br />
              {{ works[attractTo].metadata.type }}
            </span>
            <br />
            {{ works[attractTo].metadata.year }}
          </p>
          <p v-else>works in 2022</p>
        </div>
      </transition>
    </div>
    <div class="BG">
      <canvas></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useContext,
  watch,
  useRouter,
  useRoute,
  onMounted,
  onUnmounted,
  wrapProperty,
} from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import { gsap } from 'gsap'
import Sketch from './sketch'
import Grain from './grain'
import { useStore } from '~/store'
import getObjects from '~/queries/getObjects.gql'

export const useNuxt = wrapProperty('$nuxt', false)

export default defineComponent({
  setup() {
    const { env } = useContext()
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const attractMode = ref(false)
    const attractTo = ref(0)
    let position = 0
    let rounded = 0
    let objs
    const requested = ref(false)
    const rafInit = ref(false)
    const opened = computed(() => useStore().opened)
    const routePath = computed(() => route.value.path)
    const dark = ref(true)
    const persistent = ref(false)
    const loaded = ref(false)
    const loadedDelay = ref(false)
    const attached = ref(false)

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
          speed += e.deltaY * 0.001
        })
        let touchY
        window.addEventListener('touchstart', (e) => {
          if (e.touches[0]) touchY = e.touches[0].clientY
        })
        window.addEventListener('touchmove', (e) => {
          if (e.touches[0] && !showVid.value)
            speed -= (e.touches[0].clientY - touchY) * 0.0003
          moved = true
        })
        window.addEventListener('touchend', (e) => {
          if (!moved && routePath.value === '/' && !showVid.value) {
            const pos = {
              x: e.changedTouches[e.changedTouches.length - 1].pageX,
              y: e.changedTouches[e.changedTouches.length - 1].pageY,
            }
            const clickedObject = sketch.handleMouse(pos)
            if (clickedObject === attractTo.value) {
              clicked(clickedObject)
            }
          }
          moved = false
        })
        window.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowUp' && attractTo.value) {
            speed = -0.25
          } else if (
            event.key === 'ArrowDown' &&
            attractTo.value < works.value.length - 1
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
      if (dark.value) lightTheme()
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
      dark.value = false
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
      gsap.to(grain.material.uniforms.color3.value, {
        r: 0,
        g: 0,
        b: 0,
        duration: 1,
      })
      grain.material.uniforms.needsUpdate = true
      dark.value = true
    }
    function checkProjectTheme() {
      const projectTheme = works.value.find((el) => {
        return el.slug ? el.slug === routePath.value.substring(1) : null
      })
      if (!persistent.value && projectTheme.metadata.theme === 'light')
        lightTheme()
      else if (!persistent.value) {
        darkTheme()
      }
    }
    watch(routePath, () => {
      if (routePath.value === '/' || routePath.value === '/404') {
        gsap.to('.container, .clip', {
          opacity: 1,
          duration: 1,
        })
        if (persistent.value && dark.value) darkTheme()
        else lightTheme()
      } else {
        checkProjectTheme()
        dispose()
      }
    })
    let grain
    let sketch
    const imagesCount = ref(0)
    const works = ref([] as any[])
    const img = ref([] as any[])
    const slugs = ref([] as string[])
    const load = ref(0)
    const showVid = ref(false)
    const imageLoaded = () => {
      imagesCount.value += 1
      load.value = (100 * imagesCount.value) / (works.value.length - 1)
      store.$patch({
        loadHome: load.value,
      })

      if (
        works.value &&
        works.value.length === imagesCount.value + 1 &&
        routePath.value === '/'
      ) {
        // objs = Array(works.value.length - 1).fill({ dist: 0 })
        sketch.handleImages()
      }
    }

    const { onResult, onError } = useQuery(
      getObjects,
      {
        bucket_slug: env.NUXT_ENV_BUCKET_SLUG,
        read_key: env.NUXT_ENV_READ_KEY,
      },
      {
        prefetch: true,
      }
    )

    onResult((queryResult) => {
      load.value += 10
      store.$patch({
        loadHome: load.value,
      })
      works.value.push(...queryResult.data.getObjects.objects)
      img.value = [...works.value]
      img.value.shift()
      works.value.forEach((work) => {
        slugs.value.push(work.slug)
      })
      objs = Array(works.value.length).fill({ dist: 0 })
      init()
      if (routePath.value !== '/' && routePath.value !== '/404') {
        checkProjectTheme()
      }
    })

    onError((error: any) => {
      console.error(error)
    })

    function dispose() {
      imagesCount.value = 0
      sketch.dispose()
    }

    function showVideo() {
      showVid.value = true
      const elem = document.querySelector('.reelOverlay')
      if (elem && elem.requestFullscreen && windowWidth.value <= 600)
        elem.requestFullscreen()
    }

    function hideVideo() {
      showVid.value = false
    }

    function clicked(index) {
      if (opened.value) return
      if (!index) {
        showVideo()
      } else {
        gsap.to('.container, .clip', {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            dispose()
            router.push(slugs.value[index])
          },
        })
      }
    }
    function init() {
      // objs = Array(works.value.length - 1).fill({ dist: 0 })
      sketch = new Sketch({
        dom: document.querySelector('.container'),
      })
      grain = new Grain({
        dom: document.querySelector('.BG'),
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
      gsap.to(['.container', '.BG'], {
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
        position = Math.min(Math.max(position, 0), works.value.length - 1)
        attractTo.value = Math.round(position)
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
        attractTo.value < works.value.length
      ) {
        function projectColor(): number {
          return works.value.findIndex((el) =>
            el.slug ? el.slug === routePath.value.substring(1) : null
          )
        }
        const index = routePath.value === '/' ? attractTo.value : projectColor()
        gsap.to(grain.material.uniforms.color1.value, {
          r: works.value[index].metadata.colors[0].r,
          g: works.value[index].metadata.colors[0].g,
          b: works.value[index].metadata.colors[0].b,
          duration: 2,
        })
        gsap.to(grain.material.uniforms.color2.value, {
          r: works.value[index].metadata.colors[1].r,
          g: works.value[index].metadata.colors[1].g,
          b: works.value[index].metadata.colors[1].b,
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
    const ready = ref(false)
    const checkReady = computed(() => {
      if (routePath.value === '/404') {
        return store.loadWebGL
      } else if (routePath.value === '/') {
        return (store.loadWebGL + store.loadHome) / 2
      } else if (routePath.value !== '/') {
        return store.loadWorks
        // return 100
      }
      return 0
    })
    onMounted(() => {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches
      ) {
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', (e) => {
            if (e.matches) {
              darkTheme()
            } else lightTheme()
          })
      }
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
    return {
      next,
      requested,
      dark,
      works,
      img,
      attractMode,
      attractTo,
      slugs,
      imageLoaded,
      imagesCount,
      loaded,
      loadedDelay,
      route,
      routePath,
      clicked,
      raf,
      sketch,
      dispose,
      invert,
      windowWidth,
      opened,
      showVid,
      hideVideo,
      checkReady,
      ready,
      store,
      requestPerm,
    }
  },
})
</script>

<style lang="scss" scoped>
.switcher {
  z-index: 20;
  position: fixed;
  background: transparent;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  border: 0;
  cursor: pointer;

  .icon {
    margin: 3px;
    transition: 0.5s ease;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 1.5em;
    height: 1em;
    width: auto;
    color: var(--bg);
  }

  .triangle {
    transition: 0.5s ease;
    height: 0;
    width: 0;
    border-style: solid;
    border-width: 0 0 3.5em 3.5em;
    border-color: transparent transparent transparent var(--color);
  }

  @media (hover: hover) and (pointer: fine) {
    .switcher:hover {
      .triangle {
        border-width: 0 0 5em 5em;
      }

      .icon {
        transform: scale(1.5) translate(5px, 5px);
      }
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
  }
}
.BG,
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: calc(100vh - env(safe-area-inset-bottom));
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  opacity: 0;

  canvas {
    width: 100%;
    height: 100%;
  }
}

.container {
  z-index: 50;
}

.over {
  position: absolute;
  display: flex;
  z-index: 500;
  transform: translate(50%, 50%);
  top: -50vh;
  left: -50vw;
  width: 100vw;
  height: 100vh;
  height: calc(100vh - env(safe-area-inset-bottom));
  justify-content: center;
  align-items: center;

  .reelOverlay {
    max-width: 80%;
    max-height: 80%;
  }

  .dim {
    position: absolute;
    background-color: black;
    opacity: 90%;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}

.clip {
  position: absolute;
  width: 100vw;
  height: 100vh;
  height: calc(100vh - env(safe-area-inset-bottom));
  top: 0;
}

#wrap {
  max-width: 50vw;
  max-height: 50vh;
  position: absolute;

  &.hide {
    opacity: 0;
  }

  video {
    position: relative;
    height: 50vh;
    width: auto;
  }

  span {
    display: none;
  }
}

ul {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2em;
  z-index: 100;
  list-style: none;
  margin: 0;
  padding: 0;
  cursor: pointer;

  li {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    opacity: 0.3;

    .bullet {
      height: 1em;
      width: 0.25em;
      margin: 0.5em;
      border-radius: 1em/1em;
      background-color: var(--color);
      transition: transform 0.5s ease, color 0.5s ease, margin 0.5s ease;
    }

    p {
      font-size: 1em;
      text-align: right;
      line-height: 1.5em;
    }

    &.active {
      opacity: 1;

      .bullet {
        transform: scaleY(1.5);
      }

      .activeLength {
        transform: scaleY(2.5);
        margin: 2em 0.5em;
      }
    }
  }
}

.title {
  color: var(--color);
  position: absolute;
  left: 5%;
  top: 47%;
  text-align: right;
  z-index: 5;
  max-width: 20%;
  cursor: pointer;

  @include min-media(desktop) {
    left: 25vw;
  }

  h2 {
    font-size: 20px;
    line-height: 20px;

    @include min-media(mobile) {
      font-size: 50px;
      line-height: 40px;
    }

    @include min-media(wide) {
      font-size: 70px;
      line-height: 60px;
    }
  }

  p {
    font-size: 1em;

    @include min-media(mobile) {
      font-size: 1.2em;
    }
  }
}
</style>
