import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { FresnelShader } from 'three/examples/jsm/shaders/FresnelShader.js'
// import * as dat from 'dat.gui'
import fragment from './shader/fragment.glsl'
import vertex from './shader/vertex.glsl'
// import fresnelFragment from './shader/fresnelFragment.glsl'
// import fresnelVertex from './shader/fresnelVertex.glsl'
// import dat from '~/plugins/dat.gui'

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene()
    this.scene2 = new THREE.Scene()
    this.scene3 = new THREE.Scene()
    // this.scene.background = new THREE.TextureLoader().load(
    //   require('~/assets/img/checkerboard.jpg')
    // )
    this.container = options.dom
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    // this.renderer.physicallyCorrectLights = true
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

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.camera.position.set(0, 0, 2)
    this.controls.update()
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
    this.bubbleMaterial = null
    // this.cubeRenderTarget = null
    this.meshes = []
    this.morphs = []
    // this.refractSphereCamera = null
    this.stars = null
    this.starGeo = new THREE.BufferGeometry()
    this.velocities = []
    this.createStars()
    // this.materialParams = {
    //   color: 0xffffff,
    //   transmission: 1,
    //   opacity: 1,
    //   metalness: 0,
    //   roughness: 0,
    //   ior: 1.5,
    //   thickness: 0.01,
    //   specularIntensity: 1,
    //   specularTint: 0xffffff,
    //   envMapIntensity: 1,
    // }
    this.texture = new THREE.CanvasTexture(function generateTexture() {
      const canvas = document.createElement('canvas')
      canvas.width = 2
      canvas.height = 2

      const context = canvas.getContext('2d')
      context.fillStyle = 'white'
      context.fillRect(0, 1, 2, 1)

      return canvas
    })
    // this.hdrEquirect = new RGBELoader()
    // 		.setPath( 'textures/equirectangular/' )
    // 		.load( 'royal_esplanade_1k.hdr', function () {

    // 			hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;

    // 			init();
    // 			render();

    // 		} );

    this.customMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: 0.7,
      opacity: 1,
      metalness: 0,
      roughness: 0,
      ior: 2,
      thickness: 5,
      specularIntensity: 1,
      // specularTint: 0xFFFFFF,
      envMapIntensity: 1,
      side: THREE.DoubleSide,
      transparent: true,
    })
    // this.handleMorph()
    // this.settings()
  }

  handleMouse(e) {
    this.mouseVector.x =
      (e.clientX / this.renderer.domElement.clientWidth) * 2 - 1
    this.mouseVector.y =
      -(e.clientY / this.renderer.domElement.clientHeight) * 2 + 1
    this.raycaster.setFromCamera(this.mouseVector, this.camera)
    const intersects = this.raycaster.intersectObjects(
      this.meshes.concat(this.sphere)
    )
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
      // const repeatX = (1.5 * im.h) / (1 * im.w)
      // const repeatY = 1
      mat.uniforms.texture1.wrapS = THREE.ClampToEdgeWrapping
      mat.uniforms.texture1.wrapT = THREE.RepeatWrapping
      // mat.uniforms.texture1.repeat.set(repeatX, repeatY)
      // mat.uniforms.texture1.offset.x = ((repeatX - 1) / 2) * -1

      // aspect-ratio 1.5
      const geo = new THREE.PlaneBufferGeometry(1.5, 1, 20, 20)
      const mesh = new THREE.Mesh(geo, mat)
      mesh.name = index
      group.add(mesh)
      that.groups.push(group)
      that.scene2.add(group)
      that.meshes.push(mesh)
      // object gaps
      // mesh.position.y = 0

      // object pos in space
      // group.rotation.y = -0.5
      // group.rotation.x = -0.3
      // group.rotation.z = -0.1
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

  handleMorph() {
    // const floorTexture = new THREE.TextureLoader().load(
    //   require('~/assets/img/checkerboard.jpg')
    // )
    // floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
    // floorTexture.repeat.set(10, 10)
    // const floorMaterial = new THREE.MeshBasicMaterial({
    //   map: floorTexture,
    //   side: THREE.DoubleSide,
    // })
    // const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10)
    // const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    // floor.position.y = -50.5
    // floor.rotation.x = Math.PI / 2
    // this.scene.add(floor)
    // const sphereGeometry = new THREE.SphereGeometry(0.4, 32, 32)
    // const material = new THREE.MeshNormalMaterial()
    // this.sphere = new THREE.Mesh(sphereGeometry, material)
    // this.sphere.material.transparent = true
    // this.scene2.add(this.sphere)
    // this.morphs.push(this.sphere)
    // this.sphere.position.set(-0.65, -0.3, 0)

    // eslint-disable-next-line unicorn/number-literal-case
    const light = new THREE.PointLight(0xffffff)
    light.position.set(-0.65, 50, -100)
    this.scene.add(light)

    // this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
    //   format: THREE.RGBFormat,
    //   generateMipmaps: true,
    //   minFilter: THREE.LinearMipmapLinearFilter,
    //   // encoding: THREE.sRGBEncoding,
    // })

    // this.refractSphereCamera = new THREE.CubeCamera(
    //   0.1,
    //   5000,
    //   this.cubeRenderTarget
    // )
    // this.scene.add(this.refractSphereCamera)

    // const fresnelUniforms = {
    //   mRefractionRatio: { type: 'f', value: 1.02 },
    //   mFresnelBias: { type: 'f', value: 0.1 },
    //   mFresnelPower: { type: 'f', value: 2.0 },
    //   mFresnelScale: { type: 'f', value: 1.0 },
    //   tCube: { type: 't', value: this.refractSphereCamera.renderTarget }, //  textureCube }
    // }

    // const uniforms = THREE.UniformsUtils.clone(FresnelShader.uniforms)

    // create custom material for the shader
    // const this.customMaterial = new THREE.ShaderMaterial({
    //   uniforms: fresnelUniforms,
    //   vertexShader: FresnelShader.vertexShader,
    //   fragmentShader: FresnelShader.fragmentShader,
    // })

    // this.bubbleMaterial = new THREE.MeshBasicMaterial({
    //   envMap: this.cubeRenderTarget.texture,
    //   combine: THREE.MultiplyOperation,
    //   reflectivity: 1,
    // })

    // const fontLoad = new THREE.FontLoader()

    const sphereGeometry = new THREE.SphereGeometry(0.75, 64, 32)

    // fontLoad.load(
    //   './Founders Grotesk Bold_Regular.json',
    //   function (font) {
    //     sphereGeometry = new THREE.TextGeometry('Hello three.js!', {
    //       font,
    //       size: 80,
    //       height: 5,
    //       curveSegments: 12,
    //       bevelEnabled: true,
    //       bevelThickness: 10,
    //       bevelSize: 8,
    //       bevelOffset: 0,
    //       bevelSegments: 5,
    //     })
    //   },
    //   function (xhr) {
    //     console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    //   }
    // )
    // const normalMaterial = new THREE.MeshNormalMaterial()
    this.sphere = new THREE.Mesh(sphereGeometry, this.customMaterial)
    this.sphere.name = 'sphere'
    // this.sphere.material.transparent = true
    this.morphs.push(this.sphere)
    this.scene.add(this.sphere)
    this.sphere.position.set(-0.5, 0, -2)
    // this.refractSphereCamera.position.copy(this.sphere.position)
  }

  settings() {
    if (process.client && !this.gui) {
      const dat = require('dat.gui')
      this.gui = new dat.GUI()
      // this.gui.domElement.id = 'gui'
      // document.getElementById('gui_container').appendChild(this.gui.domElement)
      const f2 = this.gui.addFolder('Position')
      f2.add(this.morphs[0].position, 'x', -5, 5)
      f2.add(this.morphs[0].position, 'y', -3, 5)
      f2.add(this.morphs[0].position, 'z', -5, 5)
      const f3 = this.gui.addFolder('Material')
      f3.addColor(this.customMaterial, 'color')
      f3.add(this.customMaterial, 'transmission', 0, 1, 0.01)
      // .onChange( function () {

      // 	this.customMaterial.transmission = this.materialParams.transmission;
      // 	render();

      // } );

      f3.add(this.customMaterial, 'opacity', 0, 1, 0.01)
      // .onChange( function () {

      // 	this.customMaterial.opacity = this.materialParams.opacity;
      // 	render();

      // } );

      f3.add(this.customMaterial, 'metalness', 0, 1, 0.01)
      // .onChange( function () {

      // 	this.customMaterial.metalness = this.materialParams.metalness;
      // 	render();

      // } );

      f3.add(this.customMaterial, 'roughness', 0, 1, 0.01)

      f3.add(this.customMaterial, 'ior', 1, 2, 0.01)

      f3.add(this.customMaterial, 'thickness', 0, 5, 0.01)

      f3.add(this.customMaterial, 'specularIntensity', 0, 1, 0.01)

      // f3.addColor(this.customMaterial, 'specularTint')

      f3.add(this.customMaterial, 'envMapIntensity', 0, 1, 0.01).name(
        'envMap intensity'
      )
    }
  }

  dispose() {
    while (this.scene2.children.length > 0) {
      this.scene2.remove(this.scene2.children[0])
    }
    this.resize()
  }

  // dispose(parentObject) {
  //   parentObject.traverse(function (node) {
  //     const item = node instanceof THREE.Group ? node.children : node
  //     console.log('disposing', item)
  //     if (item instanceof THREE.Mesh) {
  //       if (item.geometry) {
  //         console.log('disposing geo', item.geometry)
  //         item.geometry.dispose()
  //       }

  //       if (item.material) {
  //         console.log('disposing material', item.material)
  //         if (
  //           item.material instanceof THREE.MeshFaceMaterial ||
  //           item.material instanceof THREE.MultiMaterial
  //         ) {
  //           item.material.materials.forEach(function (mtrl) {
  //             if (mtrl.map) mtrl.map.dispose()
  //             if (mtrl.lightMap) mtrl.lightMap.dispose()
  //             if (mtrl.bumpMap) mtrl.bumpMap.dispose()
  //             if (mtrl.normalMap) mtrl.normalMap.dispose()
  //             if (mtrl.specularMap) mtrl.specularMap.dispose()
  //             if (mtrl.envMap) mtrl.envMap.dispose()

  //             mtrl.dispose() // disposes any programs associated with the material
  //           })
  //         } else {
  //           if (item.material.map) item.material.map.dispose()
  //           if (item.material.lightMap) item.material.lightMap.dispose()
  //           if (item.material.bumpMap) item.material.bumpMap.dispose()
  //           if (item.material.normalMap) item.material.normalMap.dispose()
  //           if (item.material.specularMap) item.material.specularMap.dispose()
  //           if (item.material.envMap) item.material.envMap.dispose()

  //           item.material.dispose() // disposes any programs associated with the material
  //         }
  //       }
  //     }
  //   })
  // }

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

    // if (this.sphere) {
    //   this.sphere.visible = false
    //   this.refractSphereCamera.position.copy(this.sphere.position)
    //   this.refractSphereCamera.envMap = this.cubeRenderTarget.texture
    //   this.refractSphereCamera.update(this.renderer, this.scene)
    //   this.sphere.visible = true
    // }

    this.controls.update()
    this.renderer.autoClear = true
    this.renderer.render(this.scene, this.camera)
    this.renderer.autoClear = false
    this.renderer.render(this.scene2, this.camera)
    // this.renderer.render(this.scene3, this.camera)
    requestAnimationFrame(this.render.bind(this))
  }
}
