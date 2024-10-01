<script lang="ts">
	import { loadStore } from '$lib/stores/index.svelte';
	import type { Post } from '$lib/types';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let currAward = $state('');
	let awardsEl = $state([]) as HTMLLIElement[];
	let { item }: { item: Post } = $props();
	const awards = item.awards!.sort((a, b) => a.index - b.index);
	onMount(() => {
		gsap.to(awardsEl, {
			x: 0,
			opacity: 1,
			delay: loadStore.loaded ? 0 : 3,
			stagger: 0.1,
			ease: 'power1.out'
		});
	});
</script>

<li bind:this={awardsEl[0]} class="flex gap-5 relative z-10 opacity-0 translate-x-full">
	{#each awards as award}
		<div class="flex flex-col items-start gap-1 w-min">
			<img
				class="w-10 h-10 object-contain brightness-100"
				src={award.icon.asset.url}
				alt={award.issuer}
			/>
			<div class="grid grid-cols-2 gap-2 flex-wrap min-w-12">
				<!-- TODO: Make this into component & less reptitive -->
				{#if award.gold}
					{#each award.gold as gold}
						<button
							class="invert dark:invert-0 w-5 h-5 transition-transform hover:scale-150 bg-gold"
							aria-label={gold}
							onmouseenter={() => (currAward = gold)}
							onmouseleave={() => (currAward = '')}
						></button>
					{/each}
				{/if}
				{#if award.silver}
					{#each award.silver as silver}
						<button
							class="invert dark:invert-0 w-5 h-5 transition-transform hover:scale-150 bg-silver"
							aria-label={silver}
							onmouseenter={() => (currAward = silver)}
							onmouseleave={() => (currAward = '')}
						></button>
					{/each}
				{/if}
				{#if award.bronze}
					{#each award.bronze as bronze}
						<button
							class="invert dark:invert-0 w-5 h-5 transition-transform hover:scale-150 bg-bronze"
							aria-label={bronze}
							onmouseenter={() => (currAward = bronze)}
							onmouseleave={() => (currAward = '')}
						></button>
					{/each}
				{/if}
				{#if award.crystal}
					{#each award.crystal as crystal}
						<button
							class="invert dark:invert-0 w-5 h-5 transition-transform hover:scale-150 bg-crystal"
							aria-label={crystal}
							onmouseenter={() => (currAward = crystal)}
							onmouseleave={() => (currAward = '')}
						></button>
					{/each}
				{/if}
			</div>
		</div>
	{/each}
</li>
<li bind:this={awardsEl[1]} class="text-xs h-6 my-2 w-[70%] opacity-0 translate-x-full">
	{currAward ? currAward : 'Hover to see each awards'}
</li>
