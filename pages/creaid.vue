<template>
  <div>
    <div class="long">
      <h1>Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid</h1>
      <h1>Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid Creaid</h1>
    </div>
    <div class="long">
      <!-- <h1>Creaid</h1> -->
      <!-- <h1>Creaid</h1> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineComponent({
  setup() {
    const tl = gsap.timeline()
    const tl2 = gsap.timeline()
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
    return {}
  },
})
</script>

<style lang="scss" scoped>
.long {
  font-size: 2em;
  position: fixed;
  left: 0.5em;
  transform: rotate(-90deg);
  transform-origin: left top;

  h1 {
    white-space: nowrap;
  }
}
</style>
