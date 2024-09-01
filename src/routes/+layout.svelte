<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { browser, dev } from '$app/environment';
	import '../app.scss';
	import { Canvas } from '@threlte/core';
	import Three from '../lib/components/Three.svelte';
	import { optionsStore } from '$lib/stores/datgui.svelte';
	import logo from '$lib/images/logo.svg';
	import { countStore, loadStore } from '$lib/stores/index.svelte';
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	(async () => {
		if (browser && dev) {
			await import('$lib/utils/datgui');
		}
	})();

	let { children } = $props();

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
	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
			countStore.activeIndex = false;
		} else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
			countStore.activeIndex = true;
		}

		arr.push(e.key);
		if (arr.length >= 7) arr.shift();
		if (arr.toString().replaceAll(',', '').toLowerCase() === 'namnam') {
			ASCIIArt.forEach((x) => console.log(x));

			const easterTL = gsap.timeline();
			easterTL.to('.namnam', {
				opacity: 1,
				scale: 5
			});
			easterTL.to('.namnam', {
				opacity: 0,
				scale: 1
			});

			arr.length = 0;
		}
	}

	function theme(dark: boolean, setStorage: boolean) {
		if (setStorage) localStorage.setItem('dark-theme', dark.toString());
		optionsStore.options.dark = dark;
		document.querySelector('html')!.setAttribute('data-theme', dark ? 'dark' : 'light');
	}

	onMount(() => {
		const tl = gsap.timeline({ paused: true });
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
		tl.to(
			'nav p',
			{
				opacity: 1,
				y: 0,
				stagger: 0.3,
				duration: 0.8
			},
			'>'
		);
		tl.to(
			'aside p',
			{
				opacity: 1,
				x: 0,
				stagger: 0.3,
				duration: 0.8
			},
			'>'
		);
		tl.to(
			'footer p, footer img',
			{
				opacity: 1,
				y: 0,
				stagger: 0.3,
				duration: 0.8
			},
			'>'
		);

		//check light Mode
		const colorScheme = window.matchMedia('(prefers-color-scheme:dark)');
		const localStorageTheme = localStorage.getItem('dark-theme');

		theme(localStorageTheme === null ? colorScheme.matches : localStorageTheme === 'true', false);

		colorScheme.addEventListener('change', (e) =>
			localStorageTheme === null ? theme(e.matches, false) : null
		);

		// loadStore.subscribe((value) => {
		// 	// console.log(value.load);
		// 	if (value >= 100) tl.play();
		// });

		// Temporary loading progress
		const temp = {
			load: 0
		};
		gsap.to(temp, {
			load: 100,
			duration: 2,
			onUpdate: () => {
				loadStore.load = temp.load;
				if (temp.load >= 100) tl.play();
			}
		});
	});
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<div class="app min-h-screen w-screen">
	<p
		class="namnam opacity-0 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-9xl pointer-events-none"
	>
		❤️
	</p>
	<header class="mix-blend-difference uppercase text-white font-mono z-20 relative">
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
	<main class="flex h-screen w-full overscroll-none z-10 relative">
		{#if loadStore.load < 100}
			<div
				class="w-full h-full flex items-center justify-center p-24 absolute top-0 left-0"
				transition:scale={{ duration: 500, delay: 500, start: 0.5, easing: quintOut }}
			>
				<Loading />
			</div>
		{/if}
		{@render children()}
	</main>
	<div class="fixed w-screen h-screen z-0 top-0 left-0 canvas-container">
		<Canvas>
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
		uppercase font-mono w-full items-end p-4 z-10"
	>
		<img alt="James Henry Logo" class="h-8 w-auto" src={logo} />
		<span class="flex flex-col">
			<button onclick={() => theme(!optionsStore.options.dark, true)}
				><p class="text-right text-xs leading-none">
					{optionsStore.options.dark ? 'Dark' : 'Light'}
				</p></button
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
