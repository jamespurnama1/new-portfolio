import lottie from 'lottie-web'

// makes lottie api available from this.$lottie in a nuxt application
// export default ({ _app }, inject) => {
//   inject('lottie', lottie)
// }

export default defineNuxtPlugin(() => {
  // nuxtApp.provide('lottie', () => lottie)

  // You can alternatively use this format, which comes with automatic type support
  return {
    provide: {
      lottie,
    },
  }
})
