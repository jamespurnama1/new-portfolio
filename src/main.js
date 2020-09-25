import { createApp } from 'vue';
import VueFullPage from 'vue-fullpage.js';
// import Buefy from 'buefy';
// import VueFeather from 'vue-feather';
import VueMasonry from 'vue-masonry-css';
// import VueAspectRatio from 'vue-aspect-ratio';
// import IdleVue from 'idle-vue';
// import VueScrollTo from 'vue-scrollto';
import store from './store';
import App from './App.vue';
import router from './routes';

const app = createApp(App)
  .use(VueMasonry)
  .use(router)
  .use(store)
  .use(VueFullPage);

// Vue.use(Buefy);
// app.use(VueScrollTo);
// app.use(VueFeather);
// app.use(IdleVue, {
//   eventEmitter: app,
//   store,
//   idleTime: 3000,
//   startAtIdle: false,
//   events: [
//     'scroll',
//     'mousemove',
//     'keydown',
//     'mousedown',
//     'touchstart',
//   ],
// });

// app.component('vue-aspect-ratio', VueAspectRatio);
router.isReady().then(() => {
  app.mount('#app');
});
