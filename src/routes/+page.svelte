<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { store } from '$lib/stores';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	$: innerWidth = 0;
	$: innerHeight = 0;

	let projectList: HTMLUListElement;

	store.subscribe((value) => {
		// console.log(projectList)
		if (value.load < 100 || !projectList) return;
		const li = projectList.querySelectorAll('li');
		gsap.set(li, {
			x: innerWidth,
			opacity: 0
		});

		if ($store.load >= 100) {
			gsap.to(li, {
				x: 0,
				opacity: 1,
				delay: 3,
				stagger: 0.3,
				ease: "power1.out",
			});
		}
	});

	onMount(() => {});
</script>

<svelte:head>
	<title>James Henry</title>
	<meta name="description" content="Portfolio" />
</svelte:head>

<section class="w-screen h-screen overflow-hidden flex items-center justify-center p-24">
	{#if $store.load < 100}
		<div
			class="w-full h-full flex items-center justify-center p-24 absolute top-0 left-0"
			transition:scale={{ duration: 500, delay: 500, start: 0.5, easing: quintOut }}
		>
			<Loading />
		</div>
	{/if}
	<button class="text-white" on:click={() => $store.activeIndex--}>Prev</button>
	<button class="text-white" on:click={() => $store.activeIndex++}>Next</button>
		<ul bind:this={projectList} class:opacity-0={$store.load < 100} class="text-white font-mono mix-blend-difference ml-auto relative z-10">
			<li class="font-mono">&gt; Highlights &gt;</li>
			<li class="font-mono selected">Yellow Canteen</li>
			<li class="font-mono">Anti-Hate Keyboard</li>
			<li class="font-mono">&gt; Website &gt;</li>
		</ul>
</section>

<svelte:window bind:innerWidth bind:innerHeight />

<style lang="postcss" scoped>
	.selected {
		@apply font-sans text-7xl font-bold
	}
</style>
