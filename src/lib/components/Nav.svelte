<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { loadStore } from '$lib/stores/index.svelte';
	import { gsap } from 'gsap';

	export function afterLoad() {
		const tl = gsap.timeline();
		tl.to(
			'nav a',
			{
				opacity: 1,
				y: 0,
				stagger: 0.3,
				duration: 0.8
			},
			'>'
		);
		tl.to(
			'aside a',
			{
				opacity: 1,
				x: 0,
				stagger: 0.3,
				duration: 0.8
			},
			'>'
		);
	}

	afterNavigate(({ to }) => {
		if(!loadStore.loaded) return;
		let opacity = 0;
		let y = '100%';
		if (to?.route.id!.includes('work')) {
			opacity = 1;
			y = '0%';
		}
		gsap.to('.goback', {
			opacity,
			y,
			stagger: 0.3,
			duration: 0.8
		});
	});
</script>

<header class="mix-blend-difference uppercase text-white font-mono z-20 relative overflow-hidden">
	<nav class="flex justify-between fixed w-full p-4 top-0 left-0">
		<a class="-translate-y-full opacity-0" href="/about"><p>about</p></a>
		<span>
			<a class="-translate-y-full opacity-0" href="mailto:hello@jameshenry.site"
				><p>hello@jameshenry.site</p></a
			>
			<a
				class="-translate-y-full opacity-0"
				target="_blank"
				rel="noopener noreferrer"
				href="https://wa.me/6285281790980"><p>+6285281790980</p></a
			>
		</span>
		<a class="-translate-y-full opacity-0" href="/gallery"><p>gallery</p></a>
		{#if $page.params.slug}
			<a class="goback -translate-y-full opacity-0" href="/"><p>go back</p></a>
		{/if}
	</nav>
	<aside class="fixed top-0 right-4 h-full flex flex-col justify-center text-right">
		<a
			class="translate-x-full opacity-0"
			href="https://instagram.com/jamespurnama1"
			target="_blank"
			rel="noopener noreferrer"><p>IG</p></a
		>
		<a
			class="translate-x-full opacity-0"
			href="https://behance.com/jamespurnama"
			target="_blank"
			rel="noopener noreferrer"><p>BE</p></a
		>
		<a
			class="translate-x-full opacity-0"
			href="https://linkedin.com/jamespurnama1"
			target="_blank"
			rel="noopener noreferrer"><p>IN</p></a
		>
	</aside>
</header>
