import React, { useState } from 'react'
import { useGLTF } from '@react-three/drei'

function Model({ url }) {
  const { scene } = useGLTF(url)
  const [hovered, setHover] = useState(null)

  return (
    <primitive
      object={scene}
      scale={1.5}
      // 1. When you click ANY part of the car
      onPointerDown={(e) => {
        e.stopPropagation()
        // Log the name of the part you clicked (e.g., "Wheel_FR")
        console.log("Clicked part:", e.object.name)

        // Visual Feedback: Flash the part random colors
        e.object.material.color.setHex(Math.random() * 0xffffff)
      }}

      // 2. Change cursor to pointer when hovering
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    />
  )
}

export default Model
