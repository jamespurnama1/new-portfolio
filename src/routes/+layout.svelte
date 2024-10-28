<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import '../app.scss';
	import { Canvas } from '@threlte/core';
	import Three from '$lib/components/Three.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Debug from '$lib/components/Debug.svelte';
	import {
		countStore,
		loadStore,
		animationStore,
		scrollStore,
		activityStore,
		notificationStore,
		gptStore
	} from '$lib/stores/index.svelte';
	import { gsap } from 'gsap';
	import { checkSavedTheme } from '$lib/utils/theme';
	import { onMount, untrack } from 'svelte';
	import { page } from '$app/stores';
	import { beforeNavigate, goto } from '$app/navigation';
	import { namnam } from '$lib/utils/easterEggs';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import { type PageData } from './$types.js';
	import { optionsStore } from '$lib/stores/options.svelte';
	import Notifications from '$lib/components/Notifications.svelte';
	import GPT from '$lib/components/gpt.svelte';
	import { browser, dev } from '$app/environment';

	let prev = 0;
	let innerWidth = $state(0);
	let innerHeight = $state(0);
	let { children, data } = $props();
	let webGLComponent: typeof Three = $state();
	let gptEl: typeof GPT = $state();
	let navComponent: Nav;
	let footerComponent: Footer;
	let videoEl = $state([]) as HTMLVideoElement[];
	let timer: ReturnType<typeof setTimeout>;
	const showSource = $derived(optionsStore.showSources ? 'opacity-100 z-50' : 'opacity-0 -z-10');
	const slug = $derived(data.projects ? data.projects[countStore.activeIndex].slug.current : '');
	/* 
	--------
	KEYBOARD
	--------
	*/
	// Keyboard Event
	function onKeyDown(e: KeyboardEvent) {
		if (!loadStore.loaded) return;
		// shortcut to open GPT
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			gptStore.opened = !gptStore.opened;
		} else if (e.key.toLowerCase() === 'escape') {
			gptStore.opened = false;
		}

		// add stuff here if requires keyboard input
		if (gptStore.opened) return;
		e.preventDefault();
		// Easter egg
		namnam(e.key);
		if ($page.params.slug || $page.url.hash) return;
		if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
			countStore.activeIndex = false;
			debouncedInertia.restart(true);
		} else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
			countStore.activeIndex = true;
			debouncedInertia.restart(true);
		} else if (e.key === 'Enter') {
			if (!data.projectsLength) return;
			if (slug === 'reels') {
				goto('/#reels');
			} else {
				goto(`/work/${slug}`);
			}
		}
	}

	/* 
	----------
	ANIMATIONS
	----------
	*/
	// Category Animation
	function checkCategory(goTo: number) {
		let index =
			data.categoriesLength!.findIndex((x, i) => {
				const nextNum = data.categoriesLength![i + 1] || Infinity;
				return goTo + 1 > x && goTo + 1 <= nextNum;
			}) + 1;
		if (prev !== index) {
			animationStore.currentCat = [data.categories![index], index];
			countStore.isNewCat = true;
			prev = index;
		}
	}

	// Navigation Animation
	beforeNavigate(({ to }) => {
		if (to?.url.pathname.includes('work')) {
			animationStore.isTransitioning = true;
			document.documentElement.classList.remove('overflow-hidden');
		} else {
			document.documentElement.classList.add('overflow-hidden');
		}
	});

	const tl = gsap.timeline();

	const update = () => {
		if (!data.projectsLength || !data.categoriesLength) return;
		// if (videoEl[prev]) videoEl[prev].pause();
		let goTo = countStore.activeIndex;

		// smooth snapping
		if (countStore.inertiaIndex <= 0) {
			goTo = 0;
		} else if (countStore.inertiaIndex >= data.projectsLength - 1) {
			goTo = data.projectsLength - 1;
		}

		tl.clear();
		tl.to(countStore, {
			inertiaIndex: goTo,
			ease: 'power4.out',
			duration: Math.min(Math.abs(countStore.inertiaIndex - goTo) * 0.3, 0.5),
			onUpdate: () => {
				if (goTo !== countStore.inertiaIndex) {
					debouncedInertia.restart(true);
				}
			}
		});

		// play video
		if (videoEl[goTo] && loadStore.loaded) {
			videoEl.forEach((vid) => vid.pause());
			videoEl[goTo].play();
		}

		// check dir from prev value
		// must use set timeout to send things in order
		checkCategory(goTo);
	};

	/* 
	-----
	VIDEO
	-----
	*/
	// Load in Animation
	$effect(() => {
		if (!loadStore.loaded) return;
		untrack(() => {
			//safari needs video to play for a few more seconds, so we pause here instead
			for (let i = 1; i < videoEl.length; i++) {
				videoEl[i].pause();
			}
			// navComponent.afterLoad();
			// footerComponent.afterLoad();
			timer = setTimeout(() => {
				activityStore.inactive = true;
				notificationStore.opened = true;
				notificationStore.message = 'Scroll to browse';
				notificationStore.sub = '';
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
					if (error instanceof Error) {
						if (error.name === 'NotAllowedError') {
							console.warn('Power Saver Mode');
							onVideoLoad();
						}
					}
				}
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

	/* 
	---------
	SCROLLING
	---------
	*/
	const debouncedInertia = gsap.delayedCall(0.1, update).pause();

	// const debouncedInertia = debounce(update, 100, { maxWait: 200, trailing: true });
	$effect(() => {
		countStore.inertiaIndex;
		gptStore.opened;
		untrack(() => {
			if (timer) clearTimeout(timer);
		});
		return () => {
			document.removeEventListener('wheel', (event) => onScroll(event));
		};
	});

	let reset = gsap.timeline();

	function overScroll() {
		reset.to(scrollStore, {
			overScroll: 0,
			duration: 0.5,
			ease: 'power4.out'
		});
	}

	//rate limit the reset function
	const debouncedOverscroll = gsap.delayedCall(0.15, overScroll).pause();
	const mapper = gsap.utils.mapRange(-2000, 2000, -5, 5);

	function onScroll(event: WheelEvent) {
		if (!loadStore.loaded || gptStore.opened) return;
		activityStore.inactive = false;
		gsap.killTweensOf(countStore);
		// deprecated wheeldelta is more consistent than the new delta
		let deltaY = -1 * event.wheelDeltaY;
		// if (event.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
		// 	// Convert pixel values to lines
		// scrollStore.scroll = document.documentElement.scrollTop;
		// 	deltaY *= 1;
		// } else if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
		// 	// Convert lines to pixels (approximation, typically 16 pixels per line)
		// 	deltaY *= 17;
		// } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
		// 	// Convert pages to pixels (e.g., 100 pixels per page)
		// 	deltaY *= 53;
		// }

		// if overscroll more than 0 or reached end of page (error margin of 5 pixels) & scrol speed less than 70 (in case user scrolled from 0 to end too fast)
		if (
			scrollStore.overScroll > 0 ||
			Math.abs(document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)) < 5
		) {
			reset.clear();
			scrollStore.overScroll += deltaY;
		}
		// if not intended, return value to zero
		if (scrollStore.overScroll < 4000 && scrollStore.overScroll !== 0) {
			debouncedOverscroll.restart(true);
		}
		//update scroll store on project page
		if ($page.params.slug) {
			scrollStore.scroll = document.documentElement.scrollTop;
			//update count store on home page
		} else {
			countStore.inertiaIndex += mapper(deltaY);
			debouncedInertia.restart(true);
		}
	}

	function disableScroll(e: Event) {
		e.preventDefault();
	}

	$effect(() => {
		optionsStore.fullscreen;
		// 	loadStore.cardLoading;
		// 	$page.params.slug;
		untrack(() => {
			if (optionsStore.fullscreen) {
				window.addEventListener('wheel', disableScroll, { passive: false });
			} else {
				window.removeEventListener('wheel', disableScroll);
			}
		});
	});

	onMount(() => {
		if ($page.params.slug) animationStore.isTransitioning = true;

		// wheel listener
		document.addEventListener('wheel', (event) => onScroll(event), { passive: true });

		//disable overflow
		if (!$page.params.slug) {
			animationStore.isTransitioning = true;
			document.documentElement.classList.add('overflow-hidden');
		} else {
			document.documentElement.classList.remove('overflow-hidden');
		}

		//check light Mode
		checkSavedTheme();
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight on:keydown={onKeyDown} />

<div class="app h-screen w-screen">
	<!-- Header -->
	<Nav bind:this={navComponent} />

	<!-- Main -->
	<main
		class="h-full w-full overscroll-none z-10 relative flex items-center justify-center mix-blend-difference"
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
			<!-- inactivity -->
			<!-- {#if !$page.params.slug && activityStore.inactive}
				<p
					transition:scale={{ duration: 500, start: 0.5, easing: quintOut }}
					class="text-white text-center text-xs leading-none mix-blend-difference fixed bottom-10"
				>
					scroll to browse
				</p>
			{/if} -->
		{/if}
	</main>

	<Notifications />
	<!-- BG -->
	<div class="fixed w-screen h-screen z-0 top-0 left-0 canvas-container">
		<Canvas>
			<Three bind:this={webGLComponent} {data} />
		</Canvas>
	</div>
	<GPT
		bind:this={gptEl}
		{data}
		categoryAnim={webGLComponent ? webGLComponent.categoryAnim : null}
	/>
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

{#if browser && dev}
	<Debug pushMessage={gptEl.pushMessage} />
{/if}
