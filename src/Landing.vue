<template>
  <div id="landing" :class='{ noScroll: overlayVideo }'>
    <div class='bgcontainer'>
      <video
      preload='auto'
      autobuffer
      ref='bgvideo'
      class='bgvideo'
      style ='opacity: 50%'
      muted>
        <source src='@/assets/BG.mp4'>
      </video>
    </div>
    <div class='center' id='overlay' v-show='overlayVideo'>
      <feather id='close'
      @click='overlayVideo=false; stopVideo()'
      type="x" stroke='#575F6B'
      :size="27" />
      <video class='reel' ref='reel' controls>
        <source src='@/assets/reel.webm' type='video/webm'>
        <source src='@/assets/reel.mp4' type='video/mp4'>
      </video>
    </div>
    <div class='block'>
      <h1>james<br>&#9;henry</h1>
      <div id='description'>
        <p>Meet your multi-talented graphic designer based in Malaysia.
          I’m best at branding,  UI/UX, Front-end Development, and a whole lot more.</p>
        <button @click='overlayVideo=true; startVideo()'>view video reel</button>
      </div>
    </div>
    <Hint />
    <div class='block nextBlock'>
      <h1 class='featured'>featured<br>works</h1>
      <div class='horizontalScroll'>
        <Card
        v-for='(content, index) in card.title' :key='index'
        :title='content'
        :url='card.url[index]'
        :caption='card.caption[index]'
        :thumbnail='card.thumbnail[index]'/>
      </div>
    </div>
    <img class='bg land' src='@/assets/ISS.png'>
    <Hint />
    <div id='discoveries' class='block nextBlock'>
      <div class='long'>
        <h1>explore my discoveries explore my discoveries
           explore my discoveries explore my discoveries</h1>
        <h1>explore my discoveries explore my discoveries
           explore my discoveries explore my discoveries explore my</h1>
      </div>
        <div class='horizontalScroll'>
          <Planet
          v-for='(content, index) in planet.title'
          :key='index'
          :title='content'
          :image='planet.image[index]' />
      </div>
    </div>
  </div>
</template>

<script>
import { gsap, ScrollTrigger } from 'gsap/all';
import Card from './components/Card.vue';
import Hint from './components/Hint.vue';
import Planet from './components/Planet.vue';

export default {
  name: 'Landing',
  components: {
    Card,
    Hint,
    Planet,
  },
  data() {
    return {
      overlayVideo: false,
      planet: {
        title: ['motion', 'branding', 'UI/UX', 'photography', 'tools'],
        image: ['Red.png', 'Magenta.png', 'Blue.png', 'Purple.png', 'Cream.png'],
      },
      card: {
        title: ['jack the clipper', 'tremors', 'eyureka', 'mun lite', 'belladonna lyric video'],
        caption: [
          {
            title: 'Re-branding',
            type: 'The One Academy College Project',
            year: '2019',
          },
          {
            title: 'Photography',
            type: 'The One Academy College Project',
            year: '2018',
          },
          {
            title: 'Branding, UI/UX',
            type: 'Freelance',
            year: '2020',
          },
          {
            title: 'Branding, UI/UX',
            type: 'Freelance',
            year: '2020',
          },
          {
            title: 'Motion Graphics',
            type: 'Freelance',
            year: '2020',
          },
        ],
        thumbnail: [
          'jtc1_700.jpg',
          'tremors1_700.jpg',
          'eyureka.jpg',
          'munlite.png',
          'belladonna.png',
        ],
        url: [
          '/works/jtc',
          '/works/tremors',
          '/works/eyureka',
          '/works/munlite',
          '/works/belladonna',
        ],
      },
      isInactive: false,
      userActivityThrottlerTimeout: null,
      userActivityTimeout: null,
      tl: gsap.timeline(),
      tl2: gsap.timeline(),
    };
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
        markers: true,
      },
      overwrite: 'auto',
    });
    this.tl2.to('.long h1:last-child', {
      x: '+=10em',
      ease: 'none',
      scrollTrigger: {
        trigger: '.long',
        scrub: true,
        markers: true,
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
        markers: true,
      },
    });
    gsap.to('.bgvideo', {
      scale: 0.4,
      duration: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.land',
        scrub: true,
        markers: true,
      },
    });
    this.$refs.bgvideo.addEventListener('canplay', this.scrub());
    this.$refs.bgvideo.pause();
  },
  created() {
    this.$store.watch(() => this.$store.state.scrolling,
      () => {
        let clear;
        console.log('value changed!');
        this.tl.pause();
        this.tl.invalidate();
        window.clearTimeout(clear);
        let fix = true;
        if (fix) {
          clear = setTimeout(() => {
            this.tl.restart();
          }, 2000);
          setTimeout(() => {
            fix = false;
          }, 3000);
        }
      });
  },
};
</script>

<style lang="scss" scoped>
.land {
  position: relative;
  z-index: 0;
  min-height: initial;
  // transform: translateY(200%);
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
  margin: 0 5% 5% auto;
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
  // max-height: 90vh;
}

.horizontalScroll {
  display: flex;
  flex-direction: column;
  height: 100vw;
  overflow-y: scroll;
  transform: rotate(90deg) translateX(-40vw);
  padding: 3%;
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

@media screen and (min-width: 320px) {
  #description {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-self: center;
    width: 70%;
    left: 0;
  }
  .horizontalScroll {
    width: 40vh;
  }
  .nextBlock {
    height: 60vh;
  }
}
@media screen and (min-width: 800px) {
  #description {
    display: initial;
    width: 30%;
    left: 5%;
  }
  .horizontalScroll {
    width: 50vh;
    // transform: rotate(90deg) translateX(-190%);
  }
  .nextBlock {
    height: 90vh;
  }
}
@media screen and (min-width: 1000px) {
}
</style>
