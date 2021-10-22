<template>
  <div>
    <div class="long">
      <h1>
        Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid
        Creaid Creaid Creaid Creaid
      </h1>
      <h1 v-if="width > 600">
        Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid
        Creaid Creaid Creaid Creaid
      </h1>
    </div>
    <button>
      <p>← Back</p>
    </button>
    <div class="content">
      <div class="top">
        <div v-if="width <= 600" class="overlay" />
        <img class="hero" :src="require(`~/assets/img/img1.jpg`)" />
      </div>
      <p class="desc">
        Tremors mean an involuntary quivering movement. It’s also known as an
        expression of an unbecoming. This conceptual photography is a project
        that features double exposure and strong vibrant colors depicting a
        condition such as dysthymia, cyclothymia, melancholia, and catatonia.
      </p>
      <p class="desc">Packaging | 3D | Freelance | 2018</p>
      <client-only>
        <VueSlickCarousel
          class="carousel"
          :arrows="false"
          :variable-width="true"
        >
          <div>
            <img draggable="false" :src="require(`~/assets/img/img1.jpg`)" />
          </div>
          <div>
            <img draggable="false" :src="require(`~/assets/img/img1.jpg`)" />
          </div>
          <div>
            <img draggable="false" :src="require(`~/assets/img/img1.jpg`)" />
          </div>
          <div>
            <img draggable="false" :src="require(`~/assets/img/img1.jpg`)" />
          </div>
        </VueSlickCarousel>
        <VueMasonryWall :items="items" :options="options">
          <template v-slot:default="{ item }">
            <div class="Item">
              <img :src="item.image" />

              <div class="masonry">
                <h5>{{ item.title }}</h5>
                <p>{{ item.content }}</p>
              </div>
            </div>
          </template>
        </VueMasonryWall>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from '@nuxtjs/composition-api'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import VueSlickCarousel from 'vue-slick-carousel'

export default defineComponent({
  setup() {
    const width = computed(() => {
      if (process.client) return window.innerWidth
    })
    const tl = gsap.timeline()
    const tl2 = gsap.timeline()
    const items = [
      {
        title: 'Sed non ante non cras amet',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non sagittis leo. Vestibulum sit amet metus nec neque dignissim dapibus.',
        image: 'https://picsum.photos/id/1015/600/600',
      },
      {
        title: 'Curabitur sit amet nunc',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id mollis erat. Aliquam erat volutpat. Nunc erat lacus, rhoncus nec.',
        image: 'https://picsum.photos/id/1019/600/700',
      },
      {
        title: 'Proin pharetra, ante metus',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.',
        image: 'https://picsum.photos/id/1039/600/800',
      },
      {
        title: 'Cras pharetra non enim a',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada varius nibh, a malesuada nisi feugiat eget. Aenean convallis semper.',
        image: 'https://picsum.photos/id/1042/600/300',
      },
    ]

    const options = {
      width: 300,
      padding: {
        2: 8,
        default: 12,
      },
    }

    function init() {
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
          scrollTrigger: {
            trigger: '.long',
            scrub: true,
          },
          overwrite: 'auto',
        })
        .to(
          '.long h1:last-child',
          {
            x: '+=10em',
            ease: 'none',
            scrollTrigger: {
              trigger: '.long',
              scrub: true,
            },
            overwrite: 'auto',
          },
          0
        )
    }
    onMounted(init)
    return { width, items, options }
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
}
</style>
