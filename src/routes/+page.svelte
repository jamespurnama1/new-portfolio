<script lang="ts">
	import { countStore, loadStore, projectsStore } from '$lib/stores/index.svelte';
	import { untrack, onMount } from 'svelte';
	import gsap from 'gsap';

	let innerWidth = $state(0);
	let innerHeight = $state(0);
	// let scrollLength = 0;
	let projectList: HTMLUListElement;

	$effect(() => {
		if (loadStore.load < 100 || !projectsStore.projects.length) return;
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
			untrack(() => loadStore.load);
		}
	});

	const debounce = (fn: Function, ms = 300) => {
		let timeoutId: ReturnType<typeof setTimeout>;
		return function (this: any, ...args: any[]) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => fn.apply(this, args), ms);
		};
	};

	onMount(() => {
		const update = (down: boolean) => {
			let goTo = Math.round(countStore.inertiaIndex);

			if (countStore.inertiaIndex < 0) {
				goTo = 0;
			} else if (countStore.inertiaIndex > projectsStore.projects.length - 1) {
				goTo = projectsStore.projects.length - 1;
			}
			gsap.to(countStore, {
				inertiaIndex: goTo,
				ease: 'power4.out',
				duration: Math.min(Math.abs(countStore.inertiaIndex - goTo) * 0.8, 0.5),
				onUpdate: () => {
					// scrollLength = countStore.inertiaIndex;
				}
			});
		};

		const debouncedInertia = debounce(update, 150);

		document.addEventListener('wheel', (event) => {
			gsap.killTweensOf(countStore);
			let deltaY = event.deltaY;
			if (event.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
				// Convert pixel values to lines
				deltaY *= 1;
			} else if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
				// Convert lines to pixels (approximation, typically 16 pixels per line)
				deltaY *= 16;
			} else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
				// Convert pages to pixels (e.g., 100 pixels per page)
				deltaY *= 100;
			}
			// scrollLength += gsap.utils.mapRange(-1000, 1000, -5, 5, deltaY);

			countStore.inertiaIndex += gsap.utils.mapRange(-1000, 1000, -5, 5, deltaY);
			debouncedInertia(deltaY > 0);
		});
	});
</script>

<svelte:head>
	<title>James Henry</title>
	<meta name="description" content="Portfolio" />
</svelte:head>

<section class="w-screen h-screen overflow-hidden flex items-center justify-center p-24">

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
