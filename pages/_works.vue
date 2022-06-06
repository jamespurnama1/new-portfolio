<template>
  <div id="container2">
    <div ref="no01" class="no01 wrapper">
      <div class="boxes">
        <span v-for="(number, i) in noBoxes" ref="box" :key="i" class="box">
          {{ data.title }}
        </span>
      </div>
    </div>
    <div v-if="width > 600" ref="no02" class="no02 wrapper">
      <div class="boxes">
        <span v-for="(number, i) in noBoxes" :key="i" class="box">
          {{ data.title }}
        </span>
      </div>
    </div>
    <!-- <button v-if="width <= 600" class="AR" @click="ar()">
      <font-awesome-icon class="icon" icon="fa-solid fa-cube" />
    </button> -->
    <nuxt-link to="/">
      <button class="back">
        <p>← Back</p>
      </button>
    </nuxt-link>
    <div class="content">
      <client-only>
        <div class="top">
          <!-- <div v-if="width <= 600" class="overlay" /> -->
          <video
            v-if="hero && hero.imgix_url.slice(-4) === ('.mp4' || 'webm')"
            muted
            autoplay
            loop
            playsinline
            preload
            class="hero"
            :src="hero.imgix_url"
          />
          <img v-else-if="hero" class="hero" :src="hero.imgix_url" />
          <div class="info">
            <p v-if="data.desc" class="desc">
              {{ data.desc }}
            </p>
            <div class="details">
              <div class="tools">
                <h4>tools used</h4>
                <p>
                  {{ data.tools }}
                </p>
              </div>
              <div class="flex">
                <div>
                  <h4>role</h4>
                  <p v-for="role in data.role" :key="role">
                    {{ role }}
                  </p>
                </div>
                <div>
                  <h4>type</h4>
                  <p>
                    {{ data.type }}
                  </p>
                </div>
                <div>
                  <h4>year</h4>
                  <p>
                    {{ data.year }}
                  </p>
                </div>
              </div>
              <a :href="data.external">
                <button class="external" v-if="data.external">
                  <h4>
                    visit website
                    <font-awesome-icon class="icon" icon="fa-solid fa-arrow-up-right-from-square" />
                  </h4>
                </button>
              </a>
            </div>
          </div>
        </div>
        <div class="pin">
          <div ref="horizontal" class="horizontal">
            <div v-if="car.value.length" ref="carousel" class="slide">
              <span v-for="pics in car.value" :key="pics.imgix_url">
                <video
                  v-if="pics.imgix_url.slice(-4) === ('.mp4' || 'webm')"
                  ref="carouselVid"
                  muted
                  autoplay
                  loop
                  playsinline
                  preload
                  :src="pics.imgix_url"
                />
                <img
                  v-else
                  :src="pics.imgix_url"
                  alt=""
                />
              </span>
            </div>
          </div>
          <div
            v-if="data.value"
            class="pinned"
            v-html="data.value.content"
          ></div>
          <div class="spacer">
            <h3>
              <font-awesome-icon class="icon arrowUp" icon="fa-solid fa-arrow-up" />
              Next Project
            </h3>
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  computed,
  useContext,
  useRoute,
  useRouter,
  onUnmounted,
  wrapProperty,
} from '@nuxtjs/composition-api'
import { gsap } from 'gsap'
import { useQuery } from '@vue/apollo-composable/dist'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '~/store'
import getObject from '~/queries/getPosts.gql'
export const useNuxt = wrapProperty('$nuxt', false)

export default defineComponent({
  setup() {
    const width = ref(0)
    const noBoxes = 25
    const context = useContext()
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const { $nextTick } = useNuxt() as any
    const routePath = computed(() => route.value.path)
    let mounted = false
    let dat = false

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
    const data = reactive({
      title: '',
      value: null,
      desc: '',
      ar_ios: {
        url: '',
        imgix_url: '',
      },
      ar_android: {
        url: '',
        imgix_url: '',
      },
      tools: '',
      type: '',
      role: [] as string[],
      year: 0,
      external: ''
    })
    const id = ref('')
    // const dat = ref(false)
    const media = reactive({ value: [] as any[] })
    const car = reactive({ value: [] as any[] })
    const hero = ref(null)

    const load = ref(0)

    const { onResult, onError } = useQuery(
      getObject,
      {
        bucket_slug: context.env.NUXT_ENV_BUCKET_SLUG,
        read_key: context.env.NUXT_ENV_READ_KEY,
        object_id: id,
        folder: routePath.value.substring(1),
      },
      {
        prefetch: true,
      }
    )
    async function pushTo() {
      await waitUntil(() => store.cache.length > 1)
      const [getID] = store.cache.filter((obj) => {
        return obj.slug === routePath.value.substring(1)
      })
      if (!getID) {
        context.error({ statusCode: 404 })
        router.push('/404')
      } else {
        id.value = getID.id
        onResult((queryResult) => {
          load.value += 10
          store.$patch({
            loadWorks: load.value,
          })
          if (queryResult.data) {
            data.value = { ...queryResult.data.getObject }
            data.title = getID.title
            data.desc = getID.metadata.description
            data.tools = getID.metadata.tools
            data.type = getID.metadata.type
            data.role = getID.metadata.role
            data.year = getID.metadata.year
            if (getID.metadata.external) data.external = getID.metadata.external
            data.ar_android = getID.metadata.ar_android
            data.ar_ios = getID.metadata.ar_ios
            media.value = [...queryResult.data.getMedia.media]
            hero.value = media.value.find((el) => {
              return el.metadata ? el.metadata.type === 'hero' : null
            })
            car.value = media.value.filter(function (el) {
              return el.metadata ? el.metadata.type === 'carousel' : null
            })

            $nextTick(() => {
              const imgs = document.images
              const len = imgs.length
              let counter = 0;

              console.log(imgs)

              Array.from(imgs).forEach((img:HTMLImageElement) => {
                console.log('loading image')
                if (img.complete)
                  incrementCounter()
                else
                  img.addEventListener('load', incrementCounter, false)
              })

              function incrementCounter() {
                counter++;
                load.value = 100 * (counter / len)
                store.$patch({
                  loadWorks: load.value,
                })
                console.log(counter, len)
                if ( counter === len ) {
                  getWidth()
                  init()
                  load.value = 100
                  store.$patch({
                    loadWorks: load.value,
                  })
                }
              }
            })
          }
        })

        onError((error: any) => {
          context.error({ statusCode: error.networkError.statusCode })
          console.error(error)
        })
      }
    }

    pushTo()

    /**
     * Infinite Marquee
     */
    const no01 = ref(null)
    const no02 = ref(null)
    const boxWidth = ref(0)
    const totalWidth = computed(() => boxWidth.value * noBoxes)
    const dirFromLeft = computed(() => '+=' + totalWidth.value)
    const dirFromRight = computed(() => '-=' + totalWidth.value)
    const from = computed(() => [dirFromLeft.value, dirFromRight.value])
    const dur = [60, 60]
    const box = ref(null as HTMLElement[] | null)

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

    const wait = (timeToDelay) =>
      new Promise((resolve) => setTimeout(resolve, timeToDelay))

    async function getWidth() {
      width.value = window.innerWidth
      if (routePath.value === '/404') return
      // await waitUntil(
      //   () => box.value && box.value[0].getBoundingClientRect().height
      // )
      boxWidth.value = box.value![0].getBoundingClientRect().height + 20

      carouselWidth.value = carousel.value ? carousel.value.offsetWidth : 0
      horizontalWidth.value = horizontal.value
        ? horizontal.value.offsetWidth
        : 0
      await wait(500)
      checkMarquee02()
    }

    function checkMarquee02() {
      if (width.value > 600) {
        console.log(width.value)
        const marquee02 = gsap
          .timeline()
          .add(
            marquee('.no02 .box', dur[1], from.value[1], 1, totalWidth.value),
            0
          )
        marquee02.play()
      }
    }

    /**
     * Carousel
     */

    const carousel = ref(null as HTMLElement | null)
    const carouselWidth = ref(0)
    const horizontal = ref(null as HTMLElement | null)
    const horizontalWidth = ref(0)
    const carouselVid = ref(null as NodeListOf<HTMLVideoElement> | null)

    async function init() {
      if (process.client) {
        /**
         * Marquee
         */
        gsap.registerPlugin(ScrollTrigger)

        console.log(no01.value, boxWidth.value)
        if (no01.value && boxWidth.value) {
          const marquee01 = gsap
            .timeline()
            .add(marquee(box.value, dur[0], from.value[0], 1, totalWidth.value))
          marquee01.play()
        }

        // TODO: EASE PAUSE RESUME AND SCROLL EFFECT

        // ScrollTrigger.create({
        //   animation: marquee01,
        //   // trigger: 'body',
        //   start: 'top bottom',
        //   end: '+=4000',
        //   scrub: 1,
        //   // markers: true,
        //   onScrubComplete: ({ progress, direction, isActive }) => {
        //     marquee01.resume()
        //   },
        //   onToggle: (self) => {
        //     self.isActive ? marquee01.pause() : marquee01.resume()
        //   },
        //   // onUpdate: (self) => {
        //   //   marquee01.progress(self.progress)
        //   //   console.log(marquee01.progress(), marquee01.totalProgress())
        //   //   //   console.log(
        //   //   //     'progress:',
        //   //   //     self.progress.toFixed(3),
        //   //   //     'direction:',
        //   //   //     self.direction,
        //   //   //     'velocity',
        //   //   //     self.getVelocity()
        //   //   //   )
        //   // },
        // })

        /**
         * Carousel
         */
        gsap.timeline({ paused: true }).to(carousel.value, {
          x: () => -carouselWidth.value + horizontalWidth.value,
          ease: 'power1.inOut',
          scrollTrigger: {
            scroller: '#__nuxt',
            trigger: '.horizontal',
            start: 'top 20%',
            end: () => `+=${carouselWidth.value - 5}`,
            scrub: 1,
            // markers: true,
            pin: '.content',
            pinType: 'fixed',
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
        })
        gsap.timeline({ paused: true }).to('.arrowUp', {
          rotate: '180deg',
          scrollTrigger: {
            snap: {
              snapTo: 0,
              duration: { min: 0.5, max: 1 },
              delay: 0.5,
            },
            scrub: 1,
            scroller: '#__nuxt',
            trigger: '.spacer',
            markers: true,
            start: 'top bottom',
            end:  '+=400',
            onScrubComplete: ({ progress, direction }) => {
              if (progress === 1 && direction === 1) {
                gsap.to('.pinned', { y: '-100vw' })
              }
            },
          }
        })
        gsap.to('#container2', {
          opacity :1
        })
      }
    }

    onMounted(() => {
      (document.querySelector('#__nuxt') as HTMLDivElement).style.overflowY = 'scroll'
      window.addEventListener('resize', () => getWidth())
      // mounted = true
      // if (mounted && dat) init()
    })

    onUnmounted(() => {
      (document.querySelector('#__nuxt') as HTMLDivElement).style.overflowY = 'initial'
      window.removeEventListener('resize', getWidth)
    })

    const convertToKebabCase = (string) => {
      return string.replace(/\s+/g, '-').toLowerCase()
    }

    function ar() {
      const ua = navigator.userAgent
      if (/android/i.test(ua)) {
        window.open(data.ar_android.url, '_blank')
      } else if (
        /iPad|iPhone|iPod/.test(ua) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
      ) {
        window.open(data.ar_ios.url, '_blank')
      }
    }

    return {
      carousel,
      ar,
      horizontal,
      no01,
      no02,
      box,
      carouselVid,
      noBoxes,
      horizontalWidth,
      carouselWidth,
      hero,
      car,
      width,
      data,
      media,
      convertToKebabCase,
    }
  },
})
</script>

<style lang="scss">
.pin-spacer {
  // pointer-events: none;
}

.grid {
  display: grid;
  grid-row-gap: 1em;

  .long {
    grid-row: span 2;
    object-fit: cover;
    height: 100%;
  }

  &.oneFourth {
    grid-template-columns: 25% auto;
  }

  & > * {
    margin: auto;
  }

  @include min-media(mobile) {
    grid-column-gap: 1em;
    grid-template-columns: 1fr 1fr;
  }
}

.fr-video,
img,
video {
  width: 100%;
}

.margin {
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @include min-media(tablet) {
    // max-width: 50vw;
    display: block;
  }
}

h3 {
  @include min-media(mobile) {
    text-align: right;
  }
}

.flex {
  width: 100%;
  // max-width: 700px;
  // margin: 1em auto;
  display: flex;
  gap: 3vw;
  margin-left: auto;
  margin-right: auto;
  // grid-gap: 3vw;
  // justify-items: center;
  align-items: center;
  flex-basis: 0;
  // grid-template-columns: auto auto;
  // img {
  //   min-width: 0;
  //   max-width: 100%;
  // }
  flex-flow: column;

  @include min-media(mobile) {
    flex-flow: row;
  }

  &.reverse {
    @include min-media(mobile) {
      flex-flow: row-reverse;
    }
  }

  div {
    height: 100%;
  }

  .fr-video,
  video,
  img {
    min-width: 0;
    max-width: 100%;
    width: initial;
  }
}

.cover {
  object-fit: cover;
}

.section {
  margin-bottom: 1rem;

  @include min-media(mobile) {
    margin-bottom: 3rem;
  }
}

.section > * {
  flex: 1;
}
</style>

<style lang="scss" scoped>
#container2 {
  opacity: 0;
}

button {
  display: flex;
  border: 1px solid white;
  border-radius: 20px 20px;
  padding: 10px 15px;
  background-color: transparent;
  cursor: pointer;

  &.AR {
    top: initial;
    bottom: 1rem;
  }

  &.back {
    position: absolute;
    right: 3rem;
    top: 1rem;
    mix-blend-mode: difference;
    // position: fixed;
    z-index: 10;
  }

  &.external {
    border: none;
    cursor: pointer;
  }

  @include min-media(mobile) {
    top: 2rem;
    right: 5rem;
    position: relative;
    margin-left: auto;
    margin-bottom: 2em;
  }

  p {
    color: white;
    font-size: 0.75em;

    @include min-media(mobile) {
      font-size: 1em;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover {
      background-color: white;

      p {
        color: black;
      }
    }
  }
}

.wrapper {
  mix-blend-mode: difference;
  position: fixed;
  width: 100vh;
  overflow: hidden;
  bottom: -2.5em;
  transform: rotate(-90deg);
  transform-origin: left top;
  z-index: 5;
  font-size: 1.5em;
  pointer-events: none;

  @include min-media(mobile) {
    left: 0.5em;
  }

  &.no02 {
    transform: rotate(-90deg) translateY(40px);
    @include min-media(mobile) {
      // left: 1em;
    }
  }

  .boxes {
    color: white;
    position: relative;
    left: -250px;
    height: 2.5em;

    span.box {
      position: absolute;
      display: block;
      height: 2.5em;
      font-weight: bold;
      font-size: 2em;
      text-align: center;
      white-space: nowrap;
      line-height: 50px;
    }
  }
}

.content {
  pointer-events: none;
  margin-left: 2.5em;
  width: calc(100vw - 2.5em);

  @include min-media(mobile) {
    // margin-top: 3rem;
    margin-left: 5rem;
    width: calc(100vw - 5rem);
  }

  .horizontal {
    margin-bottom: 1rem;
    overflow: hidden;

    @include min-media(mobile) {
      margin-bottom: 5rem;
    }

    .slide {
      display: flex;
      overflow-x: visible;
      width: fit-content;

      @include min-media(mobile) {
        height: 50vh;
      }

      span {
        max-height: 25vh;
        max-width: 80vw;
        height: auto;
        margin-right: 0.5em;
        user-select: none;
        // pointer-events: none;

        &:last-child {
          margin-right: 0.5em;
        }

        img,
        video {
          height: 100%;
          width: auto;
          object-fit: contain;
        }

        @include min-media(mobile) {
          height: 100%;
          width: auto;
          max-height: initial;
          max-width: initial;

          &:first-child {
            margin-left: 5em;
          }

          &:last-child {
            margin-right: 5em;
          }
        }
      }
    }
  }

  .top {
    position: relative;
    top: 0;
    left: -2.5em;
    width: 100vw;
    overflow: hidden;
    z-index: 1;
    // pointer-events: initial;

    @include min-media(mobile) {
      left: -5em;
      // left: 0;
      // width: 60%;
      // margin-left: auto;
      // margin-right: 5em;
    }

    .hero {
      width: 100%;
      max-height: 56.3vw;
      height: auto;
      object-fit: cover;
      top: 0;
      z-index: -1;
      mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0));

      @include min-media(mobile) {
        // display: block;
      }
    }

    // .overlay {
    //   position: absolute;
    //   width: 100vw;
    //   height: 60vw;
    //   background: linear-gradient(
    //     0deg,
    //     var(--bg) 10%,
    //     var(--bg-transparent) 35%
    //   );
    // }

    .info {
      display: flex;
      margin-left: 3em;
      z-index: 1;
      position: relative;
      align-items: center;
      gap: 1em;
      flex-direction: column;
      pointer-events: initial;

      @include min-media(mobile) {
        margin-left: 10em;
        margin-right: 2em;
        flex-direction: row;
      }

      @include min-media(desktop) {
        display: flex;
        gap: 3em;
        justify-content: space-between;
      }

      .desc {
        position: relative;
        z-index: 1;
        // margin: -5em 0 0.5em 0;

        @include min-media(mobile) {
          margin: 0 0 0.5em 0;
          max-width: 50vw;
        }

        @include min-media(desktop) {
          width: 35ch;
        }
      }

      .details {
        display: flex;
        flex-direction: column;

        a {
            margin: auto;

            button {
              top: initial;
              right: initial;
            }
          }

        @include min-media(mobile) {
          display: flex;
          gap: 2em;

          p {
            @include min-media(mobile) {
              font-size: 1.5em;
            }
          }
        }

        .types {
          width: 65vw;
          font-weight: bold;

          @include min-media(mobile) {
            width: 100%;
          }

          @include min-media(desktop) {
            margin: 1em 0 0.5em 0;
          }
        }

        .tools {
          display: flex;
          flex-direction: column;
          align-content: center;
          text-align: center;
          margin-bottom: 1em;

          @include min-media(mobile) {
            width: 100%;
          }

          img {
            max-height: 1em;
            height: 100%;
            width: auto;
            margin-right: 0.5em;

            @include min-media(mobile) {
              max-height: 2em;
              margin-right: 1em;
            }
          }
        }
        .flex {
          align-content: flex-start;
          flex-direction: row;

          div {
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-items: center;
            // margin: 0 1em;
            width: 70%;
            text-align: center;

            @include min-media(mobile) {
              margin: 0 1em;
            }
          }
        }
      }
    }
  }

  .spacer {
    height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .pin {
    margin-left: 0.5em;
    // pointer-events: initial;
  }

  .pinned {
    @include min-media(mobile) {
      margin: 0 5rem;
    }
  }
}
</style>
