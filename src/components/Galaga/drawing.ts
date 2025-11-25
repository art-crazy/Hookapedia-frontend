import { Enemy, PowerUp } from './types';
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

// Draw power-up
export const drawPowerUp = (ctx: CanvasRenderingContext2D, powerUp: PowerUp, gameTime: number) => {
  const pulse = Math.sin(gameTime * 0.15) * 0.3 + 1;
  const rotation = gameTime * 0.02;
  const size = 16 * pulse;

  ctx.save();
  ctx.translate(powerUp.x, powerUp.y);
  ctx.rotate(rotation);

  // Outer glow (золотое свечение)
  const outerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 3);
  outerGlow.addColorStop(0, 'rgba(255, 215, 0, 0.6)');
  outerGlow.addColorStop(0.4, 'rgba(255, 165, 0, 0.4)');
  outerGlow.addColorStop(1, 'rgba(255, 215, 0, 0)');
  ctx.fillStyle = outerGlow;
  ctx.fillRect(-size * 3, -size * 3, size * 6, size * 6);

  // Inner glow
  const innerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.5);
  innerGlow.addColorStop(0, 'rgba(255, 255, 200, 0.9)');
  innerGlow.addColorStop(0.5, 'rgba(255, 215, 0, 0.6)');
  innerGlow.addColorStop(1, 'rgba(255, 165, 0, 0.2)');
  ctx.fillStyle = innerGlow;
  ctx.fillRect(-size * 1.5, -size * 1.5, size * 3, size * 3);

  // Star shape (золотая звезда)
  const starGradient = ctx.createLinearGradient(-size, -size, size, size);
  starGradient.addColorStop(0, '#FFD700');
  starGradient.addColorStop(0.5, '#FFA500');
  starGradient.addColorStop(1, '#FFD700');

  ctx.fillStyle = starGradient;
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
  ctx.shadowBlur = 10;

  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const radius = i % 2 === 0 ? size : size * 0.5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.restore();

  // "BONUS" text below star
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 2;

  // Text background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.roundRect(powerUp.x - 28, powerUp.y + 20, 56, 16, 4);
  ctx.fill();

  // Text
  const textPulse = Math.sin(gameTime * 0.2) * 0.1 + 1;
  ctx.font = `bold ${11 * textPulse}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Text gradient
  const textGradient = ctx.createLinearGradient(powerUp.x - 20, 0, powerUp.x + 20, 0);
  textGradient.addColorStop(0, '#FFD700');
  textGradient.addColorStop(0.5, '#FFF');
  textGradient.addColorStop(1, '#FFD700');
  ctx.fillStyle = textGradient;

  ctx.fillText('BONUS', powerUp.x, powerUp.y + 28);

  ctx.restore();
};
