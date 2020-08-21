<template>
  <div id="main">
    <Navbar :showNavbar='showNavbar' />
    <main :lastScrollPosition='lastScrollPosition'>
      <transition
        name="fade"
        mode="out-in">
        <router-view/>
      </transition>
    </main>
    <transition name='fade'>
    <scrollTop
    v-show='showScrollToTop'
    @click.native='scrollToTop(); $refs.fullpage.api.moveTo(3)' />
    </transition>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import scrollTop from './components/scrollTop.vue';

export default {
  name: 'JamesHenry',
  components: {
    Navbar,
    scrollTop,
  },
  data() {
    return {
      lastScrollPosition: 0,
      showNavbar: true,
      showScrollToTop: false,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
      this.showScrollToTop = currentScrollPosition > 50;
    },
  },
  created() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
};

</script>

<style lang="scss">
@import './src/styles/buefy.module.scss';
@import './src/styles/fonts.module.scss';

.slide-enter-active, .slide-leave-active,
.navbar-enter-active, .navbar-leave-active,
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
}

.navbar-enter, .navbar-leave-to {
  transform: translateY(-100%);
  margin-bottom: -100px;
}

.fade-enter {
  transform: translateY(100%);
  opacity: 0;
}

.bg{
  position: fixed;
  z-index: -1;
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
  font-size: 1em;;
  background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
  border-radius: 15px;
  border: none;
  box-shadow: 3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
  padding: 10px 20px;
  display: inline-block;
  cursor: pointer;
}

button:active {
  border:none
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
}

h3 {
  font-family: '35-FTR';
  font-weight: 700;
  color:black;
  text-decoration: none;
}

p {
  margin-bottom: 1em;
}

html {
  font-family: '35-FTR';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #D8D9DA;
}

body {
  background-color: #D8D9DA;
}

.block {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
@media screen and (min-width: 320px) {
  h1 {
    font-size: calc(50px + 6 * ((100vw - 320px) / 680));
  }
  h3 {
    font-size: calc(20px + 6 * ((100vw - 320px) / 680));
  }
  p {
    font-size: calc(16px + 6 * ((100vw - 320px) / 680));
  }
  .block {
    flex-direction: column;
    height: 70%;
    min-height: 500px;
    padding: 10% 0 0 0;
    width: 100vw;
    overflow-x: hidden;
  }
}
@media screen and (min-width: 800px) {
  p {
    font-size: 22px;
  }
  h1 {
    font-size: 10em;
  }
  h3 {
    font-size: 1.5em;
  }
  // body {
  //   width: 100%;
  //   overflow-x: initial;
  // }
}
@media screen and (min-width: 1000px) {
    .block {
    flex-direction: row;
    padding: 10%;
    height: 90vh;
  }
}

</style>
