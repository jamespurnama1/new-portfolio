<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { projectsStore, scrollStore } from '$lib/stores/index.svelte';
	import type { Post } from '$lib/types';
	import { gsap } from 'gsap/dist/gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { onMount } from 'svelte';

	gsap.registerPlugin(ScrollTrigger);

	let data = $state() as Post | undefined;
	let nextProject = $state() as HTMLElement;
	let parallax = $state() as HTMLElement;

	onMount(() => {
		projectsStore.projects.then((projects) => {
			data = projects.find((x) => x.slug.current === $page.params.slug);
			if (!data) {
				// goto('404');
			}
		});

		gsap.to(parallax, {
			scrollTrigger: {
				trigger: nextProject,
				scrub: 0.5,
				end: 'bottom bottom',
				snap: {
					snapTo: 0,
					duration: { min: 0.1, max: 0.3 },
					delay: 0.01,
					ease: "power3.in"
				},
				onUpdate: (e) => {
					if (e.progress > 0.99) {
						goto('anti-hate-keyboard');
					}}
			},
			opacity: 1,
			y: '+=100%'
		});

		$effect(() => {
			// gsap.to('section', {
			// 	y: -scrollStore.overScroll * 10,
			// 	duration: 0.1
			// });
			// if (scrollStore.overScroll > 50) {
			// 	gsap.to('section', {
			// 		y: '-=100vw'
			// 	});
			// }
		});
	});
</script>

<article class="relative">
	<section class="h-screen w-full flex flex-row-reverse p-4 items-center justify-end gap-4">
		<div class="min-h-0">
			<h1 class="text-white mix-blend-difference font-sans text-7xl font-bold text-wrap">
				{data?.title}
			</h1>
			<p></p>
		</div>
		<!-- 2/3 placeholder aspect ratio -->
		<div class="w-[60vw] min-w-[60vw] h-[40vw] bg-gold"></div>
	</section>
	<section class="h-screen w-full flex flex-row-reverse p-4 items-center justify-end gap-4">
		<div class="min-h-0">
			<h1 class="text-white mix-blend-difference font-sans text-7xl font-bold text-wrap">
				{data?.title}
			</h1>
			<p></p>
		</div>
		<!-- 2/3 placeholder aspect ratio -->
		<div class="w-[60vw] min-w-[60vw] h-[40vw] bg-gold"></div>
	</section>
	<aside bind:this={nextProject} class="h-[80vh] w-full">
		<div
			class="h-2/5 w-full bg-silver opacity-0 mb-auto flex items-center justify-center text-white text-center font-bold text-3xl"
			bind:this={parallax}
		>
			Keep scrolling <br />
			&gt; Next Project &gt;
		</div>
	</aside>
</article>
