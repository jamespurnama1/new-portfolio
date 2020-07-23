<template>
  <div>
    <lottie :options="defaultOptions"
    v-on:animCreated="handleAnimation"/>
        <!-- <div>
            <p>Speed: x{{animationSpeed}}</p>
            <input type="range" value="1" min="0" max="3" step="0.5"
                   v-on:change="onSpeedChange" v-model="animationSpeed">
        </div>
        <button v-on:click="stop">stop</button>
        <button v-on:click="pause">pause</button>
        <button v-on:click="play">play</button> -->
  </div>
</template>

<script>
import Lottie from 'vue-lottie';
import animationData from '../assets/countdown.json';

export default {
  name: 'Communicate',
  components: {
    lottie: Lottie,
  },
  data() {
    return {
      defaultOptions: { animationData },
      animationSpeed: 1,
    };
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim;
    },
    stop() {
      this.anim.stop();
    },
    play() {
      this.anim.play();
    },
    pause() {
      this.anim.pause();
    },
    onSpeedChange() {
      this.anim.setSpeed(this.animationSpeed);
    },
  },
};
</script>

<style scoped lang="scss">
  lottie {
    width: 75%;
  }
</style>
