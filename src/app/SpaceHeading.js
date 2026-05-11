"use client";

import { useEffect, useRef } from "react";

export default function SpaceHeading() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;
    let particles = [];
    let shootingStars = [];
    let dustParticles = [];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize);

    const centerX = () => canvas.width / 2;
    const centerY = () => canvas.height / 2;

    // ── Orbiting Particles ──
    const orbitCount = 60;
    for (let i = 0; i < orbitCount; i++) {
      const orbitIndex = Math.floor(i / 15);
      const baseRadius = 120 + orbitIndex * 70;
      particles.push({
        angle: (i / orbitCount) * Math.PI * 2 + Math.random() * 0.5,
        radius: baseRadius + Math.random() * 30,
        speed: (0.003 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        orbitTilt: (Math.random() - 0.5) * 0.4,
        verticalOffset: (Math.random() - 0.5) * 40,
        glowSize: Math.random() * 6 + 3,
        pulseSpeed: Math.random() * 2 + 1,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // ── Dust Particles (tiny scattered) ──
    for (let i = 0; i < 40; i++) {
      dustParticles.push({
        x: Math.random() * 1000 - 500,
        y: Math.random() * 400 - 200,
        size: Math.random() * 1 + 0.2,
        opacity: Math.random() * 0.3 + 0.05,
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: (Math.random() - 0.5) * 0.1,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // ── Shooting Stars ──
    const spawnShootingStar = () => {
      if (shootingStars.length > 3) return;
      const startX = (Math.random() - 0.5) * canvas.width * 1.5;
      const startY = (Math.random() - 0.5) * canvas.height * 0.8;
      const angle = Math.random() * Math.PI * 0.5 + Math.PI * 0.25;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * (3 + Math.random() * 4),
        vy: Math.sin(angle) * (2 + Math.random() * 3),
        length: 30 + Math.random() * 50,
        opacity: 0.6 + Math.random() * 0.4,
        life: 1,
        decay: 0.01 + Math.random() * 0.01,
      });
    };

    // ── Orbit Connection Lines (elliptical paths) ──
    const drawOrbitPath = (cx, cy, radius, tilt, opacity) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.3 + Math.abs(tilt));
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 136, 255, ${opacity})`;
      ctx.lineWidth = 0.3;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    };

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = centerX();
      const cy = centerY();

      // ── Orbit Path Lines ──
      for (let i = 0; i < 4; i++) {
        const r = 120 + i * 70;
        const opacity = 0.04 - i * 0.005;
        drawOrbitPath(cx, cy, r, 0.3 + i * 0.05, opacity);
      }

      // ── Glowing Orbital Rings ──
      for (let i = 0; i < 3; i++) {
        const r = 140 + i * 80;
        const pulse = Math.sin(time * 0.5 + i * 2) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * (0.3 + i * 0.05), 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 150, 255, ${0.02 + pulse * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── Dust Particles ──
      for (const d of dustParticles) {
        d.x += d.driftX;
        d.y += d.driftY;
        if (Math.abs(d.x) > 500) d.driftX *= -1;
        if (Math.abs(d.y) > 200) d.driftY *= -1;

        const pulse = Math.sin(time * 1.5 + d.pulseOffset) * 0.5 + 0.5;
        const x = cx + d.x;
        const y = cy + d.y;

        ctx.beginPath();
        ctx.arc(x, y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 180, 255, ${d.opacity * (0.5 + pulse * 0.5)})`;
        ctx.fill();
      }

      // ── Orbiting Particles ──
      for (const p of particles) {
        p.angle += p.speed;

        const x = cx + Math.cos(p.angle) * p.radius;
        const rawY = Math.sin(p.angle) * p.radius * (0.3 + Math.abs(p.orbitTilt));
        const y = cy + rawY + p.verticalOffset * Math.sin(time * 0.5 + p.pulseOffset);

        const depth = Math.sin(p.angle);
        const depthScale = 0.5 + (depth + 1) * 0.35;
        const depthOpacity = 0.2 + (depth + 1) * 0.4;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.5 + 0.5;
        const finalOpacity = p.opacity * depthOpacity * (0.7 + pulse * 0.3);
        const finalSize = p.size * depthScale;

        // Trail
        const trailLength = 6;
        for (let t = 1; t <= trailLength; t++) {
          const trailAngle = p.angle - p.speed * t * 3;
          const tx = cx + Math.cos(trailAngle) * p.radius;
          const ty = cy + Math.sin(trailAngle) * p.radius * (0.3 + Math.abs(p.orbitTilt)) + p.verticalOffset * Math.sin((time - t * 0.016) * 0.5 + p.pulseOffset);
          ctx.beginPath();
          ctx.arc(tx, ty, finalSize * (1 - t / trailLength) * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 180, 255, ${finalOpacity * (1 - t / trailLength) * 0.3})`;
          ctx.fill();
        }

        // Core glow
        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(x, y, finalSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 150, 255, ${finalOpacity * 0.08})`;
          ctx.fill();
        }

        // Particle
        ctx.beginPath();
        ctx.arc(x, y, finalSize, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, finalSize);
        gradient.addColorStop(0, `rgba(0, 220, 255, ${finalOpacity})`);
        gradient.addColorStop(1, `rgba(0, 120, 255, ${finalOpacity * 0.3})`);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Connection lines between nearby particles
        for (const other of particles) {
          if (other === p) continue;
          const dx = x - (cx + Math.cos(other.angle) * other.radius);
          const dy = y - (cy + Math.sin(other.angle) * other.radius * (0.3 + Math.abs(other.orbitTilt)));
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 150, 255, ${(1 - dist / 60) * 0.08})`;
            ctx.lineWidth = 0.3;
            ctx.moveTo(x, y);
            ctx.lineTo(
              cx + Math.cos(other.angle) * other.radius,
              cy + Math.sin(other.angle) * other.radius * (0.3 + Math.abs(other.orbitTilt))
            );
            ctx.stroke();
          }
        }
      }

      // ── Shooting Stars ──
      if (Math.random() > 0.992) spawnShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;

        if (s.life <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const endX = s.x - s.vx * (s.length / 5);
        const endY = s.y - s.vy * (s.length / 5);

        const gradient = ctx.createLinearGradient(s.x, s.y, endX, endY);
        gradient.addColorStop(0, `rgba(150, 220, 255, ${s.life * s.opacity})`);
        gradient.addColorStop(1, `rgba(0, 100, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 240, 255, ${s.life * s.opacity})`;
        ctx.fill();
      }

      // ── Central Glow (behind text) ──
      const centralPulse = Math.sin(time * 0.8) * 0.5 + 0.5;
      const centralGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100 + centralPulse * 30);
      centralGradient.addColorStop(0, `rgba(0, 136, 255, ${0.06 + centralPulse * 0.03})`);
      centralGradient.addColorStop(0.5, `rgba(0, 100, 200, ${0.02 + centralPulse * 0.01})`);
      centralGradient.addColorStop(1, `rgba(0, 50, 100, 0)`);
      ctx.fillStyle = centralGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
