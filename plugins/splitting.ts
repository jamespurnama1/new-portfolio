import Splitting from 'splitting'
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      injected: () => Splitting
    }
  }
})
