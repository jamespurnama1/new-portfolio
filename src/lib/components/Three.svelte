<script lang="ts">
	import { T, useLoader, useTask, useThrelte } from '@threlte/core';
	import { useFBO, useTexture } from '@threlte/extras';
	import * as THREE from 'three';
	import fragmentShader from '../shaders/fragment.glsl?raw';
	import vertexShader from '../shaders/vertex.glsl?raw';
	import { optionsStore } from '$lib/stores/datgui.svelte';
	import { loadStore, projectsStore } from '$lib/stores/index.svelte';
	import { interactivity } from '@threlte/extras';
	import gsap from 'gsap';
	import caretSrc from '$lib/images/caret.svg';
	import { onMount } from 'svelte';
	import Cards from './Cards.svelte';

	const caret = useTexture(caretSrc);
	let caretLoaded: THREE.Texture;
	// let textures: Promise<THREE.Texture>[] = $state([]);
	let outerWidth = $state(0);
	let innerWidth = $state(0);
	let outerHeight = $state(0);
	let innerHeight = $state(0);
	// const { load } = useLoader(THREE.TextureLoader);
	const { camera, size, advance } = useThrelte();
	const aspect = $size.width / $size.height;

	let loaded = $state(false);

	const caretPos = $state({
		x: -$size.width,
		y: -$size.height,
		scaleX: 5,
		scaleY: 5
	});

	const mouse = {
		x: 0,
		y: 0
	};

	const event = { pageX: 0, pageY: 0 };

	advance();

	interactivity({
		compute: (event, state) => {
			// Update the pointer
			state.pointer.update((p) => {
				p.x = (event.clientX / window.innerWidth) * 2 - 1;
				p.y = -(event.clientY / window.innerHeight) * 2 + 1;
				return new THREE.Vector2(p.x, p.y);
			});
			// Update the raycaster
			state.raycaster.setFromCamera(state.pointer.current, $camera);
		}
	});

	$effect(() => {
		return document.removeEventListener('mousemove', (e) => onMouseMove(e));
	});

	const renderer = useThrelte().renderer;

	let bufferMesh: THREE.Mesh | undefined = $state();
	let elementMesh: THREE.Mesh | undefined = $state();
	let elementMaterial: THREE.MeshBasicMaterial | undefined = $state();
	let postFXMeshMaterial: THREE.ShaderMaterial | undefined = $state();
	let postFXMesh: THREE.Mesh | undefined = $state();
	let postFXScene: THREE.Scene | undefined = $state();

	// Create a new framebuffer we will use to render to
	// the video card memory
	let renderBufferA = useFBO($size.width, $size.height, { format: THREE.RGBAFormat });
	// Create a second framebuffer
	let renderBufferB = useFBO($size.width, $size.height, { format: THREE.RGBAFormat });
	let renderBufferC = useFBO($size.width, $size.height, {
		format: THREE.RGBAFormat,
		minFilter: THREE.LinearMipmapLinearFilter,
		magFilter: THREE.LinearFilter,
		generateMipmaps: true,
		wrapS: THREE.RepeatWrapping,
		wrapT: THREE.RepeatWrapping
	});

	// renderer.outputEncoding = THREE.sRGBEncoding
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.setClearColor(new THREE.Color(optionsStore.options.backgroundColor), 0);
	renderer.setPixelRatio(devicePixelRatio || 1);

	function onMouseMove(e = event) {
		if (!caretLoaded) return;

		event.pageX = e.pageX;
		event.pageY = e.pageY;

		mouse.x =
			(e.pageX / $size.width) * $size.width -
			(caretLoaded.image.width * caretPos.scaleX) / 2 -
			$size.width / 2;

		mouse.y =
			(1 - e.pageY / $size.height) * $size.height -
			(caretLoaded.image.height * caretPos.scaleY) / 2 -
			$size.height / 2;
	}

	$effect(() => {
		console.log('ran');
		const canvas = document.querySelector('.canvas-container')?.querySelector('canvas');
		if (!optionsStore.options.dark && canvas) {
			gsap.to(canvas, {
				filter: 'invert(100%)'
			});
		} else if (optionsStore.options.dark && canvas) {
			gsap.to(canvas, {
				filter: 'invert(0%)'
			});
		}
	});

	useTask((delta) => {
		if (loadStore.load >= 100 && loaded && caretLoaded) {
			const mouseSpeed = delta * 10;
			caretPos.x += (mouse.x - caretPos.x) * mouseSpeed;
			caretPos.y += (mouse.y - caretPos.y) * mouseSpeed;
		}
		// console.log(caretPos.x, caretPos.y)

		// Do not clear the contents of the canvas on each render
		// In order to achieve our effect, we must draw the new frame
		// on top of the previous one!
		renderer.autoClearColor = false;
		if (bufferMesh) {
			renderer.setRenderTarget(renderBufferC);
			renderer.clear();
			renderer.render(bufferMesh, $camera);
		}

		// Explicitly set renderBufferA as the framebuffer to render to
		renderer.setRenderTarget(renderBufferA);
		// On each new frame, render the scene to renderBufferA
		renderer.render(postFXScene!, $camera);
		elementMaterial!.map = renderBufferC.texture;
		renderer.render(elementMesh!, $camera);

		// Set the device screen as the framebuffer to render to
		// In WebGL, framebuffer "null" corresponds to the default framebuffer!
		renderer.setRenderTarget(null);
		elementMaterial!.map = renderBufferC.texture;
		// Assign the generated texture to the sampler variable used
		// in the postFXMesh that covers the device screen
		postFXMeshMaterial!.uniforms.sampler.value = renderBufferA.texture;

		// Render the postFX mesh to the default framebuffer ??
		renderer.render(postFXScene!, $camera);

		// Ping-pong our framebuffers by swapping them
		// at the end of each frame render
		const temp = renderBufferA;
		renderBufferA = renderBufferB;
		renderBufferB = temp;
	});

	function loadingAnim() {
		const animTL = gsap.timeline();
		animTL.to(caretPos, {
			duration: 3,
			x: $size.width / 2,
			y: $size.height / 2,
			repeat: -1,
			repeatDelay: 0.25,
			onRepeat: () => {
				if (loadStore.load >= 100) {
					animTL.kill();
					gsap.to(caretPos, {
						duration: 0.5,
						scaleX: 0.3,
						scaleY: 0.3,
						onUpdate: () => {
							onMouseMove();
						},
						onComplete: () => {
							loaded = true;
							optionsStore.options.rgbPersistFactor = 0.5;
						}
					});
				}
			}
		});
	}

	// function imagesIn() {
	// 	updateImage(countStore.activeIndex);
	// 	// setTimeout(() => console.log(images), 1000);
	// 	// if (!images.length) return;
	// 	// for (let i = 0; i < images.length; i++) {
	// 	// 	gsap.to(pos, {
	// 	// 		x: $size.width * (Math.abs($store.activeIndex - i) * 0.05 - 0.2),
	// 	// 		y: $size.height * ($store.activeIndex - i) * 0.3,
	// 	// 		z: -2 * Math.abs($store.activeIndex - i),
	// 	// 		duration: 0.3
	// 	// 	});
	// 	// }
	// }

	onMount(() => {
		document.addEventListener('mousemove', (e) => onMouseMove(e));
		caret.then((x) => {
			caretLoaded = x;
			loadingAnim();
		});
		console.log(projectsStore.projects.map((x) => x.url));
	});

	$effect(() => console.log(textures));

	const textures = useTexture(
		projectsStore.projects.map((x) => x.url),
		{
			transform: (texture) => {
				const tex = THREE.TextureUtils.cover(texture, 3/2)
				// const planeAspect = 3 / 2;
				// const imageAspect = texture.image.width / texture.image.height;
				// const aspect = imageAspect / planeAspect;

				// texture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
				// texture.repeat.x = aspect > 1 ? 1 / aspect : 1;

				// texture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
				// texture.repeat.y = aspect > 1 ? 1 : aspect;
				// texture.wrapS = THREE.ClampToEdgeWrapping;
				// texture.wrapT = THREE.RepeatWrapping;
				tex.colorSpace = THREE.SRGBColorSpace;
				console.log(tex)
				return tex;
			}
		}
	);

	// function preload(i: number): Promise<HTMLImageElement> {
	// 	return new Promise((resolve) => {
	// 		let img = new Image();
	// 		img.src = projectsStore.projects[i].url;
	// 		img.onload = () => resolve(img);
	// 	});
	// }
</script>

<svelte:window bind:innerWidth bind:outerWidth bind:innerHeight bind:outerHeight />

<!-- POSTFX -->
<T.Scene bind:ref={postFXScene}>
	<T.OrthographicCamera
		makeDefault
		position.z={1}
		on:create={({ ref }) => {
			ref.lookAt(new THREE.Vector3(0, 0, 0));
		}}
	/>
	<T.Mesh bind:ref={postFXMesh} position={[0, 0, -50]}>
		<T.PlaneGeometry args={[$size.width, $size.height]} />
		<T.ShaderMaterial
			bind:ref={postFXMeshMaterial}
			uniforms={{
				sampler: { value: null },
				time: { value: 0 },
				aspect: { value: aspect },
				mousePos: { value: new THREE.Vector2(-1, 1) },
				noiseFactor: { value: 0.1 },
				noiseScale: { value: 0.005 },
				rgbPersistFactor: { value: 0.7 },
				alphaPersistFactor: { value: 0.2 }
			}}
			uniforms.noiseFactor.value={optionsStore.options.noiseFactor}
			uniforms.noiseScale.value={optionsStore.options.noiseScale}
			uniforms.rgbPersistFactor.value={optionsStore.options.rgbPersistFactor}
			uniforms.alphaPersistFactor.value={optionsStore.options.alphaPersistFactor}
			{vertexShader}
			{fragmentShader}
			transparent={true}
		/>
	</T.Mesh>
	{#if loaded}
		{#await textures then texture}
			{#each texture as project, i}
				<Cards texture={project} index={i} />
			{/each}
		{/await}
	{/if}
</T.Scene>

<!-- BUFFER PLANE -->
<T.Mesh bind:ref={elementMesh} rotation.x={optionsStore.options.rotation}>
	<T.PlaneGeometry args={[$size.width, $size.height]} />
	<T.MeshBasicMaterial bind:ref={elementMaterial} map={renderBufferC.texture} transparent={true} />
</T.Mesh>

<!-- VIRTUAL SCENE -->
{#await caret then val}
	<T.Mesh bind:ref={bufferMesh} position={[caretPos.x, caretPos.y, 0]} scale={caretPos.scaleX}>
		<T.PlaneGeometry args={[val.image.height, val.image.width]} />
		<T.MeshBasicMaterial map={val} transparent={true} />
	</T.Mesh>
{/await}
