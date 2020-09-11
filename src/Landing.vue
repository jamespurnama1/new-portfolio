<template>
  <div id="landing" :class='{ noScroll: overlayVideo }'>
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
    <div class='block'>
      <h1>james<br>&#9;henry</h1>
      <div id='description'>
        <p>Meet your multi-talented graphic designer based in Malaysia.
          I’m best at branding,  UI/UX, Front-end Development, and a whole lot more.</p>
        <button @click='overlayVideo=true; startVideo()'>
          <p style='font-size: 1.4em; margin: 0'>view video reel</p>
        </button>
      </div>
    </div>
    <Hint />
    <div class='block nextBlock'>
      <h1 class='featured'>featured<br>works</h1>
      <div class='horizontalScroll'>
        <div class='scrollrL' style='height: 39.2%'>
          <!-- <feather :size='25' type='arrow-left' stroke='#575F6B' /> -->
        </div>
        <div class='scrollrR' style='height: 39.2%'>
          <!-- <feather :size='25' type='arrow-right' stroke='#575F6B' /> -->
        </div>
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
          <div class='scrollrL'>
            <!-- <feather :size='25' type='arrow-left' stroke='#575F6B' /> -->
          </div>
          <div class='scrollrR'>
            <!-- <feather :size='25' type='arrow-right' stroke='#575F6B' /> -->
          </div>
          <Planet
          v-for='(content, index) in planet.title'
          :key='index'
          :title='content'
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
  data() {
    return {
      overlayVideo: false,
      planet: {
        title: ['motion', 'branding', 'UI/UX', 'photography', 'tools'],
        image: ['1.gif', '2.gif', '3.gif', '4.gif', '5.gif'],
        static: ['1.png', '2.png', '3.png', '4.png', '5.png'],
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
      fix: true,
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
    this.$once('scrollPlease', () => {
      const disc = document.getElementById('discoveries');
      disc.scrollIntoView({ behavior: 'smooth' });
    });
  },
};
</script>

<style lang="scss" scoped>
.scrollrR, .scrollrL {
  position: absolute;
  height: 25%;
  width: 10%;
  z-index: 5;
  display: flex;
  padding: 20px;
  align-items: center;
}

.scrollrL {
  background: linear-gradient(90deg, rgba(216,217,218,1) 0%, rgba(216,217,218,0) 90%);
  left: 0;
}

.scrollrR {
  background: linear-gradient(90deg, rgba(216,217,218,0) 10%, rgba(216,217,218,1) 100%);
  right: 0;
  justify-content: flex-end;
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
  display: flex;
  flex-direction: row;
  min-width: 100vw;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  // padding: 3%;
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
