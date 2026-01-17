import React, { useState, Suspense, useRef, useCallback, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Part category mapping
const CATEGORY_MAP = {
  "Wheel": "Wheels & Tires",
  "Hubcap": "Wheels & Tires",
  "Spoiler": "Aerodynamics",
  "Window": "Glass & Windows",
  "Windshield": "Glass & Windows",
  "Sunroof": "Glass & Windows",
  "Logo": "Branding",
  "Badge": "Branding",
  "Ferrari": "Branding",
  "Mansory": "Branding",
  "Body Panel": "Body Work",
  "Fender": "Body Work",
  "Bumper": "Body Work",
  "Hood": "Body Work",
  "Trunk": "Body Work",
  "Door": "Body Work",
  "Roof": "Body Work",
  "Pillar": "Structure",
  "Mirror": "Exterior",
  "Light": "Lighting",
  "Headlight": "Lighting",
  "Fog Light": "Lighting",
  "Tail Light": "Lighting",
  "Brake Light": "Lighting",
  "Turn Signal": "Lighting",
  "Reverse Light": "Lighting",
  "Exhaust": "Performance",
  "Engine": "Performance",
  "Air Intake": "Performance",
  "Diffuser": "Aerodynamics",
  "Splitter": "Aerodynamics",
  "Skirt": "Body Work",
  "Grille": "Exterior",
  "Dashboard": "Interior",
  "Steering": "Interior",
  "Seat": "Interior",
  "Console": "Interior",
  "Gear": "Interior",
  "Instrument": "Interior",
  "Gauge": "Interior",
  "Speedometer": "Interior",
  "Wiper": "Exterior",
  "Antenna": "Exterior",
  "Fuel Cap": "Exterior",
}

// Name mapping - raw mesh names to friendly display names
const NAME_MAP = {
  // Wheels
  "wheel1": "Front Left Wheel",
  "wheel2": "Front Right Wheel",
  "wheel3": "Rear Left Wheel",
  "wheel4": "Rear Right Wheel",
  "Object_333": "Front Left Wheel",
  "Object_336": "Front Right Wheel",
  "Object_339": "Rear Left Wheel",
  "Object_342": "Rear Right Wheel",

  // Hubcaps
  "kolpak1": "Front Left Hubcap",
  "kolpak2": "Front Right Hubcap",
  "kolpak3": "Rear Left Hubcap",
  "kolpak4": "Rear Right Hubcap",
  "Object_479": "Rear Right Hubcap",
  "Object_482": "Rear Left Hubcap",
  "Object_485": "Front Right Hubcap",
  "Object_488": "Front Left Hubcap",

  // Spoiler
  "spoil": "Rear Spoiler",
  "spoil2": "Rear Spoiler Wing",
  "Object_345": "Rear Spoiler Wing",
  "Object_348": "Rear Spoiler",

  // Windows
  "Window_Geo_lodA.001": "Windshield",
  "Window_Geo_lodA.002": "Rear Window",
  "Window_Geo_lodA.003": "Left Side Window",
  "Window_Geo_lodA.004": "Right Side Window",
  "Window_Geo_lodA.005": "Left Quarter Window",
  "Window_Geo_lodA.006": "Right Quarter Window",
  "Window_Geo_lodA.007": "Left Door Window",
  "Window_Geo_lodA.008": "Right Door Window",
  "Window_Geo_lodA.009": "Left Rear Window",
  "Window_Geo_lodA.010": "Right Rear Window",
  "Window_Geo_lodA.011": "Sunroof",
  "Object_255": "Windshield",
  "Object_258": "Rear Window",
  "Object_261": "Left Side Window",
  "Object_264": "Left Quarter Window",
  "Object_267": "Right Quarter Window",
  "Object_270": "Left Door Window",
  "Object_273": "Right Door Window",
  "Object_276": "Left Rear Window",
  "Object_279": "Right Rear Window",
  "Object_282": "Sunroof",
  "Object_542": "Right Side Window",

  // Logos & Badges
  "logo 1": "Ferrari Badge (Front)",
  "logo 2": "Ferrari Badge (Rear)",
  "logo 3": "Mansory Badge",
  "Badge_Geo_lodA": "Ferrari Prancing Horse Badge",
  "Object_470": "Mansory Badge",
  "Object_473": "Ferrari Badge (Rear)",
  "Object_476": "Ferrari Badge (Front)",
  "Object_551": "Ferrari Prancing Horse Badge",

  // Body Panels
  "Coloured_Geo_lodA.001": "Body Panel (Left)",
  "Coloured_Geo_lodA.002": "Body Panel (Right)",
  "Object_545": "Body Panel (Left)",
  "Object_548": "Body Panel (Right)",

  // Mirrors
  "Plane006": "Left Side Mirror",
  "Plane007": "Right Side Mirror",
  "Plane031": "Roof Panel",
  "Object_351": "Roof Panel",
  "Object_354": "Right Side Mirror",
  "Object_357": "Left Side Mirror",

  // Fenders & Body
  "polySurface1013": "Front Left Fender",
  "polySurface1014": "Front Right Fender",
  "polySurface1015": "Rear Left Fender",
  "polySurface1016": "Rear Right Fender",
  "polySurface1017": "Front Bumper Section",
  "polySurface1020": "Side Skirt (Left)",
  "polySurface1021": "Side Skirt (Right)",
  "polySurface1022": "Rear Diffuser (Left)",
  "polySurface1023": "Rear Diffuser (Right)",
  "polySurface1024": "Rear Bumper Section",
  "polySurface1027": "Hood Vent (Left)",
  "polySurface1028": "Hood Vent (Right)",
  "polySurface1029": "Engine Cover",
  "polySurface1032": "Air Intake (Left)",
  "polySurface1033": "Air Intake (Right)",
  "Object_210": "Front Left Fender",
  "Object_213": "Front Right Fender",
  "Object_216": "Rear Left Fender",
  "Object_219": "Rear Right Fender",
  "Object_222": "Front Bumper Section",
  "Object_225": "Side Skirt (Left)",
  "Object_228": "Side Skirt (Right)",
  "Object_231": "Rear Diffuser (Left)",
  "Object_234": "Rear Diffuser (Right)",
  "Object_237": "Rear Bumper Section",
  "Object_240": "Hood Vent (Left)",
  "Object_243": "Hood Vent (Right)",
  "Object_246": "Engine Cover",
  "Object_249": "Air Intake (Left)",
  "Object_252": "Air Intake (Right)",

  // Lights
  "1": "Headlight Assembly",
  "2": "Tail Light (Left)",
  "4": "Tail Light (Right)",
  "7": "Fog Light (Left)",
  "8": "Fog Light (Right)",
  "10": "Turn Signal (Front Left)",
  "11": "Turn Signal (Front Right)",
  "12": "Turn Signal (Rear Left)",
  "13": "Turn Signal (Rear Right)",
  "14": "Brake Light (Left)",
  "15": "Brake Light (Right)",
  "16": "Reverse Light",
  "Object_494": "Fog Light (Right)",
  "Object_497": "Fog Light (Left)",
  "Object_500": "Tail Light (Right)",
  "Object_503": "Tail Light (Left)",
  "Object_506": "Reverse Light",
  "Object_509": "Brake Light (Right)",
  "Object_512": "Brake Light (Left)",
  "Object_515": "Turn Signal (Rear Right)",
  "Object_518": "Turn Signal (Rear Left)",
  "Object_521": "Turn Signal (Front Right)",
  "Object_524": "Turn Signal (Front Left)",
  "Object_527": "Headlight Assembly",

  // Hood & Trunk
  "018": "Front Grille Section",
  "019": "Front Splitter",
  "020": "Hood",
  "021": "Trunk Lid",
  "Object_530": "Trunk Lid",
  "Object_533": "Hood",
  "Object_536": "Front Splitter",
  "Object_539": "Front Grille Section",

  // Interior
  "Box003.001": "Center Console",
  "Object_491": "Center Console",
  "Object010": "Dashboard",
  "Object052.001": "Steering Wheel",
  "Object057.001": "Instrument Cluster",
  "Object060": "Gear Shifter",
  "Object061": "Door Handle (Left)",
  "Object062": "Door Handle (Right)",
  "Object063": "Seat (Left)",
  "Object064": "Seat (Right)",
  "Object093": "Exhaust Tip (Left)",
  "Object095": "Exhaust Tip (Right)",
  "Object101": "Front Bumper",
  "Object102": "Rear Bumper",
  "Object104": "Left Door",
  "Object105": "Right Door",
  "Object106": "Left Door Panel",
  "Object107": "Right Door Panel",
  "Object108": "A-Pillar (Left)",
  "Object109": "A-Pillar (Right)",
  "Object110": "B-Pillar (Left)",
  "Object111": "B-Pillar (Right)",
  "Object112": "C-Pillar (Left)",
  "Object113": "C-Pillar (Right)",
  "Object115": "Roof",
  "Object117": "Floor Pan",
  "Object118": "Engine Bay",
  "Object122": "Fuel Cap",
  "Object125": "Antenna",
  "Object134": "Front Lip",
  "Object139": "Rear Diffuser",
  "Object143": "Side Air Vent (Left)",
  "Object144": "Side Air Vent (Right)",
  "Object145": "Hood Scoop",
  "Object151": "Wiper (Left)",
  "Object152": "Wiper (Right)",
  "Object_360": "Dashboard",
  "Object_381": "Antenna",
  "Object_384": "Fuel Cap",
  "Object_387": "Engine Bay",
  "Object_390": "Floor Pan",
  "Object_393": "Roof",
  "Object_396": "C-Pillar (Right)",
  "Object_399": "C-Pillar (Left)",
  "Object_402": "B-Pillar (Right)",
  "Object_405": "B-Pillar (Left)",
  "Object_408": "A-Pillar (Right)",
  "Object_411": "A-Pillar (Left)",
  "Object_414": "Right Door Panel",
  "Object_417": "Left Door Panel",
  "Object_420": "Right Door",
  "Object_423": "Left Door",
  "Object_426": "Rear Bumper",
  "Object_429": "Front Bumper",
  "Object_432": "Exhaust Tip (Right)",
  "Object_435": "Exhaust Tip (Left)",
  "Object_437": "Exhaust System",
  "Object_440": "Seat (Right)",
  "Object_443": "Seat (Left)",
  "Object_446": "Door Handle (Right)",
  "Object_449": "Door Handle (Left)",
  "Object_452": "Gear Shifter",
  "Object_454": "Center Tunnel",
  "Object_457": "Instrument Cluster",
  "Object_459": "Gauge Cluster",
  "Object_461": "Speedometer",
  "Object_464": "Steering Wheel",
  "Object_467": "Dashboard",
  "Object_363": "Rear Diffuser",
  "Object_366": "Hood Scoop",
  "Object_369": "Side Air Vent (Right)",
  "Object_372": "Side Air Vent (Left)",
  "Object_375": "Rear Diffuser",
  "Object_378": "Front Lip",
}

// Helper function to get friendly name
function getFriendlyName(rawName) {
  if (NAME_MAP[rawName]) {
    return NAME_MAP[rawName]
  }
  if (rawName.startsWith("Object_")) {
    return `Body Part ${rawName.replace("Object_", "#")}`
  }
  if (rawName.startsWith("Object")) {
    return `Component ${rawName.replace("Object", "#")}`
  }
  return rawName
}

// Helper function to get category
function getCategory(partName) {
  for (const [keyword, category] of Object.entries(CATEGORY_MAP)) {
    if (partName.includes(keyword)) {
      return category
    }
  }
  return "Body Work"
}

// Default camera position
const DEFAULT_CAMERA = { position: [4, 3, 4], target: [0, 0, 0] }

// Loading component
function Loader() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading 3D Model...</p>
    </div>
  )
}

// Camera controller for reset and zoom
function CameraController({ resetTrigger, zoomTarget, onZoomComplete }) {
  const { camera, controls } = useThree()
  const isAnimating = useRef(false)

  useEffect(() => {
    if (resetTrigger > 0 && controls) {
      isAnimating.current = true
      const startPos = camera.position.clone()
      const endPos = new THREE.Vector3(...DEFAULT_CAMERA.position)
      const startTarget = controls.target.clone()
      const endTarget = new THREE.Vector3(...DEFAULT_CAMERA.target)

      let progress = 0
      const animate = () => {
        progress += 0.05
        if (progress >= 1) {
          camera.position.copy(endPos)
          controls.target.copy(endTarget)
          controls.update()
          isAnimating.current = false
          return
        }
        const t = 1 - Math.pow(1 - progress, 3) // Ease out cubic
        camera.position.lerpVectors(startPos, endPos, t)
        controls.target.lerpVectors(startTarget, endTarget, t)
        controls.update()
        requestAnimationFrame(animate)
      }
      animate()
    }
  }, [resetTrigger, camera, controls])

  useEffect(() => {
    if (zoomTarget && controls && !isAnimating.current) {
      isAnimating.current = true
      const startPos = camera.position.clone()
      const startTarget = controls.target.clone()

      // Calculate zoom position (closer to target)
      const direction = new THREE.Vector3()
        .subVectors(camera.position, zoomTarget)
        .normalize()
      const endPos = zoomTarget.clone().add(direction.multiplyScalar(2))

      let progress = 0
      const animate = () => {
        progress += 0.04
        if (progress >= 1) {
          camera.position.copy(endPos)
          controls.target.copy(zoomTarget)
          controls.update()
          isAnimating.current = false
          onZoomComplete?.()
          return
        }
        const t = 1 - Math.pow(1 - progress, 3)
        camera.position.lerpVectors(startPos, endPos, t)
        controls.target.lerpVectors(startTarget, zoomTarget, t)
        controls.update()
        requestAnimationFrame(animate)
      }
      animate()
    }
  }, [zoomTarget, camera, controls, onZoomComplete])

  return null
}

// 3D Model Component with hover effects
function Model({ url, setPartName, setPartCategory, setZoomTarget }) {
  const { scene } = useGLTF(url)
  const [hoveredObj, setHoveredObj] = useState(null)
  const originalMaterials = useRef(new Map())

  // Store original materials on mount
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        originalMaterials.current.set(child.uuid, child.material.clone())
      }
    })
  }, [scene])

  // Apply hover effect
  useEffect(() => {
    if (hoveredObj) {
      const material = hoveredObj.material
      if (material && material.emissive) {
        material.emissive.setHex(0x333333)
        material.emissiveIntensity = 0.5
      }
    }
    return () => {
      if (hoveredObj && hoveredObj.material && hoveredObj.material.emissive) {
        hoveredObj.material.emissive.setHex(0x000000)
        hoveredObj.material.emissiveIntensity = 0
      }
    }
  }, [hoveredObj])

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    const rawName = e.object.name
    const friendlyName = getFriendlyName(rawName)
    const category = getCategory(friendlyName)

    setPartName(friendlyName)
    setPartCategory(category)

    // Get world position for zoom
    const worldPos = new THREE.Vector3()
    e.object.getWorldPosition(worldPos)
    setZoomTarget(worldPos)

    // Visual feedback
    if (e.object.material) {
      e.object.material.color.setHex(0xff3333)
      setTimeout(() => {
        const original = originalMaterials.current.get(e.object.uuid)
        if (original) {
          e.object.material.color.copy(original.color)
        }
      }, 300)
    }
  }, [setPartName, setPartCategory, setZoomTarget])

  return (
    <primitive
      object={scene}
      scale={1.5}
      onPointerDown={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setHoveredObj(e.object)
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
        setHoveredObj(null)
      }}
    />
  )
}

// Icons
const ResetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
)

const FullscreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
)

const ExitFullscreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
  </svg>
)

// Main App
export default function App() {
  const [selectedName, setSelectedName] = useState("Click a part")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [resetTrigger, setResetTrigger] = useState(0)
  const [zoomTarget, setZoomTarget] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const controlsRef = useRef()

  // Check fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }, [])

  // Handle reset view
  const handleResetView = useCallback(() => {
    setResetTrigger(t => t + 1)
    setZoomTarget(null)
    setSelectedName("Click a part")
    setSelectedCategory("")
  }, [])

  // Clear zoom target after animation
  const handleZoomComplete = useCallback(() => {
    setZoomTarget(null)
  }, [])

  // Detect mobile for DPR limiting
  const isMobile = typeof window !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', position: 'relative' }}>

      {/* Loading overlay */}
      {isLoading && <Loader />}

      {/* UI Overlay */}
      <div className="ui-overlay">
        <p className="model-title">Ferrari SF90 Spider</p>
        <h1 className="part-name">{selectedName}</h1>
        <p className="model-subtitle">Mansory Edition</p>
        {selectedCategory && (
          <span className="part-category">{selectedCategory}</span>
        )}
      </div>

      {/* Hint text */}
      {selectedName === "Click a part" && !isLoading && (
        <p className="hint-text">Tap or click on any part to explore</p>
      )}

      {/* Control buttons */}
      <div className="control-buttons">
        <button className="control-btn" onClick={handleResetView}>
          <ResetIcon />
          <span>Reset View</span>
        </button>
        <button className="control-btn icon-only" onClick={toggleFullscreen}>
          {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
        </button>
      </div>

      {/* 3D Scene */}
      <Canvas
        camera={{ position: DEFAULT_CAMERA.position, fov: 50 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: false
        }}
        onCreated={() => setIsLoading(false)}
      >
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} intensity={80} angle={0.3} penumbra={1} />
        <spotLight position={[-10, 5, -10]} intensity={40} angle={0.3} penumbra={1} />

        <Suspense fallback={null}>
          <Model
            url="/ferrari_sf90spider_mansory.glb"
            setPartName={setSelectedName}
            setPartCategory={setSelectedCategory}
            setZoomTarget={setZoomTarget}
          />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={1.5}
          maxDistance={15}
          maxPolarAngle={Math.PI * 0.85}
          minPolarAngle={Math.PI * 0.1}
          dampingFactor={0.05}
          enableDamping={true}
          touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
          mouseButtons={{ LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }}
        />

        <CameraController
          resetTrigger={resetTrigger}
          zoomTarget={zoomTarget}
          onZoomComplete={handleZoomComplete}
        />
      </Canvas>
    </div>
  )
}
