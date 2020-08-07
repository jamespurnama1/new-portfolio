<template>
  <div class='center'>
    <nav>
      <ul>
    <li><router-link to='/'><h3>jh</h3></router-link></li>
    <li>
      <router-link to='/about' class='margin'>about</router-link>
      <router-link to='/discover' class='margin'
      @mouseover='hover = true'
      @mouseleave='delay()'>discover</router-link>
      <router-link to='/principles' class='margin'>principles</router-link>
    </li>
    <li><a href='http://www.be.net/jamespurnama' target='_blank'>behance
    <feather type="external-link" stroke='#575F6B' :size="15" />
    </a></li>
      </ul>
    </nav>
      <div
      @mouseover='hoverDrop = true' @mouseleave='delayDrop()'>
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
    };
  },
  methods: {
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
</style>

<style lang="scss" scoped>
  .center {
    display: flex;
    justify-content: center;
  }

  nav {
    height: 6vh;
    width: 95vw;
    background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
    border-radius: 0 0 15px 15px;
    box-shadow: 3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
    padding: 0 20px;
    z-index: 1;
  }

  h3 {
  font-family: '35-FTR';
  font-weight: 700;
  font-size: 2em;
  color:black;
}

router-link {
  color: #575F6B;
  text-decoration: none;
}

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  .margin {
    margin: 1em;
  }

  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translateY(-150%);
    max-height: 0;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .5s;
  }

</style>
