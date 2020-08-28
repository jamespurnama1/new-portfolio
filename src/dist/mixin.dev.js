"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  data: function data() {
    return {
      lastScrollPosition: 0,
      progress: 0
    };
  },
  methods: {
    scrollToTop: function scrollToTop() {
      // eslint-disable-line
      console.log(document.getElementById('fullpage'));
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      document.getElementById('fullpage').api.silentMoveTo('0');
    },
    onScroll: function onScroll() {
      var _this = this;

      var currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

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
      var stoppedScrolling;
      window.clearTimeout(stoppedScrolling);
      stoppedScrolling = setTimeout(function () {
        _this.$store.commit('notScrolling');
      }, 2000);
      this.$store.commit('lastScroll', this.lastScrollPosition);
    }
  },
  created: function created() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
};
exports["default"] = _default;