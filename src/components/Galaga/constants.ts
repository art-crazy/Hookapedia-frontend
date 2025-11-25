export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const PLAYER_SPEED = 5;
export const BULLET_SPEED = 7;
export const ENEMY_BULLET_SPEED = 4;
export const SHOOT_COOLDOWN = 250;

export const ENEMY_POINTS = {
  boss: 150,
  butterfly: 80,
  bee: 50,
} as const;

export const ENEMY_COLORS = {
  boss: '#ff0000',
  butterfly: '#ffff00',
  bee: '#ff00ff',
} as const;
