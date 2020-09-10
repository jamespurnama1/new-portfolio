export default {
  data() {
    return {
      lastScrollPosition: 0,
      progress: 0,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fullpage_api.moveTo(0); // eslint-disable-line
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
      if (currentScrollPosition > 50) {
        this.$store.commit('showScrollToTop');
      } else {
        this.$store.commit('hideScrollToTop');
      }
      this.$store.commit('scrolling');
      let stoppedScrolling;
      window.clearTimeout(stoppedScrolling);
      stoppedScrolling = setTimeout(() => {
        this.$store.commit('notScrolling');
      }, 2000);
      this.$store.commit('lastScroll', this.lastScrollPosition);
    },
  },
  created() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
};
