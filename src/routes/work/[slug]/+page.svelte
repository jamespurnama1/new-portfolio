<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { scrollStore } from '$lib/stores/index.svelte';
	import Section from '$lib/components/Section.svelte';
	import debounce from '$lib/utils/debounce';
	import { gsap } from 'gsap';
	import { onMount, untrack } from 'svelte';
		import { type PageData } from './$types';

	const { data }: { data: Required<PageData> } = $props();

	let sectionComponent = $state([]) as Section[];
	let animating = true;
	let num = [
		{ heading: 'Anti-Hate Keyboard' },
		{ body: 'Lorem ipsum dolor sit amet.' },
		{ body: 'Lorem ipsum dolor sit amet.' },
		{ body: 'Lorem ipsum dolor sit amet.' },
		{ body: 'Lorem ipsum dolor sit amet.' },
		{ body: 'Lorem ipsum dolor sit amet.' }
	];

	function overScroll() {
		gsap.to(scrollStore, {
			overScroll: 0,
			duration: 0.5,
			ease: 'power4.out'
		});
	}

	const mapper = gsap.utils.mapRange(0, 300, 0, 100);
	const debouncedOverscroll = debounce(overScroll, 50);

	$effect(() => {
		scrollStore.overScroll;
		untrack(() => {
			if (animating) return;
			// gsap.killTweensOf('section');
			gsap.set('section', {
				y: `-${(Math.log10(scrollStore.overScroll / 100) + 1.5) * 100}`,
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
		animateIn();
	});
	const current = data.projects.find((x) => x.slug.current === $page.params.slug);
	if (!current) {
		throw new Error('not found');
		// goto('404');
	}


	function animateIn() {
		gsap.set('.gradient-top', {
			opacity: 1
		});
		gsap.to('.gradient-top', {
			opacity: 0,
			delay: 1,
			onComplete: () => {
				animating = false;
			}
		});
	}
</script>

<aside class="fixed top-0 h-[40vh] w-full gradient-top -z-30"></aside>
<article class="relative overflow-hidden self-start">
	{#each current.content as item, index}
		<Section bind:this={sectionComponent[index]} {index} body={item.body} heading={item.headline} />
	{/each}
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
