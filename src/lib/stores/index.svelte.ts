import { gsap } from 'gsap';

let load = $state(0);
let animatedLoad = $state({
	percent: 0
});
let loaded = $state(false);
let tl = gsap.timeline({paused: false});
export const loadStore = {
	get load() {
		return animatedLoad.percent;
	},
	get realLoad() {
		return load;
	},
	set load(newValue) {
		load = Math.abs(newValue);
    tl.clear();
		tl.to(animatedLoad, {
			percent: load,
			duration: (load - animatedLoad.percent) / 50,
		});
	},
	get loaded() {
		return loaded;
	},
	set loaded(val: boolean) {
		loaded = val;
	}
};

let projectsLength = $state(0);

export const projectsStore = {
	get projectsLength(): number {
		return projectsLength;
	},
	set projectsLength(newVal: number) {
		projectsLength = newVal;
	}
};

let inertiaIndex = $state(0);

export const countStore = {
	set activeIndex(bool: boolean) {
		const y = bool ? 1 : -1;
		inertiaIndex = Math.abs(Math.max(Math.min(inertiaIndex + y, projectsLength - 1), 0));
	},
	set inertiaIndex(num: number) {
		inertiaIndex = num;
	},
	get inertiaIndex(): number {
		return inertiaIndex;
	}
};

let isAnimating = $state(false);
// let categories: string[] = $state([]);
let currentCat = $state(['Highlights', 0]);
// let catItems: Landing[] = $state([]);

export const homeStore = {
	// get categories(): string[] {
	//   // checkData();
	//   return categories;
	// },
	// get catItems() {
	//   // checkData();
	//   return catItems;
	// },
	get isAnimating(): boolean {
		return isAnimating;
	},
	set isAnimating(val: boolean) {
		isAnimating = val;
	},
	// get categoriesLength(): number[] {
	//   // checkData();
	//   const length: number[] = []
	//   catItems.forEach(cat => {
	//     const consecutive = length.length ? length[length.length - 1] : 0
	//     length.push(consecutive + cat.items!.length)
	//   })
	//   return length;
	// },
	set currentCat(val: (string | number)[]) {
		if (val[0]) currentCat = val;
	},
	get currentCat(): (string | number)[] {
		return currentCat;
	}
};

let cursor = $state('');

export const cursorStore = {
	get cursorState(): string {
		return cursor;
	},
	set cursorState(newVal: '' | 'link' | 'scroll') {
		cursor = newVal;
	}
};

let scroll = $state(0);
let offset = $state(0);
let overScroll = $state(0);

export const scrollStore = {
	get scroll(): number {
		return scroll + offset;
	},
	set scroll(newVal: number) {
		scroll = newVal;
	},
	get offset(): number {
		return offset;
	},
	set offset(newVal: number) {
		offset = newVal;
	},
	get overScroll(): number {
		return overScroll;
	},
	set overScroll(newVal: number) {
		overScroll = newVal;
	}
};

let inactive = $state(false);

export const activityStore = {
	get inactive(): boolean {
		return inactive;
	},
	set inactive(newVal: boolean) {
		inactive = newVal;
	}
}
