<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import Awards from '$lib/components/Awards.svelte';
	import { type Post } from '$lib/types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { countStore, homeStore, loadStore } from '$lib/stores/index.svelte';
	import { page } from '$app/stores';
	import { optionsStore } from '$lib/stores/options.svelte';
	const { data }: { data: Required<PageData> } = $props();
	let projectList = $state() as HTMLUListElement;

const id = $derived(data.projects[countStore.inertiaIndex] ? data.projects[countStore.inertiaIndex]._id : null)

	onMount(() => {
		gsap.to(projectList.querySelectorAll('li'), {
			x: 0,
			opacity: 1,
			delay: loadStore.loaded ? 0 : 3,
			stagger: 0.1,
			ease: 'power1.out'
		});
	});
</script>

<ul bind:this={projectList} class="absolute left-[60%] text-white font-mono ml-auto z-10 transition-opacity" class:opacity-0={optionsStore.options.fullscreen} class:slug={$page.params.slug}>
	{#each data.catItems as category}
  {#if !$page.params.slug}
		<li
			class="font-mono uppercase pt-5 opacity-0 translate-x-full"
			class:animateText={category.title.toLowerCase() ===
				homeStore.currentCat[0].toString().toLowerCase() && homeStore.isAnimating}
		>
			&gt; {category.title} &gt;
		</li>
    {/if}
		{#each category.items as item}
			{#if (item as Post).awards && data.projects
					.map((x) => x._id)
					.indexOf((item as Post)._id) === Math.round(countStore.inertiaIndex)}
				<Awards item={item as Post} />
			{/if}
      {#if !$page.params.slug || id  === (item as Post)._id}
			<li
				class="font-mono opacity-0 translate-x-full"
				class:selected={id === (item as Post)._id}
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
      {/if}
		{/each}
	{/each}
</ul>

<style lang="postcss" scoped>
  .slug {
    @apply translate-x-[13%] -translate-y-1/4 transition-transform;
  }

	.selected {
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		transition-property: font-family, font-size, font-weight, line-height;
		@apply font-sans text-3xl sm:text-4xl md:text-6xl 2xl:text-7xl  font-bold;
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
