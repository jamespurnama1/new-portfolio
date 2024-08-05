import * as dat from 'dat.gui'
import { options } from '$lib/stores/datgui';
import { get } from 'svelte/store';
import hexRgb from 'hex-rgb';

const store = get(options);

const gui = new dat.GUI();
gui.close();

(function setGUISettings() {
  gui.add(store, 'text').onChange(value => options.update(x => {
    x.text = value; return x}))
  gui.add(store, 'noiseFactor', 0.1, 50, 0.1).onChange(value => options.update(x => {
    x.noiseFactor = value; return x}))
  gui.add(store, 'noiseScale', 0.002, 0.01, 0.001).onChange(value => options.update(x => {
    x.noiseScale = value; return x}))
  gui.add(store, 'rgbPersistFactor', 0.01, 0.99, 0.01).onChange(value => options.update(x => {
    x.rgbPersistFactor = value; return x}))
  gui.add(store, 'alphaPersistFactor', 0.01, 0.99, 0.01).onChange(value => options.update(x => {
    x.alphaPersistFactor = value; return x}))
  gui.add(store, 'rotation', 0, 360, 1).onChange(value => options.update(x => {
    x.rotation = value; return x}))
  gui.add(store, 'dark').onChange(value => options.update(x => {
    x.dark = value; return x}))
  gui.add(store, 'showCanvas').onChange(value => options.update(x => {
    x.showCanvas = value; return x}))
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

options.subscribe(value => {
  // console.log(value)
})

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
