<script lang="ts">
	import { countStore, loadStore, projectsStore, homeStore } from '$lib/stores/index.svelte';
	import Three from '$lib/components/Three.svelte';
	import { untrack, onMount } from 'svelte';
	import gsap from 'gsap';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let innerWidth = $state(0);
	let innerHeight = $state(0);
	let projectList: HTMLUListElement;

	$effect(() => {
		const li = projectList.querySelectorAll('li');
		gsap.set(li, {
			x: innerWidth,
			opacity: 0
		});
		if (!loadStore.loaded || !projectsStore.projectsLength) return;
		gsap.to(li, {
			x: 0,
			opacity: 1,
			delay: 3,
			stagger: 0.1,
			ease: 'power1.out'
		});
	});
</script>

<svelte:head>
	<title>James Henry</title>
	<meta name="description" content="Portfolio" />
</svelte:head>

<section class="w-screen h-screen overflow-hidden flex items-center justify-center p-24 relative">
	{#if homeStore.isAnimating}
		<h2
			class="text-white mix-blend-difference uppercase font-mono text-7xl absolute"
			transition:scale={{ duration: 500, start: 0.5, easing: quintOut }}
		>
			{homeStore.currentCat[0]}
		</h2>
	{/if}

	<ul
		bind:this={projectList}
		class:opacity-0={loadStore.load < 100}
		class="dark:text-white text-black font-mono ml-auto relative z-10 transition-all"
	>
		{#each Object.entries(projectsStore.projects) as [category, projects], i}
			<li class="font-mono uppercase pt-5">&gt; {category.split('_')[1]} &gt;</li>
			{#each projects as item}
				<li
					class="font-mono transition-all"
					class:selected={projectsStore.projectsArr.map((x) => x.id).indexOf(item.id) ===
						Math.round(countStore.inertiaIndex)}
				>
					{item.title}
				</li>
			{/each}
		{/each}
	</ul>
</section>

<svelte:window bind:innerWidth bind:innerHeight />

<style lang="postcss" scoped>
	.selected {
		@apply font-sans text-7xl font-bold;
	}
</style>
