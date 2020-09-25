import { createRouter, createWebHistory } from 'vue-router';

const Discover = () => import('./pages/Discover.vue');
const About = () => import('./pages/About.vue');
const Principles = () => import('./pages/Principles.vue');
const Works = () => import('./pages/Works.vue');
const worksFront = () => import('./pages/works_front.vue');
const Landing = () => import('./Landing.vue');
const notFound = () => import('./pages/notFound.vue');

const routes = [
  {
    path: '/',
    component: Landing,
    // beforeEnter() {
    //   loadImage();
    // },
  },
  { path: '/about', component: About },
  { path: '/discover', component: Discover },
  { path: '/principles', component: Principles },
  {
    name: 'planet',
    path: '/planet/:id',
    component: Works,
    props: true,
  },
  {
    name: 'works',
    path: '/works/:id',
    component: worksFront,
    props: true,
  },
  // { path: '/works/tremors', component: worksFront, props: { work: 'tremors' } },
  // { path: '/works/eyureka', component: worksFront, props: { work: 'eyureka' } },
  // { path: '/works/munlite', component: worksFront, props: { work: 'munlite' } },
  // {
  //   path: '/works/belladonna',
  //   component: worksFront,
  //   props: { work: 'belladonna' },
  // },
  // { path: '/works/sunses', component: worksFront, props: { work: 'sunses' } },
  // { path: '/works/bauhaus', component: worksFront, props: { work: 'bauhaus' } },
  // { path: '/works/sagoo', component: worksFront, props: { work: 'sagoo' } },
  // { path: '/works/savis', component: worksFront, props: { work: 'savis' } },
  // { path: '/works/epic', component: worksFront, props: { work: 'epic' } },
  // { path: '/works/accha', component: worksFront, props: { work: 'accha' } },
  // { path: '/works/tawa', component: worksFront, props: { work: 'tawa' } },
  { name: '404', path: '/404', component: notFound },
  { path: '/*', redirect: '/404' },
];

export default createRouter({
  history: createWebHistory(),
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

// function loadImage(imagesObject) {
//   Object.keys(imagesObject).map((key) => {
//     const img = new Image();
//     img.src = imagesObject[key];
//   });
// }
