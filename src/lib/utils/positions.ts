import * as THREE from 'three';
import { countStore, projectsStore, scrollStore } from '$lib/stores/index.svelte';

type size = {
  width: number
  height: number
}

export const centerPos = (index: number) => {
	return {
		x: 0,
		y: 0,
		z: -0.6 * (index - 1),
		scale: 2,
		opacity: 0
	};
};

export const homePos = (
	index: number,
	imageGeo: THREE.PlaneGeometry,
	size: size
) => {
	return {
		x: imageGeo.parameters.width * ((countStore.inertiaIndex - index - 1) * 0.1) - size.width * 0.15,
		y:
			imageGeo.parameters.height * ((countStore.inertiaIndex - index - 1) * 0.1) + imageGeo.parameters.height * 0.05,
		z: 0.6 * (countStore.inertiaIndex - index - 1) - 10,
		scale: (1 + (countStore.inertiaIndex - index - 1) / projectsStore.projectsLength) * 0.5,
		opacity: Math.min(Math.max(0, index + 1 - countStore.inertiaIndex), 1)
	};
};


export const enlarged = (index: number) => {
	return {
		x: 0,
		y: 0,
		z: 0.6 * (index - 1),
		delay: index / projectsStore.projectsLength,
		scale: 0.8,
		opacity: 1
	};
};

export const fullscreen = (
	index: number,
	imageGeo: THREE.PlaneGeometry,
	size: size
) => {
	return {
		x: 0,
		y: (size.height - imageGeo.parameters.height) / 2,
		z: -0.6,
		scale: 1,
		opacity: countStore.inertiaIndex === index ? 1 : 0
	};
};

export const projectPage = (index: number, imageGeo: THREE.PlaneGeometry, size: size) => {
  const scale = 0.6
	return {
		// move left + offset image width origin + margin
		x: -size.width / 2 + (imageGeo.parameters.width * scale) / 2 + 16,
		y: scrollStore.scroll,
		z: -0.6,
		scale,
		opacity: countStore.inertiaIndex === index ? 1 : 0
	};
};
