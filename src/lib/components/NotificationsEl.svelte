<script lang="ts">
	import { marked } from 'marked';

	let { message, sub }: { message: string; sub: string } = $props();
</script>

<div class="w-full p-5 pb-6 flex justify-between">
	<p class="font-mono upptext-white text-sm">{@html marked.parse(message)}</p>
	<p class="font-mono uppercase text-white text-sm">{sub}</p>
</div>

<style lang="scss" scoped>
	p {
		text-shadow:
			0 0 10px rgba(255, 255, 255, 0.7),
			0 0 20px rgba(255, 255, 255, 0.2);
	}
</style>
