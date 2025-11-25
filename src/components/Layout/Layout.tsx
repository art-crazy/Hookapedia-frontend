'use client';

import React, { useEffect, useRef } from 'react';
import { Menu, Flame, BookOpen, X, ChevronRight, Home, Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const MouseSpotlight: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const cursorRef = useRef({ x: 0, y: 0, active: false, lastX: 0, lastY: 0 });
  const particlesRef = useRef<SmokeParticle[]>([]);

  class SmokeParticle {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    angle: number;
    spin: number;
    color: string;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 10 + 5; // Start small

      // Initial velocity based on mouse movement (optional) or random spread
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 0.5; // Slight upward bias immediately

      this.life = 0;
      this.maxLife = Math.random() * 100 + 60; // Longer life for lingering smoke
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.02; // Slow rotation

      // Randomly pick a tint: mostly white/grey, sometimes rose/purple hint
      const rand = Math.random();
      if (rand > 0.95) this.color = '225, 29, 72'; // Rose tint
      else if (rand > 0.90) this.color = '168, 85, 247'; // Purple tint
      else this.color = '200, 200, 210'; // Blue-ish Grey smoke
    }

    update() {
      // Slow down horizontal movement (friction)
      this.vx *= 0.98;

      // Accelerate upwards (smoke rising)
      this.vy -= 0.015;

      this.x += this.vx;
      this.y += this.vy;

      // Expand over time (diffusion)
      this.size += 0.3;

      this.angle += this.spin;
      this.life++;
    }

    draw(ctx: CanvasRenderingContext2D) {
      const progress = this.life / this.maxLife;
      const opacity = (1 - progress) * 0.3; // Low opacity for "gas" look

      if (opacity <= 0) return;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
      gradient.addColorStop(0, `rgba(${this.color}, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(${this.color}, ${opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(${this.color}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursorRef.current = {
        x: clientX,
        y: clientY,
        active: true,
        lastX: cursorRef.current.x || clientX,
        lastY: cursorRef.current.y || clientY
      };

      // Calculate distance moved to determine density
      const dx = clientX - cursorRef.current.lastX;
      const dy = clientY - cursorRef.current.lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Spawn more particles if moving fast, fewer if slow
      const count = Math.min(5, Math.floor(distance / 5) + 1);

      for (let i = 0; i < count; i++) {
        // Add some jitter to spawn position
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        particlesRef.current.push(new SmokeParticle(clientX + offsetX, clientY + offsetY));
      }

      cursorRef.current.lastX = clientX;
      cursorRef.current.lastY = clientY;
    };

    const handleMouseLeave = () => {
      cursorRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    handleResize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw subtle spotlight behind smoke
      if (cursorRef.current.active) {
        const gradient = ctx.createRadialGradient(
          cursorRef.current.x,
          cursorRef.current.y,
          0,
          cursorRef.current.x,
          cursorRef.current.y,
          300
        );
        gradient.addColorStop(0, 'rgba(225, 29, 72, 0.08)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 2. Draw Smoke
      // Screen blend mode makes overlapping smoke look brighter/whiter
      ctx.globalCompositeOperation = 'screen';

      particlesRef.current.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx);

        if (particle.life >= particle.maxLife) {
          particlesRef.current.splice(index, 1);
        }
      });

      ctx.globalCompositeOperation = 'source-over'; // Reset

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30"
      // The blur filter is key to making circles look like fluid smoke
      style={{ filter: 'blur(12px)' }}
    />
  );
};

export const Header: React.FC<{ onGameOpen: () => void }> = ({ onGameOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Главная', path: '/', icon: <Flame size={18} /> },
    { label: 'Каталог', path: '/recepty', icon: <BookOpen size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xl group-hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] transition-shadow">
            H
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
            Хукапедия
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${item.path === '/recepty'
                ? (pathname.startsWith('/recepty') ? 'text-primary' : 'text-muted hover:text-white')
                : (pathname === item.path ? 'text-primary' : 'text-muted hover:text-white')
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <button
            onClick={onGameOpen}
            className="flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors cursor-pointer"
            aria-label="Play Galaga"
          >
            <Gamepad2 size={18} />
            Играть
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-white/10 p-4 shadow-2xl md:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${pathname === item.path
                  ? 'bg-primary/20 text-primary font-bold'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={() => {
                onGameOpen();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 p-4 rounded-xl transition-colors text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer"
            >
              <Gamepad2 size={18} />
              <span className="text-lg">Играть</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => (
  <footer className="border-t border-white/10 bg-surface py-8 mt-auto">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted">
      <div className="text-center md:text-left">
        <p className="font-semibold text-white mb-1">Хукапедия</p>
        <p>&copy; 2025 Энциклопедия кальянных рецептов.</p>
      </div>
      <div className="flex gap-6">
        <Link href="/glossarij" className="hover:text-primary transition-colors">
          Глоссарий
        </Link>
        <Link href="/recepty" className="hover:text-primary transition-colors">
          Карта сайта
        </Link>
        <a href="mailto:hello@hookapedia.ru" className="hover:text-primary transition-colors">
          Контакты
        </a>
      </div>
    </div>
  </footer>
);

export const Breadcrumbs: React.FC<{
  items: { label: string; path?: string }[];
}> = ({ items }) => {
  const { siteConfig } = require('@/config/site');
  const { generateBreadcrumbSchema } = require('@/utils/schema');

  // Generate JSON-LD for Breadcrumbs using utility
  const schemaData = generateBreadcrumbSchema(items, siteConfig.url.current);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <nav className="flex items-center text-sm text-muted mb-6 overflow-x-auto whitespace-nowrap pb-2 md:pb-0" aria-label="Breadcrumb">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight size={14} className="mx-2 flex-shrink-0" />}
            {index === 0 && <Home size={14} className="mr-2 flex-shrink-0" />}

            {item.path ? (
              <Link
                href={item.path}
                className="hover:text-primary cursor-pointer transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
};
