import { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated, config } from '@react-spring/three'
import { DepthSection, getCameraAimPosY } from 'depth-section'
import './App.css'

function MyRotatingBox() {
  const [active, setActive] = useState(false)
  const [spring, api] = useSpring(() => ({ posY: 0, config: config.stiff }))

  useFrame((state) => {
    api.start({
      posY: getCameraAimPosY(state),
    })
  })

  return (
    <animated.mesh onClick={() => setActive(!active)} position-y={spring.posY}>
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
