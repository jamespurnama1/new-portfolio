<script lang="ts">
	import { T, useTask, useThrelte, useLoader } from '@threlte/core';
	import { useFBO } from '@threlte/extras';
	import * as THREE from 'three';
	import fragmentShader from '../shaders/fragment.glsl?raw';
	import vertexShader from '../shaders/vertex.glsl?raw';
	import { optionsStore } from '$lib/stores/options.svelte';
	import { animationStore, loadStore } from '$lib/stores/index.svelte';
	import { interactivity } from '@threlte/extras';
	import gsap from 'gsap';
	import { onMount, untrack } from 'svelte';
	import Cards from './Cards.svelte';
	import Rive from '$lib/components/Rive.svelte';
	import { page } from '$app/stores';
	import type { PageData } from '../../routes/$types';

	let { data }: { data: PageData } = $props();
	let caret = $state() as THREE.Texture;
	let canvas = $state() as HTMLCanvasElement;
	const textures: THREE.Texture[] = $state([]);
	let imageTextures: Promise<THREE.Texture[]> | [] = $state([]);
	let riveTask = $state(() => {}) as (time?: number) => void;
	const { camera, size, advance } = useThrelte();
	const aspect = $size.width / $size.height;

	const caretPos = $state({
		x: -$size.width,
		y: -$size.height,
		scaleX: 0.8,
		scaleY: 0.8,
		rotation: 0
	});

	const mouse = $state({
		x: 0,
		y: 0
	});

	const mouseEuler = $derived({ x: mouse.x / $size.width, y: mouse.y / $size.width });

	const event = { pageX: 0, pageY: 0 };

	advance();

	//inits
	const renderer = useThrelte().renderer;

	let bufferMesh: THREE.Mesh | undefined = $state();
	let elementMesh: THREE.Mesh | undefined = $state();
	let elementMaterial: THREE.MeshBasicMaterial | undefined = $state();
	let postFXMeshMaterial: THREE.ShaderMaterial | undefined = $state();
	let postFXMesh: THREE.Mesh | undefined = $state();
	let postFXScene: THREE.Scene | undefined = $state();

	// Create a new framebuffer we will use to render to
	// the video card memory
	let renderBufferA = useFBO($size.width, $size.height);
	// Create a second framebuffer
	let renderBufferB = useFBO($size.width, $size.height);

	// renderer.outputEncoding = THREE.sRGBEncoding
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	// renderer.setClearColor(new THREE.Color(optionsStore.options.backgroundColor), 0);
	renderer.setPixelRatio(devicePixelRatio || 1);

	//mouse stuff
	interactivity({
		target: document.documentElement,
		compute: (event, state) => {
			// Update the pointer
			state.pointer.update((p) => {
				p.x = (event.clientX / $size.width) * 2 - 1;
				p.y = -(event.clientY / $size.height) * 2 + 1;
				return new THREE.Vector2(p.x, p.y);
			});
			// Update the raycaster
			state.raycaster.setFromCamera(state.pointer.current, $camera);
		}
	});

	$effect(() => {
		return document.removeEventListener('mousemove', (e) => onMouseMove(e));
	});

	function onMouseMove(e = event) {
		if (!caret) return;

		event.pageX = e.pageX;
		event.pageY = e.pageY - window.scrollY;

		mouse.y =
			(1 - event.pageY / $size.height) * $size.height -
			($size.height * caretPos.scaleY) / 2 -
			$size.height / 2;

		mouse.x =
			(event.pageX / $size.width) * $size.width -
			($size.width * caretPos.scaleX) / 2 -
			$size.width / 2;
	}

	// theme
	$effect(() => {
		optionsStore.options.dark;
		untrack(() => {
			const threeCanvas = document.querySelector('.canvas-container')?.querySelector('canvas');
			if (!optionsStore.options.dark && threeCanvas) {
				gsap.to(threeCanvas, {
					filter: 'invert(100%)'
				});
			} else if (optionsStore.options.dark && threeCanvas) {
				gsap.to(threeCanvas, {
					filter: 'invert(0%)'
				});
			}
		});
	});

	// canvas resize
	$effect(() => {
		$size;
		untrack(() => {
			if (!elementMaterial || !elementMaterial.map || !canvas) return;
			caret = new THREE.CanvasTexture(canvas);
			elementMaterial.map.needsUpdate = true;
		});
	});

	// animation loop
	useTask((delta) => {
		// time += delta * 1000;
		if (loadStore.loaded && caret && !animationStore.isAnimating) {
			const mouseSpeed = delta * 10;
			caretPos.x += (mouse.x - caretPos.x) * mouseSpeed;
			caretPos.y += (mouse.y - caretPos.y) * mouseSpeed;
		}
		riveTask(delta);
		// Do not clear the contents of the canvas on each render
		// In order to achieve our effect, we must draw the new frame
		// on top of the previous one!
		renderer.autoClearColor = false;

		// Explicitly set renderBufferA as the framebuffer to render to
		renderer.setRenderTarget(renderBufferA);
		// On each new frame, render the scene to renderBufferA
		renderer.render(postFXScene!, $camera);
		if (elementMaterial && caret) {
			caret.needsUpdate = true;
			elementMaterial!.map = caret;
			renderer.render(elementMesh!, $camera);
		}

		// Set the device screen as the framebuffer to render to
		// In WebGL, framebuffer "null" corresponds to the default framebuffer!
		renderer.setRenderTarget(null);
		// Assign the generated texture to the sampler variable used
		// in the postFXMesh that covers the device screen
		postFXMeshMaterial!.uniforms.sampler.value = renderBufferA.texture;

		// Render the postFX mesh to the default framebuffer
		renderer.render(postFXScene!, $camera);

		// Ping-pong our framebuffers by swapping them
		// at the end of each frame render
		const temp = renderBufferA;
		renderBufferA = renderBufferB;
		renderBufferB = temp;
	});

	function loadingAnim() {
		animationStore.isAnimating = true;
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
					loadStore.loaded = true;
					gsap.set(caretPos, {
						x: -$size.width,
						y: -$size.height
					});
					reset();
				}
			}
		});
	}

	export function categoryAnim(direction: 'up' | 'down') {
		animationStore.isAnimating = true;
		gsap.to(optionsStore.options, {
			rgbPersistFactor: 0.9
		});
		const animTL = gsap.timeline();
		animTL.to(caretPos, {
			x: $size.width * 0.3,
			y: direction === 'down' ? $size.height * 2 : -$size.height * 2,
			scaleX: 0.8,
			scaleY: 0.8,
			rotation: ((direction === 'down' ? 225 : 45) * Math.PI) / 180,
			duration: 0.5
		});

		animTL.to(caretPos, {
			duration: 0.8,
			x: $size.width * 0.3,
			y: direction === 'down' ? -$size.height : $size.height,
			onComplete: () => {
				reset();
				gsap.to(optionsStore.options, {
					rgbPersistFactor: 0.85
				});
			}
		});
	}

	function reset(duration = 0.5) {
		animationStore.isAnimating = false;
		gsap.to(caretPos, {
			duration,
			scaleX: 0.05,
			scaleY: 0.05,
			rotation: 0,
			ease: 'none',
			onUpdate: () => {
				onMouseMove();
			},
			onComplete: () => {
				gsap.to(optionsStore.options, {
					rgbPersistFactor: 0.85
				});
			}
		});
	}

	// textures
	$effect(() => {
		if (!loadStore.loaded || !data.projects) return;
		untrack(() => {
			data.projects.forEach((y) => {
				const video = document.getElementById(y.slug.current) as HTMLVideoElement;
				const texture = new THREE.VideoTexture(video);
				texture.format = THREE.RGBFormat;
				textures.push(texture);
			});
		});
	});

	$effect(() => {
		if (!loadStore.loaded || !data.projects || !$page.route.id?.includes('work')) return;
		untrack(async () => {
			const { load } = useLoader(THREE.TextureLoader);
			const current = data.projects.find((x) => x.slug.current === $page.params.slug)!;
			const q = current.content.map((x) => {
				return x.media.asset.url;
			});
			imageTextures = load([...q]) as Promise<THREE.Texture[]>;
		});
	});

	onMount(() => {
		document.addEventListener('mousemove', (e) => onMouseMove(e));
		caret = new THREE.CanvasTexture(canvas);
	});
</script>

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
				mousePos: { value: new THREE.Vector2(-1, -1) },
				noiseFactor: { value: 0.1 },
				noiseScale: { value: 0.005 },
				rgbPersistFactor: { value: 0.9 },
				alphaPersistFactor: { value: 0.9 }
			}}
			uniforms.mousePos.value={[mouseEuler.x, mouseEuler.y]}
			uniforms.noiseFactor.value={optionsStore.options.noiseFactor}
			uniforms.noiseScale.value={optionsStore.options.noiseScale}
			uniforms.rgbPersistFactor.value={optionsStore.options.rgbPersistFactor}
			uniforms.alphaPersistFactor.value={optionsStore.options.alphaPersistFactor}
			{vertexShader}
			{fragmentShader}
		/>
	</T.Mesh>

	{#if textures.length && data}
		{#each textures as texture, i}
			<Cards {texture} index={i} data={data as Required<PageData>} />
		{/each}
	{/if}

	{#if $page.params.slug && data}
		{#await imageTextures then x}
			{#each x as texture, i}
				<Cards {texture} index={i} works={true} data={data as Required<PageData>} />
			{/each}
		{/await}
	{/if}
</T.Scene>

<!-- BUFFER PLANE -->
{#if canvas}
	<T.Mesh
		bind:ref={elementMesh}
		position={[caretPos.x, caretPos.y, 0]}
		scale={caretPos.scaleX}
		rotation.z={caretPos.rotation}
	>
		<T.PlaneGeometry args={[$size.width, $size.height]} />
		<T.MeshBasicMaterial bind:ref={elementMaterial} map={caret} transparent={true} />
	</T.Mesh>
{/if}

<!-- RIVE -->
<Rive bind:canvas {loadingAnim} bind:riveTask />
