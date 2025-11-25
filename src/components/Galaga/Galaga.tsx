'use client';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {X} from 'lucide-react';
import {Bullet, Enemy, GameState, Particle, Position, PowerUp, WeaponType} from './types';
import {
    BULLET_SPEED,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    ENEMY_BULLET_SPEED,
    ENEMY_POINTS,
    PLAYER_SPEED,
    POWERUP_SPAWN_CHANCE,
    POWERUP_SPEED,
    SHOOT_COOLDOWN
} from './constants';
import {drawEnemy, drawPlayer, drawPowerUp, drawStars} from './drawing';
import {checkCollision, createExplosion, initEnemies} from './gameLogic';
import {setupKeyboardControls} from './keyboard';

interface GalagaProps {
  onClose: () => void;
}

export const Galaga: React.FC<GalagaProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const keysPressed = useRef<Set<string>>(new Set());

  const [gameState, setGameState] = useState<GameState>('playing');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [weapon, setWeapon] = useState<WeaponType>('normal');

  const playerRef = useRef<Position>({ x: 400, y: 550 });
  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const gameTimeRef = useRef(0);
  const lastShotRef = useRef(0);

  // Initialize game
  useEffect(() => {
    enemiesRef.current = initEnemies(1);
    playerRef.current = { x: CANVAS_WIDTH / 2, y: 550 };
  }, []);

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
    drawStars(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, gameTimeRef.current);

    // Update player position
    const player = playerRef.current;
    if (keysPressed.current.has('arrowleft') || keysPressed.current.has('a')) {
      player.x = Math.max(20, player.x - PLAYER_SPEED);
    }
    if (keysPressed.current.has('arrowright') || keysPressed.current.has('d')) {
      player.x = Math.min(CANVAS_WIDTH - 20, player.x + PLAYER_SPEED);
    }

    // Shooting
    if (keysPressed.current.has(' ') || keysPressed.current.has('arrowup') || keysPressed.current.has('w')) {
      const now = Date.now();
      if (now - lastShotRef.current > SHOOT_COOLDOWN) {
        if (weapon === 'spread-shot') {
          // Triple shot spread
          bulletsRef.current.push(
            { x: player.x, y: player.y - 20, speed: BULLET_SPEED, isPowerful: true },
            { x: player.x - 10, y: player.y - 15, speed: BULLET_SPEED, isPowerful: true },
            { x: player.x + 10, y: player.y - 15, speed: BULLET_SPEED, isPowerful: true }
          );
        } else {
          // Normal shot
          bulletsRef.current.push({
            x: player.x,
            y: player.y - 20,
            speed: BULLET_SPEED,
          });
        }
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
      if (bullet.isEnemy) {
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Player bullets - more powerful ones are green
        ctx.fillStyle = bullet.isPowerful ? '#00ff64' : '#00ffff';
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.isPowerful ? 4 : 3, 0, Math.PI * 2);
        ctx.fill();

        // Add glow for powerful bullets
        if (bullet.isPowerful) {
          ctx.strokeStyle = '#00ff64';
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
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
            const points = ENEMY_POINTS[enemy.type];
            setScore((s) => s + points);
            const explosionColor = enemy.type === 'boss' ? '#ff0000' : '#ffff00';
            particlesRef.current.push(...createExplosion(enemy.x, enemy.y, explosionColor));
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
        // Reset weapon to normal when hit
        setWeapon('normal');
        particlesRef.current.push(...createExplosion(player.x, player.y, '#00ff00'));
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

    // Spawn power-ups randomly
    if (Math.random() < POWERUP_SPAWN_CHANCE && powerUpsRef.current.length === 0) {
      powerUpsRef.current.push({
        x: Math.random() * (CANVAS_WIDTH - 100) + 50,
        y: -20,
        type: 'spread-shot',
        speed: POWERUP_SPEED,
      });
    }

    // Update and draw power-ups
    powerUpsRef.current.forEach((powerUp, index) => {
      powerUp.y += powerUp.speed;

      // Draw power-up first
      drawPowerUp(ctx, powerUp, gameTimeRef.current);

      // Check collision with player
      if (checkCollision(powerUp.x, powerUp.y, player.x, player.y, 25)) {
        setWeapon('spread-shot');
        particlesRef.current.push(...createExplosion(powerUp.x, powerUp.y, '#FFD700'));
        powerUpsRef.current.splice(index, 1);
      }
    });

    // Remove power-ups that went off screen
    powerUpsRef.current = powerUpsRef.current.filter((powerUp) => powerUp.y < CANVAS_HEIGHT + 20);

    // Draw player
    drawPlayer(ctx, player.x, player.y);

    // Check level complete
    if (enemiesRef.current.length === 0) {
      setLevel((l) => {
        const newLevel = l + 1;
        enemiesRef.current = initEnemies(newLevel);
        return newLevel;
      });
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, level, weapon]);

  // Start game loop
  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, gameLoop]);

  // Keyboard controls
  useEffect(() => {
      return setupKeyboardControls(
        keysPressed.current,
        () => setGameState((s) => (s === 'playing' ? 'paused' : 'playing'))
    );
  }, []);

  const handleRestart = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    setWeapon('normal');
    setGameState('playing');
    bulletsRef.current = [];
    particlesRef.current = [];
    powerUpsRef.current = [];
    gameTimeRef.current = 0;
    enemiesRef.current = initEnemies(1);
    playerRef.current = { x: CANVAS_WIDTH / 2, y: 550 };
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
      <div className="relative flex flex-col items-center gap-4">
        {/* Game info and close button row */}
        <div className="w-full flex items-center justify-between">
          <div className="flex gap-8 text-white font-mono text-lg">
            <div>Очки: <span className="text-primary font-bold">{score}</span></div>
            <div>Жизни: <span className="text-green-500 font-bold">{lives}</span></div>
            <div>Уровень: <span className="text-yellow-500 font-bold">{level}</span></div>
            {weapon === 'spread-shot' && (
              <div className="flex items-center gap-2">
                <span className="text-green-400">⚡ Тройной выстрел</span>
              </div>
            )}
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
              <h2 className="text-4xl font-bold text-primary mb-4">Игра окончена</h2>
              <p className="text-2xl text-white mb-2">Финальный счёт: {score}</p>
              <p className="text-xl text-gray-400 mb-6">Уровень: {level}</p>
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-bold rounded-lg transition-colors"
              >
                Играть снова
              </button>
            </div>
          </div>
        )}

        {/* Paused overlay */}
        {gameState === 'paused' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-yellow-500 mb-4">Пауза</h2>
              <p className="text-xl text-gray-400">Нажмите ESC для продолжения</p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="text-center text-sm text-gray-400 font-mono mt-2">
          <p>A/D или стрелки: Движение | W/Пробел: Стрельба | ESC: Пауза</p>
        </div>
      </div>
    </div>
  );
};
