export default {
  data() {
    return {
      lastScrollPosition: 0,
      showScrollToTop: false,
      progress: 0,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      if (currentScrollPosition < this.lastScrollPosition) {
        this.$store.commit('showNavbar');
      }
      if (currentScrollPosition > this.lastScrollPosition) {
        this.$store.commit('hideNavbar');
      }
      this.lastScrollPosition = currentScrollPosition;
      this.showScrollToTop = currentScrollPosition > 50;
      this.$store.commit('scrolling');
      let stoppedScrolling;
      window.clearTimeout(stoppedScrolling);
      stoppedScrolling = setTimeout(() => {
        this.$store.commit('notScrolling');
      }, 1000);
      // this.$refs.bgvideo.pause();
    },
  },
  created() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
};
