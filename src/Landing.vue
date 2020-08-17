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
    <div class='block' id='first'>
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
      <h1>featured works</h1>
      <div class='horizontalScroll'>
        <Card :cardTitle='cardTitle.one' :caption='caption.one' :thumbnail='thumbnail.one'/>
        <Card :cardTitle='cardTitle.two' :caption='caption.two' :thumbnail='thumbnail.two'/>
        <Card :cardTitle='cardTitle.three' :caption='caption.three' :thumbnail='thumbnail.three'/>
        <Card :cardTitle='cardTitle.four' :caption='caption.four' :thumbnail='thumbnail.four'/>
        <Card :cardTitle='cardTitle.five' :caption='caption.five' :thumbnail='thumbnail.five'/>
      </div>
    </div>
    <Hint />
    <div id='discoveries' style='height: 100vh' class='block nextBlock'>
      <h1>explore my discoveries</h1>
      <h1>discoveries explore my</h1>
        <div class='horizontalScroll'>
        <Planet :planet='planet[0]' :planetImage='planetImage[0]' />
        <Planet :planet='planet[1]' :planetImage='planetImage[1]' />
        <Planet :planet='planet[2]' :planetImage='planetImage[2]' />
        <Planet :planet='planet[3]' :planetImage='planetImage[3]' />
        <Planet :planet='planet[4]' :planetImage='planetImage[4]' />
        <Planet :planet='planet[4]' :planetImage='planetImage[4]' />
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
      planet: ['motion', 'branding', 'UI/UX', 'photography', 'tools'],
      planetImage: ['Red.png', 'Magenta.png', 'Blue.png', 'Purple.png', 'Cream.png'],
      cardTitle: {
        one: 'jack the clipper',
        two: 'tremors',
        three: 'eyureka',
        four: 'mun lite',
        five: 'belladonna lyric video',
      },
      caption: {
        one: {
          title: 'Re-branding',
          type: 'The One Academy College Project',
          year: '2019',
        },
        two: {
          title: 'Photography',
          type: 'The One Academy College Project',
          year: '2018',
        },
        three: {
          title: 'Branding, UI/UX',
          type: 'Freelance',
          year: '2020',
        },
        four: {
          title: 'Branding, UI/UX',
          type: 'Freelance',
          year: '2020',
        },
        five: {
          title: 'Motion Graphics',
          type: 'Freelance',
          year: '2020',
        },
      },
      thumbnail: {
        one: 'jtc1_700.jpg',
        two: 'tremors1_700.jpg',
        three: 'eyureka.jpg',
        four: 'munlite.png',
        five: 'belladonna.png',
      },
      isInactive: false,
      userActivityThrottlerTimeout: null,
      userActivityTimeout: null,
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
    },
  },
};

</script>

<style lang="scss" scoped>
.noScroll {
  overflow: hidden;
}

.nextBlock {
  align-items: flex-start;
  padding: 5% 0;
}

.horizontalScroll {
  display: flex;
  flex-direction: row;
  height: 60vh;
  width: 100vw;
  overflow-y: scroll;
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
  background-image: url('/assets/USS.png');
}

#description {
  position: relative;
  left: 5%;
  width: 30%;
}

#overlay {
  z-index: 10;
  position: absolute;
  background-color: rgba(255,255,255,0.5);
  width: 100vw;
  height: 100vh;
}
</style>
