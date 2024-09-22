export const prerender = true;

import { loadStore, projectsStore } from '$lib/stores/index.svelte';

export async function load({ data }) {

	projectsStore.projectsLength = data.projectsLength as number;

	loadStore.load = 10 + loadStore.realLoad;
	if (data) {
		return {
			...data
		};
	} else {
		return {
			status: 500,
			body: new Error('Internal Server Error')
		};
	}
}
