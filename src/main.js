import VueFullPage from 'vue-fullpage.js';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Buefy from 'buefy';
import VueFeather from 'vue-feather';
import VueAspectRatio from 'vue-aspect-ratio';
import IdleVue from 'idle-vue';
import VueScrollTo from 'vue-scrollto';
// import { gsap, ScrollTrigger } from 'gsap';
import Landing from './Landing.vue';
import App from './App.vue';
import Discover from './pages/Discover.vue';
import About from './pages/About.vue';
import Principles from './pages/Principles.vue';

Vue.use(Vuex);
const eventsHub = new Vue();
const store = new Vuex.Store({
  state: {
    showNavbar: true,
  },
  mutations: {
    toggleNavbar: (state) => {
      state.showNavbar = !state.showNavbar;
      return state.showNavbar;
    },
  },
});
// window.gsap = gsap;
// Vue.use(gsap);
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

const routes = [
  { path: '/', component: Landing },
  { path: '/about', component: About },
  { path: '/discover', component: Discover },
  { path: '/principles', component: Principles },
  { path: '/interactivity', component: Principles },
  { path: '/motion', component: Principles },
  { path: '/branding', component: Principles },
  { path: '/photography', component: Principles },
  { path: '/works', component: Principles },
];

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
