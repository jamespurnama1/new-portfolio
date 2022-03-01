<template>
  <div class="parent">
    <!-- <div id="gui_container" /> -->
    <button class="switcher" @click="invert()">
      <transition name="slide-bottom" mode="out-in">
        <span v-if="dark" key="dark">
          <font-awesome-icon class="icon" icon="fa-solid fa-sun" />
        </span>
        <span v-else key="light">
          <font-awesome-icon class="icon" icon="fa-solid fa-moon" />
        </span>
      </transition>
      <div class="triangle" />
      <!-- <p v-if="dark">Light Mode</p>
      <p v-else>Dark Mode</p> -->
    </button>
    <div class="container" :class="{ clipped: opened }" />
    <Nuxt :dark="dark" />
    <transition name="fade">
      <div v-if="showVid" class="over">
        <video controls class="reelOverlay">
          <source :src="require(`~/assets/reel.webm`)" />
          <source :src="require(`~/assets/reel.mp4`)" />
        </video>
        <div class="dim" @click="hideVideo()" />
      </div>
    </transition>
    <div v-if="routePath === '/'" class="clip" :class="{ clipped: opened }">
      <ul
        v-if="routePath === '/' && windowWidth > 600"
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
              <p v-if="attractMode">
                <strong>{{ work.title }}</strong>
              </p>
              <p v-if="attractMode">
                {{ work.metadata.type[0] }}
              </p>
            </div>
          </transition>
        </li>
      </ul>
      <div v-if="routePath === '/'" id="wrap">
        <video id="reel" autoplay muted playsinline loop preload="auto">
          <source :src="require(`~/assets/reel.webm`)" />
          <source :src="require(`~/assets/reel.mp4`)" />
        </video>
        <span v-if="works && works.length > 0">
          <!-- fix CORS if want to use apollo src -->
          <img
            v-for="(work, index) in img"
            :key="index"
            class="cardImg"
            :src="require(`~/assets/img/img${index + 1}.jpg`)"
            alt=""
            @load="imageLoaded()"
          />
        </span>
      </div>
      <transition name="fade" mode="out-in">
        <NuxtLink
          v-if="!attractMode && works && works[attractTo] && route.path === '/'"
          :key="works[attractTo].id"
          :to="`/${works[attractTo].slug}`"
          class="title"
        >
          <h2 @click="!attractTo ? clicked(attractTo) : null">
            {{ works[attractTo].title.toLowerCase() }}
          </h2>
          <!-- <p>{{ works[attractTo].metadata.description.toLowerCase() }}</p> -->
          <p v-if="attractTo" class="types">
            <span v-for="types in works[attractTo].metadata.type" :key="types">
              {{ types }}
              <span v-if="typeof types == 'string'"> | </span>
            </span>
          </p>
          <p v-else>works in 2022</p>
        </NuxtLink>
      </transition>
    </div>
    <div class="BG" />
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
import { Stars, Sketch } from './js'
import { useStore } from '~/store'
import getObjects from '~/queries/getObjects.gql'

export const useNuxt = wrapProperty('$nuxt', false)

export default defineComponent({
  // beforeRouteLeave(to, _from, next) {
  //   console.log(to.path)
  //   if (to.path !== '/') this.dispose()
  //   else if (to.path === '/') {
  //     this.initSketch()
  //     this.sketch.handleImages(this.works.map((w) => w.metadata.image.url))
  //     this.sketch.handleMorph()
  //     this.sketch.settings()
  //     this.raf()
  //   }
  //   next()
  // },
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

    function invert() {
      if (dark.value) lightTheme()
      else darkTheme()
      persistent.value = true
    }

    function lightTheme() {
      console.log('MY EYES!')
      ;(async () => {
        // eslint-disable-next-line no-unmodified-loop-condition
        while (!stars) await new Promise((resolve) => setTimeout(resolve, 100))
        gsap.to(stars.starMaterial.color, {
          r: 0,
          g: 0,
          b: 0,
          duration: 1,
        })
      })()
      gsap.to('html', {
        '--bg': '#F2F2F2',
        duration: 1,
      })
      gsap.to('html', {
        '--color': 'black',
        duration: 1,
      })
      ;(async () => {
        while (!document.querySelector('.lottieRoot g path'))
          await new Promise((resolve) => setTimeout(resolve, 100))
        gsap.to('.lottieRoot g path', {
          fill: 'black',
          duration: 1,
        })
      })()
      dark.value = false
    }

    function darkTheme() {
      console.log('DARK SIDE')
      ;(async () => {
        // eslint-disable-next-line no-unmodified-loop-condition
        while (!stars) await new Promise((resolve) => setTimeout(resolve, 100))
        gsap.to(stars.starMaterial.color, {
          r: 1,
          g: 1,
          b: 1,
          duration: 1,
        })
      })()
      gsap.to('html', {
        '--bg': 'black',
        duration: 1,
      })
      gsap.to('html', {
        '--color': 'white',
        duration: 1,
      })
      ;(async () => {
        while (!document.querySelector('.lottieRoot g path'))
          await new Promise((resolve) => setTimeout(resolve, 100))
        gsap.to('.lottieRoot g path', {
          fill: 'white',
          duration: 1,
        })
      })()
      dark.value = true
    }

    function checkProjectTheme() {
      const projectTheme = works.value.find((el) => {
        return el.slug ? el.slug === routePath.value.substring(1) : null
      })
      // ;(async () => {
      //   while (!works.value)
      //     await new Promise((resolve) => setTimeout(resolve, 100))
      console.log(projectTheme.metadata.theme)
      if (!persistent.value && projectTheme.metadata.theme[0] === 'light')
        lightTheme()
      else if (!persistent.value) {
        darkTheme()
        console.log('d')
      }
      // })()
    }

    watch(routePath, () => {
      if (routePath.value === '/') {
        // raf()
      } else {
        checkProjectTheme()
        dispose()
      }
    })

    let stars
    let sketch
    const imagesCount = ref(0)
    const works = ref([] as any[])
    const img = ref([] as any[])
    const slugs = ref([] as string[])
    // TODO: AJAX Loading Percentage
    const imageLoaded = () => {
      console.log(works.value.map((w) => w.metadata.thumbnail))
      imagesCount.value += 1
      if (
        works.value &&
        works.value.length === imagesCount.value + 1 &&
        routePath.value === '/'
      ) {
        objs = Array(works.value.length).fill({ dist: 0 })
        sketch.handleImages(works.value.map((w) => w.metadata.thumbnail.url))
        sketch.handleMorph()
      }
    }

    const { onResult, loading, onError } = useQuery(
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
      works.value.push(...queryResult.data.getObjects.objects)
      img.value = [...works.value]
      img.value.shift()
      works.value.forEach((work) => {
        slugs.value.push(work.slug)
      })
      objs = Array(works.value.length).fill({ dist: 0 })
      if (
        routePath.value === '/' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches
      ) {
        lightTheme()
      } else if (routePath.value !== '/') {
        checkProjectTheme()
      }
      init()
    })

    onError((error: any) => {
      console.error(error)
    })

    window.addEventListener(
      'click',
      (e) => {
        const pos = {
          x: e.clientX,
          y: e.clientY,
        }
        if (routePath.value === '/') {
          const clickedObject = sketch.handleMouse(pos)
          if (clickedObject === attractTo.value) {
            clicked(clickedObject)
          } else if (typeof clickedObject === 'number') position = clickedObject
          else if (clickedObject === 'sphere') {
            gsap.to(sketch.sphere.position, {
              z: '-=0.3',
            })
          }
        }
      },
      false
    )

    function dispose() {
      imagesCount.value = 0
      sketch.dispose()
    }

    const showVid = ref(false)

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
        dispose()
        router.push(slugs.value[index])
      }
    }

    function initSketch() {
      sketch = new Sketch({
        dom: document.querySelector('.container'),
      })
    }

    function init() {
      objs = Array(works.value.length).fill({ dist: 0 })
      initSketch()
      stars = new Stars({
        dom: document.querySelector('.BG'),
      })

      // document.addEventListener('mousemove', onMouseMove, false)
      raf()
      rafInit.value = true
    }

    // function onMouseMove(event) {
    //   gsap.to(sketch.scene3.position, {
    //     duration: 0.5,
    //     x: 1 - 0.01 * (event.clientX - window.innerWidth / 2),
    //     y: 0.01 * (event.clientY - window.innerHeight / 2),
    //   })
    //   if (this.controls) this.controls.enabled = false
    //   sketch.mouse.x = event.clientX - sketch.windowHalf.x
    //   sketch.mouse.y = event.clientY - sketch.windowHalf.x
    //   clearTimeout(timer)
    //   timer = setTimeout(() => {
    //     if (
    //       this.controls &&
    //       Object.keys(this.controls.deviceOrientation).length > 0
    //     ) {
    //       this.controls.enabled = true
    //     }
    //   }, 300)
    // }

    // function onOrientation() {
    //   this.controls = new DeviceOrientationControls(camera)
    //   // controls.addEventListener('change', animate) // use if there is no animation loop
    //   // controls.minDistance = 2
    //   // controls.maxDistance = 10
    //   // controls.target.set(0, 0, -0.2)
    //   this.controls.update()
    // }

    let speed = 0
    let moved = false

    window.addEventListener('wheel', (e) => {
      speed += e.deltaY * 0.003
    })
    let touchY

    window.addEventListener('touchstart', (e) => {
      if (e.touches[0]) touchY = e.touches[0].clientY
    })

    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) speed -= (e.touches[0].clientY - touchY) * 0.0002
      moved = true
    })

    window.addEventListener('touchend', (e) => {
      // speed -= (e.touches[0].clientY - touchY) * 0.0003

      if (!moved && routePath.value === '/') {
        const pos = {
          x: e.changedTouches[e.changedTouches.length - 1].pageX,
          y: e.changedTouches[e.changedTouches.length - 1].pageY,
        }
        const clickedObject = sketch.handleMouse(pos)

        if (clickedObject === attractTo.value) {
          clicked(clickedObject)
        } else if (typeof clickedObject === 'number') position = clickedObject
        else if (clickedObject === 'sphere') {
          gsap.to(sketch.sphere.position, {
            z: '-=0.3',
          })
        }
      }
      moved = false
    })

    function raf() {
      position += speed
      speed *= 0.8

      objs.forEach((o, i) => {
        o.dist = Math.min(Math.abs(position - i), 1)
        o.dist = 1 - o.dist ** 2
        // scale factor
        const scale = 1 + 0.2 * o.dist
        // sketch.meshes[i].rotation.x = 0.5 * (attractTo - i)
        if (sketch.meshes.length > 0) {
          sketch.meshes[i].scale.set(scale, scale, scale)
          // texture scaling animation
          sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist
        }
      })

      rounded = Math.round(position)
      const diff = rounded - position

      if (attractMode.value && sketch.meshes.length > 0) {
        position += -(position - attractTo.value) * 0.04
        objs.forEach((_o, i) => {
          gsap.to(sketch.meshes[i].rotation, {
            duration: 0.3,
            x: 0.5 * (attractTo.value - i),
            y: 0,
            z: 0,
          })
          gsap.to(sketch.meshes[i].position, {
            duration: 0.5,
            z: -1200 / window.innerWidth - 0.5 * Math.abs(attractTo.value - i),
            x: 0,
            y: -(i - position),
          })
        })
      } else if (sketch.meshes.length > 0) {
        position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.035
        position = Math.min(Math.max(position, 0), works.value.length - 1)
        attractTo.value = rounded
        // const threed = sketch.heroScene.getObjectByName('ciggies', true)
        // if (threed) {
        //   gsap.to(threed.children[0].scale, {
        //     duration: 5,
        //     x: 0,
        //     y: 0,
        //     z: 0,
        //   })
        // }
        objs.forEach((_o, i) => {
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
      }
      // const t = sketch.clock.getElapsedTime()
      // if (sketch.sphere) {
      //   sketch.sphere.position.y =
      //     -0.3 + Math.sin(sketch.sphere.position.y + t) * 0.05
      // }
      stars.animateStars()
      ;(async () => {
        while (!stars.stars)
          await new Promise((resolve) => setTimeout(resolve, 100))
        stars.stars.rotation.z += 0.001
      })()

      window.requestAnimationFrame(raf)
    }

    const windowWidth = ref(0)
    let windowHeight

    function getWidth() {
      windowWidth.value = window.innerWidth
      windowHeight = window.innerHeight
      store.$patch({ windowWidth: windowWidth.value })
      const section: null | HTMLElement = document.querySelector('section')
      const parent: null | HTMLElement = document.querySelector('.parent')
      const nuxtEl: null | HTMLElement = document.querySelector('#__nuxt')
      if (section) section.style.height = `${windowHeight}px`
      if (parent) parent.style.height = `${windowHeight}px`
      if (nuxtEl) nuxtEl.style.height = `${windowHeight}px`
    }

    // function delay(timer) {
    //     return new Promise(resolve => {
    //         timer = timer || 2000;
    //         setTimeout(function () {
    //             resolve();
    //         }, timer);
    //     })
    // }

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
              console.log('event')
            } else lightTheme()
          })
      }
      getWidth()
      window.addEventListener('resize', () => getWidth())
    })

    onUnmounted(() => {
      window.removeEventListener('resize', getWidth)
    })

    return {
      requested,
      loading,
      dark,
      works,
      img,
      attractMode,
      attractTo,
      slugs,
      imageLoaded,
      imagesCount,
      route,
      routePath,
      clicked,
      raf,
      sketch,
      dispose,
      invert,
      initSketch,
      windowWidth,
      opened,
      showVid,
      hideVideo,
    }
  },
})
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity 1s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>

<style lang="scss" scoped>
.switcher {
  z-index: 20;
  position: fixed;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  border: 0;

  &:hover {
    .triangle {
      border-width: 0 0 5em 5em;
    }

    .icon {
      transform: scale(1.5) translate(5px, 5px);
    }
  }

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

  span {
    position: absolute;
    top: 0;
    left: 0;
  }

  .triangle {
    transition: 0.5s ease;
    height: 0;
    width: 0;
    border-style: solid;
    border-width: 0 0 3.5em 3.5em;
    border-color: transparent transparent transparent var(--color);
  }
}

// .parent {
//   position: fixed;
//   height: 100vh;
//   width: 100vw;
//   top: 0;
//   left: 0;
//   @supports (-webkit-touch-callout: none) {
//     /* The hack for Safari */
//     height: -webkit-fill-available;
//   }
// }

.BG,
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.container {
  z-index: 50;
}

.over {
  position: absolute;
  display: flex;
  z-index: 500;
  transform: translate(50%, 50%);
  top: -50%;
  left: -50%;
  width: 100vw;
  height: 100vh;
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
  top: 0;
}

#wrap {
  max-width: 50vw;
  max-height: 50vh;
  position: absolute;
  visibility: hidden;

  video {
    position: relative;
    visibility: hidden;
    height: 50vh;
    width: auto;
  }

  span {
    display: none;
    visibility: hidden;
  }
}

.title {
  color: var(--color);
  position: absolute;
  left: 5%;
  top: 50%;
  text-align: right;
  cursor: pointer;
  z-index: 5;
  max-width: 20%;

  @include min-media(desktop) {
    left: 25vw;
    // max-width: 20em;
  }

  h2 {
    font-size: 30px;
    line-height: 30px;

    @include min-media(mobile) {
      font-size: 50px;
      line-height: 40px;
    }

    @include min-media(wide) {
      font-size: 70px;
      line-height: 60px;
    }
  }

  .types {
    font-size: 0.8em;

    @include min-media(wide) {
      font-size: 1.2em;
    }
  }
}

ul {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2em;
  z-index: 100;
  // width: 200px;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    cursor: pointer;

    .bullet {
      height: 1em;
      width: 0.25em;
      margin: 0.5em;
      border-radius: 1em/1em;
      background-color: var(--color);
      transition: transform 0.5s ease, color 0.5s ease, margin 0.5s ease;
    }

    p {
      text-align: right;
      line-height: 1.5em;
    }

    &.active {
      color: red;

      .bullet {
        background-color: red;
        transform: scaleY(1.5);
      }

      .activeLength {
        transform: scaleY(2.5);
        margin: 2em 0.5em;
      }
    }
  }
}
</style>
