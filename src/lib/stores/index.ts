import { writable,get } from 'svelte/store';

export const store = writable({
  load: 0,
  activeIndex: 0,
  projects: [
    {
      title: "Tremors",
      url: "https://imgix.cosmicjs.com/cb401640-f91f-11ec-b2b1-473235369c53-Artboard-1-copy-80.jpg"
    },
    {
      title: "Tremors",
      url: "https://imgix.cosmicjs.com/cb401640-f91f-11ec-b2b1-473235369c53-Artboard-1-copy-80.jpg"
    },
    {
      title: "Tremors",
      url: "https://imgix.cosmicjs.com/cb401640-f91f-11ec-b2b1-473235369c53-Artboard-1-copy-80.jpg"
    },
    {
      title: "Tremors",
      url: "https://imgix.cosmicjs.com/cb401640-f91f-11ec-b2b1-473235369c53-Artboard-1-copy-80.jpg"
    },
  ]
})
