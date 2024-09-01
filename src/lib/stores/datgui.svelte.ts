import hexRgb from 'hex-rgb';

const START_COLOR = '#fff'
const startColorRGB = hexRgb(START_COLOR, { format: 'array' })

const options = $state({
  PERSIST_COLOR: [
    startColorRGB[0] / 255,
    startColorRGB[1] / 255,
    startColorRGB[2] / 255,
  ],
  text: 'play',
  // noiseFactor: 1
  noiseFactor: 0.1,
  // noiseScale: 0.01,
  noiseScale: 0.005,
  rgbPersistFactor: 0.7,
  alphaPersistFactor: 0.2,
  color: '#fff',
  backgroundColor: '#000',
  fontFamily: 'Helvetica',
  rotation: 0,
  dark: true,
  showCanvas: false
})

export const optionsStore = {
    get options() { return options }
}
