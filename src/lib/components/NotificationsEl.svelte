<script lang="ts">
	let { message, sub }: { message: string, sub: string } = $props();
</script>

<div class="bg-white dark:bg-black w-full p-3 shadow-3xl dark:shadow-white shadow-black flex justify-between">
	<p class="font-mono uppercase dark:text-white text-black text-sm">{message}</p>
	<p class="font-mono uppercase dark:text-white text-black text-sm">{sub}</p>
</div>

<style lang="scss" scoped>
	p {
		text-shadow: 0 0 10px #fff, 0 0 20px #fff;
	}
</style>
