import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import TypewriterEffect from './TypewriterEffect';
import * as THREE from 'three';

const Laptop3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Laptop Base */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      
      {/* Laptop Screen */}
      <mesh position={[0, 0.5, -0.9]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[2.8, 1.8, 0.1]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      
      {/* Screen Content */}
      <mesh position={[0, 0.5, -0.84]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[2.5, 1.5]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      
      {/* Floating Code Particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i) * 3,
          Math.cos(i) * 2,
          Math.sin(i * 2) * 2
        ]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
      ))}
    </group>
  );
};

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="mb-6">
            <TypewriterEffect
              text="Hi, I'm Abishek 👋"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
            />
            <TypewriterEffect
              text="I build intelligent apps that think, learn, and solve."
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300"
              delay={2000}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.8 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Passionate developer specializing in AI-powered applications and full-stack development. 
            I transform ideas into intelligent solutions that make a real-world impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <ExternalLink size={20} />
              View Projects
            </motion.button>
            
            <motion.a
              href="https://drive.google.com/file/d/1pctUkHucwE7n3-342YN3JHiJ4sYk1kVG/view?usp=drivesdk" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <ExternalLink size={20} />
              View Resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right 3D Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-96 lg:h-[500px]"
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            <Laptop3D />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;