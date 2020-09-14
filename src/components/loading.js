export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    imageProgress(instance, image) {
      if (image.isLoaded) {
        this.counter += 1;
      }
      const maxImg = document.querySelectorAll('img').length - 1;
      const prgrs = `${Math.round((this.counter / maxImg) * 100)}%`;
      console.log(prgrs, maxImg, image.img.src);
      this.$store.commit('updateProgress', prgrs);
    },
  },
};
