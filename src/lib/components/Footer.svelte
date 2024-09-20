<script lang="ts">
	import { gsap } from 'gsap';
  import logo from '$lib/images/logo.svg';
  import theme from '$lib/utils/theme';
  import { optionsStore } from '$lib/stores/datgui.svelte';
  import { dev } from '$app/environment';

	export function afterLoad() {
		gsap.to('footer a, footer button', {
			opacity: 1,
			y: 0,
			stagger: 0.3,
			duration: 0.8
		});
	}
</script>

<footer
	class="fixed bottom-0 mix-blend-difference text-white flex justify-between
		uppercase font-mono w-full items-end p-4 z-10 overflow-hidden"
>
	<a href="/" class="h-8 w-auto group translate-y-full opacity-0">
		<img
			alt="James Henry Logo"
			class="h-full w-full object-contain group-hover:!scale-125 transition-transform"
			src={logo}
		/>
	</a>
	<span class="flex flex-col">
		<button
			class="translate-y-full opacity-0"
			onclick={() => theme(!optionsStore.options.dark, true)}
			><p class="text-right text-xs leading-none">
				{optionsStore.options.dark ? 'Dark' : 'Light'}
			</p></button
		>
		<a
			href="https://github.com/jamespurnama1/new-portfolio"
			target="_blank"
			rel="noopener noreferrer"
			class="translate-y-full opacity-0"
			><p class="text-right text-xs leading-none">{dev ? 'dev' : 'prod'}</p>
		</a>
		<a href="/branch"><p class="text-right text-xs leading-none translate-y-full opacity-0">v4.0.0</p></a>
	</span>
</footer>
