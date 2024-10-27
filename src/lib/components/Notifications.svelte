<script lang="ts">
	import NotificationsEl from './NotificationsEl.svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { untrack } from 'svelte';
	import { gptStore, notificationStore } from '$lib/stores/index.svelte';

	$effect(() => {
		notificationStore.opened;
		untrack(() => {
			if (!notificationStore.opened) return;
			setTimeout(() => {
				notificationStore.opened = false;
			}, 5000);
		});
	});

	// TODO: console easter egg
	// $effect(() => {
	// 	if (!window.console) return;
	// 	untrack(() => {
	// 		notificationStore.opened = true;
	// 		notificationStore.message = "Don't hack my website!";
	// 		notificationStore.sub = '';
	// 	});
	// });
</script>

{#if notificationStore.opened}
	<div
		onclick={() => {
			gptStore.opened = true;
			notificationStore.opened = false;
		}}
		onkeydown={() => {}}
		tabindex="0"
		role="button"
		transition:fly={{ y: 200, duration: 500, easing: cubicInOut }}
		class="notification fixed w-[60vw] top-full -translate-y-[3.5rem] hover:-translate-y-[5rem] transition-transform left-1/2 -translate-x-1/2 z-50 glow h-1/2 show flex justify-start duration-500"
	>
		<NotificationsEl message={notificationStore.message} sub={notificationStore.sub} />
	</div>
{/if}
