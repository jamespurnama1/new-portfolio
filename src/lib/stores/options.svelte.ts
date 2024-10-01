import hexRgb from 'hex-rgb';

const options = $state({
	noiseFactor: 0.1,
	noiseScale: 0.005,
	rgbPersistFactor: 0.7,
	alphaPersistFactor: 0.9,
	dark: true,
	showSources: false,
	fullscreen: false
});

export const optionsStore = {
    get options() { return options }
}
