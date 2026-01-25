
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0f172a, 0.02);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x6366f1, 2, 50);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        // Stars
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 2000;
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

        // Floating Shapes
        const geometry1 = new THREE.IcosahedronGeometry(1.5, 0);
        const material1 = new THREE.MeshStandardMaterial({
            color: 0x6366f1,
            roughness: 0.3,
            metalness: 0.2
        });
        const shape1 = new THREE.Mesh(geometry1, material1);
        shape1.position.set(-3, 2, -5);
        scene.add(shape1);

        const geometry2 = new THREE.TorusGeometry(1, 0.3, 16, 100);
        const material2 = new THREE.MeshStandardMaterial({
            color: 0xa855f7,
            roughness: 0.2,
            metalness: 0.5
        });
        const shape2 = new THREE.Mesh(geometry2, material2);
        shape2.position.set(3, -1, -4);
        shape2.rotation.x = 1;
        scene.add(shape2);

        // Mouse movement effect
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const time = Date.now() * 0.001;

            // Animate shapes
            shape1.rotation.x += 0.005;
            shape1.rotation.y += 0.005;
            shape1.position.y = 2 + Math.sin(time) * 0.5;

            shape2.rotation.x += 0.01;
            shape2.rotation.y += 0.005;

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
            cancelAnimationFrame(animationFrameId);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry1.dispose();
            material1.dispose();
            geometry2.dispose();
            material2.dispose();
            starGeometry.dispose();
            starMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            <div ref={mountRef} className="absolute inset-0" />
            {/* Overlay gradient for readability */}
            <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] pointer-events-none" />
        </div>
    );
}
