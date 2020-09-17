<template>
  <div id="red" class="center">
    <transition name="fade">
      <div v-show="first">
        <div class="border">
          <div class="progress"></div>
        </div>
        <p>
          {{ $store.state.progress }}%
        </p>
      </div>
    </transition>
    <div class="scene">
  <div class="wrap">
      <div class="wall wall-right"></div>
      <div class="wall wall-left"></div>
      <div class="wall wall-top"></div>
      <div class="wall wall-bottom"></div>
      <div class="wall wall-back"></div>
  </div>
  <div class="wrap">
      <div class="wall wall-right"></div>
      <div class="wall wall-left"></div>
      <div class="wall wall-top"></div>
      <div class="wall wall-bottom"></div>
      <div class="wall wall-back"></div>
  </div>
</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import gsap from 'gsap';

export default {
  Name: 'Loading',
  data() {
    return {
      delay: true,
      first: true,
      tl2: gsap.timeline({ paused: true }),
    };
  },
  computed: mapState(['progress']),
  methods: {
    letMeIn() {
      const timer = setInterval(() => {
        if (this.delay === false) {
          this.first = false;
          this.loadAnim();
          window.clearInterval(timer);
          setTimeout(() => {
            const body = document.querySelector('body');
            body.classList.remove('noScroll');
            this.$store.commit('removeSplash');
          }, 3500);
        }
      }, 500);
    },
    loadAnim() {
      // gsap.to('.anim', {
      //   scale: 1.5,
      //   opacity: 1,
      //   ease: 'easeOut',
      //   duration: 1,
      //   delay: 1,
      // });
      gsap.to('#red', {
        opacity: 0,
        ease: 'easeOut',
        duration: 0.5,
        delay: 3,
      });
    },
  },
  watch: {
    progress(newValue) {
      const bar = document.querySelector('.progress');
      bar.style.width = newValue;
      const speed = 10000 / (newValue * 25);
      // console.log(speed);
      const warp = document.querySelectorAll('.wall, .wrap');
      const warp2 = document.querySelectorAll('.wrap:nth-child(2), .wrap:nth-child(2) .wall');
      warp.forEach((el) => {
        el.style.animationDuration = `${speed}s`; // eslint-disable-line
      });
      warp2.forEach((el) => {
        el.style.animationDelay = `${speed / 2}s`; // eslint-disable-line
      });
      setTimeout(() => {
        this.delay = false;
      }, 2000);
      if (newValue >= 100) {
        this.letMeIn();
      }
    },
  },
  mounted() {
    this.tl2.to('#logoAnim', {
      rotation: 360,
      ease: 'none',
      duration: 100,
    });
    const body = document.querySelector('body');
    body.classList.add('noScroll');
    setTimeout(() => {
      this.$parent.$emit('start');
    }, 10);
  },
};
</script>

<style lang="scss" scoped>
@import './src/styles/fonts.module.scss';

.wall{
  background: url(https://papers.co/wallpaper/papers.co-ms96-space-astronomy-galaxy-dark-star-white-34-iphone6-plus-wallpaper.jpg);
  background-size: cover;
}

.scene{
  display: inline-block;
  vertical-align: middle;
  perspective: 5px;
  perspective-origin: 50% 50%;
  position: absolute;
}

.wrap{
  position: absolute;
  width: 1000px;
  height: 1000px;
  left: -500px;
  top: -500px;
  transform-style: preserve-3d;
  animation: move 12s infinite linear;
  animation-fill-mode: forwards;
}

.wrap:nth-child(2){
  // animation: move 12s infinite linear;
  animation-delay: 6s;
}

.wall {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  animation: fade 12s infinite linear;
  animation-delay: 6s;
}

.wrap:nth-child(2) .wall {
  animation-delay: 6s;
}

.wall-right {
  transform: rotateY(90deg) translateZ(500px);
}

.wall-left {
  transform: rotateY(-90deg) translateZ(500px);
}

.wall-top {
  transform: rotateX(90deg) translateZ(500px);
}

.wall-bottom {
  transform: rotateX(-90deg) translateZ(500px);
}

.wall-back {
  transform: rotateX(180deg) translateZ(500px);
}

.anim {
  position: absolute;
  opacity: 0;
}

.border {
  border: 3px solid black;
  width: 50vw;
  height: 30px;
  overflow: hidden;
  display: none;
}

.progress {
  height: 120%;
  width: 0;
  background: black;
  transition: width 1s ease;
  border-radius: 0;
  display: none;
}

p {
  color: black;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
}

#red {
  position: fixed;
  overflow: hidden;
  flex-direction: column;
  background-color: #d8d9da;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}

#logoAnim {
  display: block;
  margin: 3% auto;
  width: 15vw;
  height: 15vw;
  transition: all 1s ease;
}
</style>
