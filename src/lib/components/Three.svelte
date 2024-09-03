<script lang="ts">
	import { T, useLoader, useTask, useThrelte } from '@threlte/core';
	import { useFBO, useTexture } from '@threlte/extras';
	import * as THREE from 'three';
	import fragmentShader from '../shaders/fragment.glsl?raw';
	import vertexShader from '../shaders/vertex.glsl?raw';
	import { optionsStore } from '$lib/stores/datgui.svelte';
	import { homeStore, loadStore, projectsStore } from '$lib/stores/index.svelte';
	import { interactivity } from '@threlte/extras';
	import gsap from 'gsap';
	import caretSrc from '$lib/images/caret.svg';
	import { onMount } from 'svelte';
	import Cards from './Cards.svelte';

	const caret = useTexture(caretSrc) as Promise<THREE.Texture>;
	let caretLoaded: THREE.Texture;
	// let textures: Promise<THREE.Texture>[] = $state([]);
	let outerWidth = $state(0);
	let innerWidth = $state(0);
	let outerHeight = $state(0);
	let innerHeight = $state(0);
	// const { load } = useLoader(THREE.TextureLoader);
	const { camera, size, advance } = useThrelte();
	const aspect = $size.width / $size.height;

	const caretPos = $state({
		x: -$size.width,
		y: -$size.height,
		scaleX: 5,
		scaleY: 5,
		rotation: 0
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
		if (loadStore.load >= 100 && loadStore.loaded && caretLoaded) {
			const mouseSpeed = delta * 10;
			caretPos.x += (mouse.x - caretPos.x) * mouseSpeed;
			caretPos.y += (mouse.y - caretPos.y) * mouseSpeed;
		}

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
					categoryAnim('up', true);
				}
			}
		});
	}

	export function categoryAnim(direction: 'up' | 'down', fromLoad: boolean = false) {
		homeStore.isAnimating = true;
		optionsStore.options.rgbPersistFactor = 0.7;
		const animTL = gsap.timeline();
		animTL.to(caretPos, {
			x: $size.width * 0.3,
			y: direction === 'down' ? $size.height * 2 : -$size.height * 2,
			scaleX: 5,
			scaleY: 5,
			rotation: ((direction === 'down' ? 225 : 45) * Math.PI) / 180,
			duration: 0.5
		});

		animTL.to(caretPos, {
			duration: 0.8,
			x: $size.width * 0.3,
			y: direction === 'down' ? -$size.height : $size.height,
			onComplete: () => {
				setTimeout(() => {
					homeStore.isAnimating = false;
				}, 200);
				loadStore.loaded = true;
				if (!fromLoad) optionsStore.options.rgbPersistFactor = 0.5;
			}
		});

		// if (fromLoad) {
		animTL.to(caretPos, {
			duration: 0.5,
			scaleX: 0.3,
			scaleY: 0.3,
			rotation: 0,
			onUpdate: () => {
				onMouseMove();
			},
			onComplete: () => {
				optionsStore.options.rgbPersistFactor = 0.5;
			}
		});
		// }
	}

	onMount(() => {
		document.addEventListener('mousemove', (e) => onMouseMove(e));
		caret.then((x) => {
			caretLoaded = x;
			loadingAnim();
		});
	});

	const textures = useTexture(
		projectsStore.projectsArr.map((x) => x.metadata.thumbnail!.imgix_url),
		{
			transform: (texture) => {
				const tex = THREE.TextureUtils.cover(texture, 3 / 2);
				tex.colorSpace = THREE.SRGBColorSpace;
				return tex;
			}
		}
	);
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

	<!-- <T.Mesh position={[$size.height / 2, 0, -51]}>
		<T.PlaneGeometry args={[$size.width * 0.5, $size.height]} />
		<T.ShaderMaterial
			uniform={{
				vlak3color1: { value: new THREE.Color('#31c7de') },
				vlak3color2: { type: 'vec2', value: new THREE.Color('#de3c31') },
				positionVlak3: { value: -3.5 }
			}}
			transparent={true}
			{vertexShader}
			fragmentShader={`
			varying vec2 v_uv;

		void main() {
    // Start color (transparent black)
    vec4 transparentColor = vec4(0.0, 0.0, 0.0, 0.0);

    // End color (opaque black)
    vec4 blackColor = vec4(0.0, 0.0, 0.0, 1.0);

    // Adjust this value to move the black closer to the left
    float position = 0.15;  // 0.0 = left, 1.0 = right

    // Mix the colors based on the adjusted x-coordinate
    vec4 gradientColor = mix(transparentColor, blackColor, smoothstep(0.0, 1.0, v_uv.x / position));

    // Set the fragment color
    gl_FragColor = gradientColor;
}
`}
		/>
	</T.Mesh> -->
	{#if loadStore.loaded}
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
	<T.Mesh
		bind:ref={bufferMesh}
		position={[caretPos.x, caretPos.y, 0]}
		scale={caretPos.scaleX}
		rotation.z={caretPos.rotation}
	>
		<T.PlaneGeometry args={[val.image.height, val.image.width]} />
		<T.MeshBasicMaterial map={val} transparent={true} />
	</T.Mesh>
{/await}
