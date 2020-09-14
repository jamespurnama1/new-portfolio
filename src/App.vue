<template>
  <div id="main">
    <splash
      style="z-index: 20"
      v-show="this.$store.state.splash && this.$route.name != '404'"
    />
    <overlay v-if="this.$store.state.overlay" style="z-index: 15" />
    <navbar
      v-if="renderSwitchSet && this.$route.name != '404'"
    />
    <main v-if="renderSwitchSet" v-images-loaded:on.progress="imageProgress">
      <img class="object" ref="object" :src="selectedImage" />
      <transition
        name="fade"
        mode="out-in"
        :duration="2000"
        v-on:before-leave="beforeLeave"
      >
        <router-view :key="this.$route.fullPath" />
      </transition>
    </main>
    <transition name="fade">
      <scrollTop
        v-show="this.$store.state.showScrollToTop"
        @click.native="scrollToTop()"
      />
    </transition>
  </div>
</template>

<script>
import gsap from 'gsap';
import mixin from '@/mixin';
import imagesLoaded from 'vue-images-loaded';
import loading from '@/components/loading';

const navbar = () => import('@/components/Navbar.vue');
const scrollTop = () => import('@/components/scrollTop.vue');
const splash = () => import('@/pages/splash.vue');
const overlay = () => '@/pages/splash.vue';

export default {
  name: 'JamesHenry',
  data() {
    return {
      object: gsap.timeline({ paused: true }),
      images: [
        './objects/satellite.png',
        './objects/rover.png',
        './objects/astronaut.png',
        './objects/falcon1.png',
        './objects/icesat2.png',
        './objects/asteroids.png',
      ],
      selectedImage: '',
      renderSwitchSet: false,
    };
  },
  directives: {
    imagesLoaded,
  },
  components: {
    navbar,
    scrollTop,
    splash,
    overlay,
  },
  mixins: [mixin, loading],
  methods: {
    beforeLeave() {
      this.object.play(0);
      const idx = Math.floor(Math.random() * this.images.length);
      this.selectedImage = this.images[idx];
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.object.to('.object', {
        x: '200%',
        y: '250%',
        duration: 5,
        ease: 'circ.out',
      });
    });
  },
  created() {
    const idx = Math.floor(Math.random() * this.images.length);
    this.selectedImage = this.images[idx];
    this.$on('start', () => {
      this.renderSwitchSet = true;
    });
  },
};
</script>

<style lang="scss">
@import './src/styles/buefy.module.scss';
@import './src/styles/fonts.module.scss';

.object {
  position: fixed;
  width: 150vw;
  height: auto;
  top: -102%;
  left: -100%;
  z-index: 5;
}

.slide-enter-active,
.slide-leave-active,
.navbar-enter-active,
.navbar-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.navbar-enter,
.navbar-leave-to {
  transform: translateY(-100%);
  margin-bottom: -100px;
}

.fade-enter {
  opacity: 0;
}

.bg {
  position: absolute;
  z-index: 0;
  min-width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
}

.clickable {
  cursor: pointer;
}

button {
  font-family: '35-FTR';
  background-image: linear-gradient(45deg, #f2f3f6, #d8d9da);
  border-radius: 15px;
  border: none;
  box-shadow: 3px 3px 20px 0px rgba(36, 65, 93, 0.3), -4px -4px 20px 0px #ffffff;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
}

button:hover {
  transform: scale(1.1);
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  text-align: left;
  color: black;
  font-weight: 700;
  line-height: 0.9em;
  text-indent: -0.2em;
  font-size: 8em;
}

h2 {
  text-align: left;
  color: black;
  font-weight: 700;
  line-height: 0.9em;
  text-indent: -0.2em;
  font-size: 4em;
}

h3 {
  font-family: '35-FTR';
  font-weight: 700;
  color: black;
  text-decoration: none;
  font-size: 1.5em;
}

p {
  font-family: '35-FTR';
  font-weight: normal;
  margin-bottom: 1em;
  font-size: 22px;
}

html {
  font-family: '35-FTR';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #d8d9da;
}

body {
  background-color: #d8d9da;
  width: 100vw;
  overflow: hidden;
}

main {
  position: absolute;
  width: 100vw;
  overflow: hidden;
}

.block {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 90vh;
}

@media all and (max-width: 1280px) {
  h3 {
    font-size: 1.3em;
  }
}

@media all and (max-width: 980px) {
  .block {
    flex-direction: row;
    padding: 10%;
    overflow: hidden;
  }
  h1 {
    font-size: 8em;
  }
  h2 {
    font-size: 3em;
  }
  h3 {
    font-size: 1em;
  }
}

@media all and (max-width: 736px) {
  p {
    font-size: 22px;
  }
  h1 {
    font-size: 6em;
  }
  h2 {
    font-size: 2em;
  }
  h3 {
    font-size: 1em;
  }
}

@media all and (max-width: 480px) {
  p {
    font-size: 15px;
  }
  h1 {
    font-size: 6em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 0.8em;
  }
}

@media screen and (max-width: 320px) {
  h1 {
    font-size: calc(50px + 6 * ((100vw - 320px) / 680));
  }
  h2 {
    font-size: calc(350px + 6 * ((100vw - 320px) / 680));
  }
  h3 {
    font-size: calc(20px + 6 * ((100vw - 320px) / 680));
  }
  p {
    font-size: calc(16px + 6 * ((100vw - 320px) / 680));
  }
  .block {
    flex-direction: column;
    height: 150vw;
    padding: 15% 0 0 0;
  }
}
</style>
