<template>
  <div>
    <!-- <div class="long"> -->
      <div class="no01 wrapper">
        <div class="boxes">
          <span
            v-for="(number, index) in repeat"
            :key="repeat[index]"
            class="box"
          >
            {{ data.title }}
          </span>
        </div>
      </div>
      <div v-if="width > 600" class="no02 wrapper">
        <div class="boxes">
          <span
            v-for="(number, index) in repeat"
            :key="repeat[index]"
            class="box"
          >
            {{ data.title }}
          </span>
        </div>
      </div>
    <!-- </div> -->
    <nuxt-link to="/">
      <button>
        <p>← Back</p>
      </button>
    </nuxt-link>
    <div class="content">
      <client-only>
        <div class="top">
          <div v-if="width <= 600" class="overlay" />
          <video
            v-if="hero && (hero.imgix_url.slice(-4) === '.mp4') | 'webm'"
            muted
            autoplay
            loop
            preload
            class="hero"
            :src="hero.imgix_url"
          />
          <img v-else-if="hero" class="hero" :src="hero.imgix_url" />
        </div>
        <p v-if="data.desc" class="desc">
          {{ data.desc }}
          <br />
          <span v-for="types in data.type" :key="types" class="types">
            {{ types }}
            <span v-if="typeof types == 'string'"> | </span>
          </span>
        </p>
        <agile
          v-if="car.value.length"
          class="carousel"
          :nav-buttons="false"
          :dots="false"
          :slides-to-show="2"
          :infinite="false"
        >
          <img
            v-for="pics in car.value"
            :key="pics.imgix_url"
            :src="pics.imgix_url"
            alt=""
          />
        </agile>
        <div v-if="data.value" v-html="data.value.content"></div>
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
} from '@nuxtjs/composition-api'
import { gsap } from 'gsap'
import { useQuery } from '@vue/apollo-composable/dist'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '~/store'
import getObject from '~/queries/getPosts.gql'

export default defineComponent({
  setup() {
    const width = ref(0)
    const context = useContext()
    const route = useRoute()
    const store = useStore()
    const routePath = computed(() => route.value.path)
    // TODO: update to -1 seameless loop
    const repeat = 14
    const id = ref('')
    // GSDevTools.create()

    const { onResult, loading, onError } = useQuery(
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

    const options = {
      width: 300,
      padding: {
        2: 8,
        default: 12,
      },
    }

    const data = reactive({
      title: '',
      value: null,
      desc: '',
      tools: [] as string[],
      type: [] as string[],
    })

    const hero = ref(null)

    const car = reactive({ value: [] as any[] })

    const media = reactive({ value: [] as any[] })

    const [getID] = store.cache.filter((obj) => {
      return obj.slug === routePath.value.substring(1)
    })
    if (!getID) {
      context.error({ statusCode: 404 })
    } else {
      id.value = getID.id
      onResult((queryResult) => {
        if (queryResult.data) {
          data.value = { ...queryResult.data.getObject }
          data.title = getID.title
          data.desc = getID.metadata.description
          data.tools = getID.metadata.tools
          data.type = getID.metadata.type
          media.value = [...queryResult.data.getMedia.media]
          hero.value = media.value.find((el) => {
            return el.metadata ? el.metadata.type === 'hero' : null
          })
          init()
        }
      })

      onError((error: any) => {
        context.error({ statusCode: error.networkError.statusCode })
        console.error(error)
      })
    }

    function getWidth() {
      width.value = window.innerWidth
    }

    function init() {
      if (process.client) {
        window.addEventListener('resize', () => getWidth())
        car.value = media.value.filter(function (el) {
          return el.metadata ? el.metadata.type === 'carousel' : null
        })

        gsap.registerPlugin(ScrollTrigger)

        // gsap.set('.wrapper', { xPercent: -50, yPercent: -50 })

        const box = document.querySelector('.box') as HTMLElement
        const boxWidth = box.offsetWidth
        const no01 = document.querySelectorAll('.no01 .box')
        const noBoxes = no01.length
        const totalWidth = boxWidth * noBoxes
        const dirFromLeft = '+=' + totalWidth
        const dirFromRight = '-=' + totalWidth
        const from = [dirFromLeft, dirFromRight]
        const dur = [25, 40]

        console.log(totalWidth)

        const mod = gsap.utils.wrap(0, totalWidth)

        function marquee(which, time, direction, scale) {
          gsap.set(which, {
            x(i) {
              return i * boxWidth
            },
          })
          const action = gsap
            .timeline({
              overwrite: true,
              // onUpdateParams: ['{self}'],
              // onUpdate() {
              //   console.log(boxWidth, noBoxes)
              // },
            })
            .to(which, {
              x: direction,
              modifiers: {
                x: (x) => mod(parseFloat(x)) + 'px',
              },
              duration: time,
              ease: 'none',
              repeat: -1,
            })
            .timeScale(scale)

          return action
        }

        const marquee01 = gsap.timeline().add(marquee(no01, dur[0], from[0], 1))

        if (document.querySelectorAll('.no02').length) {
          gsap.set('.no02', { x: 55 })
          const no02 = document.querySelectorAll('.no02 .box')
          const marquee02 = gsap
            .timeline()
            .add(marquee(no02, dur[1], from[1], 1), 0)
          marquee02.play()
        }

        marquee01.play()

        // =============================

        // ScrollTrigger.create({
        //   animation: marquee01,
        //   scrub: 0,
        //   onToggle: (self) => {
        //     // self.isActive ? marquee01.pause() : marquee01.resume()
        //     console.log(self.isActive)
        //   },
        //   // onUpdate: self => {
        //   //   console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
        //   // }
        // })

        // const marqueeWraps = gsap.utils
        //   .toArray('.wrapper')
        //   .forEach(function (wrap, i) {
        //     // const thisLine = (wrap as HTMLElement).querySelectorAll('.box')
        //     wrap
        //       .addEventListener('mouseenter', () => {
        //         thisMarquee[i].pause()
        //       })
        //     wrap
        //       .addEventListener('mouseleave', () => {
        //         thisMarquee[i].play()
        //       })
        //   })
      }
    }
    onMounted(() => {
      getWidth()
    })
    return { hero, car, width, data, media, options, repeat }
  },
})
</script>

<style lang="scss">
.fr-fic {
  width: 100%;
}
</style>

<style lang="scss" scoped>
button {
  position: fixed;
  display: flex;
  right: 1em;
  top: 1em;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  z-index: 10;
  box-shadow: 0 0 20px -3px rgba(0, 0, 0, 0.5);

  p {
    color: black;
  }
}

// .long {
//   // position: fixed;
//   // left: 0.5em;
//   // bottom: -2.5em;
//   // transform: rotate(-90deg);
//   // transform-origin: left top;
//   // overflow: hidden;
//   // z-index: 5;
//   // width: 100vh;

//   @include max-media(mobile) {
//     font-size: 2em;
//   }

.wrapper {
  mix-blend-mode: difference;
  position: fixed;
  width: 100vh;
  overflow: hidden;
  // height: 2em;
  bottom: -2.5em;
  transform: rotate(-90deg);
  transform-origin: left top;
  z-index: 5;

  .boxes {
    position: relative;
    left: -250px;
    height: 2.5em;

    span.box {
      position: absolute;
      width: 120px;
      height: 2.5em;
      font-weight: bold;
      font-size: 2em;
      text-align: center;
      white-space: nowrap;
      line-height: 50px;
      border-bottom: 5px solid transparent;
    }
  }
}
// }

.content {
  margin-left: 2.5em;
  width: calc(100vw - 2.5em);

  .top {
    position: relative;
    top: 0;
    left: -2.5em;
    width: 100vw;
    overflow: hidden;
    z-index: 1;

    .hero {
      width: 100vw;
      height: auto;
      top: 0;
      z-index: -1;
    }

    .overlay {
      position: absolute;
      width: 100vw;
      height: 100%;
      background: linear-gradient(0deg, black 5%, rgba(0, 0, 0, 0) 35%);
    }
  }

  .carousel {
    margin-bottom: 1em;

    img {
      margin-right: 0.5em;
      user-select: none;
      pointer-events: none;
    }
  }
}

.desc {
  position: relative;
  z-index: 1;
  width: 65vw;
  margin: 1em 0;
  margin-top: -5em;
  .types {
    font-weight: bold;
  }
}
</style>
