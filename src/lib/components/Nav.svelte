<script lang="ts">
	import { gsap } from 'gsap';

	export function afterLoad() {
		const tl = gsap.timeline();
		tl.to(
			'nav a',
			{
				opacity: 1,
				y: 0,
				stagger: 0.3,
				duration: 0.8
			},
			'>'
		);
		tl.to(
			'aside a',
			{
				opacity: 1,
				x: 0,
				stagger: 0.3,
				duration: 0.8
			},
			'>'
		);
	}
</script>

<header class="mix-blend-difference uppercase text-white font-mono z-20 relative overflow-hidden">
	<nav class="flex gap-48 fixed w-full top-4 left-4">
		<a class="-translate-y-full opacity-0" href="/about"><p>about</p></a>
		<span>
			<a class="-translate-y-full opacity-0" href="mailto:hello@jameshenry.site"
				><p>hello@jameshenry.site</p></a
			>
			<a
				class="-translate-y-full opacity-0"
				target="_blank"
				rel="noopener noreferrer"
				href="https://wa.me/6285281790980"><p>+6285281790980</p></a
			>
		</span>
		<a class="-translate-y-full opacity-0" href="/gallery"><p>gallery</p></a>
	</nav>
	<aside class="fixed top-0 right-4 h-full flex flex-col justify-center text-right">
		<a
			class="translate-x-full opacity-0"
			href="https://instagram.com/jamespurnama1"
			target="_blank"
			rel="noopener noreferrer"><p>IG</p></a
		>
		<a
			class="translate-x-full opacity-0"
			href="https://behance.com/jamespurnama"
			target="_blank"
			rel="noopener noreferrer"><p>BE</p></a
		>
		<a
			class="translate-x-full opacity-0"
			href="https://linkedin.com/jamespurnama1"
			target="_blank"
			rel="noopener noreferrer"><p>IN</p></a
		>
	</aside>
</header>
