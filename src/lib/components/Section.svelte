<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { afterNavigate } from '$app/navigation';

	let {
		index,
		heading,
		body,
		top,
		bottom
	}: { index: number; heading?: string; body?: string; top?: string; bottom?: string } = $props();

	onMount(() => {
		animateIn();
	});

	afterNavigate(({ to }) => {
		if (to?.url.pathname.includes('work')) {
			animateIn();
		}
	});

	function animateIn() {
		gsap.to('section', {
			y: 0,
			opacity: 1,
			delay: 1
		});
	}
</script>

<section
	class="h-screen w-full flex {index % 2 === 0
		? 'flex-row-reverse'
		: 'flex-row'} p-4 items-center justify-end gap-4 translate-y-full opacity-0"
>
	<div class="min-h-0 {index % 2 === 0 ? 'mr-4' : 'ml-4'}">
		{#if heading}
			<h1
				class="text-white mix-blend-difference font-sans text-3xl sm:text-4xl md:text-6xl 2xl:text-7xl font-bold text-wrap"
			>
				{heading}
			</h1>
		{/if}
		{#if body}
			<p class="text-white mix-blend-difference">{body}</p>
		{/if}
	</div>
	<div class="w-[60vw] min-w-[60vw] flex flex-col justify-center gap-5">
		<p class="font-mono text-xs text-white uppercase {top ? '' : 'opacity-0'}">{top ? top : ''}</p>
		<!-- 2/3 placeholder aspect ratio -->
		<div class="w-[60vw] min-w-[60vw] h-[40vw]"></div>
		<p class="font-mono text-xs text-white {bottom ? '' : 'opacity-0'}">{bottom ? bottom : ''}</p>
	</div>
</section>
