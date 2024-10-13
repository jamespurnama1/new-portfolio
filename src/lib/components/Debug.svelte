<script lang="ts">
	import { optionsStore } from '$lib/stores/options.svelte';
	import { loadStore, notificationStore, scrollStore } from '$lib/stores/index.svelte';
	import { Pane, Button, Slider, Folder, ThemeUtils, type Theme } from 'svelte-tweakpane-ui';
	import { theme } from '$lib/utils/theme';

	const { pushMessage }: { pushMessage: (speaker: string, message: string) => void } = $props();

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
			pushMessage(
				'James Henry',
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor laoreet ligula, quis laoreet arcu lobortis nec. Curabitur ut volutpat ex. Vestibulum fermentum finibus viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam sit amet lacus vestibulum, lobortis sem quis, feugiat elit. Morbi congue bibendum nisi, vel feugiat nulla varius ornare. Suspendisse potenti. Donec sagittis arcu neque, vel rutrum odio mattis vel. Etiam sagittis accumsan facilisis. Donec faucibus gravida leo, non dignissim nunc convallis non. Vivamus convallis egestas neque, non mattis nibh pretium in. Suspendisse consequat, massa eget luctus convallis, turpis mauris ullamcorper enim, at laoreet sapien lorem non velit. Aliquam aliquet venenatis neque, vitae tempus risus sollicitudin sed. In porta neque nisi, in elementum nisi molestie ut.'
			);
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
