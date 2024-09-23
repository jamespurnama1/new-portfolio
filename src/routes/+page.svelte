<script lang="ts">
	/** @type {import('./$types').LayoutData} */
	import { homeStore } from '$lib/stores/index.svelte';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

<svelte:head>
	<title>James Henry</title>
	<meta name="description" content="Portfolio" />
</svelte:head>

<section class="w-screen h-screen overflow-hidden flex items-center justify-center p-24">
	{#if homeStore.isAnimating}
		<h2
			class="text-white uppercase font-mono text-7xl absolute left-[15%] pointer-events-none text-center w-[30vw]"
			transition:scale={{ duration: 500, start: 0.5, easing: quintOut }}
		>
			{homeStore.currentCat[0]}
		</h2>
	{/if}

	<!-- <ul bind:this={projectList} class="absolute left-[60%] text-white font-mono ml-auto z-10">
		{#each data.catItems as category}
			<li
				class="font-mono uppercase pt-5 opacity-0 translate-x-full"
				class:animateText={category.title.toLowerCase() ===
					homeStore.currentCat[0].toString().toLowerCase() && homeStore.isAnimating}
			>
				&gt; {category.title} &gt;
			</li>
			{#each category.items as item}
				{#if (item as Post).awards && data.projects
						.map((x) => x._id)
						.indexOf((item as Post)._id) === Math.round(countStore.inertiaIndex)}
					<Awards item={item as Post} />
				{/if}
				<li
					class="font-mono opacity-0 translate-x-full"
					class:selected={data.projects[countStore.inertiaIndex]
						? data.projects[countStore.inertiaIndex]._id === (item as Post)._id
						: false}
				>
					<button
						class="text-left"
						onclick={() => {
							const currIndex = data.projects.map((x) => x._id).indexOf((item as Post)._id);
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
	</ul> -->
</section>
