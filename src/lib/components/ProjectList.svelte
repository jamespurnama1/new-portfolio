<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import Awards from '$lib/components/Awards.svelte';
	import { type Post } from '$lib/types';
	import { goto } from '$app/navigation';
	import { countStore, animationStore, loadStore } from '$lib/stores/index.svelte';
	import { page } from '$app/stores';
	import { optionsStore } from '$lib/stores/options.svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	const { data }: { data: Required<PageData> } = $props();
	let projectList = $state() as HTMLUListElement;
	let mounted = $state(false);
	const id = $derived(
		data.projects[countStore.inertiaIndex] ? data.projects[countStore.inertiaIndex]._id : null
	);
	const delay = $derived(loadStore.loaded ? 500 : 3000);

	const prevCatLength = (catIndex: number) => (catIndex ? data.categoriesLength[catIndex - 1] : 0);

	onMount(() => [(mounted = true)]);
	// {animationStore.isTransitioning ? 'translate-x-1/2': ''}
	const list = $derived();
</script>

<ul
	bind:this={projectList}
	class="absolute left-[60%] text-white font-mono ml-auto transition-all mix-blend-difference"
	class:opacity-0={optionsStore.options.fullscreen}
	class:slug={$page.params.slug}
>
	{#each data.catItems as category, catIndex}
		{#if !$page.params.slug && mounted}
			<li
				class="font-mono uppercase pt-5"
				class:animateText={category.title.toLowerCase() ===
					animationStore.currentCat[0].toString().toLowerCase() && animationStore.isAnimating}
				in:fly={{
					x: 200,
					duration: 500,
					easing: cubicInOut,
					delay: prevCatLength(catIndex) * 100 + delay
				}}
				out:fade
			>
				&gt; {category.title} &gt;
			</li>
		{/if}
		{#each category.items as item, itemIndex}
			{#if (!$page.params.slug || ($page.params.slug && id === (item as Post)._id)) && mounted}
				<li
					class="font-mono"
					class:selected={id === (item as Post)._id}
					in:fly={{
						x: 200,
						duration: 500,
						easing: cubicInOut,
						delay: (prevCatLength(catIndex) + itemIndex) * 100 + delay
					}}
					out:fade
				>
					{#if (item as Post).awards && data.projects
							.map((x) => x._id)
							.indexOf((item as Post)._id) === Math.round(countStore.inertiaIndex)}
						<Awards item={item as Post} />
					{/if}
					<button
						class="text-left"
						onclick={(e) => {
							const currIndex = data.projects.map((x) => x._id).indexOf((item as Post)._id);
							console.log(
								countStore.inertiaIndex,
								currIndex,
								item.slug.current,
								e.currentTarget,
								'click'
							);
							if (countStore.inertiaIndex === currIndex) {
								goto(`/work/${(item as Post).slug.current}`);
							} else {
								countStore.inertiaIndex = currIndex;
							}
						}}
					>
						{(item as Post).title}
					</button>
				</li>
			{/if}
		{/each}
	{/each}
</ul>

<style lang="postcss" scoped>
	.slug {
		@apply translate-x-[13%] -translate-y-1/4 transition-transform w-[32%];
	}

	.selected {
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		transition-property: font-family, font-size, font-weight, line-height;
		@apply font-sans text-3xl sm:text-4xl md:text-6xl 2xl:text-7xl  font-bold;
	}

	.animateText {
		animation: leading 1s infinite;
	}

	@keyframes leading {
		0% {
			letter-spacing: 0;
			font-weight: 400;
		}
		50% {
			letter-spacing: 0.2em;
			font-weight: 900;
		}
		100% {
			letter-spacing: 0;
			font-weight: 400;
		}
	}
</style>
