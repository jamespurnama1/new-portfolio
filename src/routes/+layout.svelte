<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import '../app.scss';
	import { Canvas } from '@threlte/core';
	import Three from '$lib/components/Three.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { countStore, loadStore, homeStore, scrollStore } from '$lib/stores/index.svelte';
	import { gsap } from 'gsap';
	import debounce from '$lib/utils/debounce';
	import { checkSavedTheme } from '$lib/utils/theme';
	import { onMount, untrack } from 'svelte';
	import { page } from '$app/stores';
	import { beforeNavigate, goto } from '$app/navigation';
	import { namnam } from '$lib/utils/easterEggs';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import { type PageData } from './$types.js';

	let prev = 0;
	let innerWidth = $state(0);
	let innerHeight = $state(0);
	let { children, data } = $props();
	let webGLComponent: Three;
	let navComponent: Nav;
	let footerComponent: Footer;
	let videoEl = $state([]) as HTMLVideoElement[];

	// Keyboard Event
	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
			countStore.activeIndex = false;
			debouncedInertia();
		} else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
			countStore.activeIndex = true;
			debouncedInertia();
		} else if (e.key === 'Enter') {
			console.log('enter');
			if (!data.projectsLength) return;
			goto(`/work/${data.projects[countStore.inertiaIndex].slug.current}`);
		}

		// Easter egg
		namnam(e.key);
	}

	// Category Animation
	function checkCategory(goTo: number) {
		if (prev !== goTo) {
			data.categoriesLength!.forEach((x, i) => {
				if (prev < x && x <= goTo) {
					webGLComponent.categoryAnim('up');
					homeStore.currentCat = [data.categories![i + 1], i + 1];
				} else if (prev >= x && x > goTo) {
					webGLComponent.categoryAnim('down');
					homeStore.currentCat = [data.categories![i], i];
				}
			});
			prev = goTo;
		}
	}

	// Navigation Animation
	beforeNavigate(({ to }) => {
		if (to?.url.pathname.includes('work')) {
			// webGLComponent.categoryAnim('up');
		}
	});

	const update = () => {
		if (!data.projectsLength || !data.categoriesLength) return;
		// if (videoEl[prev]) videoEl[prev].pause();
		videoEl.forEach((vid) => vid.pause());
		let goTo = Math.round(countStore.inertiaIndex);
		// check dir from prev value
		checkCategory(goTo);

		// smooth snapping
		if (countStore.inertiaIndex < 0) {
			goTo = 0;
		} else if (countStore.inertiaIndex > data.projectsLength - 1) {
			goTo = data.projectsLength - 1;
		}

		// play video
		if (videoEl[goTo]) videoEl[goTo].play();

		gsap.to(countStore, {
			inertiaIndex: goTo,
			ease: 'power4.out',
			duration: Math.min(Math.abs(countStore.inertiaIndex - goTo) * 0.8, 0.5)
		});
	};
	const debouncedInertia = debounce(update, 200);
	$effect(() => {
		countStore.inertiaIndex;
		debouncedInertia();
	});

	// Load in Animation
	$effect(() => {
		if (!loadStore.loaded) return;
		untrack(() => {
			// console.log(...data.catItems[0].items, data.categoriesLength)
			navComponent.afterLoad();
			footerComponent.afterLoad();
		});
	});

	// Calculate Loading
	$effect(() => {
		videoEl.length;
		untrack(() => {
			if (
				loadStore.loaded ||
				!data.projectsLength ||
				!videoEl.length ||
				videoEl.length !== data.projectsLength
			)
				return;
			videoEl.forEach((x, i) => {
				x.addEventListener('timeupdate', onVideoLoad, { once: true });
			});
		});
	});
	let videoCount = 0;
	function onVideoLoad(e: Event) {
		videoCount++;
		if (videoCount <= data.projectsLength!) {
			//10% is fetch
			loadStore.load = (1 / data.projectsLength!) * 90 + loadStore.realLoad;
		}
		if (videoCount) {
			(e.target as HTMLVideoElement).currentTime = 1;
			(e.target as HTMLVideoElement).pause();
		}
	}

	onMount(() => {
		// wheel listener
		document.addEventListener(
			'wheel',
			(event) => {
				if (!loadStore.loaded) return;
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
				// const debouncedOverscroll = debounce(reset, 200);
				if (deltaY > 0 && scrollStore.overScroll > 0) {
					scrollStore.overScroll += deltaY;
				} else if (
					Math.abs(document.body.scrollHeight - (window.scrollY + window.innerHeight)) < 5 &&
					deltaY < 70
				) {
					scrollStore.overScroll += deltaY;
					// debouncedOverscroll(event.deltaY)
				}
				if ($page.params.slug) {
					const html = document.documentElement;
					scrollStore.scroll = html.scrollTop;
				} else {
					countStore.inertiaIndex += gsap.utils.mapRange(-1000, 1000, -5, 5, deltaY);
				}
			},
			{ passive: true }
		);

		//check light Mode
		checkSavedTheme();
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight on:keydown|preventDefault={onKeyDown} />

<div class="app h-screen w-screen">
	<!-- Header -->
	<Nav bind:this={navComponent} />

	<!-- Main -->
	<main
		class="h-full w-full overscroll-none z-10 relative mix-blend-difference flex items-center justify-center"
	>
		{#if loadStore.load < 100}
			<div
				class="w-full h-full flex items-center justify-center p-24 absolute top-0 left-0"
				transition:scale={{ duration: 500, delay: 500, start: 0.5, easing: quintOut }}
			>
				<Loading />
			</div>
		{:else if data.projectsLength}
			{@render children()}
			<ProjectList data={data as Required<PageData>} />
			{#if !$page.params.slug}
				<!-- TODO: appear only when inactive -->
				<p class="text-white text-center text-xs leading-none mix-blend-difference fixed bottom-10">
					scroll to browse
				</p>
			{/if}
		{/if}
	</main>

	<!-- BG -->
	<div class="fixed w-screen h-screen z-0 top-0 left-0 canvas-container">
		<Canvas>
			<Three bind:this={webGLComponent} {data} />
		</Canvas>
	</div>

	<!-- Footer -->
	<Footer bind:this={footerComponent} />

	<!-- Video Elements -->
	<div class="opacity-0 absolute -z-10 top-0 w-52 pointer-events-none">
		{#if data.projects}
			{#each data.projects as project, i}
				<video
					class="absolute w-full h-auto"
					bind:this={videoEl[i]}
					muted
					playsinline={true}
					autoplay
					controls={false}
					src={process.env.NODE_ENV === 'production'
						? project.thumbnail.asset.url
						: project.thumbnail.asset.url.replace(
								'https://cdn.sanity.io/files/rdnxsacz/production/',
								'/dev/'
							)}
					id={project.slug!.current}
					crossorigin="anonymous"
					loop
				></video>
			{/each}
		{/if}
	</div>
</div>
