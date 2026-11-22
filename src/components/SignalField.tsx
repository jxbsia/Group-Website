import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

type Dot = { x: number; y: number; size: number; base: number; strength: number; center: number; period: number };

const randomAt = (index: number) => {
  const n = Math.sin(index * 19.643 + 37.146) * 43758.5453;
  return n - Math.floor(n);
};

type SignalFieldProps = { placement: 'hero' | 'footer' };

export default function SignalField({ placement }: SignalFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;
    let started = 0;
    let lastFrame = 0;
    const ink = getComputedStyle(canvas).getPropertyValue('--signal-ink').trim();

    const render = (time: number, animate: boolean) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = ink;
      for (const dot of dots) {
        const cycle = ((time + dot.center) % dot.period) / dot.period;
        const pulse = animate
          ? Math.pow(Math.max(0, 1 - Math.abs(cycle - 0.5) * 9), 2) * dot.strength
          : dot.strength * 0.16;
        context.globalAlpha = dot.base + pulse;
        context.fillRect(dot.x, dot.y, dot.size, dot.size);
      }
      context.globalAlpha = 1;
    };

    const resize = () => {
      ({ width, height } = canvas.getBoundingClientRect());
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const spacing = width < 600 ? 12 : 14;
      dots = [];
      for (let y = spacing; y < height; y += spacing) {
        for (let x = spacing; x < width; x += spacing) {
          const i = (x / spacing) * 917 + (y / spacing) * 7;
          const density = randomAt(i);
          if (density < 0.15) continue;
          const u = x / width;
          const v = y / height;
          const edgeFade = Math.min(u * 8, (1 - u) * 8, 1);
          const fades = placement === 'hero'
            ? edgeFade * Math.min(v * 4, (1 - v) * 8, 1) * (0.47 + 0.53 * u)
            : edgeFade * Math.min(0.30 + v * 1.7, 1);
          const band = (Math.sin(u * 22 - v * 6) + Math.cos(v * 13 + u * 8) + 2) / 4;
          dots.push({
            x, y, size: density > 0.925 ? 2 : 1.35,
            base: fades * (0.045 + band * 0.105 + density * 0.045),
            strength: fades * (0.18 + band * 0.30) * density,
            center: u * 3.1 + band * 1.4 + randomAt(i + 7) * 1.2,
            period: 5.1 + randomAt(i + 143) * 1.8,
          });
        }
      }
      render(0, false);
    };

    const tick = (now: number) => {
      if (!started) started = now;
      if (now - lastFrame >= 1000 / 24) {
        render((now - started) / 1000, true);
        lastFrame = now;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const update = () => {
      window.cancelAnimationFrame(frame);
      if (!paused && !reducedMotion && visible && !document.hidden) {
        frame = window.requestAnimationFrame(tick);
      }
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    const bounds = new ResizeObserver(resize);

    resize();
    bounds.observe(canvas);
    visibility.observe(canvas);
    document.addEventListener('visibilitychange', update);
    return () => {
      window.cancelAnimationFrame(frame);
      bounds.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [paused, placement, reducedMotion]);

  return (
    <>
      <canvas ref={canvasRef} className={`signal-field signal-field-${placement}`} aria-hidden="true" />
      {!reducedMotion && (
        <button
          className={`signal-toggle signal-toggle-${placement}`}
          type="button"
          aria-label={`${paused ? 'Resume' : 'Pause'} ${placement} blinking animation`}
          title={`${paused ? 'Resume' : 'Pause'} animation`}
          onClick={() => setPaused(value => !value)}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
      )}
    </>
  );
}
