import VueFullPage from 'vue-fullpage.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy';
import VueFeather from 'vue-feather';
import Landing from './Landing.vue';
import App from './App.vue';
import Discover from './pages/Discover.vue';
import About from './pages/About.vue';
import Principles from './pages/Principles.vue';

// window.gsap = gsap;
// Vue.use(gsap);
Vue.use(Buefy);
Vue.use(VueRouter);
Vue.use(VueFeather);
Vue.use(VueFullPage);
Vue.config.productionTip = false;

const routes = [
  { path: '/', component: Landing },
  { path: '/about', component: About },
  { path: '/discover', component: Discover },
  { path: '/principles', component: Principles },
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
