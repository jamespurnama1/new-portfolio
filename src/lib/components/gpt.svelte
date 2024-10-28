<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { gptStore, loadStore, notificationStore, projectsStore } from '$lib/stores/index.svelte';
	import { onMount, tick, untrack } from 'svelte';
	import { gsap } from 'gsap';
	import caret from '$lib/images/caret.svg';
	import x_img from '$lib/images/x.svg';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import type { LayoutData } from '../../routes/$types';
	import { marked } from 'marked';

	const sampleQuestions = [
		'What do you do?',
		'Where are you based?',
		'Can I download your resume?',
		'Show me a project.',
		'I want to send you a message.',
		'Where did you study?',
		'Why do you do what you do?',
		'Where do you work?',
		'Tell me about yourself.',
		'What awards do you have?'
	];
	const {
		categoryAnim,
		data
	}: { data: LayoutData; categoryAnim: ((direction: 'up' | 'down') => void) | null } = $props();
	let fetching = $state(false);
	let scroller = $state() as HTMLSpanElement;
	let input = $state() as HTMLDivElement;
	let prompt = $state('');
	const logs = $state([]) as Array<{ speaker: string; message: string }>;
	let prevRandom = $state() as number;

	function getSample() {
		let random = Math.floor(Math.random() * 10);
		while (random === prevRandom) {
			// re-roll if same random as prev
			random = Math.floor(Math.random() * 10);
		}
		prevRandom = random;

		const text = sampleQuestions[random];
		return text.split('');
	}

	let placeholder = $state(getSample());

	function notification() {
		gptStore.opened = false;
		setTimeout(() => {
			notificationStore.message = logs[logs.length - 1].message;
			notificationStore.opened = true;
		}, 1000);
	}

	function changePlaceholder() {
		let length = {
			value: placeholder.length
		};

		gsap.to(length, {
			value: 0,
			duration: placeholder.length * 0.05,
			delay: 3,
			onUpdate: () => {
				placeholder.length = length.value;
			},
			onComplete: () => {
				const text: Array<string | (() => void)> = getSample();
				text.push(changePlaceholder);
				text.forEach((x, i) => {
					setTimeout(
						() => {
							if (typeof x === 'string') {
								placeholder.push(x);
							} else {
								x();
							}
						},
						100 * (i + 1)
					);
				});
			}
		});
	}

	// TODO: args Type Safety
	function handleRun(funcName: string, args: any) {
		switch (funcName) {
			case 'download_resume':
				window.open('/Resume_James Henry.pdf', '_blank');
				break;
			case 'go_to_about':
				goto('/about');
				notification();
				break;
			case 'random_project':
				const random = Math.floor(Math.random() * projectsStore.projectsLength) + 1;
				goto(`/work/${data.projects[random].slug.current}`);
				notification();
				break;
			case 'to_project':
				goto(`/work/${args.slug}`);
				notification();
				break;
			case 'send_a_message':
				console.log('message', args.contact_info, args.user_message);
				break;
		}
	}

	export async function pushMessage(speaker: string, message: string, add?: boolean) {
		if (add) {
			logs[logs.length - 1].message += message;
		} else if (add === false) {
			logs[logs.length - 1].message = message;
		} else {
			logs.push({ speaker, message });
		}
		await tick();
		scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' });
	}

	async function onkeydown(e?: KeyboardEvent) {
		if (prompt === '' || prompt.charCodeAt(0) === 10) return;
		if (!e || (e.key.toLowerCase() === 'enter' && !e.shiftKey)) {
			if (e) e?.preventDefault();
			if (categoryAnim) categoryAnim('up');
			const x = prompt;
			pushMessage('You', x);
			pushMessage('James Henry', '...');
			fetching = true;
			prompt = '';
			try {
				const res = await fetch('/api/chat', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ input: x })
				});
				let isFunc = false;
				const data = await res;
				if (!data.body) throw error(204, 'No Body Response');
				const reader = data.body.getReader();
				pushMessage('James Henry', '', false);

				let func = '';
				let message = '';
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					const textChunk = new TextDecoder().decode(value);
					if (textChunk.includes('func_run')) {
						func += textChunk;
						isFunc = true;
					} else if (func.includes('end_run') || !isFunc) {
						pushMessage('James Henry', textChunk, true);
					} else {
						message += textChunk;
					}
				}
				if (func !== '') {
					const parts = func.split(' ');
					const argIndex = parts.findIndex((part) => part.startsWith('{'));
					const args = JSON.parse(parts.slice(argIndex, parts.length - 1).join(' '));
					handleRun(parts[1], args);
				}
				//push message after run is complete
				if (isFunc && message !== '') {
					pushMessage('James Henry', message);
				}
				fetching = false;
				input.focus();
			} catch (err) {
				console.error(err);
			}
		}
	}

	let inputIsOverflowing = $derived(
		prompt.length && input && input.scrollWidth > input.clientWidth
	);
	let inputScrolledRight = $state(false);
	let inputScrolledLeft = $state(false);

	function onInputScroll() {
		inputScrolledRight = Math.abs(input.scrollLeft + input.clientWidth - input.scrollWidth) <= 2;
		inputScrolledLeft = input.scrollLeft === 0;
	}

	let chatClientHeight = $state(0);
	let chatIsOverflowing = $derived(
		logs.length && scroller && scroller.scrollHeight > chatClientHeight
	);

	let chatScrolledBottom = $state(false);
	let chatScrolledTop = $state(false);

	function onChatScroll() {
		if (scroller.clientHeight === scroller.scrollHeight) {
			chatScrolledBottom = false;
			chatScrolledTop = false;
		} else {
			chatScrolledBottom =
				Math.abs(scroller.scrollTop + scroller.clientHeight - scroller.scrollHeight) < 1;
			chatScrolledTop = scroller.scrollTop === 0;
		}
	}

	$effect(() => {
		if (!gptStore.opened) return;
		untrack(() => {
			input.focus();
		});
	});

	onMount(() => {
		changePlaceholder();
	});
</script>

<!-- {#key gptStore.opened} -->
<div
	role={gptStore.opened ? 'modal' : 'button'}
	onclick={() => {
		gptStore.opened = true;
	}}
	aria-modal="true"
	transition:fly={{ y: '46vh', duration: 500, easing: quintOut }}
	id="gpt"
	class:opacity-0={!loadStore.loaded || (notificationStore.opened && !gptStore.opened)}
	class:show={gptStore.opened}
	class="fixed min-h-24 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col p-5 pt-0 w-[60vw] duration-500 bg-black z-30 transition-[transform opacity] glow"
>
	<div class="flex flex-col w-full justify-center items-center">
		<div class="w-full p-5 flex justify-between items-center">
			<p class="font-mono text-white">Ask me anything</p>
			<button
				class="relative z-30"
				onclick={(e) => {
					e.stopPropagation();
					gptStore.opened = false;
				}}
				><img
					src={x_img}
					alt="Close Modal"
					class:invisible={!gptStore.opened}
					class="w-4 h-auto pointer-events-none invert dark:invert-0"
				/></button
			>
		</div>
		<span
			bind:this={scroller}
			bind:clientHeight={chatClientHeight}
			class:mask={chatIsOverflowing}
			class:mask-top={chatScrolledBottom}
			class:mask-bottom={chatScrolledTop}
			onscroll={onChatScroll}
			class="mask flex flex-col items-start max-h-[65vh] w-full overflow-y-scroll px-12"
		>
			{#each logs as log}
				<p class="font-mono text-white font-bold">{log.speaker}</p>
				<p class="font-mono text-white pb-5">{@html marked.parse(log.message)}</p>
			{/each}
		</span>
	</div>
	<div class="flex w-full relative items-center p-5 gap-3">
		<div
			class:invisible={prompt !== ''}
			class="absolute pointer-events-none flex-grow text-3xl opacity-10 text-white"
		>
			{placeholder.toString().replaceAll(',', '')}
		</div>
		<div
			contenteditable="true"
			role="textbox"
			tabindex="0"
			bind:this={input}
			bind:innerText={prompt}
			class:gpt-mask={inputIsOverflowing}
			class:mask-left={inputScrolledRight}
			class:mask-right={inputScrolledLeft}
			onscroll={onInputScroll}
			class="gpt overflow-x-scroll text-nowrap flex-grow mx-auto text-3xl bg-transparent focus:outline-none active:outline-none placeholder:opacity-50 text-white placeholder:transition-opacity {fetching
				? 'placeholder:opacity-10'
				: ''}"
			{onkeydown}
		></div>
		<button
			disabled={prompt === '' || prompt.charCodeAt(0) === 10}
			class="right-0 w-8 h-auto disabled:opacity-10 disabled:hover:scale-100 hover:scale-150 flex-shrink-0 transition-[transform_opacity] duration-500"
			onclick={() => onkeydown()}
			><img src={caret} alt="Send Message Button" class="w-full h-auto -rotate-90" /></button
		>
	</div>
</div>
<div
	role="button"
	aria-expanded="true"
	aria-controls="gpt"
	tabindex="0"
	class="button fixed z-[29] w-screen h-screen top-0 left-0"
	class:hidden={!gptStore.opened}
	onclick={(e) => {
		e.stopPropagation();
		gptStore.opened = false;
	}}
	onkeydown={(e) => console.log('button clicked')}
></div>

<!-- {/key} -->

<style lang="scss" scoped>
	#gpt {
		transform: translate(-50%, calc(50vh - 3.5rem));

		&:hover {
			transform: translate(-50%, calc(50vh - 5rem));
		}

		&.show {
			transform: translate(-50%, -50%);
		}

		:global(a) {
			@apply underline;
		}
	}

	.gpt-mask {
		mask-image: linear-gradient(
			90deg,
			rgba(2, 0, 36, 0) 0%,
			rgba(0, 0, 0, 1) 15%,
			rgba(0, 0, 0, 1) 75%,
			rgba(0, 0, 0, 0) 100%
		);
	}

	.mask {
		mask-image: linear-gradient(
			0deg,
			rgba(2, 0, 36, 0) 0%,
			rgba(0, 0, 0, 1) 15%,
			rgba(0, 0, 0, 1) 75%,
			rgba(0, 0, 0, 0) 100%
		);
		&-bottom {
			mask-image: linear-gradient(0deg, rgba(2, 0, 36, 0) 0%, rgba(0, 0, 0, 1) 15%);
		}
		&-top {
			mask-image: linear-gradient(0deg, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%);
		}
		&-left {
			mask-image: linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgba(0, 0, 0, 1) 15%);
		}
		&-right {
			mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%);
		}
	}
</style>
