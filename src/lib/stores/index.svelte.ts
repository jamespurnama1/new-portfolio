import { gsap } from 'gsap';

let load = $state(0);
let animatedLoad = $state({
	percent: 0
});
let loaded = $state(false);
let tl = gsap.timeline({ paused: false });
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
			duration: (load - animatedLoad.percent) / 50
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
	get activeIndex(): number {
		return Math.round(inertiaIndex);
	},
	set inertiaIndex(num: number) {
		inertiaIndex = Math.max(0, Math.min(num, projectsLength - 1));
	},
	get inertiaIndex(): number {
		return inertiaIndex;
	}
};

let isAnimating = $state(false);
let isTransitioning = $state(false);
let currentCat = $state(['Highlights', 0]);

export const animationStore = {
	get isAnimating(): boolean {
		return isAnimating;
	},
	set isAnimating(val: boolean) {
		isAnimating = val;
	},
	get isTransitioning(): boolean {
		return isTransitioning;
	},
	set isTransitioning(val: boolean) {
		isTransitioning = val;
	},
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
			// gsap.to(scrollStore, {
			// 	overScroll: 0,
			// 	delay: 1,
			// 	duration: 0.5,
			// 	ease: 'power4.out'
			// });
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
};

let opened = $state(false);
let message = $state('Hello');
let sub = $state('Nice');
export const notificationStore = {
	get opened(): boolean {
		return opened;
	},
	set opened(newVal: boolean) {
		opened = newVal;
	},
	get message(): string {
		return message;
	},
	set message(newVal: string) {
		message = newVal;
	},
	get sub(): string {
		return sub;
	},
	set sub(newVal: string) {
		sub = newVal;
	}
};

let count = $state(0);
let total = $state(5);
export const easterEggStore = {
	get count(): number {
		return count;
	},
	set count(newVal: number) {
		count = newVal;
	},
	get total(): number {
		return total;
	},
	set total(newVal: number) {
		total = newVal;
	}
};
