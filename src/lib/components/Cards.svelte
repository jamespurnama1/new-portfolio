<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { type IntersectionEvent } from '@threlte/extras';
	import * as THREE from 'three';
	import { countStore, cursorStore, scrollStore } from '$lib/stores/index.svelte';
	import { optionsStore } from '$lib/stores/options.svelte';
	import fragmentShader from '../shaders/glitchFragment.glsl?raw';
	import vertexShader from '../shaders/vertex.glsl?raw';
	import gsap from 'gsap';
	import { goto } from '$app/navigation';
	import { onMount, untrack } from 'svelte';
	import { page } from '$app/stores';
	import { homePos, centerPos, fullscreen, enlarged, projectPage } from '$lib/utils/positions';
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
	const img = { scale: 1 };
	const sizing = 1;
	const { size } = useThrelte();
	let image: THREE.Mesh | null = $state(null);
	let transform = $state(centerPos(index));
	let loadIn = $state(true);
	let prevParams = $state('');
	let aberrationIntensity = 0.0;
	let mousePosition = { x: 0.5, y: 0.5 };
	let targetMousePosition = { x: 0.5, y: 0.5 };
	let prevPosition = { x: 0.5, y: 0.5 };

	$effect(() => {
		if (prevParams !== $page.params.slug) {
			prevParams = $page.params.slug;
			loadIn = true;
			projectTransition();
		}
		scrollStore.scroll;
		untrack(() => {
			if (loadIn) return;
			updateImage(0);
		});
	});

	$effect(() => {
		countStore.inertiaIndex;
		updateImage(0, 0.5);
	});

	$effect(() => {
		imageMat.uniforms.inverted.value = !optionsStore.options.dark;
	});

	function handleClick(event: IntersectionEvent<'click'>, index: number) {
		event.stopPropagation();
		if (countStore.inertiaIndex === index) {
			goto(`/work/${data.projects[index].slug.current}`);
		} else {
			countStore.inertiaIndex = index;
		}
	}

	function handleEnter(event: IntersectionEvent<'pointerover'>) {
		if (index === countStore.inertiaIndex || works) {
			gsap.to(img, {
				scale: 1.5
			});
		}
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
		if (!transform.opacity || (!works && index !== countStore.inertiaIndex)) return;
		easeFactor = 0.02;
		prevPosition = { ...targetMousePosition };
		targetMousePosition.x = event.uv!.x;
		targetMousePosition.y = event.uv!.y;
		aberrationIntensity = 1;
	}

	function updateImage(delay = 0, duration = 0.01) {
		let pos;
		if ($page.params.slug) {
			const html = document.documentElement;
			scrollStore.scroll = html.scrollTop;
			pos = projectPage(index, imageGeo, $size, works);
		} else {
			pos = homePos(index, imageGeo, $size);
		}
		if (!data.projectsLength) return;
		gsap.to(transform, {
			...pos,
			delay,
			duration
		});
	}

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

	function projectTransition() {
		gsap.to(transform, {
			...fullscreen(index, imageGeo, $size),
			onComplete: () => {
				setTimeout(() => {
					loadIn = false;
					updateImage(0, 0.5);
				}, 200);
			}
		});
	}

	onMount(() => {
		texture.needsUpdate = true;
		if ($page.params.slug) {
			projectTransition();
		} else {
			gsap.to(transform, {
				...enlarged(index),
				onComplete: () => {
					setTimeout(() => {
						loadIn = false;
						updateImage(0, 0.5);
					}, 200);
				}
			});
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
