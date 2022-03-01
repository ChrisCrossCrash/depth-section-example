import React, { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated, config } from '@react-spring/three'
import { DepthSection, getCameraAimPosY } from 'depth-section'
import './App.css'
import * as THREE from 'three'

function MyRotatingBox() {
  const myMesh = React.useRef<THREE.Mesh>()
  const [active, setActive] = useState(false)

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  })

  useFrame((state) => {
    if (!myMesh.current) return
    myMesh.current.rotation.x = state.clock.getElapsedTime()
    myMesh.current.rotation.y = state.clock.getElapsedTime()
    myMesh.current.position.y = getCameraAimPosY(state)
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
    <>
      <div style={{ height: '100vh' }} />
      <div id='three-wrapper'>
        <DepthSection debug>
          <MyRotatingBox />
          <ambientLight intensity={0.1} />
          <directionalLight />
        </DepthSection>
      </div>
      <div style={{ height: '100vh' }} />
    </>
  )
}
