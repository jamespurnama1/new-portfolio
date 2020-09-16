export default {
  data() {
    return {
      counter: 0,
      smooth: 0,
    };
  },
  methods: {
    animateValue(start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        this.smooth = Math.floor(progress * (end - start) + start);
        this.$store.commit('updateProgress', this.smooth);
        // console.log(progress, end, start, this.smooth);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    },
    imageProgress(instance, image) {
      if (image.isLoaded) {
        this.counter += 1;
      }
      const maxImg = document.querySelectorAll('img').length;
      if (maxImg > 0) {
        const prgrs = Math.round((this.counter / maxImg) * 100);
        console.log(prgrs, maxImg, image.img.src);
        this.animateValue(this.smooth, prgrs, 1000);
      }
    },
    mounted() {
    },
  },
};
