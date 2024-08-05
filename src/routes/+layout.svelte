<script lang="ts">
	import { browser, dev } from '$app/environment';
	import '../app.scss';
	import { Canvas } from '@threlte/core';
	import Three from '../lib/components/Three.svelte';
	import { options } from '$lib/stores/datgui';
	import logo from '$lib/images/logo.svg';
	import { store } from '$lib/stores';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	(async () => {
		if (browser && dev) {
			await import('$lib/utils/datgui');
		}
	})();

	const ASCIIArt=["░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓██████████████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓██████████████▓▒░░▒▓█▓▒░",
"░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░",
"░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░",
"░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░",
"░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░",
"░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░      ",
"░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░"]

	// Easter egg
	const arr = [] as string[]
	function onKeyDown(e: KeyboardEvent) {
		arr.push(e.key)
		if (arr.length >= 7) arr.shift()
		if(arr.toString().replaceAll(',', '').toLowerCase() === 'namnam') {
			ASCIIArt.forEach(x=> console.log(x))

			const easterTL = gsap.timeline();
			easterTL.to('.namnam', {
				opacity: 1,
				scale: 5,
			})
			easterTL.to('.namnam', {
				opacity: 0,
				scale: 1
			})

			arr.length = 0
		}
	}

	
	onMount(() => {
		const tl = gsap.timeline({paused: true});
		gsap.set('nav p', {
			y: -200,
			opacity: 0
		});
		gsap.set('aside p', {
			x: -200,
			opacity: 0
		});
		gsap.set('footer p, footer img', {
			y: 200,
			opacity: 0
		});
		tl.to('nav p', {
			opacity: 1,
			y: 0,
			stagger: 0.3,
			duration: 0.8
		}, ">");
		tl.to('aside p', {
			opacity: 1,
			x: 0,
			stagger: 0.3,
			duration: 0.8
		}, ">");
		tl.to('footer p, footer img', {
			opacity: 1,
			y: 0,
			stagger: 0.3,
			duration: 0.8
		}, ">");

		store.subscribe((value) => {
			// console.log(value.load);
			if (value.load >= 100) tl.play();
		});

		// Temporary loading progress
		const temp = {
			load: 0
		};
		gsap.to(temp, {
			load: 100,
			duration: 2,
			onUpdate: () => {
				store.update((x) => {
					x.load = Math.abs(temp.load);
					return x;
				});
			}
		});
	});
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<div class="app min-h-screen w-screen">
	<p class="namnam opacity-0 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-9xl pointer-events-none">❤️</p>
	<header class="mix-blend-difference uppercase text-white font-mono">
		<nav class="flex gap-48 fixed w-full top-4 left-4">
			<a href="/about"><p class="">about</p></a>
			<span>
				<a href="mailto:hello@jameshenry.site"><p class="">hello@jameshenry.site</p></a>
				<a target="_blank" rel="noopener noreferrer" href="https://wa.me/6285281790980"
					><p class="">+6285281790980</p></a
				>
			</span>
			<a href="/gallery"><p class="">gallery</p></a>
		</nav>
		<aside class="fixed top-0 left-4 h-full flex flex-col justify-center">
			<a href="https://instagram.com/jamespurnama1" target="_blank" rel="noopener noreferrer"
				><p>IG</p></a
			>
			<a href="https://behance.com/jamespurnama1" target="_blank" rel="noopener noreferrer"
				><p>BE</p></a
			>
			<a href="https://linkedin.com/jamespurnama1" target="_blank" rel="noopener noreferrer"
				><p>IN</p></a
			>
		</aside>
	</header>
	<main class="flex h-screen w-full">
		<slot />
	</main>
	<div class="fixed w-screen h-screen -z-10 top-0 left-0 canvas-container">
		<Canvas rendererParameters={{ antialias: true, alpha: true }}>
			<Three />
		</Canvas>
		<!-- <div class="canvas-wrapper">
		<Canvas>
			<Elements />
		</Canvas>
		</div> -->
	</div>
	<footer
		class="fixed bottom-0 mix-blend-difference text-white flex justify-between
		uppercase font-mono w-full items-end p-4"
	>
		<img alt="James Henry Logo" class="h-8 w-auto" src={logo} />
		<span class="flex flex-col">
			<button
				on:click={() =>
					options.update((x) => {
						x.dark = !x.dark;
						return x;
					})}
				><p class="text-right text-xs leading-none">{$options.dark ? 'Dark' : 'Light'}</p></button
			>
			<a
				href="https://github.com/jamespurnama1/new-portfolio"
				target="_blank"
				rel="noopener noreferrer"
				><p class="text-right text-xs leading-none">{dev ? 'dev' : 'prod'}</p>
			</a>
			<a href="/branch"><p class="text-right text-xs leading-none">v4.0.0</p></a>
		</span>
	</footer>
</div>
