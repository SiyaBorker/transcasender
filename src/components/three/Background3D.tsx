
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useIsMobile } from '@/hooks/use-mobile';
import { useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingCube = ({ position, scale, color, speed = 1 }: { 
  position: [number, number, number],
  scale: [number, number, number],
  color: string,
  speed?: number 
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const initialPosition = useRef(position);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    mesh.current.position.y = initialPosition.current[1] + Math.sin(time * speed * 0.4) * 0.5;
    mesh.current.rotation.x = Math.sin(time * speed * 0.2) * 0.2;
    mesh.current.rotation.y += 0.002 * speed;
    mesh.current.rotation.z += 0.001 * speed;
  });
  
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
};

const FloatingCylinder = ({ position, scale, color, speed = 1 }: {
  position: [number, number, number],
  scale: [number, number, number],
  color: string,
  speed?: number
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const initialPosition = useRef(position);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    mesh.current.position.y = initialPosition.current[1] + Math.sin(time * speed * 0.5) * 0.3;
    mesh.current.position.x = initialPosition.current[0] + Math.sin(time * speed * 0.3) * 0.2;
    mesh.current.rotation.x += 0.001 * speed;
    mesh.current.rotation.z += 0.002 * speed;
  });
  
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <cylinderGeometry args={[1, 1, 1, 12]} />
      <meshStandardMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
};

const FloatingTorus = ({ position, scale, color, speed = 1 }: {
  position: [number, number, number],
  scale: [number, number, number],
  color: string,
  speed?: number
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const initialPosition = useRef(position);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    mesh.current.position.z = initialPosition.current[2] + Math.sin(time * speed * 0.3) * 0.4;
    mesh.current.position.x = initialPosition.current[0] + Math.cos(time * speed * 0.4) * 0.3;
    mesh.current.rotation.x += 0.002 * speed;
    mesh.current.rotation.y += 0.001 * speed;
    mesh.current.rotation.z = Math.sin(time * speed * 0.2) * 0.2;
  });
  
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <torusGeometry args={[1, 0.4, 16, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
};

const Scene = () => {
  const isMobile = useIsMobile();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = isMobile ? 15 : 10;
  }, [camera, isMobile]);

  // Update camera on resize
  useEffect(() => {
    const handleResize = () => {
      camera.position.z = window.innerWidth < 768 ? 15 : 10;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera]);

  const objects = [
    { type: 'cube', position: [-5, 1, -3], scale: [0.8, 0.8, 0.8], color: '#4287f5', speed: 0.8 },
    { type: 'cube', position: [4, -2, -5], scale: [1, 1, 1], color: '#42b0f5', speed: 1.2 },
    { type: 'cylinder', position: [2, 2, -4], scale: [0.6, 1.5, 0.6], color: '#42f5d1', speed: 1 },
    { type: 'cylinder', position: [-3, -1, -2], scale: [0.7, 0.7, 0.7], color: '#4251f5', speed: 0.7 },
    { type: 'torus', position: [0, 0, -6], scale: [1.2, 1.2, 1.2], color: '#42f59b', speed: 0.9 },
    { type: 'torus', position: [-5, -3, -5], scale: [0.9, 0.9, 0.9], color: '#1a73e8', speed: 1.1 },
  ];

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      <Stars radius={80} depth={50} count={1000} factor={4} fade />
      
      {objects.map((obj, index) => {
        if (obj.type === 'cube') {
          return (
            <FloatingCube
              key={`cube-${index}`}
              position={obj.position as [number, number, number]}
              scale={obj.scale as [number, number, number]}
              color={obj.color}
              speed={obj.speed}
            />
          );
        } else if (obj.type === 'cylinder') {
          return (
            <FloatingCylinder
              key={`cylinder-${index}`}
              position={obj.position as [number, number, number]}
              scale={obj.scale as [number, number, number]}
              color={obj.color}
              speed={obj.speed}
            />
          );
        } else {
          return (
            <FloatingTorus
              key={`torus-${index}`}
              position={obj.position as [number, number, number]}
              scale={obj.scale as [number, number, number]}
              color={obj.color}
              speed={obj.speed}
            />
          );
        }
      })}
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
};

const Background3D: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 opacity-60">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;
