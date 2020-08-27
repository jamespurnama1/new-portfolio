import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    showNavbar: true,
    scrolling: false,
    lastScrollPostition: 0,
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
    lastScroll: (state, data) => {
      state.lastScrollPostition = data;
      return state.lastScrollPostition;
    },
  },
  // actions: {
  //   lastScrollPostition({ commit }, data) {
  //     commit('lastScroll', data);
  //   },
  // },
});
