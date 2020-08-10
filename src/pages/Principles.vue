<template>
  <div id="principle">
    <full-page ref="fullPage" :options="options" id='fullpage'>
      <div class="section">
        <Front />
      </div>
      <div class="section">
        <Philosophies :title=title.one :subtitle=subtitle.one />
      </div>
      <div class="section">
        <Philosophies :title=title.two :subtitle=subtitle.two />
      </div>
      <div class="section">
        <Philosophies :title=title.three :subtitle=subtitle.three />
      </div>
      <div class="section">
        <Philosophies :title=title.four :subtitle=subtitle.four />
      </div>
      <div class="section">
        <Philosophies :title=title.five :subtitle=subtitle.five />
      </div>
      <div class="section">
        <Philosophies :title=title.six :subtitle=subtitle.six />
      </div>
      <div class="section">
        <Philosophies :title=title.seven :subtitle=subtitle.seven />
      </div>
      <div class="section">
        <Philosophies :title=title.eight :subtitle=subtitle.eight />
      </div>
      <div class="section" @click='$refs.fullpage.api.moveTo(0)'>
        <Philosophies :title=title.nine :subtitle=subtitle.nine />
      </div>
      <div class="section">
        <Philosophies :title=title.ten :subtitle=subtitle.ten />
      </div>
      <div class="section">
        <Familiar />
      </div>
    </full-page>
    <!-- <Bottom id="bottom" :title=title /> -->
  </div>
</template>

<script>
import { gsap } from 'gsap';
import Front from '../components/Front.vue';
import Philosophies from '../components/Philosophies.vue';
import Familiar from '../components/Familiar.vue';
// import Bottom from '../components/Bottom.vue';

export default {
  name: 'Principles',
  components: {
    Front,
    Philosophies,
    Familiar,
    // Bottom,
  },
  data() {
    return {
      gsap1: new gsap.timeline(), // eslint-disable-line
      options: {
        anchors: ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      },
      title: {
        one: '1. A design at its fundamental should be made for human.',
        two: '2. Form should always compliment function but never be prioritized higher.',
        three: '3. Design should always have a sense of familiarity while keeping its uniqueness.',
        four: '4. A good design is natural but not fully organic.',
        five: '5. Less is more. Enough is best.',
        six: '6. Design is a solution, it should not create problems.',
        seven: '7. A design should communicate.',
        eight: '8. Design is an experience.',
        nine: '9. Design is self explanatory.',
        ten: '10. Design is not fully subjective.',
      },
      subtitle: {
        one: 'Every design is meant to be experienced and enjoyed by humans not machine or aliens. So it should be a priority to keep the audience in mind.',
        two: 'Adding to human centered design, the form then should be made “ergonomic” for use.',
        three: 'A familiar design reduces learning curve and gives a better user experience overall.',
        four: 'It’s a personal preference to copy a design from nature but never to be copied 100%.',
        five: 'Minimalism destroys not only distinctness in design but also cultural patterns & designer’s background.',
        six: 'Every design objective is a problem required to be solved not add upon.',
        seven: 'Whether it communicates little or much, it should reflect a certain message/feeling.',
        eight: 'Every project should consider the 5 human senses before started.',
        nine: 'If it requires a really in-depth explanation then it probably didn’t communicate well.',
        ten: 'There’s such thing as good design in general.',
      },
    };
  },
  methods: {
    // afterLoad(origin, destination, direction) { // eslint-disable-line
    //   if (destination.index === 0) {
    //     this.$set(this.title, 'text', 'Design Philosophies');
    //     this.$set(this.subtitle, 'text', 'Something went wrong. Please Refresh.');
    //   }
    //   if (destination.index === 1) {
    //     this.$set(this.title, 'text',
    //     '1. A design at its fundamental should be made for human.');
    //     this.$set(this.subtitle, 'text', 'Every design is meant
    //     to be experienced and enjoyed by humans not machine or aliens.
    //     So it should be a priority to keep the audience in mind.');
    //   }
    //   if (destination.index === 2) {
    //     this.$set(this.title, 'text',
    //     '2. Form should always compliment function but never be prioritized higher.');
    //     this.$set(this.subtitle, 'text', 'Adding to human centered design,
    //     the form then should be made “ergonomic” for use.');
    //   }
    // },
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

// Vue.mixin({
//   created: {
//     fullpageScroll() {

//     },
//   },
//   methods: {
//     fullpageScroll: function () {
//       fullpage_api.moveTo(3);
//     },
//   },
// });
</script>

<style lang="scss" scoped>
.section {
  display: block;
  margin: 7%;
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

#principle {
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
