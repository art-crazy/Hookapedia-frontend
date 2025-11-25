export interface Position {
  x: number;
  y: number;
}

export interface Bullet {
  x: number;
  y: number;
  speed: number;
  isEnemy?: boolean;
  isPowerful?: boolean;
}

export interface Enemy {
  x: number;
  y: number;
  type: 'bee' | 'butterfly' | 'boss';
  homeX: number;
  homeY: number;
  attacking: boolean;
  attackPath?: number;
  health: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export interface PowerUp {
  x: number;
  y: number;
  type: 'spread-shot';
  speed: number;
}

export type GameState = 'playing' | 'paused' | 'gameOver';

export type WeaponType = 'normal' | 'spread-shot';
