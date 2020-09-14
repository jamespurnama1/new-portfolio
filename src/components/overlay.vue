<template>
  <div class="darken" @click="removeOverlay">
    <img v-if="$store.state.overlayImg" :src="getSrc" />
  </div>
</template>

<script>
export default {
  name: 'Overlay',
  mounted() {
    const body = document.querySelector('body');
    body.classList.add('noScroll');
  },
  methods: {
    removeOverlay() {
      this.$store.commit('closeOverlay');
      const body = document.querySelector('body');
      body.classList.remove('noScroll');
    },
  },
  computed: {
    getSrc() {
      if (this.$store.state.overlayImg) {
        try {
          const s = this.$store.state.overlayImg;
          return require(s); // eslint-disable-line
        } catch (e) {
          if (e.name !== 'ModuleNotFoundError') throw e;
          return require('@/assets/ISS.jpg'); // eslint-disable-line
        }
      }
      return require('@/assets/ISS.jpg'); // eslint-disable-line
    },
  },
};
</script>

<style lang="scss" scoped>
.darken {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
