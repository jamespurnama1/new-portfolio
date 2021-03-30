<template>
  <div>
    <div id="gui_container" />
    <ul class="nav">
      <li
        v-for="(n, index) in works"
        :key="index"
        :class="{ active: index === attractTo }"
        :data-nav="index"
      >
        <div class="bullet" />
        <transition name="slide-left">
          <p v-if="attractMode">{{ n }}</p>
        </transition>
      </li>
    </ul>
    <div id="wrap">
      <img
        v-for="(n, index) in works"
        :key="index"
        class="cardImg"
        :src="require(`~/assets/img/img${index}.jpg`)"
        alt=""
      />
    </div>
    <transition name="fade" mode="out-in">
      <div
        v-if="!attractMode && works[attractTo]"
        :key="works[attractTo]"
        class="title"
      >
        <h2>{{ works[attractTo].toLowerCase() }}</h2>
        <p>Lorem Ipsum</p>
        <p>Freelance</p>
        <p>2020</p>
      </div>
    </transition>
    <div id="container" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { gsap } from 'gsap'
import Sketch from './js/webGL'

export default defineComponent({
  setup() {
    const works = [
      'Video Reel',
      'The Creaid',
      'Eyureka',
      'Lakra',
      'MUNlite',
      'Jack The Clipper',
      'Tawa',
      'Savis Tea',
      'Beladonna',
      'Tremors',
    ]
    const attractMode = ref(false)
    const attractTo = ref(0)
    let speed = 0
    let position = 0
    let rounded = 0
    let objs
    let sketch
    const requested = ref(false)

    window.addEventListener('wheel', (e) => {
      speed += e.deltaY * 0.003
    })

    window.addEventListener(
      'click',
      (e) => {
        if (sketch.handleMouse(e) === attractTo.value) console.log('selected')
        else if (typeof sketch.handleMouse(e) === 'number')
          position = sketch.handleMouse(e)
        else if (sketch.handleMouse(e) === 'sphere') {
          gsap.to(sketch.sphere.position, {
            z: '-=0.3',
          })
        }
      },
      false
    )

    function init() {
      objs = Array(works.length).fill({ dist: 0 })
      sketch = new Sketch({
        dom: document.getElementById('container'),
      })
      const navs = document.querySelectorAll('.nav li')
      const nav = document.querySelector('.nav')

      nav!.addEventListener('mouseenter', () => {
        attractMode.value = true
        gsap.to(sketch.sphere.material, {
          opacity: 0,
          duration: 0.5,
        })
      })

      nav!.addEventListener('mouseleave', () => {
        attractMode.value = false
        gsap.to(sketch.sphere.material, {
          opacity: 1,
          duration: 0.5,
        })
      })

      navs!.forEach((el) => {
        el.addEventListener('mouseover', (e) => {
          if ((e.target as HTMLLIElement).getAttribute('data-nav')) {
            attractTo.value = Number(
              (e.target as HTMLLIElement).getAttribute('data-nav')
            )
          }
        })
      })
      document.addEventListener('mousemove', onMouseMove, false)
      raf()
    }

    // let timer

    function onMouseMove(event) {
      gsap.to(sketch.scene3.position, {
        duration: 0.5,
        x: 1 - 0.01 * (event.clientX - window.innerWidth / 2),
        y: 0.01 * (event.clientY - window.innerHeight / 2),
      })
      // if (this.controls) this.controls.enabled = false
      // sketch.mouse.x = event.clientX - sketch.windowHalf.x
      // sketch.mouse.y = event.clientY - sketch.windowHalf.x
      // clearTimeout(timer)
      // timer = setTimeout(() => {
      //   if (
      //     this.controls &&
      //     Object.keys(this.controls.deviceOrientation).length > 0
      //   ) {
      //     this.controls.enabled = true
      //   }
      // }, 300)
    }

    // function onOrientation() {
    //   this.controls = new DeviceOrientationControls(camera)
    //   // controls.addEventListener('change', animate) // use if there is no animation loop
    //   // controls.minDistance = 2
    //   // controls.maxDistance = 10
    //   // controls.target.set(0, 0, -0.2)
    //   this.controls.update()
    // }

    function raf() {
      position += speed
      speed *= 0.8

      objs.forEach((o, i) => {
        o.dist = Math.min(Math.abs(position - i), 1)
        o.dist = 1 - o.dist ** 2
        // scale factor
        const scale = 1 + 0.2 * o.dist
        // sketch.meshes[i].rotation.x = 0.5 * (attractTo - i)
        sketch.meshes[i].scale.set(scale, scale, scale)
        // texture scaling animation
        sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist
      })

      rounded = Math.round(position)
      const diff = rounded - position

      if (attractMode.value) {
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
            z: -1 - 0.5 * Math.abs(attractTo.value - i),
            x: 0,
            y: -(i - position),
          })
        })
      } else {
        position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.035
        position = Math.min(Math.max(position, 0), works.length - 1)
        attractTo.value = rounded
        objs.forEach((_o, i) => {
          // sketch.meshes[i].position.y = -(i - position)
          // sketch.meshes[i].rotation.y = -0.5
          gsap.to(sketch.meshes[i].rotation, {
            duration: 0.5,
            x: 0.5 * (attractTo.value - i),
            y: -0.5,
            z: 0.2 * (attractTo.value - i),
          })
          gsap.to(sketch.meshes[i].position, {
            duration: 0.5,
            z: -2.5 - 0.01 * Math.abs(attractTo.value - i),
            x: 0.85 + 0.35 * Math.abs(attractTo.value - i),
            y: -0.6 * (i - position),
          })
        })
      }
      const t = sketch.clock.getElapsedTime()
      sketch.sphere.position.y =
        -0.3 + Math.sin(sketch.sphere.position.y + t) * 0.05
      sketch.animateStars()
      sketch.stars.rotation.z += 0.001
      window.requestAnimationFrame(raf)
    }

    onMounted(init)

    return {
      requested,
      works,
      attractMode,
      attractTo,
    }
  },
})
</script>

<style lang="scss" scoped>
// #gui_container {
//   position: absolute;
//   top: 0;
//   left: 10%;

//   #gui {
//     // transform: translate(-50%, -75px);
//   }
// }

#container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
}

.cardImg {
  display: none;
}

.title {
  position: absolute;
  right: 50%;
  top: 45%;
  text-align: right;
  cursor: pointer;
  z-index: 5;

  h2 {
    font-size: 50px;
  }
}

ul {
  position: fixed;
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
    }

    &.active {
      color: red;

      .bullet {
        background-color: red;
      }
    }
  }
}
</style>