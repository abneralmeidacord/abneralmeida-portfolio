import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import "./SkillsGlobe.css";

function fibonacciSphere(n, radius) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius);
  });
}

const ICON_PX = 40;
const RADIUS = 3.3;
const DRAG_THRESHOLD = 6;
const UNMOUNT_DELAY_MS = 1500;

const _world = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _camDir = new THREE.Vector3();
const _ndc = new THREE.Vector3();
const _view = new THREE.Vector3();

function Globe({ count, radius, accent, background, items, motion, light }) {
  const group = useRef(null);
  const points = useMemo(() => fibonacciSphere(count, radius), [count, radius]);
  const shell = radius * 0.85;
  const iconWorld = THREE.MathUtils.clamp((radius * 0.8) / Math.sqrt(count), 0.32, 0.6);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const { camera } = state;
    const { width, height } = state.size;

    if (motion) g.rotation.y += delta * 0.06;
    g.updateWorldMatrix(true, false);
    camera.updateMatrixWorld();
    _camDir.copy(camera.position).normalize();
    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);

    points.forEach((p, i) => {
      const el = items.current[i];
      if (!el) return;
      _world.copy(p).applyMatrix4(g.matrixWorld);

      const t = THREE.MathUtils.clamp((_dir.copy(_world).normalize().dot(_camDir) - 0.1) * 2, 0, 1);

      _ndc.copy(_world).project(camera);
      const x = (_ndc.x + 1) * 0.5 * width;
      const y = (1 - _ndc.y) * 0.5 * height;
      const depth = -_view.copy(_world).applyMatrix4(camera.matrixWorldInverse).z;
      const pxPerUnit = height / (2 * tanHalfFov * depth); // perspectiva: longe = menor
      const scale = ((iconWorld * pxPerUnit) / ICON_PX) * (0.8 + 0.4 * t);

      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
      el.style.opacity = String(t);
      el.style.zIndex = String(Math.round(t * 100));
      el.style.pointerEvents = t > 0.8 ? "auto" : "none";
      el.style.visibility = t < 0.02 ? "hidden" : "visible";
    });
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[shell, 2]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={light ? 0.35 : 0.1} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[shell, 2]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={light ? 0.1 : 0.03} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[shell * 0.98, 32, 32]} />
        <meshBasicMaterial
          color={background}
          transparent
          opacity={light ? 0.25 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[shell * 1.035, 32, 32]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function FitCamera({ radius }) {
  const camera = useThree((s) => s.camera);
  const aspect = useThree((s) => s.size.width / s.size.height);

  useLayoutEffect(() => {
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    camera.position.setLength(radius / Math.sin(Math.min(vFov, hFov) / 2));
  }, [camera, aspect, radius]);

  return null;
}

const readToken = (el, name, fallback) =>
  getComputedStyle(el).getPropertyValue(name).trim() || fallback;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

class GlobeBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p className="skills-globe__fallback">{this.props.label}</p> : this.props.children; }
}

export default function SkillsGlobe({ skills, hint, pauseLabel, resumeLabel, unavailableLabel }) {
  const container = useRef(null);
  const items = useRef([]);
  const dragStart = useRef(null);
  const [colors] = useState(() => ({
    accent: readToken(document.documentElement, "--color-primary", ""),
    bg: readToken(document.documentElement, "--color-surface", ""),
  }));
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const [motion, setMotion] = useState(() => !prefersReducedMotion());
  const light = true;

  useEffect(() => {
    const el = container.current;
    if (!el || !("IntersectionObserver" in window)) return;
    let timer;
    const io = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timer);
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
        else timer = setTimeout(() => setMounted(false), UNMOUNT_DELAY_MS);
      },
      { root: null, rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  const onPointerDown = (e) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
  };
  const onClickCapture = (e) => {
    const start = dragStart.current;
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="skills-globe">
      <div
        ref={container}
        className="skills-globe__stage"
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
      >
        {mounted && (
          <GlobeBoundary label={unavailableLabel}><Canvas
            eventSource={container}
            frameloop={visible ? "always" : "never"}
            camera={{ position: [0, 0, 9], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true }}
          >
            {!light && <fog attach="fog" args={[colors.bg, 10, 25]} />}
            <FitCamera radius={RADIUS * 1.2} />
            <Float
              speed={motion ? 1 : 0}
              rotationIntensity={motion ? 0.2 : 0}
              floatIntensity={motion ? 0.2 : 0}
            >
              <Globe
                count={skills.length}
                radius={RADIUS}
                accent={colors.accent}
                background={colors.bg}
                items={items}
                motion={motion}
                light={light}

              />
            </Float>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={motion}
              autoRotateSpeed={0.8}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas></GlobeBoundary>
        )}

        <ul className="skills-globe__layer">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <li key={skill.name} className="skills-globe__li">
                <a
                  ref={(el) => {
                    items.current[i] = el;
                  }}
                  className="skills-globe__item"
                  style={{ "--skill": skill.color }}
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  aria-label={skill.name}
                >
                  <Icon className="skills-globe__icon" aria-hidden="true" />
                  <span className="skills-globe__label">{skill.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="skills-globe__hint">{hint}</p>
      <button className="skills-globe__pause" onClick={() => setMotion(!motion)} aria-pressed={!motion}>{motion ? pauseLabel : resumeLabel}</button>
    </div>
  );
}
