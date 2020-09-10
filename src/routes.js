import Discover from './pages/Discover.vue';
import About from './pages/About.vue';
import Principles from './pages/Principles.vue';
import allWorks from './pages/allWorks.vue';
import Works from './pages/Works.vue';
import worksFront from './pages/works_front.vue';
import Landing from './Landing.vue';

export default [
  { path: '/', component: Landing },
  { path: '/about', component: About },
  { path: '/discover', component: Discover },
  { path: '/principles', component: Principles },
  { path: '/interactivity', component: allWorks },
  {
    path: '/planet/:id',
    component: Works,
    props: {
      heading: 'all discoveries',
      desc: 'Every work, assignments, freelance, and side projects taught and made me discover something new.',
      id: 'works',
    },
  },
  { path: '/branding', component: allWorks },
  { path: '/photography', component: allWorks },
  { path: '/works', component: allWorks },
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
