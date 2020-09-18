<template>
  <div id="principle">
    <full-page ref="fullpage" :options="options" id='fullpage' :skip-init="true">
      <div class="section">
        <h1>Principles</h1>
        <p style='width: 35%; margin: 0 auto; text-align: left'>
          Here are some of my personal design principles.
          There will be interactivity for better understanding along the way.</p>
        <ul>
          <li v-for='index in philosophies.title.length+1'
          class='clickable'
            :key='index' @click='go(index+1, 0)'>
            {{ philosophies.title[index-1] }}
          </li>
        </ul>
      </div>
        <div class='section'>
          <transition name='fade' mode='out-in'>
              <h4 key=1 v-if='this.lock'>[ENCRYPTED DATA]</h4>
              <h4 key=2 v-else>{{ philosophies.title[0] }}</h4>
          </transition>
          <transition name='fade' mode='out-in'>
              <p key=3 v-if='this.lock'>[ENCRYPTED DATA]</p>
              <p key=4 v-else>{{ philosophies.subtitle[0] }}</p>
            </transition>
            <button
            @click='lock = false'
            class='center'
            style='margin: 0 auto; display: block;
            padding: 0;
            width: 100px; height: 100px; border-radius: 100px'>
              <lottie-player class='lottie'
              style='position: relative; transform: translate(0); height: 100%'
              ref='waveLottie'
              src='fingerprint.json'
              hover='true' />
            </button>
      </div>
      <div class='section'>
        <!-- <div class="slide"> -->
          <h4>{{ philosophies.title[1] }}</h4>
          <p>{{ philosophies.subtitle[1] }}</p>
          <lottie-player class='lottie'
          style='top: 40%; transform: translateX(25%)'
            ref='waveLottie'
            src='wave.json'
            loop
            autoplay />
          <!-- <button style='margin: 0 auto; display: block'
            @click='go(3,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
        <div class="slide">
            <button style='margin: 0 auto; display: block'
            @click='go(3,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div> -->
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
        <!-- <div class="slide"> -->
        <lottie-player class='lottie'
          style='width: 428px; transform: translateX(0)'
          src='organic.json'
          speed='1.3'
          autoplay />
        <h4>{{ philosophies.title[3] }}</h4>
        <p>{{ philosophies.subtitle[3] }}</p>
        <lottie-player class='lottie'
        style='transform: translate(33%, 4%) scaleX(-1); height: 80%'
          src='organic.json'
          speed='0.6'
          autoplay />
        <!-- <button style='margin: 0 auto; display: block'
            @click='go(5,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
        <div class="slide">
          <button style='margin: 0 auto; display: block'
            @click='go(5,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div> -->
      </div>
      <div class='section'>
        <!-- <div class="slide"> -->
        <h4>4. <span class='clickable' @click='pattern()'>Less is more</span>
        <span v-if='this.question'> or Enough is Best?</span>
        <span v-else>. Enough is Best.</span>
        </h4>
        <p
        :class='{ vis: this.question }'
        style='transition: opacity .5s ease'>
          {{ philosophies.subtitle[4] }}
        </p>
        <lottie-player class='lottie'
        id='pattern'
        style='height: 85%'
        ref='pattern'
        src='pattern.json' />
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
        <!-- <div class="slide"> -->
          <h4 style='transition: all 1s ease;
          transform: translate3d(0,0,0);
          -webkit-transform: translate3d(0,0,0);'
          :class='{ glow: chk }'>
          {{ philosophies.title[7] }}
          </h4>
          <p>{{ philosophies.subtitle[7] }}</p>
          <div class='center'>
          <label class="label clickable">
            <feather
             type='eye'
             stroke='#575F6B'
             :size="35" />
          <div class="toggle">
            <input class="toggle-state" type="checkbox" v-model="check" value="see" />
            <div class="indicator" :class="{ glowBorder: this.check.includes('see') }"></div>
          </div>
          </label>
          <label class="label clickable">
            <feather
             type='thermometer'
             stroke='#575F6B'
             :size="35" />
          <div class="toggle">
            <input class="toggle-state" type="checkbox" v-model="check" value="heat" />
            <div class="indicator" :class="{ glowBorder: this.check.includes('heat') }"></div>
          </div>
          </label>
          <label class="label clickable">
            <feather
             type='feather'
             stroke='#575F6B'
             :size="35" />
          <div class="toggle">
            <input class="toggle-state" type="checkbox" v-model="check" value="touch" />
            <div class="indicator" :class="{ glowBorder: this.check.includes('touch') }"></div>
          </div>
          </label>
          <label class="label clickable">
            <feather
             type='headphones'
             stroke='#575F6B'
             :size="35" />
          <div class="toggle">
            <input class="toggle-state" type="checkbox" v-model="check" value="hear" />
            <div class="indicator" :class="{ glowBorder: this.check.includes('hear') }"></div>
          </div>
          </label>
          <label class="label clickable">
            <feather
             type='wind'
             stroke='#575F6B'
             :size="35" />
          <div class="toggle">
            <input class="toggle-state" type="checkbox" v-model="check" value="smell" />
            <div class="indicator" :class="{ glowBorder: this.check.includes('smell') }"></div>
          </div>
          </label>
          </div>
          <!-- <button style='margin: 0 auto; display: block'
            @click='go(9,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
        <div class="slide">
            <button style='margin: 0 auto; display: block'
            @click='go(9,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div> -->
      </div>
      <div class='section'>
        <!-- <div class="slide"> -->
          <h4>{{ philosophies.title[8] }}</h4>
          <p>{{ philosophies.subtitle[8] }}</p>
            <lottie-player class='lottie'
            @mouseover= loopL()
            @mouseleave= stopL()
            style='transform: translateX(-3%); height: 30%; top: 60%'
            loop
            id='lottieRandom'
            ref='random'
            src='random.json'
            hover='true' />
          <!-- <div class='center'>
            <p style='line-height: 1; margin: 1px;'>design<br>/dɪˈzʌɪn/</p>
            <p @mouseover="random = 'design'" style='margin: 1px'>is: {{ random }}</p>
          </div> -->
          <!-- <button style='margin: 0 auto; display: block'
            @click='go(10,1)'>
              <p>
              interactivity
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div>
        <div class="slide">
            <button style='margin: 0 auto; display: block'
            @click='go(10,0)'>
              <p>
              back
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </p>
            </button>
        </div> -->
      </div>
      <div class='section'>
        <!-- <div class="slide"> -->
          <h4>{{ philosophies.title[9] }}</h4>
          <p>{{ philosophies.subtitle[9] }}</p>
          <div class='center' id='scoreBar'>
          <div id='score'>
            <div id='points' />
          </div>
          <p>your score: {{ score }}</p>
          </div>
          <canvas id="draw"
          @mousemove="draw"
          @mousedown="beginDrawing"
          @mouseup="stopDrawing" />
          <button style='margin: 0 auto; display: block'
            @click='clear()'>
              <p>
              clear drawing
              </p>
            </button>
        <!-- </div>
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
        </div> -->
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
      score: 0,
      lock: true,
      question: true,
      check: [],
      canvas: null,
      isDrawing: false,
      x: 0,
      y: 0,
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
    scoreRan() {
      let min;
      let max;
      if (this.score > 2) {
        min = Math.ceil(this.score - 2);
      } else {
        min = Math.ceil(0);
      }
      if (this.score <= 95) {
        max = Math.floor(this.score + 5);
      } else {
        max = Math.floor(100);
      }
      this.score = Math.floor(Math.random() * (max - min + 1)) + min;
      document.getElementById('points').style.height = `${this.score}%`;
    },
    clear() {
      const ctx = this.canvas;
      const c = document.getElementById('draw');
      ctx.clearRect(0, 0, c.width, c.height);
      this.score = 0;
      document.getElementById('points').style.height = `${this.score}%`;
    },
    drawLine(x1, y1, x2, y2) {
      const ctx = this.canvas;
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    draw(e) {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },
    beginDrawing(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
      let rng;
      clearTimeout(rng);
      rng = setTimeout(() => {
        this.scoreRan();
      }, 1000);
    },
    stopDrawing(e) {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
      }
    },
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
    resize() {
      const c = document.getElementById('draw');
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    },
    // makeStr(length) {
    //   let result = '';
    //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //   const charactersLength = characters.length;
    //   for (let i = 0; i < length; +i) {
    //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //   }
    //   this.random = result;
    // },
    loopL() {
      // this.$refs.random.setLooping(true);
      this.$refs.random.play();
    },
    stopL() {
      this.$refs.random.seek(22);
      this.$refs.random.pause();
    },
  },
  mounted() {
    const c = document.getElementById('draw');
    this.$nextTick(() => {
      this.$refs.fullpage.init();
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    //   setInterval(function() { // eslint-disable-line
    //     this.makeStr(5);
    //   }, 1000);
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
    this.$refs.random.play();
    // this.makeStr(5);
    this.canvas = c.getContext('2d');
    // window.addEventListener('resize', this.resize);
    // this.$refs.random.addEventListener('load', () => {
    //   create({
    //     mode: 'hover',
    //     player: 'lottieRandom',
    //     actions: [
    //       // {
    //       //   position: { x: -1, y: -1 },
    //       //   type: 'loop',
    //       //   frames: [0, 21],
    //       // },
    //       {
    //         position: { x: [0, 1], y: [0, 1] },
    //         type: 'stop',
    //         frames: [22],
    //       },
    //     ],
    //   });
    // });
  },
  computed: {
    chk() {
      if (this.check.length === 5) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
#scoreBar {
  position: absolute;
  right: 8vw;
  height: 50%;
  flex-direction: column;
  bottom: 20%;
  width: 15vw;
}

#points {
  position: relative;
  border-radius: 30px;
  // bottom: -77%;
  // transform: rotate(180deg);
  height: 0;
  width: 20px;
  transition: all .5s ease;
  background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
}

#score {
  // position: absolute;
  // right: 25%;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  border-radius: 30px;
  height: 80%;
  width: 20px;
  box-shadow: inset 13px 13px 26px #cbcccd,
              inset -13px -13px 26px #e5e6e7;
}

#draw {
  cursor: crosshair;
  // background-color: white;
  box-shadow:  20px 20px 60px #b8b8b9,
             -20px -20px 60px #f8fafb;
  border-radius: 50px;
  margin: 10px auto;
  display: block;
  width: 50vw;
  height: 50%;
}

.glow {
  color: #FFF;
  animation: glow 1s ease-in-out infinite alternate;
}

.glowBorder {
  animation: glowb 1s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow:
    0 0 10px #D8D9DA, 0 0 30px #D8D9DA,
  }

  to {
    text-shadow:
    0 0 20px #F2F3F6, 0 0 40px #F2F3F6,
  }
}

@keyframes glowb {
  from {
    box-shadow:
    0 0 30px #D8D9DA, 0 0 50px #D8D9DA,
  }

  to {
    box-shadow:
    0 0 20px #F2F3F6, 0 0 40px #F2F3F6,
  }
}

.label{
  margin: 0 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.toggle {
  isolation: isolate;
  position: relative;
  height: 30px;
  width: 60px;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 10px;
  box-shadow:
    -8px -4px 8px 0px rgba(242, 243, 246, 0.5),
    8px 4px 12px 0px #D8D9DA,
    4px 4px 4px 0px #D8D9DA inset,
    -4px -4px 4px 0px #F2F3F6 inset;
}

.toggle-state {
  display: none;
}

.indicator {
  height: 100%;
  width: 200%;
  background: linear-gradient(45deg, #F2F3F6, #F2F3F6, #D8D9DA);
  border-radius: 15px;
  transform: translate3d(-75%, 0, 0);
  transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
  box-shadow:
    3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
}

.toggle-state:checked ~ .indicator {
  transform: translate3d(25%, 0, 0);
}

.vis{
opacity: 0;
}

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
