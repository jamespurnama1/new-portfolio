<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import '../app.scss';
	import { Canvas } from '@threlte/core';
	import Three from '$lib/components/Three.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import {
		countStore,
		loadStore,
		homeStore,
		scrollStore,
		activityStore
	} from '$lib/stores/index.svelte';
	import { gsap } from 'gsap';
	import debounce from '$lib/utils/debounce';
	import { checkSavedTheme } from '$lib/utils/theme';
	import { onMount, untrack } from 'svelte';
	import { page } from '$app/stores';
	import { beforeNavigate, goto } from '$app/navigation';
	import { namnam } from '$lib/utils/easterEggs';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import { type PageData } from './$types.js';
	import { optionsStore } from '$lib/stores/options.svelte';

	let prev = 0;
	let innerWidth = $state(0);
	let innerHeight = $state(0);
	let { children, data } = $props();
	let webGLComponent: Three;
	let navComponent: Nav;
	let footerComponent: Footer;
	let videoEl = $state([]) as HTMLVideoElement[];
	let timer: ReturnType<typeof setTimeout>;
	const showSource = $derived(
		optionsStore.options.showSources ? 'opacity-100 z-50' : 'opacity-0 -z-10'
	);

	// Keyboard Event
	function onKeyDown(e: KeyboardEvent) {
		if (!loadStore.loaded) return;
		// Easter egg
		namnam(e.key);
		if ($page.params.slug) return;
		if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
			countStore.activeIndex = false;
			debouncedInertia();
		} else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
			countStore.activeIndex = true;
			debouncedInertia();
		} else if (e.key === 'Enter') {
			if (!data.projectsLength) return;
			goto(`/work/${data.projects[countStore.inertiaIndex].slug.current}`);
		}
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
			webGLComponent.categoryAnim('up');
		}
	});

	const update = () => {
		if (!data.projectsLength || !data.categoriesLength) return;
		// if (videoEl[prev]) videoEl[prev].pause();
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
		if (videoEl[goTo] && loadStore.loaded) {
			videoEl.forEach((vid) => vid.pause());
			videoEl[goTo].play();
		}

		gsap.to(countStore, {
			inertiaIndex: goTo,
			ease: 'power4.out',
			duration: Math.min(Math.abs(countStore.inertiaIndex - goTo) * 0.8, 0.5)
		});
	};

	const debouncedInertia = debounce(update, 200);
	$effect(() => {
		countStore.inertiaIndex;
		untrack(() => {
			debouncedInertia();
			if (timer) clearTimeout(timer);
		});
	});

	// Load in Animation
	$effect(() => {
		if (!loadStore.loaded) return;
		untrack(() => {
			//safari needs video to play for a few more seconds, so we pause here instead
			for (let i = 1; i < videoEl.length; i++) {
				videoEl[i].pause();
			}
			navComponent.afterLoad();
			footerComponent.afterLoad();
			timer = setTimeout(() => {
				activityStore.inactive = true;
			}, 5000);
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
				try {
					// make sures the video autoplays
					x.play();
				} catch (error) {
					if (error.name === 'NotAllowedError') {
						console.warn('Power Saver Mode')
						onVideoLoad();
					}
				}
				// console.log(x.paused)
				x.addEventListener('timeupdate', onVideoLoad, { once: true });
				x.addEventListener(
					'error',
					(e) => {
						//TODO: Store error and display it
						console.error(e.message);
					},
					{ once: true }
				);
			});
		});
	});

	let videoCount = 0;
	function onVideoLoad() {
		videoCount++;
		if (videoCount <= data.projectsLength!) {
			//10% is fetched already
			loadStore.load = (1 / data.projectsLength!) * 90 + loadStore.realLoad;
		}
		// SAFARI: can't pause here, video needs to play for a bit
	}
	let reset = gsap.timeline();

	function overScroll() {
		reset.kill();
		reset.to(scrollStore, {
			overScroll: 0,
			duration: 0.5,
			ease: 'power4.out'
		});
	}

	const debouncedOverscroll = debounce(overScroll, 150);

	onMount(() => {
		// wheel listener
		document.addEventListener(
			'wheel',
			(event) => {
				if (!loadStore.loaded) return;
				activityStore.inactive = false;
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
				if (
					scrollStore.overScroll > 0 ||
					(Math.abs(document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)) <
						5 &&
						deltaY < 70)
				) {
					scrollStore.overScroll += deltaY;
					// debouncedOverscroll(event.deltaY)
				}
				debouncedOverscroll();
				// if (scrollStore.overScroll < 2000) {
				// }
				if ($page.params.slug) {
					scrollStore.scroll = document.documentElement.scrollTop;
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
			{#if !$page.params.slug && activityStore.inactive}
				<p
					transition:scale={{ duration: 500, start: 0.5, easing: quintOut }}
					class="text-white text-center text-xs leading-none mix-blend-difference fixed bottom-10"
				>
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
	<div class="absolute top-0 w-52 pointer-events-none {showSource}">
		{#if data.projects}
			{#each data.projects as project, i}
				<video
					class="absolute w-full h-auto"
					style="transform: translateY({i}0%);"
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
