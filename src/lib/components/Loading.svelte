<script lang="ts">
	// Supports weights 200-900
	import '@fontsource-variable/source-code-pro';
	// Supports weights 100-900
	import '@fontsource-variable/hanken-grotesk';
	import gsap from 'gsap';
	import { loadStore } from '$lib/stores/index.svelte';
	import { onMount, untrack } from 'svelte';

	const error = 200;
	let loadingText: HTMLHeadElement | null = $state(null);
	let errorText: HTMLHeadElement | null = $state(null);
	const str = ['J', 'a', 'm', 'e', 's', ' ', 'H', 'e', 'n', 'r', 'y'];
	const currentStr = $state([]) as string[];

	$effect(() => {
		loadStore.load;
		untrack(() => {
			currentStr.length = 0;
			currentStr.push(...str);
			currentStr.length = parseInt(((str.length * loadStore.load) / 100).toString()) + 1;
		});
		return () => gsap.killTweensOf(loadingText);
	});

	onMount(() => {
		gsap.to(loadingText, {
			fontWeight: 900,
			duration: 1,
			yoyo: true,
			repeat: -1,
			repeatDelay: 0.25,
			onUpdate: () => {
				loadingText!.style.fontVariationSettings = "'wght' " + loadingText!.style.fontWeight;
			}
		});

		// error code for later

		// gsap.to(errorText, {
		// 	fontWeight: 900,
		// 	opacity: 0,
		// 	yoyo: true,
		// 	repeat: -1,
		// 	repeatDelay: 0.25,
		// 	onUpdate: () => {
		// 		if (!errorText) return;
		// 		errorText.style.fontVariationSettings = "'wght' " + errorText.style.fontWeight;
		// 	}
		// });
	});
</script>

<div class="flex items-center h-full w-full">
	{#if error === 200}
		<div class="relative text-4xl sm:text-6xl md:text-8xl 2xl:text-9xl">
			<h1
				bind:this={loadingText}
				class="text-white font-sans mix-blend-difference"
			>
				{currentStr.toString().replaceAll(',', '')}
			</h1>
			<!-- Placeholder to avoid repaint
			<h1 bind:this={loadingText} class="opacity-0 text-9xl font-sans">James Henry</h1> -->
		</div>
	{:else}
		<h1 bind:this={errorText} class="text-white text-9xl font-sans mix-blend-difference">Error</h1>
	{/if}
	<div class="relative text-4xl sm:text-6xl md:text-8xl 2xl:text-9xl flex-1">
		<p class="text-white font-mono mix-blend-difference">
			&gt;{parseInt(loadStore.load.toString())}%
		</p>
		<!-- <p class="font-mono opacity-0">
			&gt;100%
		</p> -->
	</div>
</div>
