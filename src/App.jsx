import React, { useState, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'

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

  // Window Interior
  "WindowInside_Geo_lodA.001": "Interior Windshield Trim",
  "WindowInside_Geo_lodA.002": "Interior Rear Window Trim",
  "WindowInside_Geo_lodA.003": "Interior Left Window Trim",
  "WindowInside_Geo_lodA.004": "Interior Right Window Trim",

  // Logos & Badges
  "logo 1": "Ferrari Badge (Front)",
  "logo 2": "Ferrari Badge (Rear)",
  "logo 3": "Mansory Badge",
  "Badge_Geo_lodA": "Ferrari Prancing Horse Badge",
  "Object_470": "Mansory Badge",
  "Object_473": "Ferrari Badge (Rear)",
  "Object_476": "Ferrari Badge (Front)",
  "Object_551": "Ferrari Prancing Horse Badge",

  // Body Panels (colored parts)
  "Coloured_Geo_lodA.001": "Body Panel (Left)",
  "Coloured_Geo_lodA.002": "Body Panel (Right)",
  "Object_545": "Body Panel (Left)",
  "Object_548": "Body Panel (Right)",

  // Planes (likely mirrors or flat surfaces)
  "Plane006": "Left Side Mirror",
  "Plane007": "Right Side Mirror",
  "Plane031": "Roof Panel",
  "Object_351": "Roof Panel",
  "Object_354": "Right Side Mirror",
  "Object_357": "Left Side Mirror",

  // PolySurface parts (body components)
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

  // Numbered parts (lights, trim, etc.)
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

  // Three-digit numbered parts
  "018": "Front Grille Section",
  "019": "Front Splitter",
  "020": "Hood",
  "021": "Trunk Lid",
  "Object_530": "Trunk Lid",
  "Object_533": "Hood",
  "Object_536": "Front Splitter",
  "Object_539": "Front Grille Section",

  // Box/Interior parts
  "Box003.001": "Center Console",
  "Object_491": "Center Console",

  // Object numbered series (body panels)
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

  // Additional body parts
  "Object_363": "Rear Diffuser",
  "Object_366": "Hood Scoop",
  "Object_369": "Side Air Vent (Right)",
  "Object_372": "Side Air Vent (Left)",
  "Object_375": "Rear Diffuser",
  "Object_378": "Front Lip",
}

// Helper function to get friendly name or format unknown names
function getFriendlyName(rawName) {
  if (NAME_MAP[rawName]) {
    return NAME_MAP[rawName]
  }
  // Format unknown Object names to be more readable
  if (rawName.startsWith("Object_")) {
    return `Body Part ${rawName.replace("Object_", "#")}`
  }
  if (rawName.startsWith("Object")) {
    return `Component ${rawName.replace("Object", "#")}`
  }
  return rawName
}

// 1. The 3D Model Component
function Model({ url, setPartName }) {
  const { scene } = useGLTF(url)

  return (
    <primitive
      object={scene}
      scale={1.5}
      onPointerDown={(e) => {
        e.stopPropagation()
        // Get the raw name and convert to friendly name
        const rawName = e.object.name
        const friendlyName = getFriendlyName(rawName)

        // A. Send the friendly name UP to the main App
        setPartName(friendlyName)

        // B. Change color for visual feedback
        if (e.object.material) {
          e.object.material.color.setHex(Math.random() * 0xffffff)
        }
      }}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    />
  )
}

// 2. The Main App
export default function App() {
  const [selectedName, setSelectedName] = useState("Click a part")

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', position: 'relative' }}>

      {/* --- UI OVERLAY --- */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        background: 'rgba(0,0,0,0.7)',
        padding: '20px',
        borderRadius: '10px',
        zIndex: 10,
        fontFamily: 'sans-serif'
      }}>
        <h2 style={{ margin: 0, fontSize: '1rem', color: '#888' }}>FERRARI SF90 SPIDER</h2>
        <h1 style={{ margin: '10px 0', fontSize: '2rem', color: '#ff3333' }}>
          {selectedName}
        </h1>
        <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>Mansory Edition</p>
      </div>

      {/* --- 3D SCENE --- */}
      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={100} />

        <Suspense fallback={null}>
          <Model url="/ferrari_sf90spider_mansory.glb" setPartName={setSelectedName} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  )
}
