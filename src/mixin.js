import { gsap, ScrollTrigger } from 'gsap/all';

export default {
  data() {
    return {
      tl: gsap.timeline(),
      tl2: gsap.timeline(),
      lastScrollPosition: 0,
      showScrollToTop: false,
      progress: 0,
      isScrolling: ScrollTrigger.isScrolling(),
    };
  },
  watch: {
    isScrolling: () => {
      console.log('value changed!');
      if (ScrollTrigger.isScrolling()) { // simplified onScrollStop
        this.tl.pause();
        console.log('isScrolling');
      } else {
        this.tl.progress(this.progress);
        this.tl.play();
        console.log('is not Scrolling');
      }
    },
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
    },
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    this.tl.to('.long h1:first-child', {
      x: '-=10em',
      repeat: -1,
      duration: 50,
      ease: 'none',
    });
    this.tl.to('.long h1:last-child', {
      x: '+=10em',
      repeat: -1,
      duration: 50,
      ease: 'none',
    });
    this.tl2.to('.long h1:first-child', {
      x: '-=10em',
      duration: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.long',
        start: 'top top',
        onUpdate: (self) => {
          console.log('progress:', self.progress.toFixed(3));
          this.progress = self.progress;
        },
        scrub: true,
        markers: true,
      },
      delay: 1,
    });
    this.tl2.to('.long h1:last-child', {
      x: '+=10em',
      ease: 'none',
      scrollTrigger: {
        trigger: '.long',
        start: 'top top',
        onUpdate: (self) => {
          console.log('progress:', self.progress.toFixed(3));
          this.progress = self.progress;
        },
        scrub: true,
        markers: true,
      },
      delay: 1,
    });
  },
  created() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
};
