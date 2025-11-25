'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface Bullet {
  x: number;
  y: number;
  speed: number;
  isEnemy?: boolean;
}

interface Enemy {
  x: number;
  y: number;
  type: 'bee' | 'butterfly' | 'boss';
  homeX: number;
  homeY: number;
  attacking: boolean;
  attackPath?: number;
  health: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface GalagaProps {
  onClose: () => void;
}

export const Galaga: React.FC<GalagaProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const keysPressed = useRef<Set<string>>(new Set());

  const [gameState, setGameState] = useState<'playing' | 'paused' | 'gameOver'>('playing');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);

  const playerRef = useRef<Position>({ x: 400, y: 550 });
  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const gameTimeRef = useRef(0);
  const lastShotRef = useRef(0);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const PLAYER_SPEED = 5;
  const BULLET_SPEED = 7;
  const ENEMY_BULLET_SPEED = 4;
  const SHOOT_COOLDOWN = 250;

  // Initialize enemy formation
  const initEnemies = useCallback(() => {
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
    enemiesRef.current = enemies;
  }, []);

  // Create explosion particles
  const createExplosion = (x: number, y: number, color: string) => {
    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 * i) / 15;
      const speed = Math.random() * 3 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 30,
        color,
      });
    }
  };

  // Draw player ship - classic pixel airplane
  const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const pixelSize = 2;
    const drawPixel = (px: number, py: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x + px * pixelSize, y + py * pixelSize, pixelSize, pixelSize);
    };

    // Pixel art pattern for classic airplane
    // Nose (red)
    drawPixel(0, -8, '#ff0000');

    // Cockpit (cyan)
    drawPixel(-1, -7, '#00ffff');
    drawPixel(0, -7, '#00ffff');
    drawPixel(1, -7, '#00ffff');

    // Body (silver/white)
    drawPixel(-1, -6, '#e0e0e0');
    drawPixel(0, -6, '#ffffff');
    drawPixel(1, -6, '#e0e0e0');

    drawPixel(-1, -5, '#c0c0c0');
    drawPixel(0, -5, '#ffffff');
    drawPixel(1, -5, '#c0c0c0');

    drawPixel(-1, -4, '#e0e0e0');
    drawPixel(0, -4, '#ffffff');
    drawPixel(1, -4, '#e0e0e0');

    // Wings (yellow/gold)
    drawPixel(-6, -3, '#ffaa00');
    drawPixel(-5, -3, '#ffcc00');
    drawPixel(-4, -3, '#ffcc00');
    drawPixel(-3, -3, '#ffcc00');
    drawPixel(-2, -3, '#ffcc00');
    drawPixel(-1, -3, '#ffcc00');
    drawPixel(0, -3, '#ffffff');
    drawPixel(1, -3, '#ffcc00');
    drawPixel(2, -3, '#ffcc00');
    drawPixel(3, -3, '#ffcc00');
    drawPixel(4, -3, '#ffcc00');
    drawPixel(5, -3, '#ffcc00');
    drawPixel(6, -3, '#ffaa00');

    // Body mid section
    drawPixel(-2, -2, '#ffcc00');
    drawPixel(-1, -2, '#c0c0c0');
    drawPixel(0, -2, '#ffffff');
    drawPixel(1, -2, '#c0c0c0');
    drawPixel(2, -2, '#ffcc00');

    drawPixel(-1, -1, '#e0e0e0');
    drawPixel(0, -1, '#ffffff');
    drawPixel(1, -1, '#e0e0e0');

    drawPixel(-1, 0, '#c0c0c0');
    drawPixel(0, 0, '#ffffff');
    drawPixel(1, 0, '#c0c0c0');

    // Tail section
    drawPixel(-2, 1, '#ffaa00');
    drawPixel(-1, 1, '#e0e0e0');
    drawPixel(0, 1, '#ffffff');
    drawPixel(1, 1, '#e0e0e0');
    drawPixel(2, 1, '#ffaa00');

    // Tail wings
    drawPixel(-3, 2, '#ffaa00');
    drawPixel(-2, 2, '#ffcc00');
    drawPixel(-1, 2, '#c0c0c0');
    drawPixel(0, 2, '#ffffff');
    drawPixel(1, 2, '#c0c0c0');
    drawPixel(2, 2, '#ffcc00');
    drawPixel(3, 2, '#ffaa00');

    // Engine exhaust (blue)
    drawPixel(-1, 3, '#0088ff');
    drawPixel(0, 3, '#00aaff');
    drawPixel(1, 3, '#0088ff');
  };

  // Draw enemy
  const drawEnemy = (ctx: CanvasRenderingContext2D, enemy: Enemy, time: number) => {
    const colors = {
      boss: '#ff0000',
      butterfly: '#ffff00',
      bee: '#ff00ff',
    };

    const wingOffset = Math.sin(time * 0.1) * 3;

    ctx.fillStyle = colors[enemy.type];
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;

    if (enemy.type === 'boss') {
      // Boss ship - larger
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Wings
      ctx.fillStyle = '#aa0000';
      ctx.fillRect(enemy.x - 18, enemy.y - 3, 8, 6);
      ctx.fillRect(enemy.x + 10, enemy.y - 3, 8, 6);
    } else if (enemy.type === 'butterfly') {
      // Butterfly
      ctx.beginPath();
      ctx.ellipse(enemy.x, enemy.y, 10, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Animated wings
      ctx.fillStyle = '#aaaa00';
      ctx.beginPath();
      ctx.ellipse(enemy.x - 10, enemy.y, 5, 8 + wingOffset, 0, 0, Math.PI * 2);
      ctx.ellipse(enemy.x + 10, enemy.y, 5, 8 + wingOffset, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Bee
      ctx.beginPath();
      ctx.ellipse(enemy.x, enemy.y, 8, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Stripes
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(enemy.x - 8, enemy.y - 3);
      ctx.lineTo(enemy.x + 8, enemy.y - 3);
      ctx.moveTo(enemy.x - 8, enemy.y + 3);
      ctx.lineTo(enemy.x + 8, enemy.y + 3);
      ctx.stroke();
    }
  };

  // Collision detection
  const checkCollision = (x1: number, y1: number, x2: number, y2: number, distance: number) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy) < distance;
  };

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameState !== 'playing') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    gameTimeRef.current += 1;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw stars background
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 50; i++) {
      const x = (i * 47) % CANVAS_WIDTH;
      const y = (i * 73 + gameTimeRef.current * 0.5) % CANVAS_HEIGHT;
      ctx.fillRect(x, y, 1, 1);
    }

    // Update player position
    const player = playerRef.current;
    if (keysPressed.current.has('ArrowLeft') || keysPressed.current.has('a') || keysPressed.current.has('A')) {
      player.x = Math.max(20, player.x - PLAYER_SPEED);
    }
    if (keysPressed.current.has('ArrowRight') || keysPressed.current.has('d') || keysPressed.current.has('D')) {
      player.x = Math.min(CANVAS_WIDTH - 20, player.x + PLAYER_SPEED);
    }

    // Shooting
    if (keysPressed.current.has(' ') || keysPressed.current.has('ArrowUp') || keysPressed.current.has('w') || keysPressed.current.has('W')) {
      const now = Date.now();
      if (now - lastShotRef.current > SHOOT_COOLDOWN) {
        bulletsRef.current.push({
          x: player.x,
          y: player.y - 20,
          speed: BULLET_SPEED,
        });
        lastShotRef.current = now;
      }
    }

    // Update bullets
    bulletsRef.current = bulletsRef.current.filter((bullet) => {
      if (bullet.isEnemy) {
        bullet.y += bullet.speed;
        return bullet.y < CANVAS_HEIGHT;
      } else {
        bullet.y -= bullet.speed;
        return bullet.y > 0;
      }
    });

    // Draw bullets
    bulletsRef.current.forEach((bullet) => {
      ctx.fillStyle = bullet.isEnemy ? '#ff0000' : '#00ffff';
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Enemy movement and attacks
    enemiesRef.current.forEach((enemy) => {
      if (!enemy.attacking) {
        // Idle formation movement
        const sway = Math.sin(gameTimeRef.current * 0.02 + enemy.homeX * 0.01) * 2;
        enemy.x = enemy.homeX + sway;

        // Random attack
        if (Math.random() < 0.0005 * level) {
          enemy.attacking = true;
          enemy.attackPath = Math.random();
        }

        // Random shooting
        if (Math.random() < 0.002 * level) {
          bulletsRef.current.push({
            x: enemy.x,
            y: enemy.y + 10,
            speed: ENEMY_BULLET_SPEED,
            isEnemy: true,
          });
        }
      } else {
        // Attack dive
        const attackProgress = (gameTimeRef.current % 200) / 200;
        const curve = Math.sin(attackProgress * Math.PI * 2) * 100;
        enemy.x = enemy.homeX + curve * (enemy.attackPath! - 0.5) * 2;
        enemy.y = enemy.homeY + attackProgress * 400;

        if (attackProgress > 0.9) {
          enemy.attacking = false;
          enemy.y = enemy.homeY;
        }
      }

      drawEnemy(ctx, enemy, gameTimeRef.current);
    });

    // Check bullet-enemy collisions
    for (let i = bulletsRef.current.length - 1; i >= 0; i--) {
      const bullet = bulletsRef.current[i];
      if (bullet.isEnemy) continue;

      for (let j = enemiesRef.current.length - 1; j >= 0; j--) {
        const enemy = enemiesRef.current[j];
        if (checkCollision(bullet.x, bullet.y, enemy.x, enemy.y, 15)) {
          enemy.health--;

          if (enemy.health <= 0) {
            const points = enemy.type === 'boss' ? 150 : enemy.type === 'butterfly' ? 80 : 50;
            setScore((s) => s + points);
            createExplosion(enemy.x, enemy.y, enemy.type === 'boss' ? '#ff0000' : '#ffff00');
            enemiesRef.current.splice(j, 1);
          }

          bulletsRef.current.splice(i, 1);
          break;
        }
      }
    }

    // Check enemy bullet-player collisions
    for (let i = bulletsRef.current.length - 1; i >= 0; i--) {
      const bullet = bulletsRef.current[i];
      if (!bullet.isEnemy) continue;

      if (checkCollision(bullet.x, bullet.y, player.x, player.y, 20)) {
        setLives((l) => {
          const newLives = l - 1;
          if (newLives <= 0) {
            setGameState('gameOver');
          }
          return newLives;
        });
        createExplosion(player.x, player.y, '#00ff00');
        bulletsRef.current.splice(i, 1);
        player.x = CANVAS_WIDTH / 2;
        player.y = 550;
      }
    }

    // Update particles
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life / 30;
      ctx.fillRect(p.x, p.y, 3, 3);
      ctx.globalAlpha = 1;

      return p.life > 0;
    });

    // Draw player
    drawPlayer(ctx, player.x, player.y);

    // Check level complete
    if (enemiesRef.current.length === 0) {
      setLevel((l) => l + 1);
      initEnemies();
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, level, initEnemies]);

  // Initialize game
  useEffect(() => {
    initEnemies();
    playerRef.current = { x: CANVAS_WIDTH / 2, y: 550 };
  }, [initEnemies]);

  // Start game loop
  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, gameLoop]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' ', 'a', 'A', 'd', 'D', 'w', 'W'].includes(e.key)) {
        e.preventDefault();
        keysPressed.current.add(e.key);
      }
      if (e.key === 'Escape') {
        setGameState((s) => (s === 'playing' ? 'paused' : 'playing'));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleRestart = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameState('playing');
    bulletsRef.current = [];
    particlesRef.current = [];
    gameTimeRef.current = 0;
    initEnemies();
    playerRef.current = { x: CANVAS_WIDTH / 2, y: 550 };
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
      <div className="relative flex flex-col items-center gap-4">
        {/* Game info and close button row */}
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-8 text-white font-mono text-lg">
            <div>Score: <span className="text-primary font-bold">{score}</span></div>
            <div>Lives: <span className="text-green-500 font-bold">{lives}</span></div>
            <div>Level: <span className="text-yellow-500 font-bold">{level}</span></div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-primary transition-colors cursor-pointer"
            aria-label="Close game"
          >
            <X size={32} />
          </button>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-4 border-primary rounded-lg shadow-[0_0_30px_rgba(225,29,72,0.5)]"
        />

        {/* Game Over overlay */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-primary mb-4">Game Over</h2>
              <p className="text-2xl text-white mb-2">Final Score: {score}</p>
              <p className="text-xl text-gray-400 mb-6">Level: {level}</p>
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-bold rounded-lg transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Paused overlay */}
        {gameState === 'paused' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-yellow-500 mb-4">Paused</h2>
              <p className="text-xl text-gray-400">Press ESC to continue</p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="text-center text-sm text-gray-400 font-mono mt-2">
          <p>A/D or Arrow Keys: Move | W/Space: Shoot | ESC: Pause</p>
        </div>
      </div>
    </div>
  );
};
