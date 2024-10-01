<script lang="ts">
	import { tick, untrack } from 'svelte';
	import { page } from '$app/stores';
	import { countStore, cursorStore, homeStore, loadStore } from '$lib/stores/index.svelte';
	import RiveCanvas, { type SMIInput } from '@rive-app/canvas-advanced';
	import { onDestroy, onMount } from 'svelte';
	import debounce from '$lib/utils/debounce';
	import { useThrelte } from '@threlte/core';

	const currentPath = $page.url.pathname;

	let link = $state() as SMIInput;
	let scroll = $state() as SMIInput;

	function onHover() {
		if (homeStore.isAnimating) {
			scroll.value = false;
			link.value = false;
		} else {
			link.value = true;
		}
	}
	function onLeave() {
		link.value = false;
	}

	const { size } = useThrelte();

	$effect(() => {
		//TODO: updates too fast
		currentPath;
		loadStore.loaded;
		let selectable: NodeListOf<HTMLButtonElement>;
		untrack(() => {
			tick().then(() => {
				selectable = document.querySelectorAll('a, button');
				selectable.forEach((el) => {
					el.addEventListener('mouseover', onHover);
					el.addEventListener('mouseleave', onLeave);
				});
			});
		});
		return () => {
			selectable.forEach((el) => {
				el.removeEventListener('mouseover', onHover);
				el.removeEventListener('mouseleave', onLeave);
			});
		};
	});

	$effect(() => {
		cursorStore.cursorState;
		untrack(() => {
			if (!scroll || !loadStore.loaded) return;
			if (cursorStore.cursorState === 'link') {
				onHover();
			} else if (cursorStore.cursorState === 'scroll') {
				scroll.value = true;
			} else {
				onLeave();
			}
		});
	});

	let {
		canvas = $bindable(),
		riveTask = $bindable(),
		loadingAnim
	}: {
		canvas: HTMLCanvasElement;
		riveTask: (time?: number) => void;
		loadingAnim: Function;
	} = $props();

	function toNormal() {
		setTimeout(() => {
			scroll.value = false;
		}, 500);
	}

	const debouncedCursor = debounce(toNormal, 500);

	$effect(() => {
		countStore.inertiaIndex;
		untrack(() => {
			if (!scroll || !loadStore.loaded) return;
			if (homeStore.isAnimating) {
				scroll.value = false;
				link.value = false;
			} else {
				scroll.value = true;
				debouncedCursor();
			}
		});
	});

	$effect(() => {
		if (!canvas) return;
		canvas.width = $size.width;
		canvas.height = $size.height;
	});

	onMount(async () => {
		canvas = document.createElement('canvas');
		document.body.appendChild(canvas);
		canvas.className = 'riveCanvas';
		const rive = await RiveCanvas({
			// Loads Wasm bundle
			locateFile: (_) => `https://unpkg.com/@rive-app/canvas-advanced@2.20.1/rive.wasm`
		});
		const renderer = rive.makeRenderer(canvas);
		const bytes = await (await fetch(new Request('/cursor.riv'))).arrayBuffer();
		const file = await rive.load(new Uint8Array(bytes));
		const artboard = file.artboardByName('Cursor');
		const stateMachine = new rive.StateMachineInstance(
			artboard.stateMachineByName('Main'),
			artboard
		);

		scroll = stateMachine.input(1).asBool();
		link = stateMachine.input(0).asBool();

		riveTask = (delta) => {
			if (!renderer || !artboard || !stateMachine) return;
			renderer.clear();
			stateMachine.advance(delta!);
			artboard.advance(delta!);
			renderer.save();
			renderer.align(
				rive.Fit.contain,
				rive.Alignment.topRight,
				{
					minX: 0,
					minY: 0,
					maxX: canvas.width,
					maxY: canvas.height
				},
				artboard.bounds
			);
			artboard.draw(renderer);
			renderer.restore();
			rive.resolveAnimationFrame();
		};

		loadingAnim();
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
