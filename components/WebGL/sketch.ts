import * as THREE from 'three'

import {
  Clock,
  Group,
  Mesh,
  PerspectiveCamera,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import fragment from './shader/fragment.glsl'
import vertex from './shader/vertex.glsl'

export default class Sketch {
  container: HTMLElement
  canvas: HTMLCanvasElement
  scene: Scene
  width: number
  height: number
  renderer: WebGLRenderer
  camera: PerspectiveCamera
  windowHalf: Vector2
  mouse: Vector2
  target: Vector2
  time: number
  isPlaying: boolean
  clock: Clock
  raycaster: Raycaster
  mouseVector: Vector3
  material: ShaderMaterial | null
  groups: Group[]
  materials: ShaderMaterial[]
  meshes: Mesh[]
  // morphs
  imageAspect: number

  constructor(options) {
    this.scene = new THREE.Scene()
    this.container = options.dom
    this.canvas = this.container.querySelector('canvas')!
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    )

    this.windowHalf = new THREE.Vector2(
      window.innerWidth / 2,
      window.innerHeight / 2
    )

    this.mouse = new THREE.Vector2()
    this.target = new THREE.Vector2()

    this.camera.position.set(0, 0, 2)
    this.time = 0
    this.isPlaying = true
    this.clock = new THREE.Clock()
    this.raycaster = new THREE.Raycaster()
    this.mouseVector = new THREE.Vector3()

    // this.addObjects()

    this.groups = []
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: true,
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        distanceFromCenter: { value: 0 },
        texture1: { value: null },
        resolution: { value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
      transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    })
    this.materials = []
    this.meshes = []

    this.imageAspect = 1

    this.resize()
    this.render()
    this.setupResize()
  }

  handleMouse(e) {
    this.mouseVector.x = (e.x / this.renderer.domElement.clientWidth) * 2 - 1
    this.mouseVector.y = -(e.y / this.renderer.domElement.clientHeight) * 2 + 1
    this.raycaster.setFromCamera(this.mouseVector, this.camera)
    const intersects = this.raycaster.intersectObjects(this.meshes)
    if (intersects.length) return parseInt(intersects[0].object.name, 10)
  }

  handleImages(url: string[]) {
    const that = this
    const images = [
      ...(document.querySelectorAll(
        '.cardImg'
      ) as NodeListOf<HTMLImageElement>),
    ]

    url.forEach((_str, index) => {
      const mat = that.material!.clone()
      that.materials.push(mat)
      const group = new THREE.Group()
      if (index === 0) {
        mat.uniforms.texture1.value = new THREE.VideoTexture(
          document.querySelector('#reel')!
        )
      } else {
        mat.uniforms.texture1.value = new THREE.Texture(images[index - 1])
        // imageTexture.crossOrigin = 'Anonymous'
        // mat.uniforms.texture1.value = imageTexture.load(t)
      }
      mat.uniforms.texture1.value.needsUpdate = true
      // mat.uniforms.texture1.wrapS = THREE.ClampToEdgeWrapping
      // mat.uniforms.texture1.wrapT = THREE.RepeatWrapping

      // aspect-ratio 1.5
      const geo = new THREE.PlaneBufferGeometry(1.5, 1, 20, 20)
      const mesh = new THREE.Mesh(geo, mat)
      mesh.name = index.toString()
      group.add(mesh)
      that.groups.push(group)
      that.scene.add(group)
      that.meshes.push(mesh)
    })
  }

  dispose() {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0])
    }
    this.meshes.length = 0
    this.materials.length = 0
  }

  throttle(callback, delay) {
    let throttleTimeout
    let storedEvent = null

    const throttledEventHandler = (event) => {
      storedEvent = event

      const shouldHandleEvent = !throttleTimeout

      if (shouldHandleEvent) {
        callback(storedEvent)

        storedEvent = null

        throttleTimeout = setTimeout(() => {
          throttleTimeout = null

          if (storedEvent) {
            throttledEventHandler(storedEvent)
          }
        }, delay)
      }
    }

    return throttledEventHandler
  }

  setupResize() {
    window.addEventListener(
      'resize',
      // this.throttle(() => {
        this.resize.bind(this)
      // }, 500)
    )
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height

    // image cover
    this.imageAspect = 853 / 1280
    let a1
    let a2
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect
      a2 = 1
    } else {
      a1 = 1
      a2 = this.width / this.height / this.imageAspect
    }

    this.material!.uniforms.resolution.value.x = this.width
    this.material!.uniforms.resolution.value.y = this.height
    this.material!.uniforms.resolution.value.z = a1
    this.material!.uniforms.resolution.value.w = a2

    this.camera.updateProjectionMatrix()
  }

  stop() {
    this.isPlaying = false
  }

  play() {
    if (!this.isPlaying) {
      this.render()
      this.isPlaying = true
    }
  }

  render() {
    if (!this.isPlaying) return
    this.time += 0.05

    if (this.materials) {
      this.materials.forEach((m) => {
        m.uniforms.time.value = this.time
      })
    }

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}
