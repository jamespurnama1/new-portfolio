import { createStore } from 'vuex';

export default createStore({
  namespaced: true,
  state: {
    showNavbar: true,
    scrolling: false,
    lastScrollPostition: 0,
    showScrollToTop: false,
    splash: false,
    progress: 0,
    overlayImg: '',
    overlay: false,
    scroll: false,
    renderSwitchSet: true,
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
    hideScrollToTop: (state) => {
      state.showScrollToTop = false;
      return state.showScrollToTop;
    },
    showScrollToTop: (state) => {
      state.showScrollToTop = true;
      return state.showScrollToTop;
    },
    lastScroll: (state, data) => {
      state.lastScrollPostition = data;
      return state.lastScrollPostition;
    },
    overlay(state, n) {
      state.overlayImg = n;
      return state.overlayImg;
    },
    closeOverlay(state) {
      state.overlay = false;
      return state.overlay;
    },
    openOverlay(state) {
      state.overlay = true;
      return state.overlay;
    },
    removeSplash(state) {
      state.splash = false;
      return state.splash;
    },
    updateProgress(state, n) {
      state.progress = n;
      return state.progress;
    },
    scrollPlease(state) {
      state.scroll = true;
      return state.scroll;
    },
    dontScrollPlease(state) {
      state.scroll = false;
      return state.scroll;
    },
    renderSwitch(state) {
      state.renderSwitchSet = !state;
      return state.renderSwitchSet;
    },
  },
});
