<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { useFBO, ImageMaterial, useTexture } from '@threlte/extras';
	import * as THREE from 'three';
	import { onMount } from 'svelte';
	import fragmentShader from '../shaders/fragment.glsl?raw';
	import vertexShader from '../shaders/vertex.glsl?raw';
	import { options } from '$lib/stores/datgui';
	import { store } from '$lib/stores';
	import { interactivity } from '@threlte/extras';
	import gsap from 'gsap';
	import caretSrc from '$lib/images/caret.svg';
	const caret = useTexture(caretSrc);
	let caretLoaded: THREE.Texture;

	$: outerWidth = 0;
	$: innerWidth = 0;
	$: outerHeight = 0;
	$: innerHeight = 0;

	const { camera, size, advance } = useThrelte();

	advance();

	const renderer = useThrelte().renderer;
	let bufferScene: THREE.Scene;
	let bufferMesh: THREE.Mesh;
	let elementMesh: THREE.Mesh;
	let elementMaterial: THREE.MeshBasicMaterial;
	let postFXMeshMaterial: THREE.ShaderMaterial;
	let postFXMesh: THREE.Mesh;

	// Create a new framebuffer we will use to render to
	// the video card memory
	let renderBufferA = useFBO($size.width, $size.height);
	// Create a second framebuffer
	let renderBufferB = useFBO($size.width, $size.height);
	let renderBufferC = useFBO($size.width, $size.height, {
		format: THREE.RGBAFormat,
		minFilter: THREE.LinearMipmapLinearFilter,
		magFilter: THREE.LinearFilter,
		generateMipmaps: true,
		wrapS: THREE.RepeatWrapping,
		wrapT: THREE.RepeatWrapping
	});

	renderer.setClearColor(new THREE.Color($options.backgroundColor), 0);
	renderer.setPixelRatio(devicePixelRatio || 1);

	const mouse = {
		x: 0,
		y: 0
	};

	const event = {pageX: 0, pageY: 0}

	function onMouseMove(e=event) {
		event.pageX = e.pageX
		event.pageY = e.pageY

		mouse.x =
			(e.pageX / $size.width) * $size.width -
			(caretLoaded.image.width * caretPos.scaleX) / 2 -
			$size.width / 2;

		mouse.y =
			(1 - e.pageY / $size.height) * $size.height -
			(caretLoaded.image.height * caretPos.scaleY) / 2 -
			$size.height / 2;
	}

	options.subscribe((value) => {
		const el = document.querySelector('.labelEl');
		const canvas = document.querySelector('.canvas-container')?.querySelector('canvas');
		if (!value.dark && canvas) {
			gsap.to(canvas, {
				filter: 'invert(100%)'
			});
		} else if (value.dark && canvas) {
			gsap.to(canvas, {
				filter: 'invert(0%)'
			});
		}
	});

	useTask((delta) => {
		if ($store.load >= 100 && loaded && caretLoaded) {
			const mouseSpeed = delta * 5;
			caretPos.x += (mouse.x - caretPos.x) * mouseSpeed;
			caretPos.y += (mouse.y - caretPos.y) * mouseSpeed;
		}
		// console.log(caretPos.x, caretPos.y)

		// Do not clear the contents of the canvas on each render
		// In order to achieve our effect, we must draw the new frame
		// on top of the previous one!
		renderer.autoClearColor = false;
		if (bufferScene) {
			renderer.setRenderTarget(renderBufferC);
			renderer.clear();
			renderer.render(bufferScene, $camera);
		}
		// Explicitly set renderBufferA as the framebuffer to render to
		renderer.setRenderTarget(renderBufferA);
		// On each new frame, render the scene to renderBufferA
		renderer.render(postFXMesh, $camera);
		elementMaterial.map = renderBufferC.texture;
		renderer.render(elementMesh, $camera);

		// Set the device screen as the framebuffer to render to
		// In WebGL, framebuffer "null" corresponds to the default framebuffer!
		renderer.setRenderTarget(null);
		elementMaterial.map = renderBufferC.texture;
		// Assign the generated texture to the sampler variable used
		// in the postFXMesh that covers the device screen
		postFXMeshMaterial.uniforms.sampler.value = renderBufferA.texture;

		// Render the postFX mesh to the default framebuffer ??
		renderer.render(postFXMesh, $camera);

		// Ping-pong our framebuffers by swapping them
		// at the end of each frame render
		const temp = renderBufferA;
		renderBufferA = renderBufferB;
		renderBufferB = temp;
	});

	let loaded = false;

	const caretPos = {
		x: -$size.width,
		y: -$size.height,
		scaleX: 5,
		scaleY: 5
	};

	function loadingAnim() {
		const animTL = gsap.timeline();
		animTL.to(caretPos, {
			duration: 3,
			x: $size.width / 2,
			y: $size.height / 2,
			repeat: -1,
			repeatDelay: 0.25,
			onUpdate: () => {
				bufferMesh.position.set(caretPos.x, caretPos.y, -1);
				// console.log(bufferMesh.position.x, caretPos.x);
			},
			onRepeat: () => {
				if ($store.load >= 100) {
					animTL.kill();
					gsap.to(caretPos, {
						duration: 0.5,
						scaleX: 0.3,
						scaleY: 0.3,
							onUpdate: () => {
								onMouseMove()
							},
						onComplete: () => {
							loaded = true;
							imagesIn();
						}
					});
				}
			}
		});
	}

	function imagesIn() {

	}

	onMount(() => {
		document.addEventListener('mousemove', (e) => onMouseMove(e));
		caret.then((x) => {
			caretLoaded = x;
			loadingAnim();
		});
	});
	interactivity();
</script>

<svelte:window bind:innerWidth bind:outerWidth bind:innerHeight bind:outerHeight />

<T.OrthographicCamera
	makeDefault
	position.z={1}
	on:create={({ ref }) => {
		ref.lookAt(new THREE.Vector3(0, 0, 0));
	}}
/>
<T.Mesh bind:ref={postFXMesh}>
	<T.PlaneGeometry args={[$size.width, $size.height]} />
	<T.ShaderMaterial
		bind:ref={postFXMeshMaterial}
		uniforms={{
			sampler: { value: null },
			time: { value: 0 },
			aspect: { value: parseFloat(($size.width / $size.height).toString()) },
			mousePos: { value: new THREE.Vector2(-1, 1) },
			noiseFactor: { value: 0.1 },
			noiseScale: { value: 0.005 },
			rgbPersistFactor: { value: 0.95 },
			alphaPersistFactor: { value: 1 }
		}}
		uniforms.aspect.value={$size.width / $size.height}
		uniforms.noiseFactor.value={$options.noiseFactor}
		uniforms.noiseScale.value={$options.noiseScale}
		uniforms.rgbPersistFactor.value={$options.rgbPersistFactor}
		uniforms.alphaPersistFactor.value={$options.alphaPersistFactor}
		{vertexShader}
		{fragmentShader}
		transparent={true}
	/>
</T.Mesh>

<T.Mesh bind:ref={elementMesh} rotation.x={$options.rotation}>
	<T.PlaneGeometry args={[$size.width, $size.height]} />
	<T.MeshBasicMaterial bind:ref={elementMaterial} map={renderBufferC.texture} transparent={true} />
</T.Mesh>

{#await caret then val}
	<T.Scene bind:ref={bufferScene}>
		<T.OrthographicCamera
			makeDefault
			position.z={1}
			on:create={({ ref }) => {
				ref.lookAt(new THREE.Vector3(0, 0, 0));
			}}
		/>
		<T.Mesh bind:ref={bufferMesh} position={[caretPos.x, caretPos.y, 0]} scale={caretPos.scaleX}>
			<T.PlaneGeometry args={[val.image.height, val.image.width]} />
			<T.MeshBasicMaterial map={val} transparent={true} />
		</T.Mesh>
		{#if loaded}
			{#each $store.projects as project, i}
				<T.Mesh
					position={[
						$size.width * ((($store.activeIndex - i) * 0.05) - 0.1),
						$size.height * ($store.activeIndex - i) * 0.3,
						-2 * ($store.activeIndex + i)
					]}
					scale={1 - ($store.activeIndex - i) / $store.projects.length}
				>
					<T.PlaneGeometry args={[$size.width * 0.6, ($size.width * 9 /16) * 0.6]} />
					<ImageMaterial url={project.url} />
				</T.Mesh>
			{/each}
		{/if}
	</T.Scene>
{/await}
