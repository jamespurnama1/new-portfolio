import * as dat from 'dat.gui'
import { optionsStore } from '$lib/stores/datgui.svelte';
import { get } from 'svelte/store';
import hexRgb from 'hex-rgb';

const gui = new dat.GUI();
gui.close();

(function setGUISettings() {
  gui.add(optionsStore.options, 'noiseFactor', 0.1, 50, 0.1).onChange(value => optionsStore.options.noiseFactor = value)
  gui.add(optionsStore.options, 'noiseScale', 0.002, 0.01, 0.001).onChange(value => optionsStore.options.noiseScale = value)
  gui.add(optionsStore.options, 'rgbPersistFactor', 0.01, 0.99, 0.01).onChange(value => optionsStore.options.rgbPersistFactor = value)
  gui.add(optionsStore.options, 'alphaPersistFactor', 0.01, 0.99, 0.01).onChange(value => optionsStore.options.alphaPersistFactor = value)
  gui.add(optionsStore.options, 'rotation', 0, 360, 1).onChange(value => optionsStore.options.rotation = value)
  gui.add(optionsStore.options, 'dark').onChange(value => optionsStore.options.dark = value)
  gui.add(optionsStore.options, 'showCanvas').onChange(value => optionsStore.options.showCanvas = value)
  // gui.addColor(store, 'backgroundColor').onChange(value => options.update(x => {
  //   x.backgroundColor = value; return x}))
  // gui.addColor(store, 'color').onChange(value => options.update(x => {
  //   const rgba = hexRgb(value, { format: 'array' })
  //   x.color = value;
  //   x.PERSIST_COLOR[0] = rgba[0] / 255
  //   x.PERSIST_COLOR[1] = rgba[1] / 255
  //   x.PERSIST_COLOR[2] = rgba[2] / 255
  //   return x}))
})();

// (function setGUISettings() {
//   gui.add(OPTIONS, 'text').onChange((text) => {
//     drawText({ text })
//   })
//   gui.add(OPTIONS, 'noiseFactor', 0.1, 50, 0.1).onChange((v) => {
//     fullscreenQuadMaterial.uniforms.noiseFactor.value = v
//   })
//   gui.add(OPTIONS, 'noiseScale', 0.002, 0.01, 0.001).onChange((v) => {
//     fullscreenQuadMaterial.uniforms.noiseScale.value = v
//   })
//   gui.add(OPTIONS, 'rgbPersistFactor', 0.01, 0.99, 0.01).onChange((v) => {
//     fullscreenQuadMaterial.uniforms.rgbPersistFactor.value = v
//   })
//   gui.add(OPTIONS, 'alphaPersistFactor', 0.01, 0.99, 0.01).onChange((v) => {
//     fullscreenQuadMaterial.uniforms.alphaPersistFactor.value = v
//   })
//   gui.add(OPTIONS, 'animateColor')
//   gui.addColor(OPTIONS, 'color').onChange((v) => {
//     const rgba = hexRgb(v, { format: 'array' })
//     PERSIST_COLOR[0] = rgba[0] / 255
//     PERSIST_COLOR[1] = rgba[1] / 255
//     PERSIST_COLOR[2] = rgba[2] / 255
//   })
//   gui.addColor(OPTIONS, 'borderColor').onChange((v) => {
//     fullscreenBorderMaterial.color = new Color(v)
//   })
//   gui.add(OPTIONS, 'showBorder').onChange((v) => {
//     fullscreenBorderMesh.visible = v
//   })
// })();
