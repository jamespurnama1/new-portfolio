<template>
  <div id="landing" :class='{ noScroll: overlayVideo }'>
    <div class='center' id='overlay' v-show='overlayVideo'>
      <feather id='close'
      @click='overlayVideo=false; stopVideo()'
      type="x" stroke='#575F6B'
      :size="27" />
      <video ref='reel' controls>
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
        <video class='bg' loop muted :src='video' />
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
    <Hint />
    <div id='discoveries' class='block nextBlock'>
      <div class='long'>
        <h1>explore my discoveries explore my discoveries
           explore my discoveries explore my discoveries</h1>
        <h1>explore my discoveries explore my discoveries
           explore my discoveries explore my discoveries explore my</h1>
      </div>
        <div class='horizontalScroll'>
          <Planet v-for='(content, index) in planet.title' :key='index'
          :title='content' :image='image[index]' />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './components/Card.vue';
import Hint from './components/Hint.vue';
import Planet from './components/Planet.vue';

export default {
  name: 'JamesHenry',
  components: {
    Card,
    Hint,
    Planet,
  },
  data() {
    return {
      overlayVideo: false,
      video: '',
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
          '/jtc',
          '/tremors',
          '/eyureka',
          '/munlite',
          '/belladonna',
        ],
      },
      isInactive: false,
      userActivityThrottlerTimeout: null,
      userActivityTimeout: null,
    };
  },
  props: {
    lastScrollPosition: Number,
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
    onScroll() {
    },
  },
  mounted() {
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  computed: {
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>
.featured {
  text-align: right;
  margin: 0 5% 0 auto;
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
  width: 100vw;
  overflow-x: scroll;
  margin: 5% 0;
  padding: 3%;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.horizontalScroll::-webkit-scrollbar {
  display: none;
}

video{
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
    height: 50%;
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
    height: 60%;
  }
  .nextBlock {
    height: initial;
  }
}
</style>
