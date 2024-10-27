<script lang="ts">
	import type { Award, Post } from '$lib/types';
	import { fade, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let currAward = $state('');
	let mounted = $state(false);
	let awardsEl = $state([]) as HTMLDivElement[];
	let { item }: { item: Post } = $props();
	const awards = [...(item.awards as Award[])]!.sort((a, b) => a.index - b.index);

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<div
		bind:this={awardsEl[0]}
		in:fly={{ x: 200, duration: 500, easing: cubicInOut }}
		out:fade
		class:scale-[75%]={$page.params.slug}
		class="flex gap-5 relative z-10 origin-left transition-transform duration-1000 md:scale-100"
	>
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
	</div>
	<p
		bind:this={awardsEl[1]}
		class="text-xs h-6 my-2 w-[70%] font-mono font-light"
		transition:fly={{ x: 200, duration: 500, easing: cubicInOut, delay: 100 }}
	>
		{currAward ? currAward : 'Hover to see each awards'}
	</p>
{/if}
