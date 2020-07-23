<template>
  <div id="app">
    <full-page ref="fullpage" :options="options" @after-load='afterLoad' id='fullpage'>
      <div class="section">
        <HelloWorld :title=title />
      </div>
      <div class="section">
        <Communicate title='Design Should Communicate' />
      </div>
      <div class="section">
        <Communicate title='Enough is Best' />
      </div>
    </full-page>
    <Bottom id="bottom" :title=title />
  </div>
</template>

<script>
import { gsap } from 'gsap';
import HelloWorld from './components/HelloWorld.vue';
import Communicate from './components/Communicate.vue';
import Bottom from './components/Bottom.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Communicate,
    Bottom,
  },
  data() {
    return {
      options: {
        anchors: ['page1', 'page2', 'page3'],
        afterLoad: this.afterLoad,
      },
      title: {
        text: 'Welcome to Your Vue.js App',
      },
    };
  },
  methods: {
    afterLoad(destination) {
      if (destination.index === 0) {
        this.$set(this.title, 'text', 'Welcome to Your Vue.js App');
        console.log('going to slide 1');
      }
      if (destination.index === 1) {
        this.$set(this.title, 'text', 'Design Should Communicate');
        console.log('going to slide 2');
      }
      if (destination.index === 2) {
        this.$set(this.title, 'text', 'Enough is Best');
        console.log('going to slide 3');
      }
    },
    animate() {
      gsap.to('#fullpage',
        {
          duration: 4,
          backgroundColor: 'black',
        });
    },
    mounted() {
      this.animate();
    },
  },
};

</script>

<style lang="scss">
@import './styles/buefy.module.scss';
@import './styles/fonts.module.scss';

h1 {
  text-align: left;
  font-size: 50px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: black;
  text-decoration: underline;
}

#app {
  font-family: '35-FTR';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#bottom {
  position: fixed;
  bottom: 0;
  color: black;
}

.fp-tableCell {
 display: flex;
 align-items: center;
 justify-content: center;
}

</style>
