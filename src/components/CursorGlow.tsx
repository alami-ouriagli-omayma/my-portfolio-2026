import { useEffect, useRef } from "react";

type TrailPoint = {
  x: number;
  y: number;
  life: number;
};

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canTrack = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!canTrack.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let active = false;
    let lastPointAt = 0;
    const points: TrailPoint[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawTrail = (offset: number, width: number, color: string, alpha: number) => {
      if (points.length < 3) return;
      const first = points[0];
      if (!first) return;
      context.beginPath();
      context.moveTo(first.x, first.y + offset);

      for (let index = 1; index < points.length - 1; index += 1) {
        const point = points[index];
        const next = points[index + 1];
        if (!point || !next) continue;
        context.quadraticCurveTo(
          point.x,
          point.y + offset,
          (point.x + next.x) / 2,
          (point.y + next.y) / 2 + offset,
        );
      }

      const head = points[points.length - 1];
      if (!head) return;
      context.lineTo(head.x, head.y + offset);
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = width;
      context.strokeStyle = color;
      context.globalAlpha = alpha;
      context.shadowColor = color;
      context.shadowBlur = width * 2.2;
      context.stroke();
    };

    const animate = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      points.forEach((point) => {
        point.life -= active ? 0.014 : 0.032;
      });
      while (points[0] && points[0].life <= 0) points.shift();

      if (points.length > 2) {
        context.save();
        context.globalCompositeOperation = "lighter";
        drawTrail(-5, 8, "oklch(0.79 0.2 245)", 0.5);
        drawTrail(4, 6, "oklch(0.85 0.2 155)", 0.34);
        drawTrail(0, 4, "oklch(0.72 0.25 300)", 0.52);
        drawTrail(0, 1.5, "oklch(0.96 0.03 240)", 0.7);
        context.restore();
      }

      frame = window.requestAnimationFrame(animate);
    };

    const move = (event: PointerEvent) => {
      active = true;
      const now = performance.now();
      if (now - lastPointAt > 12) {
        points.push({ x: event.clientX, y: event.clientY, life: 1 });
        if (points.length > 26) points.shift();
        lastPointAt = now;
      }

      const card = (event.target as HTMLElement).closest<HTMLElement>(".spotlight-card");
      if (card) {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
        card.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
      }
    };

    const hide = () => {
      active = false;
    };

    resize();
    frame = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", resize);
    document.documentElement.addEventListener("mouseleave", hide);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("mouseleave", hide);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="cursor-glow" />;
}
