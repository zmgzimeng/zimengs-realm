'use client';

import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let globalOpacity = 1;
    let screen = {
      w: window.innerWidth,
      h: window.innerHeight,
      c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
    };

    const BASE_DEPTH = 1000;
    const params = { speed: 1, count: 400, life: 5 };

    // HSV to RGB
    function hsvToRgb(h: number, s: number, v: number) {
      let r = 0, g = 0, b = 0;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
      }

      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
      };
    }

    class Star {
      x = 0;
      y = 0;
      z = 0;
      opacity = 0;
      r = 255;
      g = 255;
      b = 255;
      private canvas: HTMLCanvasElement;
      private ctx: CanvasRenderingContext2D;

      constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.reset();
      }

      reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.z = Math.random() * BASE_DEPTH;
        this.opacity = 0;

        const h = 140 + Math.random() * 150;
        const s = 0.3 + Math.random() * 0.1;
        const v = 0.7 + Math.random() * 0.5;

        const rgb = hsvToRgb(h / 360, s, v);
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
      }

      move() {
        this.z -= params.speed;

        if (this.opacity < 1) {
          this.opacity += 0.005 * params.speed;
        }

        if (this.z <= 0) {
          this.reset();
        }
      }

      show() {
        const scale = BASE_DEPTH / this.z;
        const x = (this.x - screen.c[0]) * scale + screen.c[0];
        const y = (this.y - screen.c[1]) * scale + screen.c[1];

        const prevZ = this.z + params.speed * 1.5;
        const prevScale = BASE_DEPTH / prevZ;
        const prevX = (this.x - screen.c[0]) * prevScale + screen.c[0];
        const prevY = (this.y - screen.c[1]) * prevScale + screen.c[1];

        const calculatedOpacity = scale > params.life ? (2 - scale / params.life) * 1.5 : 1;
        const finalOpacity = Math.min(this.opacity, calculatedOpacity);

        // Size scaling expanding up to 6px
        const weight = Math.max(2, Math.pow(scale, 0.8) * 1.2);

        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${finalOpacity})`;
        this.ctx.lineWidth = Math.min(weight, 6);
        this.ctx.lineCap = 'round';
        
        this.ctx.moveTo(prevX, prevY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }
    }

    let starArr: Star[] = [];

    const setup = () => {
      screen = {
        w: window.innerWidth,
        h: window.innerHeight,
        c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
      };

      canvas.width = screen.w;
      canvas.height = screen.h;

      starArr = [];
      for (let i = 0; i < params.count; i++) {
        starArr.push(new Star(canvas, ctx));
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = globalOpacity;

      if (globalOpacity > 0) {
        ctx.fillStyle = '#00001a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        starArr.forEach((s) => {
          s.show();
          s.move();
        });
      }

      ctx.globalAlpha = 1;
      animationFrameId = window.requestAnimationFrame(update);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Speed up from base 1 to max 8
      const scrollVal = 1 + scrollY / 60;
      if (scrollVal <= 1) {
        params.speed = 1;
      } else if (scrollVal < 8) {
        params.speed = scrollVal;
      } else {
        params.speed = 8;
      }

      const aboutSection = document.getElementById('about');
      const targetOffset = aboutSection 
        ? aboutSection.offsetTop 
        : window.innerHeight;

      const rawOpacity = 1 - scrollY / targetOffset;
      globalOpacity = Math.max(0, Math.min(1, rawOpacity));
    };

    const handleResize = () => {
      setup();
      handleScroll();
    };

    setup();
    handleScroll();
    update();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="stars"
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
    />
  );
}
