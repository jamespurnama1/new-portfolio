<script lang="ts">
	import { countStore, projectsStore } from '$lib/stores/index.svelte';
	import type { Post } from '$lib/types';
	import type { PageData } from '../../routes/$types';

	let currAward = $state(' ');

	let { item }: { item: Post } = $props();
	const awards = item.awards!;
</script>

	<li class="flex gap-3 relative z-10 opacity-0 translate-x-full">
		{#each awards as award}
			<div class="flex flex-col items-start gap-1 w-min">
				<img
					class="w-10 h-10 object-contain brightness-100"
					src={award.icon.asset.url}
					alt={award.issuer}
				/>
				<div class="flex gap-1 flex-wrap max-w-[5.3em]">
					<!-- TODO: Make this into component & less reptitive -->
					{#if award.gold}
					{#each award.gold as gold}
							<button
								class="invert dark:invert-0 w-10 h-3 transition-transform hover:scale-y-150 bg-gold"
								aria-label={gold}
								onmouseenter={() => (currAward = gold)}
								onmouseleave={() => (currAward = ' ')}
							></button>
					{/each}
					{/if}
					{#if award.silver}
					{#each award.silver as silver}
							<button
								class="invert dark:invert-0 w-10 h-3 transition-transform hover:scale-y-150 bg-silver"
								aria-label={silver}
								onmouseenter={() => (currAward = silver)}
								onmouseleave={() => (currAward = ' ')}
							></button>
					{/each}
					{/if}
					{#if award.bronze}
					{#each award.bronze as bronze}
							<button
								class="invert dark:invert-0 w-10 h-3 transition-transform hover:scale-y-150 bg-bronze"
								aria-label={bronze}
								onmouseenter={() => (currAward = bronze)}
								onmouseleave={() => (currAward = ' ')}
							></button>
					{/each}
					{/if}
					{#if award.crystal}
					{#each award.crystal as crystal}
							<button
								class="invert dark:invert-0 w-10 h-3 transition-transform hover:scale-y-150 bg-white"
								aria-label={crystal}
								onmouseenter={() => (currAward = crystal)}
								onmouseleave={() => (currAward = ' ')}
							></button>
					{/each}
					{/if}
				</div>
			</div>
				{/each}
	</li>
	<li class="text-xs h-6 my-2 w-[70%]">
		{currAward}
	</li>
