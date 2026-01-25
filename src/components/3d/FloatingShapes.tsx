
import { Float, Sphere, Torus, Octahedron } from '@react-three/drei';

export default function FloatingShapes() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere args={[1, 32, 32]} position={[-3, 2, -5]}>
          <meshStandardMaterial color="#6366f1" roughness={0.1} metalness={0.1} />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <Torus args={[0.8, 0.2, 16, 100]} position={[3, 1, -4]} rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial color="#a855f7" roughness={0.1} metalness={0.5} />
        </Torus>
      </Float>

      <Float speed={1} rotationIntensity={1} floatIntensity={2.5}>
        <Octahedron args={[1.5]} position={[5, -2, -6]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.2} transparent opacity={0.8} />
        </Octahedron>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
        <Sphere args={[0.5, 32, 32]} position={[-2, -3, -3]}>
           <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} toneMapped={false} />
        </Sphere>
      </Float>
    </group>
  );
}
