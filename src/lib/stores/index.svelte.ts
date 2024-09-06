import type { Data, Landing, Post, SanityReference } from '$lib/types'
import { sanityLoad } from '$lib/utils/sanityClient'

let load = $state(0)
let loaded = $state(false)

export const loadStore = {
  get load() { return load },
  set load(newValue) {
    load = Math.abs(newValue)
  },
  get loaded() { return loaded },
  set loaded(val: boolean) { loaded = val }
}

let projects = $state([]) as Post[]

async function checkData() {
  if (Object.keys(projects).length) return;

  const data = await sanityLoad() as Data
  if (data) {
    if (data.post) projects = data.post
    if (data.category) {
      categories = data.category.map(x => x.title as string)
      catItems = data.category
        catItems.forEach(cat => {
          const items: Post[] = []
          cat.items!.forEach(ref => {
          items.push(...projects.filter(project => project._id === (ref as SanityReference<Post>)._ref));
      });
      cat.items = items
  })
    }
  } else {

  }
}

export const projectsStore = {
    get projects() { 
      checkData();
      return projects
    },
    // get projectsArr() {
    //   checkData();
    //   const arr: Post[] = []
    //   catItems.forEach(cat => {
    //     arr.push(...cat.items)
    //   }
    //   return arr;
    // },
    get projectsLength() {
      checkData();
      return projects.length
    }
}

let inertiaIndex = $state(0)

export const countStore = {
  set activeIndex(bool: boolean) {
    const y = bool ? 1 : -1;
    inertiaIndex = Math.max(Math.min(inertiaIndex + y, projectsStore.projectsLength - 1), 0)
  },
  set inertiaIndex(num: number) {
    inertiaIndex = num
  },
  get inertiaIndex(): number { return inertiaIndex }
}

let isAnimating = $state(false);
let categories: string[] = $state([])
let currentCat = $state(['Highlights', 0])
let catItems: Landing[] = $state([])

export const homeStore = {
  get categories(): string[] {
    checkData();
    return categories;
  },
  get catItems() {
    checkData();
    return catItems;
  },
  get isAnimating(): boolean { return isAnimating },
  set isAnimating(val: boolean) { isAnimating = val },
  get categoriesLength(): number[] {
    checkData();
    const length: number[] = []
    catItems.forEach(cat => {
      const consecutive = length.length ? length[length.length - 1] : 0
      length.push(consecutive + cat.items!.length)
    })
    return length;
  },
  set currentCat(val: (string | number)[]) {
    if (val[0]) currentCat = val;
  },
  get currentCat(): (string| number)[] { return currentCat }
}
