import * as THREE from 'three';
import { countStore, projectsStore, scrollStore } from '$lib/stores/index.svelte';

type size = {
	width: number;
	height: number;
};

export const centerPos = (index: number) => {
	return {
		x: 0,
		y: 0,
		z: 0.6 * (index - 1),
		scale: 2,
		opacity: 1
	};
};

export const homePos = (index: number, imageGeo: THREE.PlaneGeometry, size: size) => {
	return {
		// center minus 10% of width
		x: imageGeo.parameters.width * ((countStore.inertiaIndex - index - 1) * 0.1) - size.width * 0.1,
		// 0.1 modifer + card height 0.05 modifier
		y:
			imageGeo.parameters.height * ((countStore.inertiaIndex - index - 1) * 0.1) +
			imageGeo.parameters.height * 0.05,
		z: 0.6 * (countStore.inertiaIndex - index - 1) - 10,
		scale: (1 + (countStore.inertiaIndex - index - 1) / projectsStore.projectsLength) * 0.5,
		opacity: Math.min(Math.max(0, index + 1 - countStore.inertiaIndex), 1)
	};
};

export const enlarged = (
	index: number,
	delay = (Math.max(index / projectsStore.projectsLength) - 0.1, 0)
) => {
	return {
		x: 0,
		y: 0,
		z: 0.6 * (index - 1),
		delay,
		scale: 0.8,
		opacity: 1
	};
};

export const fullscreen = (index: number) => {
	return {
		x: 0,
		y: 0,
		z: 0.6 * (index - 1),
		scale: 1,
		opacity: 1
	};
};

export const projectPage = (
	index: number,
	imageGeo: THREE.PlaneGeometry,
	size: size,
	works: boolean
) => {
	const scale = 0.6;
	const scroll = Math.round(scrollStore.scroll);
	const countIndex = countStore.inertiaIndex;
	const over = (Math.log10(scrollStore.overScroll / 100) + 1.5) * 100;
	const overcompute = scrollStore.overScroll < 10 ? 0 : over;
	let x, y, opacity;
	if (works && index % 2 === 0) {
		x = size.width / 2 - (imageGeo.parameters.width * scale) / 2 - 16;
	} else {
		x = -size.width / 2 + (imageGeo.parameters.width * scale) / 2 + 16;
	}
	y = works ? scroll - ((index + 1) * size.height - overcompute) : scroll;
	opacity = works ? 1 : countIndex === index ? 1 : 0;
	return {
		// move left + offset image width origin + margin
		x,
		// if works child images, offset by viewport height. Starts at index = 2
		y,
		z: -0.6,
		scale,
		opacity
	};
};
