"use client";

import { useEffect, useRef } from "react";

export default function ResumeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    let time = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // ── Particles ──
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.2 + 0.3,
        baseOpacity: Math.random() * 0.3 + 0.08,
        pulseSpeed: Math.random() * 1.5 + 0.5,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // ── Circuit Lines ──
    const circuitLines = [];
    const gridSize = 80;
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        if (Math.random() > 0.7) {
          const horizontal = Math.random() > 0.5;
          const length = (Math.floor(Math.random() * 3) + 1) * gridSize;
          circuitLines.push({
            x, y,
            endX: horizontal ? x + length : x,
            endY: horizontal ? y : y + length,
            progress: 0,
            speed: Math.random() * 0.004 + 0.001,
            opacity: Math.random() * 0.06 + 0.01,
            hasDot: Math.random() > 0.5,
            dotPos: Math.random(),
          });
        }
      }
    }

    // ── Floating Orbs ──
    const orbs = [];
    for (let i = 0; i < 3; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 100 + Math.random() * 150,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.08,
        opacity: 0.012 + Math.random() * 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // ── Hex Nodes ──
    const hexNodes = [];
    const hexSize = 120;
    for (let row = 0; row < canvas.height / (hexSize * 0.866) + 1; row++) {
      for (let col = 0; col < canvas.width / (hexSize * 1.5) + 1; col++) {
        if (Math.random() > 0.75) {
          hexNodes.push({
            x: col * hexSize * 1.5,
            y: row * hexSize * 0.866 + (col % 2 ? hexSize * 0.433 : 0),
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
      ctx.strokeStyle = `rgba(0, 150, 255, ${opacity})`;
      ctx.lineWidth = 0.4;
      ctx.stroke();
    };

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Floating Orbs ──
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        const pulse = Math.sin(time * 0.3 + orb.pulseOffset) * 0.5 + 0.5;
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, `rgba(0, 136, 255, ${orb.opacity * (0.8 + pulse * 0.4)})`);
        gradient.addColorStop(0.5, `rgba(0, 100, 200, ${orb.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(0, 50, 100, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(orb.x - orb.radius, orb.y - orb.radius, orb.radius * 2, orb.radius * 2);
      }

      // ── Circuit Lines ──
      for (const line of circuitLines) {
        line.progress += line.speed;
        if (line.progress > 1) line.progress = 0;

        const currentX = line.x + (line.endX - line.x) * Math.min(line.progress, 1);
        const currentY = line.y + (line.endY - line.y) * Math.min(line.progress, 1);

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = `rgba(0, 136, 255, ${line.opacity})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        if (line.hasDot && line.progress > line.dotPos) {
          const dotX = line.x + (line.endX - line.x) * line.dotPos;
          const dotY = line.y + (line.endY - line.y) * line.dotPos;
          const pulse = Math.sin(time * 3 + line.dotPos * 10) * 0.5 + 0.5;

          ctx.beginPath();
          ctx.arc(dotX, dotY, 1.5 + pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 200, 255, ${0.25 + pulse * 0.3})`;
          ctx.fill();
        }
      }

      // ── Hex Grid ──
      for (const node of hexNodes) {
        const pulse = Math.sin(time * 1.5 + node.pulseOffset) * 0.5 + 0.5;
        drawHex(node.x, node.y, 18 + pulse * 5, 0.02 + pulse * 0.02);
      }

      // ── Connections ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.1;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 150, 255, ${opacity})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // ── Particles ──
      for (const p of particles) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const force = (200 - dist) / 200;
          p.vx += (dx / dist) * force * -0.03;
          p.vy += (dy / dist) * force * -0.03;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.5 + 0.5;
        const opacity = p.baseOpacity * (0.6 + pulse * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 190, 255, ${opacity})`;
        ctx.fill();

        if (dist < 200) {
          const glowIntensity = (1 - dist / 200) * 0.12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 150, 255, ${glowIntensity})`;
          ctx.fill();
        }
      }

      // ── Scan line ──
      const scanY = (Math.sin(time * 0.2) * 0.5 + 0.5) * canvas.height;
      const scanGradient = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      scanGradient.addColorStop(0, "rgba(0, 136, 255, 0)");
      scanGradient.addColorStop(0.5, "rgba(0, 136, 255, 0.02)");
      scanGradient.addColorStop(1, "rgba(0, 136, 255, 0)");
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 40, canvas.width, 80);

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
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
