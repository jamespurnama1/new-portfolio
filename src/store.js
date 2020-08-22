import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    showNavbar: true,
    scrolling: false,
  },
  mutations: {
    showNavbar: (state) => {
      state.showNavbar = true;
      return state.showNavbar;
    },
    hideNavbar: (state) => {
      state.showNavbar = false;
      return state.showNavbar;
    },
    scrolling: (state) => {
      state.scrolling = true;
      return state.scrolling;
    },
    notScrolling: (state) => {
      state.scrolling = false;
      return state.scrolling;
    },
  },
//   actions: {
//     toggleNavbar({ commit }) {
//       commit('toggleNavbar');
//     },
// },
});
