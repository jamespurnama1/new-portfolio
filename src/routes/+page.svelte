<script lang="ts">
	import { countStore, loadStore, projectsStore, homeStore } from '$lib/stores/index.svelte';
	import gsap from 'gsap';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Awards from '$lib/components/Awards.svelte';
	import { type Post } from '$lib/types';
	import { goto } from '$app/navigation';

	let innerWidth = $state(0);
	let innerHeight = $state(0);
	let projectList = $state() as HTMLUListElement;

	let promise = getProjects();

	async function getProjects(): Promise<Post[]> {
		const project = await projectsStore.projects;
		setTimeout(() => {
			gsap.to(projectList.querySelectorAll('li'), {
				x: 0,
				opacity: 1,
				delay: loadStore.loaded ? 0 : 3,
				stagger: 0.1,
				ease: 'power1.out'
			});
		}, 0);

		return project;
	}
</script>

<svelte:head>
	<title>James Henry</title>
	<meta name="description" content="Portfolio" />
</svelte:head>

<section class="w-screen h-screen overflow-hidden flex items-center justify-center p-24">
	{#await promise then projects}
		{#if homeStore.isAnimating}
			<h2
				class="text-white uppercase font-mono text-7xl absolute left-[15%] pointer-events-none text-center w-[30vw]"
				transition:scale={{ duration: 500, start: 0.5, easing: quintOut }}
			>
				{homeStore.currentCat[0]}
			</h2>
		{/if}

		<ul bind:this={projectList} class="absolute left-[60%] text-white font-mono ml-auto z-10">
			{#each homeStore.catItems as category}
				<li
					class="font-mono uppercase pt-5 opacity-0 translate-x-full"
					class:animateText={category.title.toLowerCase() ===
						homeStore.currentCat[0].toString().toLowerCase() && homeStore.isAnimating}
				>
					&gt; {category.title} &gt;
				</li>
				{#each category.items as item}
					<!-- <Awards {item} /> -->
					<li
						class="font-mono opacity-0 translate-x-full"
						class:selected={projects[countStore.inertiaIndex]
							? projects[countStore.inertiaIndex]._id === (item as Post)._id
							: false}
					>
						<button
							class="text-left"
							onclick={() => {
								const currIndex = projects.map((x) => x._id).indexOf((item as Post)._id);
								if (countStore.inertiaIndex === currIndex) {
									goto(`/work/${(item as Post).slug.current}`);
								} else {
									countStore.inertiaIndex = currIndex;
								}
							}}
						>
							{(item as Post).title}
						</button>
					</li>
				{/each}
			{/each}
		</ul>
	{/await}
</section>

<svelte:window bind:innerWidth bind:innerHeight />

<style lang="postcss" scoped>
	.selected {
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		transition-property: font-family, font-size, font-weight, line-height;
		@apply font-sans text-7xl font-bold;
	}

	.animateText {
		animation: leading 1s infinite;
	}

	@keyframes leading {
		0% {
			letter-spacing: 0;
			font-weight: 400;
		}
		50% {
			letter-spacing: 0.2em;
			font-weight: 900;
		}
		100% {
			letter-spacing: 0;
			font-weight: 400;
		}
	}
</style>
