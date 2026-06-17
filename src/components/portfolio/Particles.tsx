import { useEffect, useRef } from "react";

/**
 * Subtle animated particle field. Canvas-based, low CPU, respects prefers-reduced-motion.
 */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    let w = (canvas.width = window.innerWidth * devicePixelRatio);
    let h = (canvas.height = window.innerHeight * devicePixelRatio);
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";

    const COUNT = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    const dots = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
      r: (Math.random() * 1.2 + 0.4) * devicePixelRatio,
      hue: Math.random() < 0.5 ? 215 : 295,
    }));

    function resize() {
      w = canvas!.width = window.innerWidth * devicePixelRatio;
      h = canvas!.height = window.innerHeight * devicePixelRatio;
    }
    window.addEventListener("resize", resize);

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx!.beginPath();
        ctx!.fillStyle = `hsla(${d.hue}, 90%, 75%, 0.55)`;
        ctx!.shadowColor = `hsla(${d.hue}, 90%, 70%, 0.5)`;
        ctx!.shadowBlur = 8 * devicePixelRatio;
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-60" />
  );
}
