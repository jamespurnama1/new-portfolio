<template>
  <div>
    <div class="long">
      <h1>
        <span v-for="(number, index) in repeat" :key="repeat[index]">
          {{ data.title }}
        </span>
      </h1>
      <h1 v-if="width > 600">
        <span v-for="(number, index) in repeat" :key="repeat[index]">
          {{ data.title }}
        </span>
      </h1>
    </div>
    <nuxt-link to="/">
      <button>
        <p>← Back</p>
      </button>
    </nuxt-link>
    <div class="content">
      <client-only>
        <div class="top">
          <div v-if="width <= 600" class="overlay" />
          <img class="hero" :src="require(`~/assets/img/img1.jpg`)" />
        </div>
        <p v-if="data.metadata" class="desc">
          {{ data.metadata.description }}
          <br />
          <span v-for="types in data.metadata.type" :key="types" class="types">
            {{ types }}
            <span v-if="typeof types == 'string'"> | </span>
          </span>
        </p>
        <VueSlickCarousel
          v-if="data.metadata"
          class="carousel"
          :arrows="false"
          :variable-width="true"
        >
          <div v-html="data.metadata.carousel" />
        </VueSlickCarousel>
        <div v-html="data.content"></div>
        <!-- <VueMasonryWall :items="items" :options="options">
          <template #default="{ item }">
            <div class="Item">
              <img :src="item.image" />

              <div class="masonry">
                <h5>{{ item.title }}</h5>
                <p>{{ item.content }}</p>
              </div>
            </div>
          </template>
        </VueMasonryWall> -->
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  useContext,
  useRoute,
  useRouter,
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
    const router = useRouter()
    const store = useStore()
    const routePath = computed(() => route.value.path)
    const repeat = 14
    const id = ref('')

    const { onResult, loading, onError } = useQuery(
      getObject,
      {
        bucket_slug: context.env.NUXT_ENV_BUCKET_SLUG,
        read_key: context.env.NUXT_ENV_READ_KEY,
        object_id: id,
        folder: routePath,
      },
      {
        prefetch: true,
      }
    )
    const tl = gsap.timeline()
    const tl2 = gsap.timeline()

    const options = {
      width: 300,
      padding: {
        2: 8,
        default: 12,
      },
    }

    const data = ref({
      title: '',
    })

    const getID = store.slugID.filter((obj) => {
      return obj.slug === routePath.value.substring(1)
    })
    if (!getID.length) {
      context.error({ statusCode: 404 })
    } else {
      id.value = getID[0].id
      onResult((queryResult) => {
        if (queryResult.data) {
          data.value = { ...queryResult.data.getObject }
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
        gsap.registerPlugin(ScrollTrigger)
        gsap.set('.long h1', {
          x: (i) => i * 50,
        })
        tl.fromTo(
          '.long h1:first-child',
          {
            x: '-100vh',
          },
          {
            x: '-200vh',
            repeat: -1,
            duration: 50,
            ease: 'none',
            modifiers: {
              // x: gsap.utils.unitize((x) => parseFloat(x) % 100),
            },
          }
        ).fromTo(
          '.long h1:last-child',
          {
            x: '-200vh',
          },
          {
            x: '-100vh',
            repeat: -1,
            duration: 50,
            ease: 'none',
            // modifiers: {
            //   x: gsap.utils.unitize((x) => parseFloat(x) % 100),
            // },
          },
          0
        )
        tl2
          .to('.long h1:first-child', {
            x: '-=10em',
            duration: 50,
            ease: 'none',
            // scrollTrigger: {
            //   trigger: '.long',
            //   scrub: true,
            // },
            overwrite: 'auto',
          })
          .to(
            '.long h1:last-child',
            {
              x: '+=10em',
              ease: 'none',
              // scrollTrigger: {
              //   trigger: '.long',
              //   scrub: true,
              // },
              overwrite: 'auto',
            },
            0
          )
      }
    }
    onMounted(() => {
      getWidth()
    })
    return { width, data, options, repeat }
  },
})
</script>

<style lang="scss" scoped>
button {
  position: absolute;
  display: flex;
  right: 1em;
  top: 1em;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  z-index: 10;

  p {
    color: black;
  }
}

.long {
  font-size: 2em;
  position: fixed;
  left: 0.5em;
  bottom: -2.5em;
  transform: rotate(-90deg);
  transform-origin: left top;
  overflow: hidden;
  mix-blend-mode: difference;
  z-index: 5;
  width: 100vh;

  @include max-media(mobile) {
    font-size: 1.5em;
  }

  h1 {
    white-space: nowrap;
  }
}

.content {
  margin-left: 4em;
  width: calc(100vw - 1.5em);

  .top {
    position: relative;
    top: 0;
    left: -4em;
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
      width: 45vw;
      height: auto;
      user-select: none;
      pointer-events: none;
    }
  }

  .masonry {
    h5 {
      font-size: 1.2em;
    }
  }

  .masonry-wall {
    width: calc(100vw - 5em);
    img {
      max-width: calc(100vw - 4em);
    }
  }
}

.desc {
  // font-size: 0.7em;
  width: 65vw;
  margin: 1em 0;
  .types {
    font-weight: bold;
  }
}
</style>
