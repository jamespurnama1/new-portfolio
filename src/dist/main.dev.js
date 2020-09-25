const _vue = _interopRequireDefault(require('vue'));

const _vueFullpage = _interopRequireDefault(require('vue-fullpage.js'));

const _vueRouter = _interopRequireDefault(require('vue-router'));

const _buefy = _interopRequireDefault(require('buefy'));

const _vueFeather = _interopRequireDefault(require('vue-feather'));

const _vueAspectRatio = _interopRequireDefault(require('vue-aspect-ratio'));

const _idleVue = _interopRequireDefault(require('idle-vue'));

const _vueScrollto = _interopRequireDefault(require('vue-scrollto'));

const _store = _interopRequireDefault(require('./store'));

const _Landing = _interopRequireDefault(require('./Landing.vue'));

const _App = _interopRequireDefault(require('./App.vue'));

const _Discover = _interopRequireDefault(require('./pages/Discover.vue'));

const _About = _interopRequireDefault(require('./pages/About.vue'));

const _Principles = _interopRequireDefault(require('./pages/Principles.vue'));

const _Works = _interopRequireDefault(require('./pages/Works.vue'));

const _works_front = _interopRequireDefault(require('./pages/works_front.vue'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventsHub = new _vue.default();

_vue.default.use(_buefy.default);

_vue.default.use(_vueScrollto.default);

_vue.default.use(_vueRouter.default);

_vue.default.use(_vueFeather.default);

_vue.default.use(_vueFullpage.default);

_vue.default.use(_idleVue.default, {
  eventEmitter: eventsHub,
  store: _store.default,
  idleTime: 3000,
  startAtIdle: false,
  events: ['scroll', 'mousemove', 'keydown', 'mousedown', 'touchstart'],
});

_vue.default.component('vue-aspect-ratio', _vueAspectRatio.default);

_vue.default.config.productionTip = false;
const routes = [{
  path: '/',
  component: _Landing.default,
}, {
  path: '/about',
  component: _About.default,
}, {
  path: '/discover',
  component: _Discover.default,
}, {
  path: '/principles',
  component: _Principles.default,
}, {
  path: '/interactivity',
  component: _Works.default,
}, {
  path: '/motion',
  component: _Works.default,
}, {
  path: '/branding',
  component: _Works.default,
}, {
  path: '/photography',
  component: _Works.default,
}, {
  path: '/works',
  component: _Works.default,
}, {
  path: '/works/jtc',
  component: _works_front.default,
  props: {
    work: 'jtc',
  },
}, {
  path: '/works/tremors',
  component: _works_front.default,
  props: {
    work: 'tremors',
  },
}, {
  path: '/works/eyureka',
  component: _works_front.default,
  props: {
    work: 'eyureka',
  },
}, {
  path: '/works/munlite',
  component: _works_front.default,
  props: {
    work: 'munlite',
  },
}, {
  path: '/works/belladonna',
  component: _works_front.default,
  props: {
    work: 'belladonna',
  },
}, {
  path: '/works/sunses',
  component: _works_front.default,
  props: {
    work: 'sunses',
  },
}, {
  path: '/works/bauhaus',
  component: _works_front.default,
  props: {
    work: 'bauhaus',
  },
}, {
  path: '/works/sagoo',
  component: _works_front.default,
  props: {
    work: 'sagoo',
  },
}, {
  path: '/works/savis',
  component: _works_front.default,
  props: {
    work: 'savis',
  },
}, {
  path: '/works/epic',
  component: _works_front.default,
  props: {
    work: 'epic',
  },
}, {
  path: '/works/accha',
  component: _works_front.default,
  props: {
    work: 'accha',
  },
}, {
  path: '/works/tawa',
  component: _works_front.default,
  props: {
    work: 'tawa',
  },
}];
const router = new _vueRouter.default({
  mode: 'history',
  base: __dirname,
  routes,
});
new _vue.default({
  router,
  store: _store.default,
  render: function render(h) {
    return h(_App.default);
  },
}).$mount('#app');
