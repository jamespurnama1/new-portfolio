<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import * as THREE from 'three';
	import { OrbitControls } from '@threlte/extras'
	import { onMount } from 'svelte';
	import { interactivity } from '@threlte/extras'
	
	import fragmentShader from '../lib/shaders/fragment.glsl?raw';
	import vertexShader from '../lib/shaders/vertex.glsl?raw';

	// let canvas;
	let rotation = 0
	let time = 0
	const geometry = new THREE.PlaneGeometry(30, 30, 100, 100)
	// const scene = new THREE.Scene();
	// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	// const sphere = new THREE.Mesh(
	// 	new THREE.SphereGeometry(5, 50, 30),
	// 	new THREE.ShaderMaterial({
	// 		// vertexShader: shaderVert
	// 	})
	// );

	// scene.add( sphere );

	// const renderer = new THREE.WebGLRenderer({
	// 	antialias: true,
	// 	canvas: canvas
	// });

	// function animate() {
	// 	renderer.render(scene, camera);
	// }
	// onMount(() => {
	// 	renderer.setSize(window.innerWidth, window.innerHeight);
	// 	renderer.setAnimationLoop( animate );
	// })
	useTask((delta) => {
    rotation += delta
		time += delta
		const x = new THREE.Uniform( new THREE.Vector2() )
		// console.log(new THREE.Vector3(x.value.x, x.value.x, Math.abs(Math.sin(time))))
  })
	interactivity()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-70, 50, 10]}
  fov={15}
>
  <OrbitControls
    target.y={1.5}
  />
</T.PerspectiveCamera>

<T.Mesh {geometry} rotation.y	={rotation}>
  <!-- <T.BoxGeometry args={[1, 2, 1]} /> -->
  <T.ShaderMaterial {fragmentShader} side={THREE.DoubleSide} uniforms={{
		u_time: { value: 0 },
		u_resolution: new THREE.Uniform( new THREE.Vector2(1920,1080) )
	}} uniforms.u_time.value={time} />
</T.Mesh>
