<template>
  <div>
    <Nuxt />
    <client-only>
      <!-- <BG v-if="threeLoaded" /> -->
      <WebGL />
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'portfolio',
      threeLoaded: false,
    }
  },
  head() {
    return {
      title: this.title,
      // script: [
      //   {
      //     type: 'module',
      //     src: '/WebGL.js',
      //     callback: () => {
      //       this.threeLoaded = true
      //     },
      //   },
      // ],
    }
  },
}
</script>

<style lang="scss">
html {
  font-family: 'Founders Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  color: var(--color);
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  overflow: hidden;
  background-color: var(--bg);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
