/** @type {import('./$types').PageServerLoad} */
import { sanityLoad } from '$lib/utils/sanityClient';
import type { Data, Landing, Post, SanityReference } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load() {
	const projects: Post[] = [];
	let categoriesLength: number[] = [];
	let projectsLength: number;
	const data = (await sanityLoad()) as Data;

	// categories
	const categories = data.category.sort((a, b) => a.index - b.index).map((x) => x.title as string);

	// catItems
	const catItems = data.category.sort((a, b) => a.index - b.index);

	// Projects
	catItems.forEach((cat) => {
		const items: Array<SanityReference<Post> | Post> = [];
		cat.items.forEach((ref) => {
			items.push(
				...data.post.filter((project) => project._id === (ref as SanityReference<Post>)._ref)
			);
		});
		cat.items = items;
		projects.push(...items);
	});

	// categoriesLength
	catItems.forEach((cat) => {
		const consecutive = categoriesLength.length ? categoriesLength[categoriesLength.length - 1] : 0;
		categoriesLength.push(consecutive + cat.items!.length);
	});

	// projectsLength
	projectsLength = data.post.length;
	if (data) {
		return {
			projects,
			projectsLength,
			categories,
			catItems,
			categoriesLength
		};
	}
	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}
