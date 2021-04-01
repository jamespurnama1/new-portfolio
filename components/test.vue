<template>
  <div class="container">
    <div v-if="checkEvent && !requested" class="permission">
      <p>Please allow this website to access your device orientation.</p>
      <button @click="requestPermission">Okay</button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
} from '@nuxtjs/composition-api'
import * as THREE from 'three'
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
// import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js'

export default defineComponent({
  setup() {
    let camera: THREE.PerspectiveCamera,
      scene: THREE.Scene,
      renderer: THREE.WebGLRenderer,
      controls: DeviceOrientationControls,
      onOrientation: () => void,
      onMouseMove: (event: MouseEvent) => void,
      onMouseWheel: (event: WheelEvent) => void,
      geometry: THREE.BoxBufferGeometry
    // raycaster: THREE.Raycaster
    const requested = ref(false)

    const start = () => {
      if (process.browser) {
        const mouse = new THREE.Vector2()
        const target = new THREE.Vector2()
        const windowHalf = new THREE.Vector2(
          window.innerWidth / 2,
          window.innerHeight / 2
        )

        const init = () => {
          const container = document.createElement('div')
          document.body.appendChild(container)
          container.className = 'canvas'

          camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            500
          )
          camera.position.z = 20

          scene = new THREE.Scene()
          geometry = new THREE.BoxBufferGeometry()
          const material = new THREE.MeshNormalMaterial()

          for (let i = 0; i < 1000; i++) {
            const object = new THREE.Mesh(geometry, material)
            object.position.x = Math.random() * 60 - 30
            object.position.y = Math.random() * 60 - 30
            object.position.z = Math.random() * 60 - 30
            object.rotation.x = Math.random() * 2 * Math.PI
            object.rotation.y = Math.random() * 2 * Math.PI
            object.rotation.z = Math.random() * 2 * Math.PI
            scene.add(object)
          }

          // scene.velocity = 0
          // scene.acceleration = 0.02

          // function init() {
          //   const container = document.createElement('div')
          //   document.body.appendChild(container)
          //   container.className = 'canvas'

          //   camera = new THREE.PerspectiveCamera(
          //     45,
          //     window.innerWidth / window.innerHeight,
          //     0.25,
          //     20
          //   )
          //   camera.position.set(-1.8, 0.6, 2.7)

          //   scene = new THREE.Scene()

          //   new RGBELoader()
          //     .setDataType(THREE.UnsignedByteType)
          //     .setPath('HDR/')
          //     .load('royal_esplanade_1k.hdr', function (texture) {
          //       const envMap = pmremGenerator.fromEquirectangular(texture).texture

          //       scene.background = envMap
          //       scene.environment = envMap

          //       texture.dispose()
          //       pmremGenerator.dispose()

          //       animate()

          //       // model

          //       // use of RoughnessMipmapper is optional
          //       const roughnessMipmapper = new RoughnessMipmapper(renderer)

          //       const loader = new GLTFLoader().setPath('glTF/')
          //       loader.load('DamagedHelmet.gltf', function (gltf) {
          //         gltf.scene.traverse(function (child) {
          //           if (child.isMesh) {
          //             // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
          //             // roughnessMipmapper.generateMipmaps( child.material );
          //           }
          //         })

          //         scene.add(gltf.scene)

          //         roughnessMipmapper.dispose()

          //         animate()
          //       })
          //     })

          renderer = new THREE.WebGLRenderer({ antialias: true })
          // renderer.setPixelRatio(window.devicePixelRatio)
          renderer.setSize(window.innerWidth, window.innerHeight)
          // renderer.toneMapping = THREE.ACESFilmicToneMapping
          // renderer.toneMappingExposure = 1
          // renderer.outputEncoding = THREE.sRGBEncoding
          container.appendChild(renderer.domElement)

          // const pmremGenerator = new THREE.PMREMGenerator(renderer)
          // pmremGenerator.compileEquirectangularShader()

          let timer

          onMouseMove = (event) => {
            if (controls) controls.enabled = false
            mouse.x = event.clientX - windowHalf.x
            mouse.y = event.clientY - windowHalf.x
            clearTimeout(timer)
            timer = setTimeout(() => {
              if (
                controls &&
                Object.keys(controls.deviceOrientation).length > 0
              ) {
                controls.enabled = true
              }
            }, 300)
          }

          onOrientation = () => {
            controls = new DeviceOrientationControls(camera)
            // controls.addEventListener('change', animate) // use if there is no animation loop
            // controls.minDistance = 2
            // controls.maxDistance = 10
            // controls.target.set(0, 0, -0.2)
            controls.update()
          }

          onMouseWheel = (event) => {
            camera.position.z += event.deltaY * 0.1 // move camera along z-axis
          }

          window.addEventListener('resize', onWindowResize)
        }

        const onWindowResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          windowHalf.set(window.innerWidth / 2, window.innerHeight / 2)
          renderer.setSize(window.innerWidth, window.innerHeight)

          animate()
        }

        // raycaster = new THREE.Raycaster()
        // raycaster.setFromCamera(mouse, camera)

        const animate = () => {
          // scene.children.forEach((p) => {
          //   p.velocity += p.acceleration
          //   p.y -= p.velocity
          //   if (p.y < -200) {
          //     p.y = 200
          //     p.velocity = 0
          //   }
          // })
          target.x = (1 - mouse.x) * 0.002
          target.y = (1 - mouse.y) * 0.002

          scene.rotation.z += 0.002

          camera.rotation.x += 0.01 * (target.y - camera.rotation.x)
          camera.rotation.y += 0.01 * (target.x - camera.rotation.y)

          requestAnimationFrame(animate)
          if (controls) controls.update()
          renderer.render(scene, camera)
        }

        if (!checkEvent) onOrientation()

        init()
        animate()
        document.addEventListener('mousemove', onMouseMove, false)
        document.addEventListener('wheel', onMouseWheel, false)
        window.addEventListener('resize', onWindowResize, false)
      }
    }

    onMounted(start)

    const checkEvent = computed(() => {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        return DeviceOrientationEvent.requestPermission
      }
      return null
    })

    const requestPermission = () => {
      if (checkEvent) {
        DeviceOrientationEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === 'granted') {
              onOrientation()
            }
          })
          .catch(console.error)
      } else {
        // handle regular non iOS 13+ devices
        onOrientation()
      }
      requested.value = true
    }

    return {
      requestPermission,
      checkEvent,
      requested,
    }
  },
})
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.permission {
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 5;
  width: 100%;
  background-color: var(--bg);
  padding: 3%;
}
</style>
