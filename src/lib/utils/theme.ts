import { optionsStore } from '$lib/stores/datgui.svelte';

export default (dark: boolean, setStorage: boolean) => {
	if (setStorage) localStorage.setItem('dark-theme', dark.toString());
	optionsStore.options.dark = dark;
	document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}
