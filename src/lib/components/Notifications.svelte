<script lang="ts">
	import NotificationsEl from './NotificationsEl.svelte';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { untrack } from 'svelte';
	import { notificationStore } from '$lib/stores/index.svelte';

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
		transition:fly={{ y: 200, duration: 500, easing: cubicInOut }}
		class="fixed w-[60vw] bottom-0"
	>
		<NotificationsEl message={notificationStore.message} sub={notificationStore.sub} />
	</div>
{/if}
