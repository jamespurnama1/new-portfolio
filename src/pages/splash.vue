<template>
  <div id="red" class="center">
    <transition name="fade">
      <div v-show="first">
        <img id="logoAnim" src="@/assets/logo.svg" />
        <p>
          Creative Cure is in Process...
        </p>
        <div class="border">
          <div class="progress"></div>
        </div>
        <p>
          {{ $store.state.progress }}
        </p>
      </div>
    </transition>
    <div v-show="!first" class="anim">
      <p>
        The cure has been found!
      </p>
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
      gsap.to('.anim', {
        scale: 1.5,
        opacity: 1,
        ease: 'easeOut',
        duration: 1,
        delay: 1,
      });
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
      this.tl2.pause(newValue.replace('%', '') - 0.1);
      setTimeout(() => {
        this.delay = false;
      }, 2000);
      if (newValue === '100%') {
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

.anim {
  position: absolute;
  opacity: 0;
}

.border {
  border: 3px solid white;
  width: 50vw;
  height: 30px;
  overflow: hidden;
}

.progress {
  height: 120%;
  width: 0;
  background: white;
  transition: width 1s ease;
}

p {
  color: white;
  font-weight: bold;
  margin: 10px 0;
}

#red {
  position: fixed;
  overflow: hidden;
  flex-direction: column;
  background-color: $primary;
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
