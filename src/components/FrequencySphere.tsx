import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface FrequencySphereProps {
  isActive?: boolean
}

export default function FrequencySphere({ isActive = false }: FrequencySphereProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<THREE.PointLight | null>(null)
  const isActiveRef = useRef(isActive)

  useEffect(() => {
    isActiveRef.current = isActive
  }, [isActive])

  useEffect(() => {
    const currentMount = mountRef.current
    if (!currentMount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    currentMount.appendChild(renderer.domElement)

    // === Inner glowing core (where the eye sits behind) ===
    const coreGeometry = new THREE.SphereGeometry(0.65, 64, 64)
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        activeIntensity: { value: 0.0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float activeIntensity;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          fresnel = pow(fresnel, 3.0);
          // OFF: white/grey core, ON: purple/pink
          vec3 offBright = vec3(0.85, 0.85, 0.9);
          vec3 offDeep = vec3(0.15, 0.15, 0.18);
          vec3 onBright = vec3(0.69, 0.48, 1.0);
          vec3 onDeep = vec3(0.2, 0.05, 0.4);
          vec3 bright = mix(offBright, onBright, activeIntensity);
          vec3 deep = mix(offDeep, onDeep, activeIntensity);
          vec3 color = mix(deep, bright, fresnel);
          float alpha = fresnel * 0.6 + 0.05;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
    })
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)
    scene.add(coreMesh)

    // === Inner glow atmosphere ===
    const glowGeometry = new THREE.SphereGeometry(0.75, 32, 32)
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        activeIntensity: { value: 0.0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float activeIntensity;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          vec3 offColor = vec3(0.7, 0.7, 0.75);
          vec3 onColor = vec3(0.69, 0.48, 1.0);
          vec3 color = mix(offColor, onColor, activeIntensity);
          gl_FragColor = vec4(color, intensity * 0.3);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
    })
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
    scene.add(glowMesh)

    // === Outer wireframe icosahedron ===
    const geometry = new THREE.IcosahedronGeometry(1.2, 64)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointLightPos: { value: new THREE.Vector3(0, 0, 5) },
        color: { value: new THREE.Color('#B07AFF') },
        offColor: { value: new THREE.Color('#C0BFC8') },
        activeIntensity: { value: 0.0 },
      },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main() {
          vNormal = normal;
          vPosition = position;
          float displacement = snoise(position * 2.0 + time * 0.5) * 0.2;
          vec3 newPosition = position + normal * displacement;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 offColor;
        uniform vec3 pointLightPos;
        uniform float activeIntensity;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 lightDir = normalize(pointLightPos - vPosition);
          float diffuse = max(dot(normal, lightDir), 0.0);
          float fresnel = 1.0 - dot(normal, vec3(0.0, 0.0, 1.0));
          fresnel = pow(fresnel, 2.0);
          vec3 baseColor = mix(offColor, color, activeIntensity);
          vec3 finalColor = baseColor * diffuse + baseColor * fresnel * (0.5 + activeIntensity * 0.8);
          float alpha = 0.7 + activeIntensity * 0.25;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      wireframe: true,
      transparent: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(0, 0, 5)
    lightRef.current = pointLight
    scene.add(pointLight)

    let frameId: number
    let currentActiveIntensity = 0
    const animate = (t: number) => {
      const time = t * 0.0003
      material.uniforms.time.value = time
      coreMaterial.uniforms.time.value = time
      glowMaterial.uniforms.time.value = time

      // Smoothly lerp active intensity
      const targetIntensity = isActiveRef.current ? 1.0 : 0.0
      currentActiveIntensity += (targetIntensity - currentActiveIntensity) * 0.05
      material.uniforms.activeIntensity.value = currentActiveIntensity
      coreMaterial.uniforms.activeIntensity.value = currentActiveIntensity
      glowMaterial.uniforms.activeIntensity.value = currentActiveIntensity

      mesh.rotation.y += 0.0005 + currentActiveIntensity * 0.001
      mesh.rotation.x += 0.0002 + currentActiveIntensity * 0.0005

      // Core pulses subtly — stronger when active
      const pulseStrength = 0.03 + currentActiveIntensity * 0.04
      const pulse = 1.0 + Math.sin(time * 3) * pulseStrength
      coreMesh.scale.setScalar(pulse)

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate(0)

    const handleResize = () => {
      if (!currentMount) return
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      const vec = new THREE.Vector3(x, y, 0.5).unproject(camera)
      const dir = vec.sub(camera.position).normalize()
      const dist = -camera.position.z / dir.z
      const pos = camera.position.clone().add(dir.multiplyScalar(dist))
      if (lightRef.current) lightRef.current.position.copy(pos)
      material.uniforms.pointLightPos.value = pos
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative w-[240px] h-[240px] lg:w-[300px] lg:h-[300px]">
      {/* Three.js wireframe sphere */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Eye video composited inside */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-[55%] h-[55%] relative">
          <video
            src="/eye_loop.webm"
            className="w-full h-full object-cover rounded-full"
            style={{
              mixBlendMode: 'screen',
              maskImage: 'radial-gradient(circle, black 40%, transparent 65%)',
              WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 65%)',
              filter: isActive ? 'none' : 'grayscale(1) brightness(0.6)',
              transition: 'filter 0.8s ease',
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>
      </div>

      {/* Outer glow */}
      <div
        className="absolute inset-[-25%] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(176,122,255,0.08) 20%, transparent 60%)',
        }}
      />
    </div>
  )
}
