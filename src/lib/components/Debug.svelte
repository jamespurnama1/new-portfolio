<script lang="ts">
	import { optionsStore } from '$lib/stores/options.svelte';
	import { loadStore, notificationStore, scrollStore } from '$lib/stores/index.svelte';
	import { Pane, Button, Slider, Folder, ThemeUtils, type Theme } from 'svelte-tweakpane-ui';
	import { theme } from '$lib/utils/theme';

	const { addMessage }: { addMessage: () => void } = $props();

	let expanded = $state(false);

	const debugTheme: Theme = {
		...ThemeUtils.presets.jetblack
	};
</script>

<Pane title="Debugging" position="fixed" theme={debugTheme} bind:expanded>
	<Folder title="WebGL">
		<Slider label="Noise Factor" bind:value={optionsStore.options.noiseFactor} min={0.1} max={50} />
		<Slider
			label="Noise Scale"
			bind:value={optionsStore.options.noiseScale}
			min={0.002}
			max={0.01}
		/>
		<Slider
			label="RGB Persist Factor"
			bind:value={optionsStore.options.rgbPersistFactor}
			min={0.01}
			max={0.99}
		/>
		<Slider
			label="Alpha Persist Factor"
			bind:value={optionsStore.options.alphaPersistFactor}
			min={0.01}
			max={0.99}
		/>
		<Button
			title="Toggle Sources"
			on:click={() => {
				const canvas = document.querySelector('.riveCanvas') as HTMLCanvasElement;
				optionsStore.options.showSources = !optionsStore.options.showSources;
				if (canvas) canvas.style.opacity = optionsStore.options.showSources ? '1' : '0';
			}}
		/>
	</Folder>
	<Slider
		label="Force Scroll"
		bind:value={scrollStore.offset}
		min={0}
		max={document.documentElement.scrollHeight * 2}
	/>
	<Button
		title="Force Load"
		on:click={() => {
			loadStore.load = 100;
		}}
	/>
	<Button
		title="Invert"
		on:click={() => {
			theme(!optionsStore.options.dark);
		}}
	/>
	<Button
		title="Test Notification"
		on:click={() => {
			notificationStore.opened = true;
		}}
	/>
	<Button
		title="Add Message"
		on:click={() => {
			addMessage();
		}}
	/>
</Pane>

<style lang="scss">
	:global(.tp-dfwv) {
		position: fixed !important;
		z-index: 999;
	}
	:global(.tp-dfwv *) {
		cursor: auto !important;
	}
</style>
