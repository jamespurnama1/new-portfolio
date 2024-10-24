<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { type IntersectionEvent } from '@threlte/extras';
	import * as THREE from 'three';
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
	let imageMat = $state() as THREE.ShaderMaterial;
	let imageGeo = $state() as THREE.PlaneGeometry;
	let {
		texture,
		index,
		works = false,
		data
	}: {
		texture: THREE.Texture;
		index: number;
		works?: boolean;
		data: Required<PageData>;
	} = $props();
	const slug = $derived(data.projects[index].slug.current);
	const img = { scale: 1 };
	const sizing = 1;
	const { size } = useThrelte();
	let image: THREE.Mesh | null = $state(null);
	let transform = $state(works ? projectPage(index, $size, works) : centerPos(index));
	let loadIn = $state(true);
	let full = $state(false);
	let prevParams = $state('');
	let aberrationIntensity = 0.0;
	let mousePosition = { x: 0.5, y: 0.5 };
	let targetMousePosition = { x: 0.5, y: 0.5 };
	let prevPosition = { x: 0.5, y: 0.5 };

	const currentProject = $derived(index === countStore.inertiaIndex || works);

	// Update image on scroll
	$effect(() => {
		scrollStore.scroll;
		scrollStore.overScroll;
		$size;
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
		optionsStore.options.fullscreen;
		untrack(() => {
			if (full && prevParams === $page.params.slug) return;
			prevParams = $page.params.slug;
			// console.log('[NEXT PR TRANSITION]', index);
			scrollStore.scroll = document.documentElement.scrollTop;
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
		imageMat.uniforms.inverted.value = !optionsStore.options.dark;
	});

	function updateFullscreen(bool: boolean) {
		optionsStore.options.fullscreen = bool;
		full = bool;
		updateImage(0, 0.5);
	}

	const hidden = $derived(!transform.opacity || !currentProject);

	function escapeListener(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			updateFullscreen(false);
		}
	}

	// if (index === 0) $inspect(transform.scale);

	function handleClick(event: IntersectionEvent<'click'>, index: number) {
		event.stopPropagation();
		if (!transform.opacity) return;
		if (full) {
			updateFullscreen(false);
			window.addEventListener('keydown', escapeListener);
		} else if ($page.params.slug && !full) {
			updateFullscreen(true);
			window.removeEventListener('keydown', escapeListener);
			// console.log('[ENLARGE TOGGLE]', index);
		} else {
			if (countStore.inertiaIndex === index) {
				if (slug === 'reels' && full) {
					goto('/');
				} else if (slug === 'reels') {
					goto('/#reels');
				} else {
					goto(`/work/${slug}`);
				}
			} else {
				countStore.inertiaIndex = index;
			}
		}
	}

	function handleEnter(event: IntersectionEvent<'pointerover'>) {
		if (hidden) return;
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
		} else if ($page.params.slug && !optionsStore.options.fullscreen) {
			pos = projectPage(index, $size, works, imageGeo);
		} else if (loadStore.loaded && !optionsStore.options.fullscreen) {
			pos = homePos(index, imageGeo, $size);
		}
		if ((optionsStore.options.fullscreen && !full) || gptStore.opened) {
			hide();
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

	function hide() {
		// console.log('hide')
		// gsap.to(transform, {
		// 	opacity: 0,
		// 	duration: 0.5
		// });
		transform.opacity = 0;
	}

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
	// 		if ($page.url.hash !== '#reels') {
	// 			updateFullscreen(true);
	// 		} else {
	// 			updateFullscreen(false);
	// 		}
	// 	});
	// });

	// exit transition to home
	beforeNavigate(({ to, cancel }) => {
		if (!to) return;
		console.log(to.url);
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
	bind:ref={image as THREE.Mesh}
	scale={transform.scale}
	position={[transform.x, transform.y, transform.z]}
	onclick={(e: IntersectionEvent<'click'>) => {
		if (index >= countStore.inertiaIndex) handleClick(e, index);
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
			u_mouse: { value: new THREE.Vector2() },
			u_prevMouse: { value: new THREE.Vector2() },
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
