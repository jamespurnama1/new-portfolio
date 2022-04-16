// import glslify from 'glslify'
import * as THREE from 'three'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  ShaderMaterial,
  CubeCamera,
  WebGLCubeRenderTarget,
  Mesh,
} from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { DotScreenShader } from './shader/customShader'
import vertexShader from './shader/vertexNew.glsl'
import fragmentShader from './shader/fragmentNew.glsl'
import vertexShader2 from './shader/vertexNew2.glsl'
import fragmentShader2 from './shader/fragmentNew2.glsl'

// import 'glsl-noise/simplex/2d.glsl'

export default class Grain {
  container: HTMLElement
  canvas: HTMLCanvasElement
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
  width: number
  height: number
  color: number
  time: number
  material: ShaderMaterial | null
  mat: ShaderMaterial | null
  imageAspect: number
  cubeRenderTarget: WebGLCubeRenderTarget | null
  cubeCamera: CubeCamera | null
  env: Mesh | null
  sphere: Mesh | null
  composer: EffectComposer

  constructor(options) {
    this.container = options.dom
    this.canvas = this.container.querySelector('canvas')!
    this.color = options.color
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    this.time = 0
    this.width = this.canvas.offsetWidth
    this.height = this.canvas.offsetHeight
    this.imageAspect = 1
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xffffff)
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.width / this.height,
      0.1,
      10000
    )
    this.material = null
    this.mat = null
    this.env = null
    this.sphere = null
    this.cubeRenderTarget = null
    this.cubeCamera = null
    this.composer = new EffectComposer(this.renderer)
    this.camera.position.set(0, 0, 1.3)
    this.scene.add(this.camera)

    this.setSphere()
    this.postProcess()
    this.handleResize()

    // start RAF
    this.events()
  }

  setSphere() {
    this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
      format: THREE.RGBAFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipMapLinearFilter,
      encoding: THREE.sRGBEncoding,
    })

    this.cubeCamera = new THREE.CubeCamera(0.1, 10, this.cubeRenderTarget)

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        color1: {
          value: new THREE.Color(0x186bd9),
        },
        color2: {
          value: new THREE.Color(0xa84ed4),
        },
        color3: {
          value: new THREE.Color(0x000000),
        },
        resolution: { value: new THREE.Vector4() },
      },
    })

    const envGeo = new THREE.SphereGeometry(1.5, 32, 32)

    this.env = new THREE.Mesh(envGeo, this.material)
    this.env.position.set(0, 0.5, 0)
    this.scene.add(this.env)

    const geo = new THREE.SphereGeometry(0.4, 32, 32)

    this.mat = new THREE.ShaderMaterial({
      vertexShader: vertexShader2,
      fragmentShader: fragmentShader2,
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        tCube: { value: 0 },
        resolution: { value: new THREE.Vector4() },
      },
    })
    this.sphere = new THREE.Mesh(geo, this.mat)
    this.sphere.position.set(-0.9, -0.5, 0)
    this.scene.add(this.sphere)
  }

  postProcess() {
    this.composer.addPass(new RenderPass(this.scene, this.camera))

    const fxaaPass = new ShaderPass(FXAAShader)
    this.composer.addPass(fxaaPass)
    const effect1 = new ShaderPass(DotScreenShader)
    effect1.uniforms.scale.value = 4
    this.composer.addPass(effect1)
  }

  events() {
    window.addEventListener('resize', this.handleResize, { passive: true })
    this.draw()
  }

  draw = () => {
    // now: time in ms
    // if (this.controls) this.controls.update() // for damping
    this.time += 0.01

    this.sphere!.visible = false
    this.cubeCamera!.update(this.renderer, this.scene)
    this.sphere!.visible = true
    this.mat!.uniforms.tCube.value = this.cubeRenderTarget!.texture
    this.material!.uniforms.time.value = this.time
    this.composer.render()
    // this.renderer.render(this.scene, this.camera)

    window.requestAnimationFrame(this.draw.bind(this))
  }

  handleMouse(degree) {
    if (!this.env) return
    this.env.rotation.x = degree.x
    this.env.rotation.y = degree.y
  }

  handleResize = () => {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.composer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height

    // this.imageAspect = 853 / 1280

    // let a1
    // let a2

    // if (this.height / this.width > this.imageAspect) {
    //   a1 = (this.width / this.height) * this.imageAspect
    //   a2 = 1
    // } else {
    //   a1 = 1
    //   a2 = (this.height / this.width) * this.imageAspect
    // }

    // this.material!.uniforms.resolution.value.x = this.width
    // this.material!.uniforms.resolution.value.y = this.height
    // this.material!.uniforms.resolution.value.z = a1
    // this.material!.uniforms.resolution.value.w = a2

    this.camera.updateProjectionMatrix()
  }
}
