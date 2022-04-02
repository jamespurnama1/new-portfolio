import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import {
  CanvasTexture,
  Clock,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Plane,
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
  scene: Scene
  scene2: Scene
  heroScene: Scene
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
  texture: CanvasTexture
  customMaterial: MeshPhysicalMaterial
  material: ShaderMaterial | null
  groups: Group[]
  materials: ShaderMaterial[]
  meshes: Mesh[]
  // morphs
  imageAspect: number
  intersectPoint: Vector3
  plane: Plane

  constructor(options) {
    this.scene = new THREE.Scene()
    this.scene2 = new THREE.Scene()
    this.heroScene = new THREE.Scene()
    this.container = options.dom
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.renderer.physicallyCorrectLights = true
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

    this.mouse = new THREE.Vector2()
    this.target = new THREE.Vector2()

    this.camera.position.set(0, 0, 2)
    this.time = 0
    this.isPlaying = true
    this.clock = new THREE.Clock()
    this.raycaster = new THREE.Raycaster()
    this.mouseVector = new THREE.Vector3()
    this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    this.intersectPoint = new THREE.Vector3()

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
    // this.morphs = []

    this.imageAspect = 1

    this.resize()
    this.render()
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

    this.customMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.7,
      opacity: 1,
      metalness: 0,
      roughness: 0,
      ior: 2,
      // thickness: 5,
      specularIntensity: 1,
      envMapIntensity: 1,
      side: THREE.DoubleSide,
      transparent: true,
    })
  }

  // addObjects() {
  //   this.material = new THREE.ShaderMaterial({
  //     extensions: {
  //       derivatives: true,
  //     },
  //     side: THREE.DoubleSide,
  //     uniforms: {
  //       time: { value: 0 },
  //       distanceFromCenter: { value: 0 },
  //       texture1: { value: null },
  //       resolution: { value: new THREE.Vector4() },
  //       uvRate1: {
  //         value: new THREE.Vector2(1, 1),
  //       },
  //     },
  //     transparent: true,
  //     vertexShader: vertex,
  //     fragmentShader: fragment,
  //   })
  //   console.log(this.material)
  // }

  handleMouse(e) {
    this.mouseVector.x = (e.x / this.renderer.domElement.clientWidth) * 2 - 1
    this.mouseVector.y = -(e.y / this.renderer.domElement.clientHeight) * 2 + 1
    this.raycaster.setFromCamera(this.mouseVector, this.camera)
    const intersects = this.raycaster.intersectObjects(this.meshes)
    if (intersects.length) return intersects[0].object.name
  }

  handleImages(url) {
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
      mesh.name = index
      group.add(mesh)
      that.groups.push(group)
      that.scene2.add(group)
      that.meshes.push(mesh)
    })
  }

  handleMorph() {
    const light = new THREE.PointLight(0xffffff)
    const ambientLight = new THREE.AmbientLight(0xffffff)
    light.position.set(0, 0, 0)
    this.heroScene.add(light)
    this.heroScene.add(ambientLight)
    const that = this
    const objectURLs = [
      '/3d/creaid.glb',
      '/3d/savis.glb',
      '/3d/jtc.glb',
      '/3d/sagoo.glb',
    ]
    const manager = new THREE.LoadingManager()
    // manager.setURLModifier((url) => {
    //   url = URL.createObjectURL(blobs[url])
    //   objectURLs.push(url)
    //   return url
    // })
    const loader = new GLTFLoader(manager)
    const dracoLoader = new DRACOLoader()

    dracoLoader.setDecoderPath(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'
    )
    loader.setDRACOLoader(dracoLoader)
    loader.load(
      // resource URL
      '/3d/sagoo.glb',
      // called when the resource is loaded
      function (gltf) {
        // gltf.scene.traverse((child) => {
        //   child.name = 'cigs'
        // })
        that.heroScene.add(gltf.scene)
        objectURLs.forEach((url) => URL.revokeObjectURL(url))
        // that.settings()

        // gltf.animations // Array<THREE.AnimationClip>
        // gltf.scene // THREE.Group
        // gltf.scenes // Array<THREE.Group>
        // gltf.cameras // Array<THREE.Camera>
        // gltf.asset // Object
      }
    )
    manager.onLoad = function () {
      console.log('Loading complete!')
    }

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      console.log(
        'Loading file: ' +
          url +
          '.\nLoaded ' +
          itemsLoaded +
          ' of ' +
          itemsTotal +
          ' files.'
      )
    }

    manager.onError = function (url) {
      console.log('There was an error loading ' + url)
    }
    this.heroScene.position.set(-2.85, -2.2, -7)
    this.heroScene.lookAt(new THREE.Vector3(0, 1, 0))
  }

  dispose(mobile?) {
    if (mobile) {
      while (this.heroScene.children.length > 0) {
        this.heroScene.remove(this.heroScene.children[0])
      }
    } else {
      while (this.scene2.children.length > 0) {
        this.scene2.remove(this.scene2.children[0])
      }
      // if (geo) geo.dispose()
      if (this.texture) this.texture.dispose()
      // mat.dispose()
      this.meshes.length = 0
      this.materials.length = 0
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0])
      }
      // if (this.sphereGeometry) this.sphereGeometry.dispose()
      if (this.customMaterial) this.customMaterial.dispose()
    }
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
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

    this.renderer.autoClear = true
    this.renderer.render(this.scene, this.camera)
    this.renderer.autoClear = false
    this.renderer.render(this.scene2, this.camera)
    this.renderer.render(this.heroScene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}
