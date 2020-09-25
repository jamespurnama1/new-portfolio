<template>
  <button class='center' @click="scrollToTop()"
  v-show="this.$store.state.showScrollToTop">
    <!-- <feather type="arrow-up" stroke='#575F6B' :size="27" /> -->
  </button>
</template>

<script>
export default {
  name: 'scrollTop',
  methods: {
    scrollToTop() {
      if (this.$route.path !== '/principles') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        fullpage_api.moveTo(1, 0); // eslint-disable-line
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  position: fixed;
  width: 70px;
  height: 70px;
  bottom: 5%;
  left: 5%;
  z-index: 5;
  background-image: linear-gradient(45deg, #F2F3F6, #D8D9DA);
  border-radius: 50%;
  box-shadow: 3px 3px 20px 0px rgba(36,65,93,0.3), -4px -4px 20px 0px #FFFFFF;
}
</style>
