import type { Data, Landing, Post, SanityReference } from '$lib/types'
import { sanityLoad } from '$lib/utils/sanityClient'
import gsap from 'gsap'

let load = $state(0)
let animatedLoad = $state({
  percent: 0
})
let loaded = $state(false)

export const loadStore = {
  get load() { return animatedLoad.percent },
  get realLoad() { return load },
  set load(newValue) {
    load = Math.abs(newValue)

		gsap.to(animatedLoad, {
			percent: load,
			duration: (load - animatedLoad.percent)/50,
		});
  },
  get loaded() { return loaded },
  set loaded(val: boolean) { loaded = val }
}

let projects = $state([]) as Post[]
let requested = false;

async function checkData() {
  if (projects.length || requested) return;
  requested = true;
  const data = await sanityLoad() as Data
  if (data && data.category && data.post) {
    categories = data.category.sort((a, b) => a.index - b.index).map(x => x.title as string)
    catItems = data.category.sort((a, b) => a.index - b.index)
    const arr = [] as Post[]
    catItems.forEach(cat => {
      const items: Post[] = []
      cat.items!.forEach(ref => {
        items.push(...data.post.filter(project => project._id === (ref as SanityReference<Post>)._ref));
      });
      cat.items = items
      arr.push(...items)
    })
    projects = arr
    load += 10;
  } else {

  }
}

export const projectsStore = {
    get projects() { 
      return (async () => {
      try {
        if (!projects.length || !requested) await checkData()
        // return await this.valuePromise();
      } catch(e) {
      } finally {
        return projects;
      }
    })();
    },
    get projectsLength() {
      // checkData();
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
    // checkData();
    return categories;
  },
  get catItems() {
    // checkData();
    return catItems;
  },
  get isAnimating(): boolean { return isAnimating },
  set isAnimating(val: boolean) { isAnimating = val },
  get categoriesLength(): number[] {
    // checkData();
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

let cursor = $state('')

export const cursorStore = {
  get cursorState(): string {
    return cursor
  },
  set cursorState(newVal: '' | 'link' | 'scroll') {
    cursor = newVal;
  }
}
