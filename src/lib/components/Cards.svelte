<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { type IntersectionEvent } from '@threlte/extras';
	import * as THREE from 'three';
	import { projectsStore, countStore, homeStore } from '$lib/stores/index.svelte';
	import { optionsStore } from '$lib/stores/datgui.svelte';
	import fragmentShader from '../shaders/glitchFragment.glsl?raw';
	import vertexShader from '../shaders/vertex.glsl?raw';
	import gsap from 'gsap';

	let easeFactor = 0.02;
	let imageMat = $state() as THREE.ShaderMaterial;
	let { texture, index }: { texture: THREE.Texture; index: number } = $props();
	const img = {scale: 1};
	const sizing = 0.5;
	const { size } = useThrelte();
	let image: THREE.Mesh | null = $state(null);
	let transform = $state({
		x: 0,
		y: 0,
		z: 0,
		scale: 1 - (Math.abs(countStore.inertiaIndex - index) / projectsStore.projectsLength) * 2,
		opacity: 1.0
	});

	let aberrationIntensity = 0.0;
	let mousePosition = { x: 0.5, y: 0.5 };
	let targetMousePosition = { x: 0.5, y: 0.5 };
	let prevPosition = { x: 0.5, y: 0.5 };

	$effect(() => {
		updateImage(countStore.inertiaIndex);
	});

	$effect(() => {
		imageMat.uniforms.inverted.value = !optionsStore.options.dark
	})

	$effect(() => {
		gsap.to(transform, {
			opacity: homeStore.isAnimating ? 0.0 : 1.0,
			onUpdate: () => {
				imageMat.uniforms.opacity.value = transform.opacity;
			}
		})
	})

	function stopPropagation(event: IntersectionEvent<'pointerover' | 'pointerleave'>) {
		event.stopPropagation();

		if (event.intersections.length) {
			gsap.to(img, {
				scale: 1.5,
				onUpdate: () => {
					imageMat.uniforms.scale.value = img.scale
				}
			});
		} else {
			gsap.to(img, {
				scale: 1,
				onUpdate: () => {
					imageMat.uniforms.scale.value = img.scale
				}
			});
			easeFactor = 0.05;
			targetMousePosition = { ...prevPosition };
		}
	}

	function handleMove(event: IntersectionEvent<'pointermove'>) {
		easeFactor = 0.02;
		prevPosition = { ...targetMousePosition };

		targetMousePosition.x = event.intersections[0].uv!.x;
		targetMousePosition.y = event.intersections[0].uv!.y;

		aberrationIntensity = 1;
	}

	function updateImage(active: number) {
		if (!projectsStore.projectsLength) return;

		transform.x = $size.width * ((active - index - 1) * 0.05) - $size.width * 0.15;
		transform.y = $size.height * (active - index - 1) * 0.5 + $size.height * 0.4;
		transform.z = -0.6 * (active - index - 1) - 10;
		transform.scale = 0.7 - (active - index - 1) / projectsStore.projectsLength;
		transform.opacity = index === Math.round(active) ? 1 : 0.3;
	}

	useTask(() => {
		mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
		mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

		imageMat.uniforms.u_mouse.value.set(mousePosition.x, mousePosition.y);

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
	onclick={(e: IntersectionEvent<'click'>) => console.log(e, index)}
	onpointerover={(e: IntersectionEvent<'pointerover'>) => stopPropagation(e)}
	onpointerleave={(e: IntersectionEvent<'pointerleave'>) => stopPropagation(e)}
	onpointermove={(e: IntersectionEvent<'pointermove'>) => handleMove(e)}
>
	<T.PlaneGeometry args={[$size.width * sizing, (($size.width * 2) / 3) * sizing]} />
	<!-- <T.MeshBasicMaterial zoom={$zoom} map={texture} /> -->
	<T.ShaderMaterial
		bind:ref={imageMat}
		uniforms={{
			u_mouse: { value: new THREE.Vector2() },
			u_prevMouse: { value: new THREE.Vector2() },
			u_aberrationIntensity: { value: 0.0 },
			u_texture: { value: texture },
			textureAspect: { value: texture.image.width / texture.image.height },
			planeAspect: { value: 3 / 2 },
			scale: { value: 1 },
			inverted: {value: false },
			opacity: {value: 1.0}
		}}
		transparent={true}
		{vertexShader}
		{fragmentShader}
	/>
</T.Mesh>
