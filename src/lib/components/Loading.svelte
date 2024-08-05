<script lang="ts">
	// Supports weights 200-900
	import '@fontsource-variable/source-code-pro';
	// Supports weights 100-900
	import '@fontsource-variable/hanken-grotesk';
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { store } from '$lib/stores';

	let loadingText: HTMLHeadElement;
  const str = ['J', 'a', 'm', 'e', 's', ' ', 'H', 'e', 'n', 'r', 'y', ]
  const currentStr = [] as string[]
  
  store.subscribe(value => {
    currentStr.length = 0
    currentStr.push(...str)
    currentStr.length = parseInt((str.length*value.load/100).toString()) + 1
  })

	onMount(() => {
		gsap.to(loadingText, {
			fontWeight: 900,
			duration: 1,
			yoyo: true,
			repeat: -1,
			repeatDelay: 0.25,
			onUpdate: () => {
				if (!loadingText) return;
				loadingText.style.fontVariationSettings = "'wght' " + loadingText.style.fontWeight;
			}
		});
	});
</script>

<div class="flex items-center h-full w-full">
	<h1 bind:this={loadingText} class="text-white text-9xl font-sans mix-blend-difference">
		{currentStr.toString().replaceAll(',', '')}
	</h1>
	<p class="text-white text-9xl font-mono mix-blend-difference">&gt;{parseInt($store.load.toString())}%</p>
</div>
