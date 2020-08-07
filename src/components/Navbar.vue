<template>
  <div class='center'>
    <transition name='navbar'>
      <nav v-show='showNavbar'>
        <ul>
      <li><router-link to='/' class='logo'>jh</router-link></li>
      <li>
        <router-link to='/about' class='margin'>about</router-link>
        <router-link to='/discover' class='margin'
        @mouseover.native='hover = true'
        @mouseleave.native='delay()'>discover</router-link>
        <router-link to='/principles' class='margin'>principles</router-link>
      </li>
      <li><a href='http://www.be.net/jamespurnama' target='_blank'>behance
      <feather type="external-link" stroke='#575F6B' :size="15" />
      </a></li>
        </ul>
      </nav>
    </transition>
    <div
    @mouseover='hoverDrop = true'
    @mouseleave='delayDrop()'>
      <transition name='slide'>
        <Dropdown v-show='hover || hoverDrop' />
      </transition>
    </div>
  </div>
</template>

<script>
import Dropdown from './Dropdown.vue';

export default {
  name: 'Navbar',
  components: {
    Dropdown,
  },
  data() {
    return {
      hover: false,
      hoverDrop: false,
      showNavbar: true,
      lastScrollPosition: 0,
    };
  },
  methods: {
    delay() {
      setTimeout(() => { this.hover = false; }, 500);
    },
    delayDrop() {
      setTimeout(() => { this.hoverDrop = false; }, 500);
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
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
};

</script>

<style lang="scss">
  .dropdown-content {
    position: absolute;
    padding: 20px;
    background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
    border-radius: 0 0 15px 15px;
    box-shadow: 3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
  }

  .margin {
    margin: 0 1em 1em 1em;
    text-decoration: none;
  }
</style>

<style lang="scss" scoped>
  .center {
    display: flex;
    justify-content: center;
  }

  nav {
    position: fixed;
    height: 6vh;
    min-height: 50px;
    width: 95vw;
    background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
    border-radius: 0 0 15px 15px;
    box-shadow: 3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
    padding: 0 20px;
    z-index: 1;
  }

  .logo {
    font-family: '35-FTR';
    font-weight: 700;
    font-size: 2em;
    color:black;
    text-decoration: none;
  }

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    padding: 0;
    position: relative;
  }

  li {
    font-size: 1em;
    color: #575F6B;
    margin: 0 10px;
    text-decoration: none;
  }

  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translateY(-150%);
    max-height: 0;
  }

  .slide-enter-active, .slide-leave-active,
  .navbar-enter-active, .navbar-leave-active {
    transition: all .5s;
  }

  .navbar-enter, .navbar-leave-to {
    transform: translateY(-100%);
  }

</style>
