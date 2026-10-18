"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  pz: number;
}

export function CinematicWarp() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const numParticles = Math.min(220, Math.floor(window.innerWidth / 7));
    const particles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        pz: Math.random() * width,
      });
    }

    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      // Boost warp speed based on scroll velocity
      scrollSpeed = Math.min(Math.max(delta * 0.45, -35), 45);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let currentSpeed = 1.2;

    const render = () => {
      // Smooth dampening back to ambient cruising speed
      scrollSpeed *= 0.92;
      currentSpeed += (1.2 + scrollSpeed - currentSpeed) * 0.1;

      // Dark fade trail for cinematic motion blur
      ctx.fillStyle = "rgba(2, 6, 23, 0.22)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pz = p.z;
        p.z -= currentSpeed;

        if (p.z <= 1) {
          p.z = width;
          p.pz = width;
          p.x = (Math.random() - 0.5) * width * 2;
          p.y = (Math.random() - 0.5) * height * 2;
        } else if (p.z > width) {
          p.z = 2;
          p.pz = 2;
        }

        const k = 280 / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;

        const pk = 280 / p.pz;
        const prevX = p.x * pk + cx;
        const prevY = p.y * pk + cy;

        // Skip particles outside viewport
        if (px < 0 || px >= width || py < 0 || py >= height) continue;

        const alpha = Math.min(1, Math.max(0.1, (1 - p.z / width) * 0.85));
        const isStreaking = Math.abs(currentSpeed) > 4;

        ctx.beginPath();
        if (isStreaking) {
          // Draw cinematic streak line
          ctx.strokeStyle = `rgba(129, 140, 248, ${alpha * 0.8})`;
          ctx.lineWidth = Math.max(1, (1 - p.z / width) * 2.5);
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.stroke();
        } else {
          // Draw soft glowing point
          const radius = Math.max(0.75, (1 - p.z / width) * 2);
          ctx.fillStyle = i % 3 === 0 
            ? `rgba(6, 182, 212, ${alpha})` 
            : `rgba(165, 180, 252, ${alpha})`;
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-45 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
