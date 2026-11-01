import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function OrbitalScene() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.set(0, 0, 8)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch (error) {
      console.error('The 3CS hero illustration could not initialize WebGL.', error)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(host.clientWidth, host.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const coreGeometry = new THREE.IcosahedronGeometry(1.34, 5)
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: '#b7ef5a',
      metalness: 0.27,
      roughness: 0.17,
      transmission: 0.15,
      thickness: 1.4,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      emissive: '#314b19',
      emissiveIntensity: 0.3,
    })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    group.add(core)

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: '#d8ff99',
      transparent: true,
      opacity: 0.62,
    })
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.009, 8, 160), ringMaterial)
    ringA.rotation.set(0.82, 0.28, 0.2)
    const ringB = new THREE.Mesh(
      new THREE.TorusGeometry(2.34, 0.006, 8, 160),
      new THREE.MeshBasicMaterial({ color: '#a2a9a0', transparent: true, opacity: 0.36 }),
    )
    ringB.rotation.set(0.48, -0.5, 0.95)
    group.add(ringA, ringB)

    const satelliteMaterial = new THREE.MeshStandardMaterial({
      color: '#ecf4e3',
      emissive: '#9ccb60',
      emissiveIntensity: 0.45,
      metalness: 0.65,
      roughness: 0.24,
    })
    const satellites: THREE.Mesh[] = []
    const positions = [
      [2.28, 0.57, 0.06],
      [-1.76, 1.38, 0.4],
      [-0.74, -1.92, -0.18],
    ] as const
    for (const [x, y, z] of positions) {
      const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 24), satelliteMaterial)
      satellite.position.set(x, y, z)
      satellites.push(satellite)
      group.add(satellite)
    }

    scene.add(new THREE.AmbientLight('#e4f2d2', 1.2))
    const keyLight = new THREE.PointLight('#d5ff9b', 14, 14)
    keyLight.position.set(3.2, 3.4, 4)
    scene.add(keyLight)
    const rimLight = new THREE.PointLight('#7a9d55', 18, 12)
    rimLight.position.set(-3.2, -1.5, -2)
    scene.add(rimLight)

    const pointer = { x: 0, y: 0 }
    const handlePointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }
    host.addEventListener('pointermove', handlePointer)

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = host
      if (!clientWidth || !clientHeight) return
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
      if (reducedMotion) renderer.render(scene, camera)
    })
    resizeObserver.observe(host)

    let frame = 0
    const animate = () => {
      if (!reducedMotion) {
        group.rotation.y += 0.0025
        group.rotation.x += (pointer.y * 0.12 - group.rotation.x) * 0.018
        group.rotation.z += (pointer.x * 0.08 - group.rotation.z) * 0.018
        core.rotation.y += 0.0015
        core.rotation.x += 0.0008
        satellites.forEach((satellite, index) => {
          satellite.position.y += Math.sin(Date.now() * 0.0007 + index * 2) * 0.0005
        })
        renderer.render(scene, camera)
        frame = window.requestAnimationFrame(animate)
      } else {
        renderer.render(scene, camera)
      }
    }
    animate()

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      host.removeEventListener('pointermove', handlePointer)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      renderer.dispose()
      host.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={hostRef} className="orbital-canvas" aria-hidden="true" />
}
