import { useRef } from 'react'
import './App.css'
import { DepthSection } from 'depth-section'
import { Box } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { getCameraAimPos } from 'depth-section'

const InnerSection = () => {
  const mesh = useRef<any>()
  useFrame((state) => {
    if (!mesh.current) return

    mesh.current.rotation.x += 0.01
    mesh.current.rotation.y += 0.01

    const [aimX, aimY] = getCameraAimPos(state)
    mesh.current.position.x = aimX
    mesh.current.position.y = aimY
  })

  return (
    <>
      <Box ref={mesh}>
        <meshStandardMaterial color='limegreen' />
      </Box>
      <pointLight position={[10, 10, 10]} />
      <ambientLight intensity={0.2} />
    </>
  )
}

function App() {
  return (
    <div id='three-wrapper'>
      <div style={{ height: '100vh' }} />
      <div style={{ height: '100vh' }}>
        <DepthSection>
          <InnerSection />
        </DepthSection>
      </div>
      <div style={{ height: '100vh' }} />
    </div>
  )
}

export default App
