"use client";

import { useEffect, useRef } from "react";

export default function BackgroundAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    let circuitLines = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCircuit();
    };

    // ── Circuit Board Lines ──
    const initCircuit = () => {
      circuitLines = [];
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          if (Math.random() > 0.6) {
            const horizontal = Math.random() > 0.5;
            const length = (Math.floor(Math.random() * 3) + 1) * gridSize;
            circuitLines.push({
              x,
              y,
              endX: horizontal ? x + length : x,
              endY: horizontal ? y : y + length,
              progress: 0,
              speed: Math.random() * 0.005 + 0.002,
              opacity: Math.random() * 0.08 + 0.02,
              hasDot: Math.random() > 0.5,
              dotPos: Math.random(),
            });
          }
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // ── Particles ──
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        baseOpacity: Math.random() * 0.5 + 0.15,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // ── Hexagonal Grid Nodes ──
    const hexNodes = [];
    const hexSize = 100;
    for (let row = 0; row < canvas.height / (hexSize * 0.866) + 1; row++) {
      for (let col = 0; col < canvas.width / (hexSize * 1.5) + 1; col++) {
        if (Math.random() > 0.7) {
          const x = col * hexSize * 1.5;
          const y = row * hexSize * 0.866 + (col % 2 ? hexSize * 0.433 : 0);
          hexNodes.push({
            x,
            y,
            pulseOffset: Math.random() * Math.PI * 2,
            size: Math.random() * 2 + 1,
          });
        }
      }
    }

    const handleMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse);

    // ── Draw Hexagon ──
    const drawHex = (cx, cy, size, opacity) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + size * Math.cos(angle);
        const py = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 180, 255, ${opacity})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Circuit Board ──
      for (const line of circuitLines) {
        line.progress += line.speed;
        if (line.progress > 1) line.progress = 0;

        const currentX = line.x + (line.endX - line.x) * Math.min(line.progress, 1);
        const currentY = line.y + (line.endY - line.y) * Math.min(line.progress, 1);

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = `rgba(0, 150, 255, ${line.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Node dots at intersections
        if (line.hasDot && line.progress > line.dotPos) {
          const dotX = line.x + (line.endX - line.x) * line.dotPos;
          const dotY = line.y + (line.endY - line.y) * line.dotPos;
          const pulse = Math.sin(time * 3 + line.dotPos * 10) * 0.5 + 0.5;

          ctx.beginPath();
          ctx.arc(dotX, dotY, 2 + pulse * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 200, 255, ${0.3 + pulse * 0.4})`;
          ctx.fill();

          // Glow
          ctx.beginPath();
          ctx.arc(dotX, dotY, 6 + pulse * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 150, 255, ${0.05 + pulse * 0.08})`;
          ctx.fill();
        }
      }

      // ── Hexagonal Grid ──
      for (const node of hexNodes) {
        const pulse = Math.sin(time * 2 + node.pulseOffset) * 0.5 + 0.5;
        drawHex(node.x, node.y, 15 + pulse * 5, 0.03 + pulse * 0.04);

        // Central dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * (0.5 + pulse * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 255, ${0.1 + pulse * 0.15})`;
        ctx.fill();
      }

      // ── Particle Connections ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const opacity = (1 - dist / 140) * 0.15;

            // Gradient connection line
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(0, 180, 255, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(0, 220, 255, ${opacity * 1.3})`);
            gradient.addColorStop(1, `rgba(0, 180, 255, ${opacity})`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // ── Particles ──
      for (const p of particles) {
        // Mouse attraction (opposite of repulsion -- particles glow near cursor)
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 250) {
          const force = (250 - dist) / 250;
          p.vx += (dx / dist) * force * -0.04;
          p.vy += (dy / dist) * force * -0.04;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) {
          p.vx = (p.vx / speed) * 1.2;
          p.vy = (p.vy / speed) * 1.2;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.5 + 0.5;
        const opacity = p.baseOpacity + pulse * 0.15;

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${opacity})`;
        ctx.fill();

        // Glow near mouse
        if (dist < 250) {
          const glowIntensity = (1 - dist / 250);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 180, 255, ${glowIntensity * 0.2})`;
          ctx.fill();

          // Bright core near mouse
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 220, 255, ${glowIntensity * 0.5})`;
          ctx.fill();
        }
      }

      // ── Scanning line ──
      const scanY = (Math.sin(time * 0.3) * 0.5 + 0.5) * canvas.height;
      const scanGradient = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      scanGradient.addColorStop(0, "rgba(0, 180, 255, 0)");
      scanGradient.addColorStop(0.5, "rgba(0, 180, 255, 0.06)");
      scanGradient.addColorStop(1, "rgba(0, 180, 255, 0)");
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 30, canvas.width, 60);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: 1 }}
    />
  );
}
