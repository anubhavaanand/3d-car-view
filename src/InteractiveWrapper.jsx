import React, { useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function InteractiveWrapper({ Component, setSelectedMesh }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!groupRef.current) return

    // Traverse and setup interactive meshes
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
        
        // Clean mesh name for display
        const displayName = child.name
          .replace(/[_]/g, ' ')
          .replace(/VH_M_|VH_F_|3D_|[0-9]+/g, '')
          .trim()
          .replace(/\b\w/g, char => char.toUpperCase()) || 'Component'
        
        child.userData.displayName = displayName
        child.userData.isClickable = true
      }
    })
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (hovered === child.name) {
            child.material.emissive.setHex(0x444444)
          } else if (selected === child.name) {
            child.material.emissive.setHex(0x333333)
          } else {
            child.material.emissive.setHex(0x000000)
          }
        }
      })
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    if (e.object.userData.isClickable) {
      const displayName = e.object.userData.displayName
      setSelected(e.object.name)
      setSelectedMesh(displayName)
    }
  }

  const handlePointerOver = (e) => {
    e.stopPropagation()
    if (e.object.userData.isClickable) {
      setHovered(e.object.name)
      document.body.style.cursor = 'pointer'
    }
  }

  const handlePointerOut = () => {
    setHovered(null)
    document.body.style.cursor = 'default'
  }

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Component />
    </group>
  )
}
