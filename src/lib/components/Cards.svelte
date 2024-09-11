<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { type IntersectionEvent } from '@threlte/extras';
	import * as THREE from 'three';
	import { projectsStore, countStore, homeStore, cursorStore } from '$lib/stores/index.svelte';
	import { optionsStore } from '$lib/stores/datgui.svelte';
	import fragmentShader from '../shaders/glitchFragment.glsl?raw';
	import vertexShader from '../shaders/vertex.glsl?raw';
	import gsap from 'gsap';
	import { goto } from '$app/navigation';

	let easeFactor = 0.02;
	let imageMat = $state() as THREE.ShaderMaterial;
	let imageGeo = $state() as THREE.PlaneGeometry;
	let { texture, index }: { texture: THREE.Texture; index: number } = $props();
	const img = { scale: 1 };
	const sizing = 0.5;
	const { size } = useThrelte();
	let image: THREE.Mesh | null = $state(null);
	let transform = $state({
		x: 0,
		y: 0,
		z: -0.6 * (index - 1),
		scale: 2,
		opacity: 0
	});
	let loadIn = $state(true);

	let aberrationIntensity = 0.0;
	let mousePosition = { x: 0.5, y: 0.5 };
	let targetMousePosition = { x: 0.5, y: 0.5 };
	let prevPosition = { x: 0.5, y: 0.5 };

	$effect(() => {
		if (loadIn) {
			gsap.to(transform, {
				scale: 0.8,
				z: 0.6 * (index - 1),
				delay: index / projectsStore.projectsLength,
				opacity: 1,
				onComplete: () => {
					setTimeout(() => (loadIn = false), 200);
				}
			});
		} else {
			updateImage(countStore.inertiaIndex);
		}
	});

	$effect(() => {
		imageMat.uniforms.inverted.value = !optionsStore.options.dark;
	});

	function handleClick(event: IntersectionEvent<'click'>, index: number) {
		event.stopPropagation();
		if (countStore.inertiaIndex === index) {
			projectsStore.projects.then(x => goto(`/${x[index].slug.current}`));
		} else {
			countStore.inertiaIndex = index;
		}
	}

	function handleEnter(event: IntersectionEvent<'pointerover'>) {
		if (index === countStore.inertiaIndex) {
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
		if (!transform.opacity || index !== countStore.inertiaIndex) return;
		easeFactor = 0.02;
		prevPosition = { ...targetMousePosition };
		targetMousePosition.x = event.uv!.x;
		targetMousePosition.y = event.uv!.y;

		aberrationIntensity = 1;
	}

	function updateImage(active: number, delay = 0) {
		if (!projectsStore.projectsLength) return;
		gsap.to(transform, {
			x: imageGeo.parameters.width * ((active - index - 1) * 0.1) - $size.width * 0.15,
			y:
				imageGeo.parameters.height * ((active - index - 1) * 0.1) +
				imageGeo.parameters.height * 0.05,
			z: 0.6 * (active - index - 1) - 10,
			scale: 1 + (active - index - 1) / projectsStore.projectsLength,
			opacity: Math.min(Math.max(0, index + 1 - active), 1),
			delay
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
</script>

<!-- svelte-ignore state_referenced_locally -->
<T.Mesh
	bind:ref={image}
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
	<!-- <T.MeshBasicMaterial zoom={$zoom} map={texture} /> -->
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
