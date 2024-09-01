<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { countStore, loadStore, projectsStore } from '$lib/stores/index.svelte';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { untrack, onMount } from 'svelte';
	import gsap from 'gsap';

	let innerWidth = $state(0);
	let innerHeight = $state(0);
	let scrollLength = 0;
	let projectList: HTMLUListElement;

	$effect(() => {
		// console.log(projectList)
		if (loadStore.load  < 100 || !projectsStore.projects.length) return;
		const li = projectList.querySelectorAll('li');
		gsap.set(li, {
			x: innerWidth,
			opacity: 0
		});

		if (loadStore.load >= 100) {
			gsap.to(li, {
				x: 0,
				opacity: 1,
				delay: 3,
				stagger: 0.3,
				ease: 'power1.out'
			});
			untrack(() => loadStore.load)
		}
	});

	onMount(() => {
		// if large deltaY move 2 at a time
		// debounce if scrolllength
		document.addEventListener('wheel', (e) => {
			const timeout = setTimeout(() => {
				scrollLength = 0;
			}, 500)
			if (timeout) clearTimeout(timeout)
			scrollLength += e.deltaY;
			console.log(scrollLength, e.deltaY)
			if (scrollLength < -100 || e.deltaY < -30) {
				scrollLength = 0;
				countStore.activeIndex = false;
			} else if (scrollLength > 100 || e.deltaY > 30) {
				scrollLength = 0;
				countStore.activeIndex = true;
			}
		});
	});
</script>

<svelte:head>
	<title>James Henry</title>
	<meta name="description" content="Portfolio" />
</svelte:head>

<section class="w-screen h-screen overflow-hidden flex items-center justify-center p-24">

	{#if loadStore.load < 100}
		<div
			class="w-full h-full flex items-center justify-center p-24 absolute top-0 left-0"
			transition:scale={{ duration: 500, delay: 500, start: 0.5, easing: quintOut }}
		>
			<Loading />
		</div>
	{/if}

	<ul
		bind:this={projectList}
		class:opacity-0={loadStore.load < 100}
		class="dark:text-white text-black font-mono ml-auto relative z-10"
	>
		<li class="font-mono">&gt; Highlights &gt;</li>
		<li class="font-mono selected" onclick={() => console.log('test')}>Yellow Canteen</li>
		<li class="font-mono">Anti-Hate Keyboard</li>
		<li class="font-mono">&gt; Website &gt;</li>
	</ul>
</section>

<svelte:window bind:innerWidth bind:innerHeight />

<style lang="postcss" scoped>
	.selected {
		@apply font-sans text-7xl font-bold;
	}
</style>
