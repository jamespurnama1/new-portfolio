import { optionsStore } from '$lib/stores/options.svelte';

export function theme(dark: boolean, setStorage: boolean = false) {
	if (setStorage) localStorage.setItem('dark-theme', dark.toString());
	optionsStore.dark = dark;
	document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}

export function checkSavedTheme() {
	const colorScheme = window.matchMedia('(prefers-color-scheme:dark)');
	const localStorageTheme = localStorage.getItem('dark-theme');

	theme(localStorageTheme === null ? colorScheme.matches : localStorageTheme === 'true', false);

	colorScheme.addEventListener('change', (e) =>
		localStorageTheme === null ? theme(e.matches, false) : null
	);
}
