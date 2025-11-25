import { Enemy } from './types';
import { ENEMY_COLORS } from './constants';

// Draw player ship - classic pixel airplane
export const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
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
export const drawEnemy = (ctx: CanvasRenderingContext2D, enemy: Enemy, time: number) => {
  const wingOffset = Math.sin(time * 0.1) * 3;

  ctx.fillStyle = ENEMY_COLORS[enemy.type];
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

// Draw stars background
export const drawStars = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, gameTime: number) => {
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 50; i++) {
    const x = (i * 47) % canvasWidth;
    const y = (i * 73 + gameTime * 0.5) % canvasHeight;
    ctx.fillRect(x, y, 1, 1);
  }
};
