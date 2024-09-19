<script lang="ts">
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { projectsStore, scrollStore } from '$lib/stores/index.svelte';
	import type { Post } from '$lib/types';
	import debounce from '$lib/utils/debounce';
	import { gsap } from 'gsap/dist/gsap';
	import { onDestroy, onMount, untrack } from 'svelte';

	let data = $state() as Post | undefined;
	let animating = true;

	function overScroll() {
		gsap.to(scrollStore, {
			overScroll: 0,
			duration: 0.5,
			ease: 'power4.out',
		});
	}

	const mapper = gsap.utils.mapRange(0, 300, 0, 100);
	const debouncedOverscroll = debounce(overScroll, 50);

	$effect(() => {
		scrollStore.overScroll;
		untrack(() => {
			if (animating) return
			// gsap.killTweensOf('section');
			gsap.set('section', {
				y: `-${(Math.log10(scrollStore.overScroll / 100) +1.5)*100}`,
				onUpdate: () => {
					// gsap.killTweensOf('.gradient, section');
					if (scrollStore.overScroll < 2000) {
						debouncedOverscroll();
					} else {
						gsap.to('.gradient', {
							opacity: 0,
							duration: 0.5
						});
						gsap.to('section', {
							y: '100%',
							opacity: 0,
							duration: 0.5,
							onComplete: () => {
								animating = true;
								goto('/work/anti-hate-keyboard');
							}
						});
					}
				}
			});
			gsap.set('.gradient', {
				opacity: mapper(Math.max(0, Math.log10(scrollStore.overScroll / 10)))
			});
		});
	});

	afterNavigate(({ to }) => {
		if (to?.url.pathname.includes('work')) {
			animateIn();
		}
	});

	onMount(() => {
		projectsStore.projects.then((projects) => {
			data = projects.find((x) => x.slug.current === $page.params.slug);
			if (!data) {
				// goto('404');
			}
			animateIn();
		});
	});

	function animateIn() {
		gsap.set('.gradient-top', {
			opacity: 1
		});
		gsap.to('section', {
			y: 0,
			opacity: 1,
			delay: 1,
			onComplete: () => {animating = false}
		});
		gsap.to('.gradient-top', {
			opacity: 0,
			delay: 1
		});
	}

	// onDestroy(() => {
	// 	ScrollTrigger.killAll();
	// });
</script>

<aside class="fixed top-0 h-[40vh] w-full gradient-top -z-30"></aside>
<article class="relative overflow-hidden">
	<section
		class="h-screen w-full flex flex-row-reverse p-4 items-center justify-end gap-4 translate-y-full opacity-0"
	>
		<div class="min-h-0">
			<h1 class="text-white mix-blend-difference font-sans text-7xl font-bold text-wrap">
				{$page.params.slug}
				<!-- {data?.title} -->
			</h1>
			<p></p>
		</div>
		<!-- 2/3 placeholder aspect ratio -->
		<div class="w-[60vw] min-w-[60vw] h-[40vw]"></div>
	</section>
	<section
		class="h-screen w-full flex flex-row p-4 items-center justify-end gap-4 translate-y-full opacity-0"
	>
		<div class="min-h-0">
			<!-- <h1 class="text-white mix-blend-difference font-sans text-7xl font-bold text-wrap">
				{data?.title}
			</h1> -->
			<p class="text-white mix-blend-difference">Lorem ipsum dolor sit amet.</p>
		</div>
		<!-- 2/3 placeholder aspect ratio -->
		<div class="w-[60vw] min-w-[60vw] h-[40vw] bg-gold"></div>
	</section>
		<section
		class="h-screen w-full flex flex-row-reverse p-4 items-center justify-end gap-4 translate-y-full opacity-0"
	>
		<div class="min-h-0">
			<!-- <h1 class="text-white mix-blend-difference font-sans text-7xl font-bold text-wrap">
				{data?.title}
			</h1> -->
			<p class="text-white mix-blend-difference">Lorem ipsum dolor sit amet.</p>
		</div>
		<!-- 2/3 placeholder aspect ratio -->
		<div class="w-[60vw] min-w-[60vw] h-[40vw] bg-gold"></div>
	</section>
		<section
		class="h-screen w-full flex flex-row p-4 items-center justify-end gap-4 translate-y-full opacity-0"
	>
		<div class="min-h-0">
			<!-- <h1 class="text-white mix-blend-difference font-sans text-7xl font-bold text-wrap">
				{data?.title}
			</h1> -->
			<p class="text-white mix-blend-difference">Lorem ipsum dolor sit amet.</p>
		</div>
		<!-- 2/3 placeholder aspect ratio -->
		<div class="w-[60vw] min-w-[60vw] h-[40vw] bg-gold"></div>
	</section>
		<section
		class="h-screen w-full flex flex-row-reverse p-4 items-center justify-end gap-4 translate-y-full opacity-0"
	>
		<div class="min-h-0">
			<!-- <h1 class="text-white mix-blend-difference font-sans text-7xl font-bold text-wrap">
				{data?.title}
			</h1> -->
			<p class="text-white mix-blend-difference">Lorem ipsum dolor sit amet.</p>
		</div>
		<!-- 2/3 placeholder aspect ratio -->
		<div class="w-[60vw] min-w-[60vw] h-[40vw] bg-gold"></div>
	</section>
</article>
<aside
	class="fixed bottom-0 h-[40vh] w-full gradient opacity-0 -z-30 flex text-center justify-center items-center flex-col"
>
	<p>&gt; Next Project &gt;</p>
	<h4 class="text-4xl font-bold">Anti-Hate Keyboard</h4>
</aside>

<style lang="scss" scoped>
	.gradient {
		filter: invert(1);
		background-color: rgb(255, 255, 255);
		background-image: radial-gradient(at 25% 0%, rgb(255, 255, 255) 0, transparent 75%),
			radial-gradient(at 75% 0%, rgb(255, 255, 255) 0, transparent 75%),
			radial-gradient(at 51.94% 50%, rgb(234, 88, 12) 0, transparent 50%),
			radial-gradient(at 87.56% 50%, rgb(252, 165, 165) 0, transparent 50%),
			radial-gradient(at 15.21% 88.5%, rgb(249, 115, 22) 0, transparent 87%);
	}

	.gradient-top {
		filter: invert(1);
		background-color: rgb(255, 255, 255);
		background-image: radial-gradient(at 25% 100%, rgb(255, 255, 255) 0, transparent 75%),
			radial-gradient(at 75% 100%, rgb(255, 255, 255) 0, transparent 75%),
			radial-gradient(at 51.94% 50%, rgb(234, 88, 12) 0, transparent 50%),
			radial-gradient(at 86.89% 0%, rgb(252, 165, 165) 0, transparent 50%),
			radial-gradient(at 15.76% 0%, rgb(249, 115, 22) 0, transparent 87%);
	}
</style>
