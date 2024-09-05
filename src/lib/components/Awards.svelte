<script lang="ts">
  	import DandAD from '$lib/images/awards/D&AD.png?as=run';
	import AdFest from '$lib/images/awards/AdFest.png?as=run';
	import SpikesAsia from '$lib/images/awards/Spikes_Asia.png?as=run';
	import MADSTARS from '$lib/images/awards/MAD_STARS.png?as=run';
	import TheOneShow from '$lib/images/awards/The_One_Show.png?as=run';
	import { countStore, projectsStore } from '$lib/stores/index.svelte';
	import type { CMS } from '$lib/types';

  	let currAward = $state(' ');

    let {item}: {item:CMS} = $props()
</script>

{#if item.metadata.awards && projectsStore.projectsArr
						.map((x) => x.id)
						.indexOf(item.id) === Math.round(countStore.inertiaIndex)}
					<li class="flex gap-3 relative z-10">
						{#each Object.entries(item.metadata.awards) as [issuer, awards]}
							<div class="flex flex-col items-start gap-1">
								<img
									class="w-10 h-10 object-contain brightness-100"
									src={eval(issuer.replace(/\s/g, ''))}
									alt={issuer}
								/>
								<div class="flex gap-1 flex-wrap max-w-[5.3em]">
									{#each Object.entries(awards) as [color, award]}
										{#if typeof award === 'string'}
											<button
												class="invert dark:invert-0 w-10 h-3 transition-transform hover:scale-y-150 bg-{color.toLowerCase()}"
												aria-label={award}
												onmouseenter={() => currAward = award}
												onmouseleave={() => currAward = ' '}
											></button>
										{:else}
											{#each (award as string[]) as item}
												<button
													class="invert dark:invert-0 w-10 h-3 transition-transform hover:scale-y-150 bg-{color.toLowerCase()}"
													aria-label={item}
													onmouseenter={() => currAward = item}
													onmouseleave={() => currAward = ' '}
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