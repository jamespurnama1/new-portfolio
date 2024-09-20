<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { browser, dev } from '$app/environment';
	import '../app.scss';
	import { Canvas } from '@threlte/core';
	import Three from '$lib/components/Three.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import {
		countStore,
		loadStore,
		homeStore,
		projectsStore,
		scrollStore
	} from '$lib/stores/index.svelte';
	import { gsap } from 'gsap';
	import debounce from '$lib/utils/debounce';
	import theme from '$lib/utils/theme';
	import { onMount, untrack } from 'svelte';
	import { page } from '$app/stores';
	import { beforeNavigate, goto } from '$app/navigation';
	import type { Post } from '$lib/types';
	// (async () => {
	// 	if (browser && dev) {
	// 		await import('$lib/utils/datgui');
	// 	}
	// })();

	// SSG
	export const prerender = true;

	let prev = 0;
	let innerWidth = $state(0);
	let innerHeight = $state(0);
	let { children } = $props();
	let webGLComponent: Three;
	let navComponent: Nav;
	let footerComponent: Footer;
	let videoEl = $state([]) as HTMLVideoElement[];

	const ASCIIArt = [
		'░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓██████████████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓██████████████▓▒░░▒▓█▓▒░',
		'░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░',
		'░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░',
		'░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░',
		'░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░',
		'░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░      ',
		'░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░'
	];

	// Easter egg
	const arr = [] as string[];

	// Keyboard Event
	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
			countStore.activeIndex = false;
			debouncedInertia();
		} else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
			countStore.activeIndex = true;
			debouncedInertia();
		} else if (e.key === 'Enter') {
			projectsStore.projects.then((x) => {
				goto(`/work/${(x as Post[])[countStore.inertiaIndex].slug.current}`);
			});
		}

		arr.push(e.key);
		if (arr.length >= 7) arr.shift();
		if (arr.toString().replaceAll(',', '').toLowerCase() === 'namnam') {
			ASCIIArt.forEach((x) => console.log(x));

			const easterTL = gsap.timeline();
			easterTL.to('.namnam', {
				opacity: 1,
				scale: 1
			});
			easterTL.to('.namnam', {
				opacity: 0,
				delay: 5,
				scale: 0
			});

			arr.length = 0;
		}
	}

	// Theme Management
	function checkSavedTheme() {
		const colorScheme = window.matchMedia('(prefers-color-scheme:dark)');
		const localStorageTheme = localStorage.getItem('dark-theme');

		theme(localStorageTheme === null ? colorScheme.matches : localStorageTheme === 'true', false);

		colorScheme.addEventListener('change', (e) =>
			localStorageTheme === null ? theme(e.matches, false) : null
		);
	}

	// Category Animation
	function checkCategory(goTo: number) {
		if (prev !== goTo) {
			homeStore.categoriesLength.forEach((x, i) => {
				if (prev < x && x <= goTo) {
					webGLComponent.categoryAnim('up');
					homeStore.currentCat = [homeStore.categories[i + 1], i + 1];
				} else if (prev >= x && x > goTo) {
					webGLComponent.categoryAnim('down');
					homeStore.currentCat = [homeStore.categories[i], i];
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
		// if (videoEl[prev]) videoEl[prev].pause();
		videoEl.forEach((vid) => vid.pause());
		let goTo = Math.round(countStore.inertiaIndex);
		// check dir from prev value
		checkCategory(goTo);

		// smooth snapping
		if (countStore.inertiaIndex < 0) {
			goTo = 0;
		} else if (countStore.inertiaIndex > projectsStore.projectsLength - 1) {
			goTo = projectsStore.projectsLength - 1;
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
		loadStore.loaded;
		untrack(() => {
			if (!loadStore.loaded) return;
			navComponent.afterLoad();
			footerComponent.afterLoad();
		});
	});

	// Calculate Loading
	$effect(() => {
		videoEl.length;
		untrack(() => {
			if (loadStore.loaded) return;
			if (videoEl.length) {
				videoEl.forEach((x, i) => {
					if (x) x.addEventListener('timeupdate', onVideoLoad, { once: true });
				});
			}
		});
	});
	let videoCount = 0;
	function onVideoLoad(e: Event) {
		videoCount++;
		if (videoCount <= projectsStore.projectsLength) {
			loadStore.load = (1 / projectsStore.projectsLength) * 90 + loadStore.realLoad;
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
	<!-- Easter Egg -->
	<div
		class="namnam opacity-0 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-9xl pointer-events-none text-white mix-blend-difference w-full h-full flex items-center justify-center scale-0"
	>
		<p>❤️ Hi Sexy</p>
	</div>

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
		{:else}
			{@render children()}
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
			<Three bind:this={webGLComponent} />
		</Canvas>
	</div>

	<!-- Footer -->
	<Footer bind:this={footerComponent} />

	<!-- Video Elements -->
	<div class="opacity-0 absolute -z-10 top-0 w-52 pointer-events-none">
		{#await projectsStore.projects then projects}
			{#each projects as project, i}
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
		{:catch error}
			{error}
		{/await}
	</div>
</div>
