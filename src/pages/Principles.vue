<template>
  <div id="app">
    <full-page ref="fullPage" :options="options" @after-load='afterLoad' id='fullpage'>
      <div class="section">
        <Front :title=title />
      </div>
      <div class="section">
        <HCD />
      </div>
      <div class="section">
        <Familiar />
      </div>
    </full-page>
    <Bottom id="bottom" :title=title />
  </div>
</template>

<script>
import { gsap } from 'gsap';
import Front from '../components/Front.vue';
import HCD from '../components/HCD.vue';
import Familiar from '../components/Familiar.vue';
import Bottom from '../components/Bottom.vue';

export default {
  name: 'Principles',
  components: {
    Front,
    HCD,
    Familiar,
    Bottom,
  },
  data() {
    return {
      gsap1: new gsap.timeline(), // eslint-disable-line
      options: {
        anchors: ['page1', 'page2', 'page3'],
        afterLoad: this.afterLoad,
      },
      title: {
        text: 'Design Philosophies',
      },
    };
  },
  methods: {
    afterLoad(origin, destination, direction) { // eslint-disable-line
      if (destination.index === 0) {
        this.$set(this.title, 'text', 'Design Philosophies');
      }
      if (destination.index === 1) {
        this.$set(this.title, 'text', 'Human-Centered Design');
      }
      if (destination.index === 2) {
        this.$set(this.title, 'text', 'Design With Familiarity & Uniqueness.');
      }
    },
    // startGsap() {
    //   this.gsap1();
    // },
  },
  mounted() {
    // function anim() {
    this.gsap1.to(this.$refs.fullPage,
      {
        duration: 4,
        backgroundColor: 'black',
      });
    // }
  },
};

</script>

<style lang="scss">
@import './src/styles/buefy.module.scss';
@import './src/styles/fonts.module.scss';

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
