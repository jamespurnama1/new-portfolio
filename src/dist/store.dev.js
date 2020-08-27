"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  namespaced: true,
  state: {
    showNavbar: true,
    scrolling: false,
    lastScrollPostition: 0
  },
  mutations: {
    showNavbar: function showNavbar(state) {
      state.showNavbar = true;
      return state.showNavbar;
    },
    hideNavbar: function hideNavbar(state) {
      state.showNavbar = false;
      return state.showNavbar;
    },
    scrolling: function scrolling(state) {
      state.scrolling = true;
      return state.scrolling;
    },
    notScrolling: function notScrolling(state) {
      state.scrolling = false;
      return state.scrolling;
    },
    lastScroll: function lastScroll(state, data) {
      state.lastScrollPostition = data;
      return state.lastScrollPostition;
    }
  } // actions: {
  //   lastScrollPostition({ commit }, data) {
  //     commit('lastScroll', data);
  //   },
  // },

});

exports["default"] = _default;