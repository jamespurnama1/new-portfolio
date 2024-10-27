<script lang="ts">
	import { page } from '$app/stores';
	import { gptStore, loadStore } from '$lib/stores/index.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
</script>

<header
	class="mix-blend-difference uppercase text-white text-xs font-mono z-20 relative overflow-hidden"
>
	<nav class="flex justify-between items-start fixed w-full p-4 top-0 left-0">
		{#if loadStore.loaded}
			<a transition:fly={{ y: -200, duration: 500, easing: cubicInOut }} href="/about"
				><p>about</p></a
			>
			<!-- <button
				transition:fly={{ y: -200, duration: 500, easing: cubicInOut, delay: 100 }}
				on:click={() => gptStore.opened = true}>
				<p class="uppercase">ask me anything</p></button
			> -->
			<span>
				<a
					transition:fly={{ y: -200, duration: 500, easing: cubicInOut, delay: 100 }}
					class="block"
					href="mailto:hello@jameshenry.site"><p>hello@jameshenry.site</p></a
				>
				<a
					class="block"
					target="_blank"
					rel="noopener noreferrer"
					href="https://wa.me/6285281790980"
					transition:fly={{ y: -200, duration: 500, easing: cubicInOut, delay: 100 }}
					><p>+6285281790980</p></a
				>
			</span>
			<a href="/gallery"><p>gallery</p></a>
			<a
				transition:fly={{ y: -200, duration: 500, easing: cubicInOut, delay: 200 }}
				class="goback"
				class:invisible={$page.url.pathname === '/'}
				href="/"><p>go back</p></a
			>
		{/if}
	</nav>
	<aside class="fixed top-0 right-4 h-full flex flex-col justify-center text-right -z-0">
		{#if loadStore.loaded}
			<a
				href="https://instagram.com/jamespurnama1"
				target="_blank"
				rel="noopener noreferrer"
				transition:fly={{ x: 200, duration: 500, easing: cubicInOut, delay: 300 }}><p>IG</p></a
			>
			<a
				href="https://github.com/jamespurnama1"
				target="_blank"
				rel="noopener noreferrer"
				transition:fly={{ x: 200, duration: 500, easing: cubicInOut, delay: 400 }}><p>GH</p></a
			>
			<a
				href="https://behance.com/jamespurnama"
				target="_blank"
				rel="noopener noreferrer"
				transition:fly={{ x: 200, duration: 500, easing: cubicInOut, delay: 500 }}><p>BE</p></a
			>
			<a
				href="https://www.linkedin.com/in/jamespurnama"
				target="_blank"
				rel="noopener noreferrer"
				transition:fly={{ x: 200, duration: 500, easing: cubicInOut, delay: 600 }}><p>IN</p></a
			>
		{/if}
	</aside>
</header>
