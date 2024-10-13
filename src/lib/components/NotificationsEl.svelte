<script lang="ts">
	import {marked} from 'marked';

	let { message, sub }: { message: string, sub: string } = $props();
</script>

<div class="bg-black w-full p-5 shadow-3xl shadow-black flex justify-between invert dark:invert-0 glow">
	<p class="font-mono uppercase text-white text-sm">{@html marked.parse(message)}</p>
	<p class="font-mono uppercase text-white text-sm">{sub}</p>
</div>

<style lang="scss" scoped>
	p {
		text-shadow: 0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.2);
	}

		.glow {
		animation: glowing 5s infinite;
		input {
			text-shadow:
				0 0 20px rgba(255, 255, 255, 0.5),
				0 0 50px rgba(255, 255, 255, 0.25);
		}
	}

	@keyframes glowing {
		0% {
			box-shadow:
				inset 0 0 10px rgba(255, 255, 255, 0.75),
				inset 0 1px 30px rgba(255, 255, 255, 0.3),
				inset -1px 0 30px rgba(255, 0, 255, 0.3),
				inset 1px 0 30px rgba(0, 255, 255, 0.3),
				0 0 10px rgba(255, 255, 255, 0.75),
				-10px 0 80px rgba(255, 0, 255, 0.5),
				10px 0 80px rgba(0, 255, 255, 0.5);
		}
		25% {
			box-shadow:
				inset 0 0 10px rgba(255, 255, 255, 0.75),
				inset 0 1px 30px rgba(255, 255, 255, 0.3),
				inset 0 0 30px rgba(255, 0, 255, 0.3),
				inset 0 0 30px rgba(0, 255, 255, 0.3),
				0 0 10px rgba(255, 255, 255, 0.75),
				0 0 80px rgba(255, 0, 255, 0.5),
				0 0 80px rgba(0, 255, 255, 0.5);
		}
		50% {
			box-shadow:
				inset 0 0 10px rgba(255, 255, 255, 0.75),
				inset 0 1px 30px rgba(255, 255, 255, 0.3),
				inset 1px 0 30px rgba(255, 0, 255, 0.3),
				inset -1px 0 30px rgba(0, 255, 255, 0.3),
				0 0 10px rgba(255, 255, 255, 0.75),
				10px 0 80px rgba(255, 0, 255, 0.5),
				-10px 0 80px rgba(0, 255, 255, 0.5);
		}
		75% {
			box-shadow:
				inset 0 0 10px rgba(255, 255, 255, 0.75),
				inset 0 1px 30px rgba(255, 255, 255, 0.3),
				inset 0 0 30px rgba(255, 0, 255, 0.3),
				inset 0 0 30px rgba(0, 255, 255, 0.3),
				0 0 10px rgba(255, 255, 255, 0.75),
				0 0 80px rgba(255, 0, 255, 0.5),
				0 0 80px rgba(0, 255, 255, 0.5);
		}
		100% {
			box-shadow:
				inset 0 0 10px rgba(255, 255, 255, 0.75),
				inset 0 1px 30px rgba(255, 255, 255, 0.3),
				inset -1px 0 30px rgba(255, 0, 255, 0.3),
				inset 1px 0 30px rgba(0, 255, 255, 0.3),
				0 0 10px rgba(255, 255, 255, 0.75),
				-10px 0 80px rgba(255, 0, 255, 0.5),
				10px 0 80px rgba(0, 255, 255, 0.5);
		}
	}
</style>
