"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleNetwork() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    // ── Particles ─────────────────────────────────────────────────────────────
    const COUNT = 120;
    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 6;
      positions[i * 3] = basePositions[i * 3] = x;
      positions[i * 3 + 1] = basePositions[i * 3 + 1] = y;
      positions[i * 3 + 2] = basePositions[i * 3 + 2] = z;
      colors[i * 3] = 0;
      colors[i * 3 + 1] = 0.6 + Math.random() * 0.4;
      colors[i * 3 + 2] = 1;
    }

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pointMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
    });
    const pts = new THREE.Points(pointGeo, pointMat);

    // ── Line segments ─────────────────────────────────────────────────────────
    const maxEdges = COUNT * COUNT;
    const linePositions = new Float32Array(maxEdges * 6);
    const lineColors = new Float32Array(maxEdges * 6);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
    });
    const lineSegs = new THREE.LineSegments(lineGeo, lineMat);

    const group = new THREE.Group();
    group.add(pts, lineSegs);
    scene.add(group);

    // ── Mouse ─────────────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation ─────────────────────────────────────────────────────────────
    const CONNECTION_DIST = 2.5;
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const mx = mouse.x * 6;
      const my = mouse.y * 4;

      const pos = pointGeo.attributes.position.array as Float32Array;
      const col = pointGeo.attributes.color.array as Float32Array;

      for (let i = 0; i < COUNT; i++) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];
        pos[i * 3] = bx + Math.sin(t * 0.3 + i * 0.1) * 0.05 + mx * 0.02;
        pos[i * 3 + 1] = by + Math.cos(t * 0.4 + i * 0.15) * 0.05 + my * 0.02;
        pos[i * 3 + 2] = bz + Math.sin(t * 0.2 + i * 0.2) * 0.03;
        const dx = pos[i * 3] - mx;
        const dy = pos[i * 3 + 1] - my;
        const d2 = Math.sqrt(dx * dx + dy * dy);
        const glow = Math.max(0, 1 - d2 / 3);
        col[i * 3] = glow * 0.2;
        col[i * 3 + 1] = 0.5 + glow * 0.5;
        col[i * 3 + 2] = 0.9 + glow * 0.1;
      }
      pointGeo.attributes.position.needsUpdate = true;
      pointGeo.attributes.color.needsUpdate = true;

      let edgeCount = 0;
      const lPos = lineGeo.attributes.position.array as Float32Array;
      const lCol = lineGeo.attributes.color.array as Float32Array;
      for (let a = 0; a < COUNT; a++) {
        for (let b = a + 1; b < COUNT; b++) {
          const ddx = pos[a * 3] - pos[b * 3];
          const ddy = pos[a * 3 + 1] - pos[b * 3 + 1];
          const ddz = pos[a * 3 + 2] - pos[b * 3 + 2];
          const d = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);
          if (d < CONNECTION_DIST) {
            const alpha = 1 - d / CONNECTION_DIST;
            lPos[edgeCount * 6] = pos[a * 3];
            lPos[edgeCount * 6 + 1] = pos[a * 3 + 1];
            lPos[edgeCount * 6 + 2] = pos[a * 3 + 2];
            lPos[edgeCount * 6 + 3] = pos[b * 3];
            lPos[edgeCount * 6 + 4] = pos[b * 3 + 1];
            lPos[edgeCount * 6 + 5] = pos[b * 3 + 2];
            lCol[edgeCount * 6] = 0;
            lCol[edgeCount * 6 + 1] = alpha * 0.7;
            lCol[edgeCount * 6 + 2] = alpha * 0.9;
            lCol[edgeCount * 6 + 3] = 0;
            lCol[edgeCount * 6 + 4] = alpha * 0.7;
            lCol[edgeCount * 6 + 5] = alpha * 0.9;
            edgeCount++;
          }
        }
      }
      lineGeo.setDrawRange(0, edgeCount * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      group.rotation.y = t * 0.04;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      pointGeo.dispose();
      lineGeo.dispose();
      pointMat.dispose();
      lineMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
