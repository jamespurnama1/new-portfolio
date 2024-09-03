<script lang="ts">
	import { countStore, loadStore, projectsStore, homeStore } from '$lib/stores/index.svelte';
	import gsap from 'gsap';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import DandAD from '$lib/images/awards/D&AD.png?as=run';
	import AdFest from '$lib/images/awards/AdFest.png?as=run';
	import SpikesAsia from '$lib/images/awards/Spikes_Asia.png?as=run';
	import MADSTARS from '$lib/images/awards/MAD_STARS.png?as=run';
	import TheOneShow from '$lib/images/awards/The_One_Show.png?as=run';

	let innerWidth = $state(0);
	let innerHeight = $state(0);
	let projectList: HTMLUListElement;
	let currAward = $state(' ');

	$effect(() => {
		const li = projectList.querySelectorAll('li');
		gsap.set(li, {
			x: innerWidth,
			opacity: 0
		});
		if (!loadStore.loaded || !projectsStore.projectsLength) return;
		gsap.to(li, {
			x: 0,
			opacity: 1,
			delay: 3,
			stagger: 0.1,
			ease: 'power1.out'
		});
	});
</script>

<svelte:head>
	<title>James Henry</title>
	<meta name="description" content="Portfolio" />
</svelte:head>

<section class="w-screen h-screen overflow-hidden flex items-center justify-center p-24">
	{#if homeStore.isAnimating}
		<h2
			class="text-white mix-blend-difference uppercase font-mono text-7xl absolute left-[15%] pointer-events-none text-center w-[30vw]"
			transition:scale={{ duration: 500, start: 0.5, easing: quintOut }}
		>
			{homeStore.currentCat[0]}
		</h2>
	{/if}

	<ul
		bind:this={projectList}
		class:opacity-0={loadStore.load < 100}
		class="absolute left-[60%] dark:text-white text-black font-mono ml-auto z-10 transition-all"
	>
		{#each Object.entries(projectsStore.projects) as [category, projects], i}
			<li
				class="font-mono uppercase pt-5 transition-all"
				class:animateText={category.split('_')[1].toLowerCase() ===
					homeStore.currentCat[0].toString().toLowerCase() && homeStore.isAnimating}
			>
				&gt; {category.split('_')[1]} &gt;
			</li>
			{#each projects as item}
				{#if item.metadata.awards && projectsStore.projectsArr
						.map((x) => x.id)
						.indexOf(item.id) === Math.round(countStore.inertiaIndex)}
					<li class="flex gap-3 relative z-10">
						{#each Object.entries(item.metadata.awards) as [issuer, awards]}
							<div class="flex flex-col items-start gap-1">
								<img
									class="w-10 h-10 object-contain"
									src={eval(issuer.replace(/\s/g, ''))}
									alt={issuer}
								/>
								<div class="flex gap-1 flex-wrap max-w-32">
									{#each Object.entries(awards) as [color, award]}
										{#if typeof award === 'string'}
											<button
												class="w-10 h-3 transition-transform hover:scale-y-150 bg-{color.toLowerCase()}"
												aria-label={award}
												onmouseenter={(currAward = award)}
												onmouseleave={(currAward = ' ')}
											></button>
										{:else}
											{#each award as item}
												<button
													class="w-10 h-3 transition-transform hover:scale-y-150 bg-{color.toLowerCase()}"
													aria-label={item}
													onmouseenter={(currAward = item)}
													onmouseleave={(currAward = ' ')}
												></button>
											{/each}
										{/if}
									{/each}
								</div>
							</div>
						{/each}
					</li>
					<li class="text-xs h-4">
						{currAward}
					</li>
				{/if}
				<li
					class="font-mono transition-all"
					class:selected={projectsStore.projectsArr.map((x) => x.id).indexOf(item.id) ===
						Math.round(countStore.inertiaIndex)}
				>
					<button
						class="text-left"
						onclick={() => {
							countStore.inertiaIndex = projectsStore.projectsArr.map((x) => x.id).indexOf(item.id);
						}}
					>
						{item.title}
					</button>
				</li>
			{/each}
		{/each}
	</ul>
</section>

<svelte:window bind:innerWidth bind:innerHeight />

<style lang="postcss" scoped>
	.selected {
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
