<template>
  <div class='section'>
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
    <p>{{ anim }}</p>
    <lottie-player v-if='!anim' class='lottie'
    ref='waveLottie'
    :src=anim
    hover='true' />
  </div>
</template>

<script>
import '@lottiefiles/lottie-player';

export default {
  name: 'Philosophies',
  props: {
    title: String,
    subtitle: String,
    anim: String,
  },
  components: {
  },
  data() {
    return {
    };
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.lottie {
  width: 30%;
}
</style>
