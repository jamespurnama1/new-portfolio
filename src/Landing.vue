<template>
  <div id="landing" :class='{ noScroll: overlayVideo }'>
    <div class='center' id='overlay' v-show='overlayVideo'>
      <feather id='close'
      @click='overlayVideo=false; stopVideo()'
      type="x" stroke='#575F6B'
      :size="27" />
      <video class='reel' ref='reel' controls>
        <source src='@/assets/reel.webm' type='video/webm; codecs=&quot;vp9, vorbis&quot;'>
        <source src='@/assets/reel.mp4' type='video/mp4; codecs=&quot;avc1.4D4029, mp4a&quot;'>
      </video>
    </div>
    <div class='bgcontainer'>
      <video
      preload='auto'
      autobuffer
      tabindex="0"
      ref='bgvideo'
      class='bgvideo'
      style ='opacity: 50%'
      muted>
        <source type="video/webm; codecs=&quot;vp9, vorbis&quot;" src='@/assets/BG.webm'>
        <source type="video/mp4; codecs=&quot;avc1.4D4029, mp4a&quot;" src='@/assets/BG.mp4'>
      </video>
    </div>
    <div class='block'>
      <h1>james<br>&#9;henry</h1>
      <div id='description'>
        <p>Meet your multi-talented graphic designer based in Malaysia.
          I’m best at branding,  UI/UX, Front-end Development, and a whole lot more.</p>
        <button @click='overlayVideo=true; startVideo()'>
          <p style='font-size: 1.4em; margin: 0; margin-right: 10px'>view video reel</p>
          <feather
          type="play-circle" stroke='#575F6B'
          :size="20" />
        </button>
      </div>
    </div>
    <Hint :title='`Scroll down to discover more`'/>
    <div class='block nextBlock'>
      <h1 class='featured'>featured<br>works</h1>
      <div class='horizontalScroll'>
        <div class='scrollr'>
          <div class='scrollrL'>
            <button @click='prev(0)' style='margin: 15%'>
              <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </button>
          </div>
          <div class='scrollrR'>
            <button @click='next(0)' style='margin: 15%'>
              <feather type='arrow-right' stroke='#575F6B' :size="15" />
            </button>
          </div>
        </div>
        <Card
        v-for='(content, i) in featured'
        :key='i'
        :title='content.title'
        :url='content.url'
        :caption='content.caption'
        />
      </div>
    </div>
    <img class='bg land' src='@/assets/ISS.png'>
    <Hint :title='`Scroll down to discover more`' />
    <div id='discoveries' class='block nextBlock'>
      <div class='long'>
        <h1>explore my discoveries explore my discoveries
           explore my discoveries explore my discoveries</h1>
        <h1>explore my discoveries explore my discoveries
           explore my discoveries explore my discoveries explore my</h1>
      </div>
        <div class='horizontalScroll'>
          <div class='scrollr' style='height: 41%'>
            <div class='scrollrL'>
              <button @click='prev(1)' style='margin: 15%'>
                <feather type='arrow-left' stroke='#575F6B' :size="15" />
              </button>
            </div>
            <div class='scrollrR'>
              <button @click='next(1)' style='margin: 15%'>
                <feather type='arrow-right' stroke='#575F6B' :size="15" />
              </button>
            </div>
          </div>
          <Planet
          v-for='(content, index) in planet.title'
          :key='index'
          :title='content'
          :url='planet.url[index]'
          :static='planet.static[index]'
          :image='planet.image[index]' />
      </div>
        <a href='/planet/all'><button class='center' style='margin: 0 10px'>
          <p style='font-size: 1.4em; margin: 0'>view all</p>
        </button></a>
    </div>
  </div>
</template>

<script>
import { gsap, ScrollTrigger } from 'gsap/all';
import AllWorks from '@/components/AllWorks';
import Card from '@/components/Card.vue';
import Hint from '@/components/Hint.vue';
import Planet from '@/components/Planet.vue';

export default {
  name: 'Landing',
  components: {
    Card,
    Hint,
    Planet,
  },
  mixins: [AllWorks],
  data() {
    return {
      overlayVideo: false,
      planet: {
        title: ['motion', 'branding', 'UI/UX', 'photography'],
        url: ['motion', 'branding', 'ui', 'photography'],
        image: ['1.gif', '2.gif', '3.gif', '4.gif'],
        static: ['1.png', '2.png', '3.png', '4.png'],
      },
      isInactive: false,
      userActivityThrottlerTimeout: null,
      userActivityTimeout: null,
      tl: gsap.timeline(),
      tl2: gsap.timeline(),
      fix: true,
    };
  },
  computed: {
    featured() {
      return this.works.filter((f) => f.featured === true);
    },
  },
  methods: {
    nextBlock(e) {
      const el = this.$el.getElementsByClassName('nextBlock')[e];
      el.scrollIntoView({ behavior: 'smooth' });
    },
    stopVideo() {
      this.$refs.reel.pause();
    },
    startVideo() {
      this.$refs.reel.play();
      if (window.innerWidth < 1080) {
        this.$refs.reel.requestFullscreen();
      }
    },
    scrub() {
      requestAnimationFrame(this.bgvid);
    },
    bgvid() {
      this.$refs.bgvideo.currentTime = (window.pageYOffset / 200).toPrecision(3);
      requestAnimationFrame(this.bgvid);
    },
    next(i) {
      const inner = document.querySelectorAll('.horizontalScroll')[i];
      inner.scrollTo({ left: 100000, behavior: 'smooth' });
    },
    prev(i) {
      const inner = document.querySelectorAll('.horizontalScroll')[i];
      inner.scrollTo({ left: 0, behavior: 'smooth' });
    },
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    this.tl.to('.long h1:first-child', {
      x: '-10em',
      repeat: -1,
      duration: 50,
      ease: 'none',
    })
      .to('.long h1:last-child', {
        x: '10em',
        repeat: -1,
        duration: 50,
        ease: 'none',
      }, 0);
    this.tl2.to('.long h1:first-child', {
      x: '-=10em',
      duration: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.long',
        scrub: true,
      },
      overwrite: 'auto',
    });
    this.tl2.to('.long h1:last-child', {
      x: '+=10em',
      ease: 'none',
      scrollTrigger: {
        trigger: '.long',
        scrub: true,
      },
      overwrite: 'auto',
    });
    gsap.to('.land', {
      scale: 1.9,
      duration: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.land',
        scrub: true,
      },
    });
    gsap.to('.bgvideo', {
      scale: 0.4,
      duration: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.land',
        scrub: true,
      },
    });
    this.$refs.bgvideo.addEventListener('canplay', this.scrub());
    this.$refs.bgvideo.pause();
    setTimeout(() => {
      if (this.$store.state.scroll) {
        document.getElementById('discoveries').scrollIntoView({ behavior: 'smooth' });
        this.$store.commit('dontScrollPlease');
      }
    }, 1000);
  },
  created() {
    this.$store.watch(() => this.$store.state.scrolling,
      () => {
        let clear;
        this.tl.pause();
        this.tl.invalidate();
        window.clearTimeout(clear);
        clear = setTimeout(() => {
          this.tl.invalidate();
          this.tl.restart();
        }, 2000);
      });
    this.$store.watch(() => this.$store.state.scroll,
      () => {
        if (this.$store.state.scroll) {
          document.getElementById('discoveries').scrollIntoView({ behavior: 'smooth' });
          this.$store.commit('dontScrollPlease');
        }
      });
  },
};
</script>

<style lang="scss" scoped>

button p {
  margin: 0;
  color: #575F6B;
}

button {
  width: 90%;
  margin: 0 auto;
}

.scrollr {
  position: absolute;
  height: 52%;
  width: 100%;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
}

.scrollrL {
  height: 100%;
  display: flex;
  width: 7%;
  align-items: center;
  position: relative;
  background: linear-gradient(90deg, rgba(216,217,218,1) 0%, rgba(216,217,218,0) 90%);
  pointer-events: all;

}

.scrollrR {
  position: relative;
  height: 100%;
  width: 7%;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, rgba(216,217,218,0) 10%, rgba(216,217,218,1) 100%);
  pointer-events: all;
}

.scrollrR > button {
  margin-right: 30% !important;
  transform: translateX(150%);
  transition: all .5s ease;
}

.horizontalScroll:hover > .scrollr > .scrollrR > button,
.horizontalScroll:hover > .scrollr > .scrollrL > button  {
  transform: translateX(0);
}

.scrollrL > button {
  margin-left: 30% !important;
    transform: translateX(-150%);
  transition: all .5s ease;
}

.land {
  position: relative;
  z-index: 0;
  min-height: initial;
}

.bgcontainer {
  position: fixed;
  overflow: hidden;
}

.bgvideo {
  min-height: 56.25vw;
  height: 100%;
  width: 177.77777778vh;
  min-width: 100%;
  max-width: none;
}

.rotate {
  transform: rotate(-90deg);
}

.featured {
  text-align: right;
  margin: 0 5% 1% auto;
  width: 100%;
}

.long {
  white-space: nowrap;
}

.noScroll {
  overflow: hidden;
  height: 100vh;
}

.nextBlock {
  align-items: flex-start;
  padding: 5% 0;
}

.horizontalScroll {
  // position: relative;
  display: flex;
  flex-direction: row;
  min-width: 100vw;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.horizontalScroll::-webkit-scrollbar {
  display: none;
}

.reel{
  width: 70vw;
  height: auto;
  max-height: 70vh;
}

#close {
  position: relative;
  right: 5%;
}

#first {
  background-image: url('/assets/ISS.png');
}

#description {
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-self: center;
  width: 30%;
  padding-left: 50px;
  min-width: 250px;
}

#overlay {
  z-index: 10;
  position: absolute;
  background-color: rgba(255,255,255,0.5);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#discoveries {
  background-color: #D8D9DA;
  transform: translateY(-4%);
}

@media all and (max-width: 980px) {
  #description {
    width: 50%;
    padding-left: 0;
    min-width: 500px;
  }
  p {
    text-align: center;
  }
}

@media all and (max-width: 736px) {
  .nextBlock {
    height: 120vw;
  }
}

@media all and (max-width: 480px) {
  .nextBlock {
    height: 110vw;
  }

  #description {
    min-width: 100px;
  }
}

@media all and (max-width: 320px) {
  .horizontalScroll {
    width: 40vh;
  }

  .nextBlock {
    height: 150vw;
  }
}

</style>
