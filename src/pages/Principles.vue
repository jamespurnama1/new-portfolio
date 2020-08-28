<template>
  <div id="principle">
    <full-page ref="fullpage" :options="options" id='fullpage'>
      <div class="section">
        <Front :philosophies='philosophies.title' />
      </div>
        <div class='section'>
          <h1>{{ philosophies.title[0] }}</h1>
          <p>{{ philosophies.subtitle[0] }}</p>
          <lottie-player class='lottie'
          ref='waveLottie'
          src='fingerprint.json'
          hover='true' />
      </div>
      <div class='section'>
        <h1>{{ philosophies.title[1] }}</h1>
        <p>{{ philosophies.subtitle[1] }}</p>
        <lottie-player class='lottie'
          ref='waveLottie'
          src='wave.json'
          hover='true' />
      </div>
      <div class='section'>
        <h1>{{ philosophies.title[2] }}</h1>
        <p>{{ philosophies.subtitle[2] }}</p>
        <File />
      </div>
      <div class='section'>
        <h1>{{ philosophies.title[3] }}</h1>
        <p>{{ philosophies.subtitle[3] }}</p>
        <lottie-player class='lottie'
          ref='waveLottie'
          src='layout.json'
          hover='true' />
      </div>
      <div class='section'>
        <h1>{{ philosophies.title[4] }}</h1>
        <p>{{ philosophies.subtitle[4] }}</p>
        <lottie-player class='lottie'
          ref='waveLottie'
          src='dualism.json'
          hover='true' />
      </div>
      <div class='section'>
        <h1>{{ philosophies.title[5] }}</h1>
        <p>{{ philosophies.subtitle[5] }}</p>
        <lottie-player class='lottie'
          ref='waveLottie'
          src='countdown.json'
          hover='true' />
      </div>
            <div class='section'>
        <h1>{{ philosophies.title[6] }}</h1>
        <p>{{ philosophies.subtitle[6] }}</p>
        <lottie-player class='lottie'
          ref='waveLottie'
          src='familiar.json'
          hover='true' />
      </div>
      <div class='section'>
        <h1>{{ philosophies.title[7] }}</h1>
        <p>{{ philosophies.subtitle[7] }}</p>
        <lottie-player class='lottie'
          ref='waveLottie'
          src='countdown.json'
          hover='true' />
      </div>
      <div class='section'>
        <h1>{{ philosophies.title[8] }}</h1>
        <p>{{ philosophies.subtitle[8] }}</p>
        <lottie-player class='lottie'
          ref='waveLottie'
          src='countdown.json'
          hover='true' />
      </div>
      <div class='section'>
        <h1>{{ philosophies.title[9] }}</h1>
        <p>{{ philosophies.subtitle[9] }}</p>
        <lottie-player class='lottie'
          ref='waveLottie'
          src='countdown.json'
          hover='true' />
      </div>
    </full-page>
  </div>
</template>

<script>
import '@lottiefiles/lottie-player';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import Front from '../components/Front.vue';
import File from '../components/File.vue';

export default {
  name: 'Principles',
  components: {
    Front,
    File,
  },
  data() {
    return {
      options: {
        anchors: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        onLeave: this.onLeave,
      },
      philosophies: {
        title: [
          '1. A design at its fundamental should be made for human.',
          '2. Form should always compliment function but never be prioritized higher.',
          '3. Design should always have a sense of familiarity while keeping its uniqueness.',
          '4. A good design is natural but not fully organic.',
          '5. Less is more. Enough is best.',
          '6. Design is a solution, it should not create problems.',
          '7. A design should communicate.',
          '8. Design is an experience.',
          '9. Design is self explanatory.',
          '10. Design is not fully subjective.',
        ],
        subtitle: [
          'Every design is meant to be experienced and enjoyed by humans not machine or aliens. So it should be a priority to keep the audience in mind.',
          'Adding to human centered design, the form then should be made “ergonomic” for use.',
          'A familiar design reduces learning curve and gives a better user experience overall.',
          'It’s a personal preference to copy a design from nature but never to be copied 100%.',
          'Minimalism destroys not only distinctness in design but also cultural patterns & designer’s background.',
          'Every design objective is a problem required to be solved not add upon.',
          'Whether it communicates little or much, it should reflect a certain message/feeling.',
          'Every project should consider the 5 human senses before started.',
          'If it requires a really in-depth explanation then it probably didn’t communicate well.',
          'There’s such thing as good design in general.',
        ],
      },
    };
  },
  methods: {
    onLeave(origin, destination, direction) { // eslint-disable-line
      if (destination.isFirst) {
        this.$store.commit('hideScrollToTop');
      } else {
        this.$store.commit('showScrollToTop');
      }
    },
  },
  mounted() {
    gsap.registerPlugin(Draggable);
    Draggable.create('#file', {
      onDragEnd() {
        if (this.hitTest('#trash', '35%')) {
          gsap.to('#file', {
            scale: 0,
            opacity: 0,
          });
          setTimeout(() => {
            gsap.to('#file', {
              scale: 1,
              opacity: 1,
              x: '-=100',
            });
          }, 4500);
        }
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.lottie {
  height: 40%;
}

.section {
  margin: 80px 100px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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

#fingerprint {
  transform: scale(0.3);
}

button:hover #fingerprint {
  background-position: bottom;
}

</style>
