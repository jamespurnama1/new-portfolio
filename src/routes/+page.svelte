<script lang="ts">
	import { countStore, loadStore, projectsStore, homeStore } from '$lib/stores/index.svelte';
	import gsap from 'gsap';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Awards from '$lib/components/Awards.svelte';
	import { createEventDispatcher } from 'svelte';
	import { type Post } from '$lib/types';

	let innerWidth = $state(0);
	let innerHeight = $state(0);
	let projectList: HTMLUListElement;

	const dispatch = createEventDispatcher();

	$effect(() => {
		const li = projectList.querySelectorAll('li');

		if(!li.length) return
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

<section class="w-screen h-screen overflow-hidden flex items-center justify-center p-24">
	{#if homeStore.isAnimating}
		<h2
			class="text-white uppercase font-mono text-7xl absolute left-[15%] pointer-events-none text-center w-[30vw]"
			transition:scale={{ duration: 500, start: 0.5, easing: quintOut }}
		>
			{homeStore.currentCat[0]}
		</h2>
	{/if}

	<ul
		bind:this={projectList}
		class:opacity-0={loadStore.load < 100}
		class="absolute left-[60%] text-white font-mono ml-auto z-10 transition-all"
	>
		{#each homeStore.catItems as category, i}
			<li
				class="font-mono uppercase pt-5 transition-all"
				class:animateText={category.title.toLowerCase() ===
					homeStore.currentCat[0].toString().toLowerCase() && homeStore.isAnimating}
			>
				&gt; {category.title} &gt;
			</li>
			{#each category.items as item}
				<!-- <Awards {item} /> -->
				<li
					class="font-mono transition-all"
					class:selected={i ===
						Math.round(countStore.inertiaIndex)}
				>
					<button
						class="text-left"
						onclick={() => {
							countStore.inertiaIndex = i;
							dispatch('onChangeIndex');
						}}
					>
						{(item as Post).title}
					</button>
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
