import * as THREE from 'three'

import {
  BufferGeometry,
  CanvasTexture,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  // TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three'

export default class Stars {
  scene: Scene
  container: HTMLElement
  width: number
  height: number
  renderer: WebGLRenderer
  camera: PerspectiveCamera
  windowHalf: Vector2
  starGeo: BufferGeometry
  // loadTexture: (url: string) => Promise<TextureLoader>
  texture: CanvasTexture
  stars: Points | null
  starMaterial: PointsMaterial | null
  velocities: number[]

  constructor(options) {
    this.scene = new THREE.Scene()
    this.container = options.dom
    // this.starColor = 0xffffff
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.container.appendChild(this.renderer.domElement)

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

    this.stars = null
    this.starGeo = new THREE.BufferGeometry()
    this.starMaterial = null
    this.velocities = []
    // this.loadTexture = (url) => {
    //   return new Promise((resolve) => {
    //     new THREE.TextureLoader().load(url, resolve)
    //   })
    // }

    this.createStars()
    this.render()
    this.resize()
    this.setupResize()

    function generateTexture() {
      const canvas = document.createElement('canvas')
      canvas.width = 2
      canvas.height = 2

      const context = canvas.getContext('2d')
      context!.fillStyle = 'white'
      context!.fillRect(0, 1, 2, 1)

      return canvas
    }

    this.texture = new THREE.CanvasTexture(generateTexture())
  }

  createStars() {
    const starArray = [] as number[]
    for (let i = 0; i < 6000; i++) {
      const star = [
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
      ]
      this.velocities.push(0)
      starArray.push(...star)
    }
    const positions = new Float32Array([...starArray])
    this.starGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
    // const sprite = new THREE.TextureLoader().load(
    //   require('~/assets/img/star.png')
    // )
    // this.loadTexture('/star.png').then((texture) => {
    this.starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      // map: texture,
    })
    this.stars = new THREE.Points(this.starGeo, this.starMaterial)
    this.scene.add(this.stars)
    // })
  }

  animateStars = () => {
    const positionAttribute = this.starGeo.getAttribute('position')
    for (let i = 0; i < positionAttribute.count; i++) {
      let p = positionAttribute.getY(i)
      this.velocities[i] += 0.02
      p -= this.velocities[i]

      if (p < -200) {
        p = 200
        this.velocities[i] = 0
      }
    }
    // this.starGeo.verticesNeedUpdate = true
    positionAttribute.needsUpdate = true
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height

    this.camera.updateProjectionMatrix()
  }

  render() {
    // this.time += 0.05

    // if (this.materials) {
    //   this.materials.forEach((m) => {
    //     m.uniforms.time.value = this.time
    //   })
    // }
    this.renderer.autoClear = true
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}
