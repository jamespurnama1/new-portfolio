<template>
  <div>
    <lottie-player id='lottie' ref='firstLottie' src='/Familiar.json' hover='true' />
  </div>
</template>

<script>
import '@lottiefiles/lottie-player';
// import { create } from '@lottiefiles/lottie-interactivity';

export default {
  name: 'Communicate',
  // mounted() {
  //   this.$refs.firstLottie.addEventListener('load', function () { // eslint-disable-line
  //     create({
  //       player: '#lottie',
  //       mode: 'cursor',
  //       actions: [
  //         {
  //           position: { x: [0, 1], y: [0, 1] },
  //           type: 'loop',
  //           frames: [0, 225],
  //         },
  //         {
  //           position: { x: -1, y: -1 },
  //           type: 'stop',
  //           frames: [0],
  //         },
  //       ],
  //     });
  //   });
  // },
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
#lottie {
  position: relative;
  left: 32%;
  width: 60%;
}
</style>
