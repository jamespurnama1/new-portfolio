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
import gsap from 'gsap'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'
import DotScreenShader from './shader/customShader'
import vertexShader from './shader/vertexNew.glsl'
import fragmentShader from './shader/fragmentNew.glsl'
import vertexShader2 from './shader/vertexNew2.glsl'
import fragmentShader2 from './shader/fragmentNew2.glsl'

export default class Grain {
  container: HTMLElement
  canvas: HTMLCanvasElement
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
  width: number
  height: number
  time: number
  material: ShaderMaterial | null
  mat: ShaderMaterial | null
  imageAspect: number
  cubeRenderTarget: WebGLCubeRenderTarget | null
  cubeCamera: CubeCamera | null
  env: Mesh | null
  sphere: Mesh | null
  composer: EffectComposer
  // goIn: Boolean

  constructor(options) {
    this.container = options.dom
    this.canvas = this.container.querySelector('canvas')!
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      // antialias: true,
    })
    this.time = 0
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.imageAspect = 1
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xffffff)
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.width / this.height,
      0.1,
      50
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
    // this.goIn = false

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
        sat: {
          value: 0.0
        },
        resolution: { value: new THREE.Vector4() },
      },
      // wireframe: true,
    })

    const envGeo = new THREE.SphereGeometry(1.5, 32, 32)

    this.env = new THREE.Mesh(envGeo, this.material)
    this.env.position.set(0, 0, 0)
    this.env.matrixAutoUpdate = false
    this.scene.add(this.env)

    const geo = new THREE.SphereGeometry(0.4, 32, 32).translate(-0.4, 0.4, 0.4)
    this.mat = new THREE.ShaderMaterial({
      vertexShader: vertexShader2,
      fragmentShader: fragmentShader2,
      uniforms: {
        time: { value: 0 },
        tCube: { value: 0 },
        resolution: { value: new THREE.Vector4() },
      },
    })
    this.sphere = new THREE.Mesh(geo, this.mat)
    this.sphere.position.set(-1, 1, 1)
    // this.sphere.matrixAutoUpdate = false
    this.scene.add(this.sphere)
  }

  postProcess() {
    this.composer.addPass(new RenderPass(this.scene, this.camera))

    const smaaPass =new SMAAPass( window.innerWidth * this.renderer.getPixelRatio(), window.innerHeight * this.renderer.getPixelRatio() );
    this.composer.addPass(smaaPass)
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

  in() {
    const pos = new THREE.Vector3()
    const vec = new THREE.Vector3()
    const left = Math.max(0.4, 0.5 - (0.1 * this.width) / 1920)
    const top = 0.75 - (0.1 * this.height) / 1080
    vec.set(left * 2 - 1, -top * 2 + 1, 0.5)
    vec.sub(this.camera.position).normalize()
    const distance = -this.camera.position.z / vec.z
    pos.copy(this.camera.position).add(vec.multiplyScalar(distance))
    this.sphere!.scale.set(
      Math.max(0.5, this.width / 1920),
      Math.max(0.5, this.width / 1920),
      Math.max(0.5, this.width / 1920)
    )
    gsap.to(this.sphere!.position, {
      x: pos.x, 
      y: pos.y,
      z: pos.z,
      duration: 3
    })
    // this.sphere!.updateMatrix()
    gsap.to(this.material!.uniforms.sat, {
      value: 1,
      duration: 2,
    })
  }

  handleResize = () => {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.composer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }
}
