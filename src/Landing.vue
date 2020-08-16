<template>
  <div id="landing">
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
        <button @click='overlayVideo=true'>view video reel</button>
        <video class='bg' loop muted :src='video' />
      </div>
    </div>
    <div class='center'>
      <p class='clickable' @click='nextBlock(0)'>
        Scroll down to discover more
      </p>
    </div>
    <div class='block nextBlock'>
      <h1>featured works</h1>
    </div>
    <div class='center'>
      <p class='clickable' @click='nextBlock(1)'>
        Scroll down to discover more
      </p>
    </div>
    <div id='discoveries' style='height: 100vh' class='block nextBlock'>
      <h1>explore my discoveries</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JamesHenry',
  components: {
  },
  data() {
    return {
      overlayVideo: false,
      video: '',
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
  },
  mounted() {
  },
};

</script>

<style lang="scss" scoped>
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
  padding-top: 0;
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
