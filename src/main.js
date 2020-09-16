import Vue from 'vue';
import VueFullPage from 'vue-fullpage.js';
import VueRouter from 'vue-router';
import Buefy from 'buefy';
import VueFeather from 'vue-feather';
import VueAspectRatio from 'vue-aspect-ratio';
import IdleVue from 'idle-vue';
import VueScrollTo from 'vue-scrollto';
import store from './store';
import App from './App.vue';
import routes from './routes';

const eventsHub = new Vue();
Vue.use(Buefy);
Vue.use(VueScrollTo);
Vue.use(VueRouter);
Vue.use(VueFeather);
Vue.use(VueFullPage);
Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 3000,
  startAtIdle: false,
  events: [
    'scroll',
    'mousemove',
    'keydown',
    'mousedown',
    'touchstart',
  ],
});
Vue.component('vue-aspect-ratio', VueAspectRatio);
Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes,
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    });
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
