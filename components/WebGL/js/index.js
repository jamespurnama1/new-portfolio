import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import { FresnelShader } from 'three/examples/jsm/shaders/FresnelShader.js'
// import * as dat from 'dat.gui'
import fragment from './shader/fragment.glsl'
import vertex from './shader/vertex.glsl'
// import fresnelFragment from './shader/fresnelFragment.glsl'
// import fresnelVertex from './shader/fresnelVertex.glsl'
// import dat from '~/plugins/dat.gui'

export class Stars {
  constructor(options) {
    this.scene = new THREE.Scene()
    this.container = options.dom
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
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
    this.velocities = []
    this.createStars()
    this.render()

    this.texture = new THREE.CanvasTexture(function generateTexture() {
      const canvas = document.createElement('canvas')
      canvas.width = 2
      canvas.height = 2

      const context = canvas.getContext('2d')
      context.fillStyle = 'white'
      context.fillRect(0, 1, 2, 1)

      return canvas
    })
  }

  createStars() {
    const starArray = []
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
    const sprite = new THREE.TextureLoader().load(
      require('~/assets/img/star.png')
    )
    const starMaterial = new THREE.PointsMaterial({
      // eslint-disable-next-line unicorn/number-literal-case
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite,
    })
    this.stars = new THREE.Points(this.starGeo, starMaterial)
    this.scene.add(this.stars)
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
    this.starGeo.verticesNeedUpdate = true
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
    this.time += 0.05

    if (this.materials) {
      this.materials.forEach((m) => {
        m.uniforms.time.value = this.time
      })
    }

    this.renderer.autoClear = true
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}

export class Sketch {
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

    this.addObjects()
    this.resize()
    this.render()
    this.setupResize()
    this.groups = []
    this.materials = []
    this.sphere = null
    this.meshes = []
    this.morphs = []

    this.texture = new THREE.CanvasTexture(function generateTexture() {
      const canvas = document.createElement('canvas')
      canvas.width = 2
      canvas.height = 2

      const context = canvas.getContext('2d')
      context.fillStyle = 'white'
      context.fillRect(0, 1, 2, 1)

      return canvas
    })

    this.customMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.7,
      opacity: 1,
      metalness: 0,
      roughness: 0,
      ior: 2,
      thickness: 5,
      specularIntensity: 1,
      envMapIntensity: 1,
      side: THREE.DoubleSide,
      transparent: true,
    })
  }

  handleMouse(e) {
    this.mouseVector.x = (e.x / this.renderer.domElement.clientWidth) * 2 - 1
    this.mouseVector.y = -(e.y / this.renderer.domElement.clientHeight) * 2 + 1
    this.raycaster.setFromCamera(this.mouseVector, this.camera)
    const intersects = this.raycaster.intersectObjects(this.meshes)
    if (intersects.length) return intersects[0].object.name
  }

  handleImages(url) {
    const that = this
    const images = [...document.querySelectorAll('.cardImg')]
    url.forEach((_str, index) => {
      const mat = that.material.clone()
      that.materials.push(mat)
      const group = new THREE.Group()
      if (index === 0) {
        mat.uniforms.texture1.value = new THREE.VideoTexture(
          document.querySelector('#reel')
        )
      } else {
        mat.uniforms.texture1.value = new THREE.Texture(images[index - 1])
        // imageTexture.crossOrigin = 'Anonymous'
        // mat.uniforms.texture1.value = imageTexture.load(t)
      }
      mat.uniforms.texture1.value.needsUpdate = true
      mat.uniforms.texture1.wrapS = THREE.ClampToEdgeWrapping
      mat.uniforms.texture1.wrapT = THREE.RepeatWrapping

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
    // eslint-disable-next-line unicorn/number-literal-case
    const light = new THREE.PointLight(0xffffff)
    const ambientLight = new THREE.AmbientLight(0xFFFFFF)
    light.position.set(0, 0, 0)
    this.heroScene.add(light)
    this.heroScene.add(ambientLight)
    // const that = this
    // const loader = new GLTFLoader()
    // const dracoLoader = new DRACOLoader()
    // dracoLoader.setDecoderPath('/draco/')
    // loader.setDRACOLoader(dracoLoader)
    // loader.load(
    //   // resource URL
    //   '/3d/sagoo.glb',
    //   // called when the resource is loaded
    //   function (gltf) {
    //     // gltf.scene.traverse((child) => {
    //     //   child.name = 'cigs'
    //     // })
    //     gltf.asset.name = 'ciggies'
    //     that.heroScene.add(gltf.scene)
    //     // that.settings()

    //     // gltf.animations // Array<THREE.AnimationClip>
    //     // gltf.scene // THREE.Group
    //     // gltf.scenes // Array<THREE.Group>
    //     // gltf.cameras // Array<THREE.Camera>
    //     // gltf.asset // Object
    //   },
    //   function (xhr) {
    //     console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    //   },
    //   // called when loading has errors
    //   function (error) {
    //     console.error('An error happened', error)
    //   }
    // )
  }

  settings() {
    if (process.client && !this.gui) {
      const dat = require('dat.gui')
      this.gui = new dat.GUI()
      const f2 = this.gui.addFolder('Position')
      f2.add(this.heroScene.getObjectByName('ciggies').position, 'x', -5, 5)
      f2.add(this.heroScene.getObjectByName('ciggies').position, 'y', -5, 5)
      f2.add(this.heroScene.getObjectByName('ciggies').position, 'z', -5, 5)
      const f3 = this.gui.addFolder('Rotation')
      f3.add(this.heroScene.getObjectByName('ciggies').rotation, 'x', -5, 5)
      f3.add(this.heroScene.getObjectByName('ciggies').rotation, 'y', -5, 5)
      f3.add(this.heroScene.getObjectByName('ciggies').rotation, 'z', -5, 5)
    }
  }

  dispose() {
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
    if (this.sphereGeometry) this.sphereGeometry.dispose()
    if (this.customMaterial) this.customMaterial.dispose()
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

    this.material.uniforms.resolution.value.x = this.width
    this.material.uniforms.resolution.value.y = this.height
    this.material.uniforms.resolution.value.z = a1
    this.material.uniforms.resolution.value.w = a2

    this.camera.updateProjectionMatrix()
  }

  addObjects() {
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: 'f', value: 0 },
        distanceFromCenter: { type: 'f', value: 0 },
        texture1: { type: 't', value: null },
        resolution: { type: 'v4', value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
      transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    })
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
