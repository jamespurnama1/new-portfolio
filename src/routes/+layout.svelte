<script>
	 import { Canvas } from '@threlte/core'
	import Three from '../components/Three.svelte';
	import '../app.scss';
</script>

<div class="app">
	<main>
		<slot />
	</main>
	<div class="fixed w-screen h-screen -z-0">
	<Canvas>
		<Three />
	</Canvas>
</div>
	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style lang="postcss">
</style>
