"use client";

import { useEffect, useRef } from "react";

const CollisionBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // --- Configuration ---
    const PARTICLE_COUNT = 30; // Fewer particles = better performance & cleaner look
    const RADIUS_MIN = 10;
    const RADIUS_MAX = 20; // Big enough to see the bounce
    const SPEED = 1.5;
    const COLORS = [
      "rgba(30, 41, 59, 0.8)",  // Slate 800
      "rgba(51, 65, 85, 0.8)",  // Slate 700
      "rgba(71, 85, 105, 0.8)", // Slate 600
      "rgba(59, 130, 246, 0.4)", // Blue 500 (Accent)
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // --- Physics Helpers ---
    const distance = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    /**
     * Rotates coordinate system for velocities
     * Takes velocities and alters them as if the coordinate system they're on was rotated
     */
    const rotate = (velocity: { x: number; y: number }, angle: number) => {
      return {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
      };
    };

    /**
     * Swaps two particles' velocities for elastic collision
     */
    const resolveCollision = (particle: Particle, otherParticle: Particle) => {
      const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
      const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

      const xDist = otherParticle.x - particle.x;
      const yDist = otherParticle.y - particle.y;

      // Prevent accidental overlap of particles
      if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2), y: u1.y };
        const v2 = { x: (u2.x * (m1 - m2) + 2 * m1 * u1.x) / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
      }
    };

    // --- Particle Class ---
    class Particle {
      x: number;
      y: number;
      velocity: { x: number; y: number };
      radius: number;
      color: string;
      mass: number;

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.velocity = {
          x: (Math.random() - 0.5) * SPEED,
          y: (Math.random() - 0.5) * SPEED,
        };
        this.radius = radius;
        this.color = color;
        this.mass = 1; // Assuming equal mass density, mass could be prop to radius, but 1 works for visuals
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "rgba(15, 23, 42, 0.5)"; // Dark border
        ctx.stroke();
        ctx.closePath();
      }

      update(particles: Particle[]) {
        this.draw();

        // 1. Move
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // 2. Wall Collisions
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas!.width) {
          this.velocity.x = -this.velocity.x;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas!.height) {
          this.velocity.y = -this.velocity.y;
        }

        // 3. Particle Collisions
        for (let i = 0; i < particles.length; i++) {
          if (this === particles[i]) continue; // Don't check self
          
          if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
            resolveCollision(this, particles[i]);
          }
        }
      }
    }

    // --- Initialization ---
    const init = () => {
      resize();
      particles = [];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const radius = Math.random() * (RADIUS_MAX - RADIUS_MIN) + RADIUS_MIN;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        // Random Position (ensure not spawning on top of each other or in walls)
        let x = Math.random() * (canvas!.width - radius * 2) + radius;
        let y = Math.random() * (canvas!.height - radius * 2) + radius;

        // Simple overlap prevention on spawn (checks previous particles)
        if (i !== 0) {
          for (let j = 0; j < particles.length; j++) {
            if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
              x = Math.random() * (canvas!.width - radius * 2) + radius;
              y = Math.random() * (canvas!.height - radius * 2) + radius;
              j = -1; // restart check
            }
          }
        }

        particles.push(new Particle(x, y, radius, color));
      }
    };

    // --- Animation Loop ---
    const animate = () => {
      if (!ctx || !canvas) return;
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(particles);
      });
    };

    window.addEventListener("resize", () => {
      resize();
      init(); // Re-init on resize to prevent squashing
    });

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-950 pointer-events-none"
    />
  );
};

export default CollisionBackground;