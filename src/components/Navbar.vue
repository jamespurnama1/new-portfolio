<template>
  <div v-if="$store.state.renderSwitchSet && $route.name != '404'">
    <transition-group tag='div' name='navbar' appear>
      <div key='1' class='navbar' v-show='$store.state.showNavbar'>
          <nav style='transform-style: preserve-3d'>
            <ul style='display: flex; flex-direction: row; transform-style: preserve-3d;'>
          <li><router-link to='/' class='logo'>jh</router-link></li>
          <li>{{ $store.state.date }}</li>
          <li style='margin: auto; display: flex; transform-style: preserve-3d;'>
            <router-link to='/about' class='margin'>about</router-link>
            <div style='display: flex; justify-content: center; transform-style: preserve-3d;'>
              <router-link  to='/' class='margin'
              @click='scrollDelay()'
              @mouseover='hover = true'
              @mouseleave='delay()'>discover</router-link>
              <transition name='slide'>
                <div
                v-show='hover || hoverDrop'
                style='position: absolute;
                transform: translateZ(-10px);
                top: 100%;
                transform-style: preserve-3d;'
                @mouseover='hoverDrop = true'
                @mouseleave='delayDrop()'>
                    <Dropdown />
                </div>
              </transition>
            </div>
            <router-link to='/principles' class='margin'>principles</router-link>
          </li>
          <li><a href='http://www.be.net/jamespurnama' target='_blank'>behance
          <!-- <feather type="external-link" stroke='#575F6B' :size="15" /> -->
          </a></li>
            </ul>
          </nav>
      </div>
    </transition-group>
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
    };
  },
  props: {
    showNavbar: Boolean,
  },
  methods: {
    scrollDelay() {
      this.hover = false;
      this.$store.commit('scrollPlease');
    },
    delay() {
      setTimeout(() => { this.hover = false; }, 500);
    },
    delayDrop() {
      setTimeout(() => { this.hoverDrop = false; }, 500);
    },
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
    margin: 0.7em;
    text-decoration: none;
  }
</style>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100vw;
    background-color: rgba(216,217,218,0);
    top: 0;
    z-index: 4;
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
    transform: translateY(-150%) !important;
    max-height: none !important;
  }

  .slide-enter-to, .slide-leave {
    max-height: none !important;
  }

@media screen and (min-width: 320px) {
  ul li:last-child {
   display: none;
  }
}

@media screen and (min-width: 1000px) {
  ul li:last-child {
   display: initial;
  }
}
</style>
