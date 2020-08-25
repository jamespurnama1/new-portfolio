<template>
  <div class='section'>
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
    <slot />
    <lottie-player class='lottie'
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
  methods: {
  },
};
</script>

<style scoped lang="scss">
.lottie {
  width: 30%;
}
</style>
