<script lang="ts">
	import { gsap } from 'gsap';
  import logo from '$lib/images/logo.svg';
  import { theme } from '$lib/utils/theme';
  import { optionsStore } from '$lib/stores/options.svelte';
  import { dev } from '$app/environment';
	import { loadStore } from '$lib/stores/index.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
</script>

<footer
	class="fixed bottom-0 mix-blend-difference text-white flex justify-between
		uppercase font-mono w-full items-end p-4 z-20 overflow-hidden"
>
{#if loadStore.loaded}
	<a href="/" class="h-8 w-auto group" transition:fly={{ y: 200, duration: 500, easing: cubicInOut, delay: 900 }}>
		<img
			alt="James Henry Logo"
			class="h-full w-full object-contain group-hover:!scale-125 transition-transform"
			src={logo}
		/>
	</a>
	<span class="flex flex-col">
		<button
			onclick={() => theme(!optionsStore.options.dark, true)}
			transition:fly={{ y: 200, duration: 500, easing: cubicInOut, delay: 700 }}
			><p class="text-right text-xs leading-none uppercase">
				{optionsStore.options.dark ? 'Dark' : 'Light'}
			</p></button
		>
		<a
			href="https://github.com/jamespurnama1/new-portfolio"
			target="_blank"
			rel="noopener noreferrer"
			transition:fly={{ y: 200, duration: 700, easing: cubicInOut, delay: 600 }}
			><p class="text-right text-xs leading-none">{dev ? 'dev' : 'prod'}</p>
		</a>
		<a href="/branch" transition:fly={{ y: 200, duration: 500, easing: cubicInOut, delay: 800 }}><p class="text-right text-xs leading-none">v4.0.0</p></a>
	</span>
	{/if}
</footer>
