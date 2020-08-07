<template>
  <div id="landing">
    <block id='first'>
      <h1>james<br>&#9;henry</h1>
      <div id='description'>
        <p>Meet your multi-talented graphic designer based in Malaysia.
          I’m best at branding,  UI/UX, Front-end Development, and a whole lot more.</p>
        <button>view video reel</button>
      </div>
    </block>
    <block>
    </block>
    <video loop muted :src='video' />
  </div>
</template>

<script>
require('./assets/sagoo6.mp4');

export default {
  name: 'JamesHenry',
  components: {
  },
  data() {
    return {
      video: './assets/sagoo6.mp4',
    };
  },
  methods: {
  },
  mounted() {
  },
};

</script>

<style lang="scss" scoped>
 block {
   display: flex;
   justify-content: center;
   align-items: flex-end;
   padding: 10%;
   flex-wrap: wrap;
   height: 100vh;
 }

#first {
  background-image: url('/assets/USS.png');
}

 #description {
   position: relative;
   left: 5%;
   width: 30%;
 }
</style>
