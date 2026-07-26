"use client";
import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 28;

export default function CursorFollower() {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const mouse = useRef({ x: -999, y: -999 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init trail points
    points.current = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: -999,
      y: -999,
    }));

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const lerp = (a, b, t) => a + (b - a) * t;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = points.current;

      // Lead point chases mouse
      pts[0].x = lerp(pts[0].x, mouse.current.x, 0.35);
      pts[0].y = lerp(pts[0].y, mouse.current.y, 0.35);

      // Each subsequent point chases the previous
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        pts[i].x = lerp(pts[i].x, pts[i - 1].x, 0.42);
        pts[i].y = lerp(pts[i].y, pts[i - 1].y, 0.42);
      }

      if (pts.length < 2) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      const head = pts[0];
      const tail = pts[TRAIL_LENGTH - 1];

      // Purple theme color gradient (#7C4DFF -> rgb(124, 77, 255))
      const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
      grad.addColorStop(0, "rgba(124, 77, 255, 0)");
      grad.addColorStop(0.4, "rgba(124, 77, 255, 0.25)");
      grad.addColorStop(0.75, "rgba(124, 77, 255, 0.7)");
      grad.addColorStop(1, "rgba(124, 77, 255, 1)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);

      for (let i = 1; i < pts.length - 2; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.9;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(124, 77, 255, 0.6)";
      ctx.shadowBlur = 0;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 2; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);

      const glowGrad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
      glowGrad.addColorStop(0, "rgba(124, 77, 255, 0)");
      glowGrad.addColorStop(0.6, "rgba(124, 77, 255, 0.08)");
      glowGrad.addColorStop(1, "rgba(124, 77, 255, 0.25)");

      ctx.strokeStyle = glowGrad;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(124, 77, 255, 0.4)";
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9999]"
    />
  );
}
