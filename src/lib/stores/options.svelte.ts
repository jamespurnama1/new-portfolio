let noiseFactor = $state(0.1);
let noiseScale = $state(0.005);
let rgbPersistFactor = $state(0.7);
let alphaPersistFactor = $state(0.9);
let dark = $state(true);
let showSources = $state(false);
let fullscreen = $state(false);
let notification = $state(false);

export const optionsStore = {
	get noiseFactor() {
		return noiseFactor;
	},
	set noiseFactor(newVal) {
		noiseFactor = newVal;
	},
	get noiseScale() {
		return noiseScale;
	},
	set noiseScale(newVal) {
		noiseScale = newVal;
	},
	get rgbPersistFactor() {
		return rgbPersistFactor;
	},
	set rgbPersistFactor(newVal) {
		rgbPersistFactor = newVal;
	},
	get alphaPersistFactor() {
		return alphaPersistFactor;
	},
	set alphaPersistFactor(newVal) {
		alphaPersistFactor = newVal;
	},
	get dark() {
		return dark;
	},
	set dark(newVal) {
		dark = newVal;
	},
	get showSources() {
		return showSources;
	},
	set showSources(newVal) {
		showSources = newVal;
	},
	get fullscreen() {
		return fullscreen;
	},
	set fullscreen(newVal) {
		fullscreen = newVal;
	},
	get notification() {
		return notification;
	},
	set notification(newVal) {
		notification = newVal;
	}
};
