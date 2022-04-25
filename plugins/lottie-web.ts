import lottie from 'lottie-web'

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      injected: () => lottie
    }
  }
})
