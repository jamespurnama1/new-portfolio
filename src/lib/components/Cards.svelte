<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { type IntersectionEvent } from '@threlte/extras';
	import { type Mesh, type ShaderMaterial, type PlaneGeometry, type Texture, Vector2 } from 'three';
	import {
		animationStore,
		countStore,
		cursorStore,
		gptStore,
		loadStore,
		scrollStore
	} from '$lib/stores/index.svelte';
	import { optionsStore } from '$lib/stores/options.svelte';
	import fragmentShader from '../shaders/glitchFragment.glsl?raw';
	import vertexShader from '../shaders/vertex.glsl?raw';
	import gsap from 'gsap';
	import { beforeNavigate, goto } from '$app/navigation';
	import { onMount, untrack } from 'svelte';
	import { page } from '$app/stores';
	import { homePos, centerPos, enlarged, projectPage } from '$lib/utils/positions';
	import { type PageData } from '../../routes/$types';

	let easeFactor = 0.02;
	let imageMat = $state() as ShaderMaterial;
	let imageGeo = $state() as PlaneGeometry;
	let {
		texture,
		index,
		works = false,
		data
	}: {
		texture: Texture;
		index: number;
		works?: boolean;
		data: Required<PageData>;
	} = $props();
	const slug = $derived(works ? $page.params.slug : data.projects[index].slug.current.toString());
	const img = { scale: 1 };
	const sizing = 1;
	const { size } = useThrelte();
	let image: Mesh | null = $state(null);
	let loadIn = $state(true);
	let full = $state(false);
	let prevParams = $state('');
	let aberrationIntensity = 0.0;
	let mousePosition = { x: 0.5, y: 0.5 };
	let targetMousePosition = { x: 0.5, y: 0.5 };
	let prevPosition = { x: 0.5, y: 0.5 };
	// let stopPropagation = $state(false);
	const currentProject = $derived(!$page.params.slug || index === countStore.activeIndex || works);
	let transform = $state(currentProject ? projectPage(index, $size, works) : centerPos(index));
	const hidden = $derived(
		!transform.opacity ||
			!currentProject ||
			(index < countStore.activeIndex && !$page.params.slug) ||
			(optionsStore.fullscreen && !full) ||
			gptStore.opened
	);

	// Update image on scroll or size changes
	$effect(() => {
		scrollStore.scroll;
		scrollStore.overScroll;
		$size;
		loadIn;
		untrack(() => {
			if (loadIn) return;
			// on scroll, next project, afterloaded
			// console.log('[ON SCROLL]', index);
			updateImage(0);
		});
	});

	// update image on transition & fullscreen status
	$effect(() => {
		prevParams;
		$page.params.slug;
		$page.url.hash;
		// optionsStore.fullscreen;
		untrack(() => {
			if ($page.url.hash === '#reels' && slug === 'reels') {
				updateFullscreen(true);
				// window.addEventListener('keydown', escapeListener);
			} else {
				updateFullscreen(false, full && slug === 'reels');
				// if (full) window.removeEventListener('keydown', escapeListener);
			}
			if (full || prevParams === $page.params.slug) return;
			prevParams = $page.params.slug;
			// if (index === 0) console.log('[NEXT PR TRANSITION]', index);
			// scrollStore.scroll = document.documentElement.scrollTop;
			updateImage(0.2, 0.5, () => {
				loadIn = false;
				animationStore.isTransitioning = false;
			});
		});
	});

	// homepage card update
	$effect(() => {
		countStore.inertiaIndex;
		gptStore.opened;
		untrack(() => {
			if (loadIn) return;
			// console.log('[HOMEPAGE UPDATE]', index);
			updateImage(0, 0.5);
		});
	});

	//theme
	$effect(() => {
		imageMat.uniforms.inverted.value = !optionsStore.dark;
	});

	function updateFullscreen(bool: boolean, updateStore = true) {
		if (updateStore) optionsStore.fullscreen = bool;
		const el = document.getElementById(`${slug}${works ? '-' + index : ''}`);
		if (el instanceof HTMLVideoElement) {
			el.muted = !bool;
			if (bool) el.play();
		}
		full = bool;
		if (bool) {
			gsap.to(img, {
				scale: 1
			});
			// we have to set timeout here so the click doesn't run this too on the same event loop
			setTimeout(() => document.addEventListener('click', escapeListener), 0);
			window.addEventListener('keydown', escapeListener);
		} else {
			document.removeEventListener('click', escapeListener);
			window.removeEventListener('keydown', escapeListener);
		}
		updateImage(0, 0.5);
	}

	function escapeListener(e: KeyboardEvent | MouseEvent) {
		if (
			(e instanceof KeyboardEvent && e.key.toLowerCase() === 'escape') ||
			e instanceof MouseEvent
		) {
			// e.stopPropagation();
			updateFullscreen(false);
			if (slug === 'reels' && $page.url.hash === '#reels') {
				goto('/');
			}
		}
		// stopPropagation = false;
	}

	// if (index === 0) $inspect(transform.scale);

	function handleClick(event: IntersectionEvent<'click'>, index: number) {
		if (hidden) return;
		event.stopPropagation();
		// stopPropagation = true;
		// If in enlarged mode, make it smaller
		if (full && slug !== 'reels') {
			updateFullscreen(false);
		} else if (slug === 'reels' && $page.url.hash === '#reels') {
			goto('/');
			// if in works or reels, make it large
		} else if ($page.params.slug && !full) {
			updateFullscreen(true);
			// if index is same
		} else if (countStore.activeIndex === index && !$page.params.slug) {
			// if in home & selected
			if (slug === 'reels') {
				goto('/#reels');
			} else {
				goto(`/work/${slug}`);
			}
			// if in home make as selected
		} else if (!$page.params.slug) {
			countStore.inertiaIndex = index;
		}
	}

	function handleEnter(event: IntersectionEvent<'pointerover'>) {
		if (hidden || full) return;
		gsap.to(img, {
			scale: 1.5
		});
		cursorStore.cursorState = 'link';
	}

	function handleLeave(event: IntersectionEvent<'pointerleave'>) {
		gsap.to(img, {
			scale: 1
		});
		easeFactor = 0.05;
		targetMousePosition = { ...prevPosition };
		cursorStore.cursorState = '';
	}

	function handleMove(event: IntersectionEvent<'pointermove'>) {
		if (hidden) return;
		easeFactor = 0.02;
		prevPosition = { ...targetMousePosition };
		targetMousePosition.x = event.uv!.x;
		targetMousePosition.y = event.uv!.y;
		aberrationIntensity = 1;
	}

	function updateImage(delay = 0, duration = 0.01, callback?: () => void) {
		let pos;
		if (full) {
			pos = enlarged(index, 0);
		} else if (($page.params.slug || $page.url.hash) && !optionsStore.fullscreen) {
			pos = projectPage(index, $size, works, imageGeo);
		} else if (loadStore.loaded && !optionsStore.fullscreen) {
			pos = homePos(index, imageGeo, $size);
		}
		if (hidden) {
			transform.opacity = 0;
		} else {
			transform.opacity = 1;
		}
		if (!data.projectsLength) return;
		gsap.to(transform, {
			...pos,
			delay,
			duration,
			onComplete: callback ? callback : () => {}
		});
	}

	// useTask(() => {
	// 	// watch fulllscreen
	// 	optionsStore.options.fullscreen;
	// 	untrack(() => {
	// 		updateImage(0, 0.5)
	// 	})
	// })

	useTask(() => {
		mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
		mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;
		imageMat.uniforms.scale.value = img.scale;
		imageMat.uniforms.u_mouse.value.set(mousePosition.x, mousePosition.y);
		imageMat.uniforms.opacity.value = transform.opacity;

		imageMat.uniforms.u_prevMouse.value.set(prevPosition.x, prevPosition.y);

		aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
		imageMat.uniforms.u_aberrationIntensity.value = aberrationIntensity;
	});

	onMount(() => {
		texture.needsUpdate = true;
		const html = document.documentElement;
		scrollStore.scroll = html.scrollTop;
		// if ($page.params.slug) {
		// 	console.log('[PROJECT TRANSITION]', index);
		// 	projectTransition();
		// }
		// } else {
		// 	gsap.to(transform, {
		// 		...enlarged(index),
		// 		onComplete: () => {
		// 			updateImage(1.5, 0.5, () => {loadIn = false});
		// 		}
		// 	});
		// }
	});

	// $effect(() => {
	// 	$page.url.hash;
	// 	untrack(() => {
	// 		if (slug !== 'reels') return;
	// 		if ($page.url.hash === '#reels') {
	// 			updateFullscreen(true);
	// 		} else {
	// 			updateFullscreen(false);
	// 		}
	// 	});
	// });

	// exit transition to home
	beforeNavigate(({ to, cancel }) => {
		if (!to) return;
		if (to.url.toString() === '/') {
			cancel();
			updateFullscreen(false);
			scrollTo(0, 0);
			// console.log('[EXIT]', index);
			updateImage(1, 0.5, () => goto('/'));
		}
	});
</script>

<T.Mesh
	bind:ref={image as Mesh}
	scale={transform.scale}
	position={[transform.x, transform.y, transform.z]}
	onclick={(e: IntersectionEvent<'click'>) => {
		handleClick(e, index);
	}}
	onpointerover={(e: IntersectionEvent<'pointerover'>) => handleEnter(e)}
	onpointerleave={(e: IntersectionEvent<'pointerleave'>) => handleLeave(e)}
	onpointermove={(e: IntersectionEvent<'pointermove'>) => handleMove(e)}
>
	<T.PlaneGeometry
		bind:ref={imageGeo}
		args={[$size.width * sizing, (($size.width * 2) / 3) * sizing]}
	/>
	<T.ShaderMaterial
		bind:ref={imageMat}
		uniforms={{
			u_mouse: { value: new Vector2() },
			u_prevMouse: { value: new Vector2() },
			u_aberrationIntensity: { value: 0.0 },
			u_texture: { value: texture },
			textureAspect: { value: 16 / 9 },
			planeAspect: { value: 3 / 2 },
			scale: { value: 1 },
			inverted: { value: false },
			opacity: { value: 0.0 }
		}}
		transparent={true}
		{vertexShader}
		{fragmentShader}
	/>
</T.Mesh>
