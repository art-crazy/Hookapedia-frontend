export interface Position {
  x: number;
  y: number;
}

export interface Bullet {
  x: number;
  y: number;
  speed: number;
  isEnemy?: boolean;
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

export type GameState = 'playing' | 'paused' | 'gameOver';
