import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { DepthSection, getCameraAimPosY } from 'depth-section'
import './App.css'

function SpringyBox() {
  const [spring, api] = useSpring(() => ({
    posY: 0,
    config: {
      mass: 1,
      tension: 500,
      friction: 35,
    },
  }))

  useFrame((state) => {
    api.start({
      posY: getCameraAimPosY(state),
    })
  })

  return (
    <animated.mesh position-y={spring.posY}>
      <boxBufferGeometry args={[0.3, 0.3, 0.3]} />
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
          <SpringyBox />
          <ambientLight intensity={0.1} />
          <directionalLight />
        </DepthSection>
      </div>
      <div style={{ height: '100vh' }} />
    </>
  )
}
