<script lang="ts">
	import { page } from '$app/stores';
	import { countStore, cursorStore, homeStore, loadStore } from '$lib/stores/index.svelte';
	import * as rive from '@rive-app/canvas-lite';
	import { onMount } from 'svelte';
	import debounce from '$lib/utils/debounce';
	const currentPath = $page.url.pathname;

	let link = $state() as rive.StateMachineInput;
	let scroll = $state() as rive.StateMachineInput;

	function onHover() {
		link.value = true;
	}
	function onLeave() {
		link.value = false;
	}

	$effect(() => {
		currentPath;
		loadStore.loaded;
		const selectable = document.querySelectorAll('a, button') as NodeListOf<
			HTMLAnchorElement | HTMLButtonElement
		>;
		selectable.forEach((el) => {
			el.addEventListener('mouseover', onHover);
			el.addEventListener('mouseleave', onLeave);
		});
		return () => {
			selectable.forEach((el) => {
				el.removeEventListener('mouseover', onHover);
				el.removeEventListener('mouseleave', onLeave);
			});
		};
	});

	$effect(() => {
		if (!scroll || !loadStore.loaded) return;
		if (cursorStore.cursorState === 'link') {
			onHover();
		} else if (cursorStore.cursorState === 'scroll') {
			scroll.value = true;
		} else {
			onLeave();
		}
	});

	let {
		width,
		height,
		riveCanvas = $bindable(),
		loadingAnim
	}: {
		width: number;
		height: number;
		riveCanvas: HTMLCanvasElement;
		loadingAnim: Function;
	} = $props();

	const layout = new rive.Layout({
		fit: rive.Fit.ScaleDown,
		alignment: rive.Alignment.TopRight
	});

	function toNormal() {
		setTimeout(() => {
			scroll.value = false;
		}, 500);
	}

	const debouncedCursor = debounce(toNormal, 500);

	$effect(() => {
		countStore.inertiaIndex;
		if (!scroll || !loadStore.loaded) return;
		if (homeStore.isAnimating) {
			scroll.value = false;
			link.value = false;
		} else {
			scroll.value = true;
			debouncedCursor();
		}
	});

	onMount(() => {
		riveCanvas = document.createElement('canvas');
		document.body.appendChild(riveCanvas);
		riveCanvas.className = 'riveCanvas';
		riveCanvas.width = width;
		riveCanvas.height = height;
		const r = new rive.Rive({
			src: '/cursor.riv',
			canvas: riveCanvas,
			autoplay: true,
			layout,
			stateMachines: 'Main',
			onLoad: () => {
				loadingAnim();
				const inputs = r.stateMachineInputs('Main');
				link = inputs.find((i) => i.name === 'link') as rive.StateMachineInput;
				scroll = inputs.find((i) => i.name === 'scroll') as rive.StateMachineInput;
			}
		});
	});
</script>

<style>
	:global(.riveCanvas) {
		position: absolute;
		top: 0;
		opacity: 0%;
		pointer-events: none;
	}
</style>
