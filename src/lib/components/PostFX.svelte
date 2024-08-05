<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
  import { useFBO } from '@threlte/extras';
	import fragmentShader from '../lib/shaders/fragment.glsl?raw';
	import vertexShader from '../lib/shaders/vertex.glsl?raw';
	import * as THREE from 'three';
	import { onMount } from 'svelte';

	// manual mode
	const { scene, camera, size, advance, renderStage } = useThrelte();
	advance();

	const renderer = useThrelte().renderer;

	// Create a new framebuffer we will use to render to
	// the video card memory
	let renderBufferA = useFBO($size.width, $size.height);
	// Create a second framebuffer
	let renderBufferB = useFBO($size.width, $size.height);

	let mouse = {
		x: 0,
		y: 0
	};

	function onMouseMove(e: MouseEvent) {
		mouse.x = (e.pageX / innerWidth) * 2 - 1;
		mouse.y = (1 - e.pageY / innerHeight) * 2 - 1;
	}

	useTask(
		(delta) => {
			renderer.render(scene, $camera);
			// Set the device screen as the framebuffer to render to
			// In WebGL, framebuffer "null" corresponds to the default framebuffer!
			renderer.setRenderTarget(null);

			// Assign the generated texture to the sampler variable used
			// in the postFXMesh that covers the device screen
			// postFXMesh.material.uniforms.sampler.value = renderBufferA.texture;

			// Render the postFX mesh to the default framebuffer
			// renderer.render(postFXScene, orthoCamera);

			// Ping-pong our framebuffers by swapping them
			// at the end of each frame render
			const temp = renderBufferA;
			renderBufferA = renderBufferB;
			renderBufferB = temp;
		},
		{ stage: renderStage, autoInvalidate: false }
	);

  onMount(() => {
    document.addEventListener('mousemove', e => onMouseMove(e))
  })
</script>

<T.Mesh>
	<T.PlaneGeometry width={innerWidth} height={innerHeight} />
	<T.ShaderMaterial
		uniforms={{
			sampler: { value: null },
			time: { value: 0 },
			mousePos: { value: new THREE.Vector2(0, 0) }
		}}
		{vertexShader}
		{fragmentShader}
		transparent={true}
		uniforms.mousePos.value={mouse}
		uniforms.sampler.value={renderBufferA.texture}
	/>
</T.Mesh>
