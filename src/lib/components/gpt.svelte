<script lang="ts">
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { gptStore } from '$lib/stores/index.svelte';
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	import caret from '$lib/images/caret.svg';
	import { error } from '@sveltejs/kit';

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

	let fetching = $state(false);
	let scroller = $state() as HTMLSpanElement;
	let input = $state() as HTMLInputElement;
	let prompt = $state('');
	const logs = $state([]) as Array<{ speaker: string; message: string }>;

	function getSample() {
		const random = Math.floor(Math.random() * 10);
		const text = sampleQuestions[random];
		return text.split('');
	}

	let placeholder = $state(getSample());

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

	async function onkeydown(e: KeyboardEvent) {
		if (e.key.toLowerCase() === 'enter') {
			const x = prompt;
			logs.push({ speaker: 'You', message: x });
			logs.push({ speaker: 'James Henry', message: '...' });
			fetching = true;
			await tick();
			scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' });
			prompt = '';
			try {
				const res = await fetch('/api/chat', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ input: x })
				});
				const data = await res;
				if (!data.body) throw error(204, 'No Body Response');
				const reader = data.body.getReader();
				logs[logs.length - 1].message = '';
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					const textChunk = new TextDecoder().decode(value);
					logs[logs.length - 1].message += textChunk;
				}
				fetching = false;
				input.focus();
				scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' });
			} catch (err) {
				console.error(err);
			}
		}
	}

	onMount(() => {
		changePlaceholder();
		input.focus();
	});

	export async function addMessage() {
		logs.push({
			speaker: 'James Henry',
			message:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor laoreet ligula, quis laoreet arcu lobortis nec. Curabitur ut volutpat ex. Vestibulum fermentum finibus viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam sit amet lacus vestibulum, lobortis sem quis, feugiat elit. Morbi congue bibendum nisi, vel feugiat nulla varius ornare. Suspendisse potenti. Donec sagittis arcu neque, vel rutrum odio mattis vel. Etiam sagittis accumsan facilisis. Donec faucibus gravida leo, non dignissim nunc convallis non. Vivamus convallis egestas neque, non mattis nibh pretium in. Suspendisse consequat, massa eget luctus convallis, turpis mauris ullamcorper enim, at laoreet sapien lorem non velit. Aliquam aliquet venenatis neque, vitae tempus risus sollicitudin sed. In porta neque nisi, in elementum nisi molestie ut.'
		});
		await tick();
		scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' });
	}
</script>

<div
	aria-modal="true"
	transition:scale={{ duration: 500, easing: quintOut }}
	id="gpt"
	class="fixed glow flex flex-col w-[60vw] shadow-sm bg-black p-5 z-30"
>
	<div class="flex w-full justify-between items-start">
		<span bind:this={scroller} class="flex flex-col items-start max-h-[65vh] overflow-y-scroll">
			<p class="uppercase font-mono text-white pb-5">ask me anything</p>
			{#each logs as log}
				<p class="font-mono text-white font-bold">{log.speaker}</p>
				<p class="font-mono text-white pb-5">{log.message}</p>
			{/each}
		</span>
		<button onclick={() => (gptStore.opened = false)}
			><img src={caret} alt="Close Modal" class="w-4 h-auto absolute top-5 right-5" /></button
		>
	</div>
	<input
		bind:this={input}
		bind:value={prompt}
		disabled={fetching}
		type="text"
		class="gpt mx-auto text-3xl bg-transparent focus:outline-none active:outline-none w-full placeholder:opacity-50 text-white placeholder:transition-opacity {fetching
			? 'placeholder:opacity-10'
			: ''}"
		placeholder={placeholder.toString().replaceAll(',', '')}
		{onkeydown}
	/>
</div>
<div
	role="button"
	aria-expanded="true"
	aria-controls="gpt"
	tabindex="0"
	class="button fixed z-20 w-screen h-screen"
	onclick={(e) => {
		e.stopPropagation();
		gptStore.opened = false;
	}}
	onkeydown={(e) => console.log('button clicked')}
></div>

<style lang="scss" scoped>
	.glow {
		box-shadow:
			0 0 150px 0px rgba(255, 255, 255, 0.5),
			0 0 50px 0px rgba(255, 255, 255, 0.75) !important;

		input {
			text-shadow:
				0 0 20px rgba(255, 255, 255, 0.5),
				0 0 50px rgba(255, 255, 255, 0.25);
		}
	}
</style>
