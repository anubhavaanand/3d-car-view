import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function CompleteBody({ setSelectedOrgan }) {
  const { scene } = useGLTF('/ferrari_sf90spider_mansory.glb')

  const handleClick = (e) => {
    e.stopPropagation()
    setSelectedOrgan('Ferrari SF90 Spider Mansory')
  }

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      onClick={handleClick}
    />
  )
}

useGLTF.preload('/ferrari_sf90spider_mansory.glb')
