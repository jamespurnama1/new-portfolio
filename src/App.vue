<template>
  <div id="main">
   <transition name='navbar'>
    <Navbar v-show='showNavbar' />
  </transition>
    <main>
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
  transition: all .5s;
}

.navbar-enter, .navbar-leave-to {
  transform: translateY(-100%);
}

.fade-enter, .navbar-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.bg{
  position: fixed;
  z-index: -1;
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

.block {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10%;
  flex-wrap: wrap;
  height: 90vh;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  text-align: left;
  font-size: 10em;
  color: black;
  font-weight: 700;
  line-height: 0.9em;
  text-indent: -0.2em;
}

h3 {
  font-family: '35-FTR';
  font-weight: 700;
  font-size: 1.5em;
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

</style>
