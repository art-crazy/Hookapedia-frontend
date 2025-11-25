import { Enemy, Particle } from './types';
import { CANVAS_WIDTH } from './constants';

// Initialize enemy formation
export const initEnemies = (): Enemy[] => {
  const enemies: Enemy[] = [];
  const rows = 5;
  const cols = 10;
  const spacing = 60;
  const startX = (CANVAS_WIDTH - cols * spacing) / 2;
  const startY = 80;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let type: 'bee' | 'butterfly' | 'boss';
      let health: number;

      if (row === 0) {
        type = 'boss';
        health = 3;
      } else if (row <= 2) {
        type = 'butterfly';
        health = 2;
      } else {
        type = 'bee';
        health = 1;
      }

      enemies.push({
        x: startX + col * spacing,
        y: startY + row * spacing,
        homeX: startX + col * spacing,
        homeY: startY + row * spacing,
        type,
        attacking: false,
        health,
      });
    }
  }
  return enemies;
};

// Create explosion particles
export const createExplosion = (x: number, y: number, color: string): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < 15; i++) {
    const angle = (Math.PI * 2 * i) / 15;
    const speed = Math.random() * 3 + 2;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 30,
      color,
    });
  }
  return particles;
};

// Collision detection
export const checkCollision = (x1: number, y1: number, x2: number, y2: number, distance: number): boolean => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy) < distance;
};
