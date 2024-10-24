<script lang="ts">
	import { animationStore, countStore, loadStore } from '$lib/stores/index.svelte';
	import type { Post } from '$lib/types';
	import { cubicInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import Awards from '$lib/components/Awards.svelte';
	import { page } from '$app/stores';

	const {
		item,
		index,
		activeIndex,
		selHeight,
		active
	}: {
		item: { content: string; catIndex: number } | Post;
		index: number;
		activeIndex: number;
		selHeight: number;
		active?: boolean;
	} = $props();

	const delay = $derived(loadStore.loaded ? 500 : 3000);
	//+= active element / 2 + (active pos - item pos) * item height
	const offset = $derived(
		!active && typeof item.catIndex === 'number'
			? (item.catIndex - activeIndex > 0 ? 1 : -1) * // -1
					(selHeight / 2) + //140
					(item.catIndex - activeIndex) * // -1
						30
			: 0
	);
</script>

{#if typeof item.content === 'string'}
	<li
		style={`transform: translateY(${offset}px)`}
		class="font-mono uppercase absolute left-0 transition-transform duration-150"
		class:animateText={item.content.toLowerCase() ===
			animationStore.currentCat[0].toString().toLowerCase() && animationStore.isAnimating}
		class:hidden={$page.params.slug}
		in:fly={{
			x: 200,
			duration: 500,
			easing: cubicInOut,
			delay: index * 100 + delay
		}}
		out:fade
	>
		{item.content}
	</li>
{:else if (item as Post).title}
	<li
		style={`transform: translateY(${offset}px)`}
		class="font-mono absolute w-full left-0 transition-transform duration-150"
		class:selected={active}
		class:hidden={!active && $page.params.slug}
		in:fly={{
			x: 200,
			duration: 500,
			easing: cubicInOut,
			delay: index * 100 + delay
		}}
		out:fade
	>
		{#if active && (item as Post).awards}
			<Awards item={item as Post} />
		{/if}
		<button
			class="text-left"
			onclick={(e) => {
				console.log(
					countStore.inertiaIndex,
					(item as Post).index,
					(item as Post).slug.current,
					'click'
				);
				if (countStore.inertiaIndex === (item as Post).index) {
					goto(`/work/${(item as Post).slug.current}`);
				} else {
					countStore.inertiaIndex = (item as Post).index as number;
				}
			}}
		>
			{(item as Post).title}
		</button>
	</li>
{/if}

<style lang="scss">
	.selected {
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 0ms;
		transition-property: font-family, font-size, font-weight, line-height;
		@apply font-sans text-3xl sm:text-4xl md:text-5xl 2xl:text-7xl  font-bold;
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
