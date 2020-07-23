import VueFullPage from 'vue-fullpage.js';
import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';

// window.gsap = gsap;
// Vue.use(gsap);
Vue.use(Buefy);
Vue.use(VueFullPage);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
