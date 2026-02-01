
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Performance detection
        const isLowPerformance = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0f172a, 0.02);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        // Renderer setup with performance optimizations
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: !isLowPerformance,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(isLowPerformance ? 1 : Math.min(window.devicePixelRatio, 1.5));
        mountRef.current.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x6366f1, 2, 50);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        // Stars - reduced count for better performance
        const starGeometry = new THREE.BufferGeometry();
        const starCount = isLowPerformance ? 500 : 1200;
        const posArray = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 50;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const starMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
        });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Mouse movement effect with throttling
        let mouseX = 0;
        let mouseY = 0;
        let mouseUpdateTimeout: number | null = null;

        const handleMouseMove = (event: MouseEvent) => {
            if (mouseUpdateTimeout !== null) return;
            
            mouseUpdateTimeout = window.setTimeout(() => {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
                mouseUpdateTimeout = null;
            }, 16); // ~60fps
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Animation Loop
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Animate stars
            stars.rotation.y += 0.0002;

            // Camera parallax
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };

        animate();

        // Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (mouseUpdateTimeout !== null) {
                clearTimeout(mouseUpdateTimeout);
            }
            cancelAnimationFrame(animationFrameId);
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            starGeometry.dispose();
            starMaterial.dispose();
            renderer.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-50 dark:opacity-30">
            <div ref={mountRef} className="absolute inset-0" />
        </div>
    );
}
