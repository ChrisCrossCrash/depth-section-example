import React, { useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useSpring, animated, config } from '@react-spring/three'
import './App.css'
import * as THREE from 'three'

function MyRotatingBox() {
  const myMesh = React.useRef<THREE.Mesh>()
  const [active, setActive] = useState(false)

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  })

  useFrame(({ clock }) => {
    if (!myMesh.current) return
    myMesh.current.rotation.x = clock.getElapsedTime()
    myMesh.current.rotation.y = clock.getElapsedTime()
  })

  return (
    <animated.mesh
      scale={scale}
      onClick={() => setActive(!active)}
      ref={myMesh}
    >
      <boxBufferGeometry />
      <meshPhongMaterial color='royalblue' />
    </animated.mesh>
  )
}

export default function App() {
  return (
    <div id='three-wrapper'>
      <Canvas>
        <MyRotatingBox />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
    </div>
  )
}
