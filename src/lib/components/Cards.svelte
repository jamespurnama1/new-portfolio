<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { ImageMaterial } from '@threlte/extras';
	import { type IntersectionEvent } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { projectsStore, countStore } from '$lib/stores/index.svelte';
	import { type Mesh, type ShaderMaterial } from 'three';
	import gsap from 'gsap';
	import { optionsStore } from '$lib/stores/datgui.svelte';

	let { value, index }: { value: string; index: number } = $props();
	const zoom = spring(1);
	const sizing = 0.5;
	const { size } = useThrelte();
	let image: Mesh | null = $state(null)
	let transform = $state({
		x: 0, 
		y: 0,
		z: 0,
		scale: 1 - (Math.abs(countStore.activeIndex - index) / projectsStore.projects.length) * 2,
		opacity: 1
	})

	$effect(() => updateImage(countStore.activeIndex));

	function stopPropagation(
		event: IntersectionEvent<'pointerover' | 'pointerleave'>
	) {
		// event.stopPropagation();

		if (event.intersections.length) {
			zoom.set(1.5);
		} else {
			zoom.set(1);
		}
		// if (event.intersections.length && index === countStore.activeIndex) {
		// 	const x = { zoom: 1 };
		// 	gsap.to(images[index].material.uniforms, {
		// 		zoom: 1.5,
		// 		onUpdate: () => console.log(images[index].material.uniforms.zoom)
		// 	});
		// } else {
		// 	const x = { zoom: 1.5 };
		// 	gsap.to(images[index].material.uniforms, {
		// 		zoom: 1
		// 	});
		// }
	}

		function updateImage(active: number) {
		if (!projectsStore.projects.length) return;
		// for (let i = 0; i < images.length; i++) {
			
			// opacity: index <= active ? 1 : 0,
			// if (!pos[i]) pos.push({ x: 0, y: 0, z: 0 });

			gsap.to(transform, {
				x: $size.width * ((active - index - 1) * 0.05) - ($size.width*0.15),
				y: $size.height * (active - index - 1) * 0.5 + ($size.height * 0.4),
				z: (-0.6 * (active - index - 1)) - 10,
				scale: 0.7 - ((active - index - 1) / projectsStore.projects.length),
				opacity: index === active ? 1 : 0.3,
				duration: 0.5,
				ease: 'power1.inOut',
				onUpdate: () => {
					// console.log(transform.x, transform.y, transform.z)
					// image!.position.set(transform.x, transform.y, transform.z);
				}
			});

			// gsap.to(scale, {
			// 	opacity: index > active ? 1 : 0,
			// 	duration: 0.75,
			// 	ease: 'power3.inOut',
			// 	onUpdate: () => {
			// 		image!.material.
			// 		// if (index > active) (image.material as ShaderMaterial).uniforms.opacity = x.opacity;
			// 	}
			// });
		}
</script>

<T.Mesh
	bind:ref={image}
	scale={transform.scale}
	position={[transform.x, transform.y, transform.z]}
	onclick={(e: IntersectionEvent<'click'>) => console.log(e, index)}
	onpointerover={(e: IntersectionEvent<'pointerover'>) => stopPropagation(e)}
	onpointerleave={(e: IntersectionEvent<'pointerleave'>) => stopPropagation(e)}
>
	<T.PlaneGeometry args={[$size.width * sizing, (($size.width * 2) / 3) * sizing]} />
	<!-- <T.MeshBasicMaterial zoom={$zoom} map={value} /> -->
	<ImageMaterial zoom={$zoom} url={value as string} transparent={true} opacity={transform.opacity} negative={!optionsStore.options.dark} />
</T.Mesh>
