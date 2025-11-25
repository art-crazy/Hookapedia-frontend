// Адаптивные размеры canvas
export const getCanvasSize = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return {
    width: isMobile ? Math.min(window.innerWidth - 40, 380) : 800,
    height: isMobile ? Math.min(window.innerHeight - 280, 480) : 600,
  };
};

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const PLAYER_SPEED = 5;
export const BULLET_SPEED = 7;
export const ENEMY_BULLET_SPEED = 4;
export const SHOOT_COOLDOWN = 250;
export const POWERUP_SPEED = 2;
export const POWERUP_SPAWN_CHANCE = 0.003; // Шанс спавна бонуса каждый фрейм (увеличен в 10 раз для заметности)

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
