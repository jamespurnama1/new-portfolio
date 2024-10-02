<script lang="ts">
	/** @type {import('./$types').LayoutData} */
	import { animationStore, loadStore } from '$lib/stores/index.svelte';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

<svelte:head>
	<title>James Henry</title>
	<meta name="description" content="Portfolio" />
</svelte:head>

<section class="w-screen h-screen overflow-hidden flex items-center justify-center p-24">
	{#if animationStore.isAnimating}
		<h2
			class="text-white uppercase font-mono text-7xl absolute -translate-x-2/3 2xl:top-1/4 pointer-events-none text-center w-[30vw] {loadStore.loaded ? ' top-[20%]' : 'top-[50%]'}"
			transition:scale={{ duration: 500, start: 0.5, easing: quintOut }}
		>
			{animationStore.currentCat[0]}
		</h2>
	{/if}
</section>
