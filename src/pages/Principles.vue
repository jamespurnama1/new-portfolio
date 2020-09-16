<template>
  <div id="principle">
    <full-page ref="fullpage" :options="options" id='fullpage' :skip-init="true">
      <div class="section">
        <h1>Principles</h1>
        <ul>
          <li v-for='index in philosophies.title.length+1'
          class='clickable'
            :key='index' @click='go(index+1, 0)'>
            {{ philosophies.title[index-1] }}
          </li>
        </ul>
      </div>
        <div class='section'>
          <div class="slide">
            <h4>{{ philosophies.title[0] }}</h4>
            <p>{{ philosophies.subtitle[0] }}</p>
            <button style='margin: 0 auto; display: block'
            @click='go(2,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
          </div>
          <div class="slide">
            <lottie-player class='lottie'
            ref='waveLottie'
            src='fingerprint.json'
            hover='true' />
            <button style='margin: 0 auto; display: block'
            @click='go(2,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
          </div>
      </div>
      <div class='section'>
        <div class="slide">
          <h4>{{ philosophies.title[1] }}</h4>
          <p>{{ philosophies.subtitle[1] }}</p>
          <button style='margin: 0 auto; display: block'
            @click='go(3,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
        <div class="slide">
          <lottie-player class='lottie'
            ref='waveLottie'
            src='wave.json'
            hover='true' />
            <button style='margin: 0 auto; display: block'
            @click='go(3,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
      </div>
      <div class='section'>
        <!-- <div class="slide"> -->
          <h4>{{ philosophies.title[2] }}</h4>
          <p>{{ philosophies.subtitle[2] }}</p>
          <File />
          <!-- <button style='margin: 0 auto; display: block'
            @click='go(4,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
        <div class="slide">
          <button style='margin: 0 auto; display: block'
            @click='go(4,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div> -->
      </div>
      <div class='section'>
        <div class="slide">
        <h4>{{ philosophies.title[3] }}</h4>
        <p>{{ philosophies.subtitle[3] }}</p>
        <button style='margin: 0 auto; display: block'
            @click='go(5,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
        <div class="slide">
        <lottie-player class='lottie'
          ref='waveLottie'
          src='layout.json'
          hover='true' />
          <button style='margin: 0 auto; display: block'
            @click='go(5,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
      </div>
      <div class='section'>
        <!-- <div class="slide"> -->
        <h4>4. <span class='clickable' @click='pattern()'>Less is more</span>
        <span v-if='this.question'> or Enough is Best?</span>
        <span v-else>. Enough is Best.</span>
        </h4>
        <p v-show='!this.question'>{{ philosophies.subtitle[4] }}</p>
        <lottie-player class='lottie'
        id='pattern'
        ref='pattern'
        src='pattern.json'
        style='position:absolute' />
        <!-- <button style='margin: 0 auto; display: block'
            @click='go(6,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
        <div class="slide">
          <button style='margin: 0 auto; display: block'
            @click='go(6,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div> -->
      </div>
      <div class='section'>
        <!-- <div class="slide"> -->
        <h4>{{ philosophies.title[5] }}</h4>
        <p>{{ philosophies.subtitle[5] }}</p>
        <Problem />
        <!-- <button style='margin: 0 auto; display: block'
            @click='go(7,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
        <div class="slide">
        <button style='margin: 0 auto; display: block'
            @click='go(7,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div> -->
      </div>
        <div class='section'>
          <!-- <div class="slide"> -->
            <h4>7. A design should <span>
              communicate.
              <feather
             type='message-square'
             stroke='#000'
             :size="100" />
             </span>
            </h4>
            <p>{{ philosophies.subtitle[6] }}</p>
            <!-- <button style='margin: 0 auto; display: block'
            @click='go(8,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
          </div> -->
          <!-- <div class="slide">
            <lottie-player class='lottie'
              ref='waveLottie'
              src='familiar.json'
              hover='true' />
              <button style='margin: 0 auto; display: block'
            @click='go(8,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
          </div> -->
      </div>
      <div class='section'>
        <div class="slide">
          <h4>{{ philosophies.title[7] }}</h4>
          <p>{{ philosophies.subtitle[7] }}</p>
          <button style='margin: 0 auto; display: block'
            @click='go(9,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
        <div class="slide">
          <lottie-player class='lottie'
            ref='waveLottie'
            src='countdown.json'
            hover='true' />
            <button style='margin: 0 auto; display: block'
            @click='go(9,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
      </div>
      <div class='section'>
        <div class="slide">
          <h4>{{ philosophies.title[8] }}</h4>
          <p>{{ philosophies.subtitle[8] }}</p>
          <button style='margin: 0 auto; display: block'
            @click='go(10,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
        <div class="slide">
          <lottie-player class='lottie'
            ref='waveLottie'
            src='countdown.json'
            hover='true' />
            <button style='margin: 0 auto; display: block'
            @click='go(10,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
      </div>
      <div class='section'>
        <div class="slide">
          <h4>{{ philosophies.title[9] }}</h4>
          <p>{{ philosophies.subtitle[9] }}</p>
          <button style='margin: 0 auto; display: block'
            @click='go(11,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
        <div class="slide">
          <lottie-player class='lottie'
            ref='waveLottie'
            src='countdown.json'
            hover='true' />
            <button style='margin: 0 auto; display: block'
            @click='go(11,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
import '@lottiefiles/lottie-player';
// import { create } from '@lottiefiles/lottie-interactivity';
import { gsap } from 'gsap';
import imagesLoaded from 'vue-images-loaded';
import Draggable from 'gsap/Draggable';
// import Hint from '@/components/Hint.vue';
import Problem from '@/components/Problem.vue';
import File from '@/components/File.vue';
import loading from '@/components/loading';

export default {
  name: 'Principles',
  components: {
    File,
    Problem,
    // Hint,
  },
  mixins: [loading],
  directives: {
    imagesLoaded,
  },
  data() {
    return {
      options: {
        licenseKey: null,
        onLeave: this.onLeave,
        slidesNavigation: false,
        navigation: true,
        navigationPosition: 'left',
        // menu: '#menu',
        // scrollOverflow: true,
        controlArrows: false,
      },
      question: true,
      chat: false,
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
    go(s, t) {
      fullpage_api.moveTo(s, t); // eslint-disable-line
    },
    pattern() {
      this.$refs['pattern'].play(); // eslint-disable-line
      this.question = false;
      document.querySelector('span.clickable').style.textDecoration = 'line-through';
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.fullpage.init();
    });
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

span.clickable:hover{
  text-decoration: underline;
}

h4, p {
  position: relative;
  z-index: 2;
}

#pattern {
  pointer-events: none;
  opacity: 50%;
}

span .feather--message-square {
  position: absolute;
  opacity: 0;
  transition: all .5s ease;
  transform: translateY(-50%);
}

span:hover .feather--message-square {
  transform: translateY(-73%);
  opacity: 1;
}

.slide > .fp-tableCell > button {
  transform: translateY(350%);
}

button p {
  margin: 0;
}

.lottie {
  height: 65%;
  transform: translateX(-25%);
  position: absolute;
  top: 20%;
}

ul {
 display: block;
 margin: 0 auto;
 width: 50vw;
}

li {
 display: block;
 margin: 0 auto;
 width: 65%;
}

li:hover {
  text-decoration: underline;
}

a {
  color: black;
  text-decoration: underline;
}

h1, h3, h4, p {
  text-align: center;
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
