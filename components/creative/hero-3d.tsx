"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/**
 * "Ignition Core": the single signature WebGL moment (home hero only).
 * A dark faceted glass-like shell around a glowing ignition-orange core, with thin orbital
 * trajectory rings. Tilts toward the cursor; on scroll the rings widen and the core brightens
 * ("lift-off"). No textures and no HDR download: reflections come from in-scene Lightformers.
 *
 * Loaded only via next/dynamic (client-only), after idle, on capable desktops. The static CSS
 * poster underneath is the fallback. Rendering stops whenever the canvas is off-screen.
 */

const IGNITION = new THREE.Color("#ff5a1f");
const BONE = new THREE.Color("#f3f0ea");

type SceneProps = { scrollRef: React.RefObject<number> };

function Core({ scrollRef }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.MeshBasicMaterial>(null);
  const light = useRef<THREE.PointLight>(null);
  const rings = useRef<THREE.Group>(null);
  const satellite = useRef<THREE.Mesh>(null);

  const ringData = useMemo(
    () => [
      { radius: 2.15, tilt: [1.25, 0.25, -0.35] as const, speed: 0.08 },
      { radius: 2.6, tilt: [1.05, -0.5, 0.45] as const, speed: -0.05 },
      { radius: 3.1, tilt: [1.45, 0.1, 0.1] as const, speed: 0.03 },
    ],
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = THREE.MathUtils.clamp(scrollRef.current ?? 0, 0, 1);
    const g = group.current;
    if (!g) return;

    // Cursor tilt (state.pointer is -1..1), eased
    const targetX = state.pointer.y * 0.35;
    const targetY = state.pointer.x * 0.5;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY + t * 0.08, 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, Math.sin(t * 0.6) * 0.08 + p * 1.2, 4, delta);

    if (shell.current) {
      shell.current.rotation.x += delta * 0.12;
      shell.current.rotation.z += delta * 0.07;
    }
    if (core.current) {
      const pulse = 0.85 + Math.sin(t * 2) * 0.08;
      core.current.color.copy(IGNITION).multiplyScalar(pulse + p * 0.8);
    }
    if (light.current) light.current.intensity = 18 + p * 40 + Math.sin(t * 2) * 2;
    if (rings.current) {
      const s = 1 + p * 0.55;
      rings.current.scale.setScalar(THREE.MathUtils.damp(rings.current.scale.x, s, 4, delta));
      rings.current.children.forEach((ring, i) => {
        ring.rotation.z += delta * (ringData[i]?.speed ?? 0) * (1 + p * 3);
      });
    }
    if (satellite.current) {
      const a = t * 0.5;
      satellite.current.position.set(Math.cos(a) * 2.6, Math.sin(a) * 0.9, Math.sin(a) * 2.2);
    }
  });

  return (
    <group ref={group}>
      {/* Faceted shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshPhysicalMaterial
          color="#141416"
          metalness={0.35}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          flatShading
          transparent
          opacity={0.62}
          depthWrite={false}
          envMapIntensity={1.4}
        />
      </mesh>
      {/* Glowing core */}
      <mesh scale={0.72}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial ref={core} color={IGNITION} toneMapped={false} />
      </mesh>
      <pointLight ref={light} color={IGNITION} intensity={18} distance={8} decay={2} />

      {/* Orbital trajectory rings */}
      <group ref={rings}>
        {ringData.map((r) => (
          <group key={r.radius} rotation={r.tilt as unknown as THREE.Euler}>
            <mesh>
              <torusGeometry args={[r.radius, 0.006, 8, 220]} />
              <meshBasicMaterial color={BONE} transparent opacity={0.28} toneMapped={false} />
            </mesh>
          </group>
        ))}
      </group>
      <mesh ref={satellite}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={IGNITION} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function Hero3D({ onReady }: { onReady?: () => void }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const visibleRef = useRef(true);
  const invalidateRef = useRef<(() => void) | null>(null);

  // Scroll progress across the first viewport (0 → 1), read inside useFrame without re-rendering
  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pause rendering when the hero is off-screen or the tab is hidden
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = !!entry?.isIntersecting;
      if (visibleRef.current) invalidateRef.current?.();
    });
    io.observe(el);
    const onVisibility = () => {
      if (document.visibilityState === "visible" && visibleRef.current) invalidateRef.current?.();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={wrapper} className="size-full">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8.5], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop="demand"
        onCreated={({ invalidate }) => {
          invalidateRef.current = invalidate;
          onReady?.();
        }}
        aria-hidden="true"
      >
        <RenderLoop visibleRef={visibleRef} />
        <ambientLight intensity={0.15} />
        <directionalLight position={[4, 5, 3]} intensity={1.2} />
        <Core scrollRef={scrollRef} />
        <Environment resolution={128}>
          <Lightformer
            form="rect"
            intensity={2.5}
            position={[0, 4, -6]}
            scale={[10, 2, 1]}
            color="#f3f0ea"
          />
          <Lightformer
            form="rect"
            intensity={4}
            position={[-5, 0, 2]}
            rotation-y={Math.PI / 2}
            scale={[6, 1.5, 1]}
            color="#ff5a1f"
          />
          <Lightformer
            form="ring"
            intensity={1.5}
            position={[4, -2, 3]}
            scale={3}
            color="#f3f0ea"
          />
        </Environment>
      </Canvas>
    </div>
  );
}

/** Drives the "demand" frameloop only while visible: no GPU work when scrolled away or hidden. */
function RenderLoop({ visibleRef }: { visibleRef: React.RefObject<boolean> }) {
  useFrame(({ invalidate }) => {
    if (visibleRef.current && document.visibilityState === "visible") invalidate();
  });
  return null;
}
