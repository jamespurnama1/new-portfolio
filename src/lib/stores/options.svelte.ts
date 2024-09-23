import hexRgb from 'hex-rgb';

const options = $state({
  noiseFactor: 0.1,
  noiseScale: 0.005,
  rgbPersistFactor: 0.7,
  alphaPersistFactor: 0.2,
  dark: true,
  showCanvas: false,
  fullscreen: false
})

export const optionsStore = {
    get options() { return options }
}
