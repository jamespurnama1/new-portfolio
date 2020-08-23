<template>
  <div id="principle">
    <full-page ref="fullPage" :options="options" id='fullpage'>
      <div class="section">
        <Front :philosophies='philosophies.title' />
      </div>
        <Philosophies v-for='(content, index) in philosophies.title' :key='index'
        :title='content' :anim='philosophies.anim[index]'
        :subtitle='philosophies.subtitle[index]'>
          <File />
        </Philosophies>
      <div class="section">
        <Familiar />
      </div>
    </full-page>
  </div>
</template>

<script>
import '@lottiefiles/lottie-player';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import Front from '../components/Front.vue';
import Philosophies from '../components/Philosophies.vue';
import Familiar from '../components/Familiar.vue';
import File from '../components/File.vue';

export default {
  name: 'Principles',
  components: {
    Front,
    Philosophies,
    Familiar,
    File,
  },
  data() {
    return {
      options: {
        anchors: ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
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
        anim: [
          'fingerprint.json',
          'wave.json',
          '',
          '',
          'wave.json',
          'wave.json',
          'wave.json',
          '',
          '',
          '',
        ],
      },
    };
  },
  methods: {
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
  transform: scale(1.3);
  z-index: -1;
}

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

#fingerprint {
  transform: scale(0.3);
}

button:hover #fingerprint {
  background-position: bottom;
}

</style>
