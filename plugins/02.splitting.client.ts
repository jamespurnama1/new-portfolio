import Splitting from 'splitting'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'

// export default ({ _app }, inject) => {
//   inject('Splitting', Splitting)
// }

export default defineNuxtPlugin(() => {
  // nuxtApp.provide('splitting', () => Splitting)

  return {
    provide: {
      Splitting,
    },
  }
})
