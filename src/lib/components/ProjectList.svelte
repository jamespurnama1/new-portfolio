<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import { type Post, type SanityReference } from '$lib/types';
	import { page } from '$app/stores';
	import { optionsStore } from '$lib/stores/options.svelte';
	import { onMount, tick, untrack } from 'svelte';
	import ListItem from './ListItem.svelte';
	import { countStore, gptStore } from '$lib/stores/index.svelte';

	const { data }: { data: Required<PageData> } = $props();
	let projectList = $state() as HTMLUListElement;
	let list = $state([]) as Array<{ content: string; catIndex: number } | Post>;
	const posts = $state([]) as Array<Post>;
	const activeIndex = $derived(
		posts[countStore.activeIndex]
			? (posts[countStore.activeIndex].catIndex as number)
			: countStore.activeIndex
	);
	let sel = $state() as HTMLLIElement;
	let selHeight = $state(44);
	// let selHeight = $derived(sel ? sel.getBoundingClientRect().height : 44);

	onMount(() => {
		data.catItems.forEach((category, catIndex) => {
			list.push({ content: `> ${category.title} >`, catIndex: catIndex });
			category.items.forEach((item: Post | SanityReference<Post>, postIndex: number): void => {
				(item as Post).index = catIndex
					? data.categoriesLength[catIndex - 1] + postIndex
					: postIndex;
				(item as Post).catIndex = catIndex;
				list.push(item as Post);
				posts.push(item as Post);
			});
		});

		list.forEach((item, index) => {
			item.catIndex = index;
			if (typeof item.content !== 'string') {
				const post = posts.find((x) => x.slug.current === (item as Post).slug.current);
				post!.catIndex = index;
			}
		});
	});

	$effect(() => {
		sel;
		countStore.inertiaIndex;
		untrack(() => {
			sel = document.querySelector('.selected') as HTMLLIElement;
			if (!sel) return;
			setTimeout(() => {
				selHeight = sel ? sel.getBoundingClientRect().height : 44;
			}, 200);
		});
	});

	// {animationStore.isTransitioning ? 'translate-x-1/2': ''}
</script>

<ul
	bind:this={projectList}
	class="absolute h-full w-[45%] right-0 text-white font-mono ml-auto transition-all duration-1000 mix-blend-difference flex items-center justify-center flex-col"
	class:opacity-0={optionsStore.options.fullscreen || gptStore.opened}
	class:slug={$page.params.slug}
>
	{#if posts}
		{#each list as item, index}
			<ListItem
				{index}
				{item}
				{selHeight}
				{activeIndex}
				active={typeof item.content !== 'string' && (item as Post).index === countStore.activeIndex}
			></ListItem>
		{/each}
	{/if}
</ul>

<style lang="postcss" scoped>
	.slug {
		@apply -translate-x-[20%] w-[28%];
	}

	ul {
		mask-image: linear-gradient(
			0deg,
			rgba(0, 0, 0, 0) 5%,
			rgba(0, 0, 0, 1) 25%,
			rgba(0, 0, 0, 1) 75%,
			rgba(0, 0, 0, 0) 95%
		);
	}
</style>
