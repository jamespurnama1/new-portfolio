import Vue from 'vue';
import VueFullPage from 'vue-fullpage.js';
import VueRouter from 'vue-router';
import Buefy from 'buefy';
import VueFeather from 'vue-feather';
import VueAspectRatio from 'vue-aspect-ratio';
import IdleVue from 'idle-vue';
import VueScrollTo from 'vue-scrollto';
import store from './store';
import Landing from './Landing.vue';
import App from './App.vue';
import Discover from './pages/Discover.vue';
import About from './pages/About.vue';
import Principles from './pages/Principles.vue';
import Works from './pages/Works.vue';
import worksFront from './pages/works_front.vue';

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

const routes = [
  { path: '/', component: Landing },
  { path: '/about', component: About },
  { path: '/discover', component: Discover },
  { path: '/principles', component: Principles },
  { path: '/interactivity', component: Works },
  { path: '/motion', component: Works },
  { path: '/branding', component: Works },
  { path: '/photography', component: Works },
  { path: '/works', component: Works },
  { path: '/works/jtc', component: worksFront, props: { work: 'jtc' } },
  { path: '/works/tremors', component: worksFront, props: { work: 'tremors' } },
  { path: '/works/eyureka', component: worksFront, props: { work: 'eyureka' } },
  { path: '/works/munlite', component: worksFront, props: { work: 'munlite' } },
  { path: '/works/belladonna', component: worksFront, props: { work: 'belladonna' } },
  { path: '/works/sunses', component: worksFront, props: { work: 'sunses' } },
  { path: '/works/bauhaus', component: worksFront, props: { work: 'bauhaus' } },
  { path: '/works/sagoo', component: worksFront, props: { work: 'sagoo' } },
  { path: '/works/savis', component: worksFront, props: { work: 'savis' } },
  { path: '/works/epic', component: worksFront, props: { work: 'epic' } },
  { path: '/works/accha', component: worksFront, props: { work: 'accha' } },
  { path: '/works/tawa', component: worksFront, props: { work: 'tawa' } },
];

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
