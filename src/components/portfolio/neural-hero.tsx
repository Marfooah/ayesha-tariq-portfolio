import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; layer: number };
type Pulse = { from: number; to: number; t: number; speed: number };

export function NeuralHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0,
      h = 0,
      dpr = Math.min(window.devicePixelRatio || 1, 2);

    const LAYERS = [5, 7, 9, 7, 5];
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    let pulses: Pulse[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      edges = [];
      pulses = [];

      const padX = w * 0.08;
      const usableW = w - padX * 2;
      const colGap = usableW / (LAYERS.length - 1);

      LAYERS.forEach((count, li) => {
        const colH = h * 0.78;
        const topY = (h - colH) / 2;
        const rowGap = colH / (count - 1 || 1);
        for (let i = 0; i < count; i++) {
          nodes.push({
            x: padX + li * colGap,
            y: count === 1 ? h / 2 : topY + i * rowGap,
            vx: 0,
            vy: 0,
            r: 2.4 + Math.random() * 1.6,
            layer: li,
          });
        }
      });

      // build edges between adjacent layers
      for (let li = 0; li < LAYERS.length - 1; li++) {
        const from = nodes.filter((n) => n.layer === li);
        const to = nodes.filter((n) => n.layer === li + 1);
        from.forEach((a) => {
          to.forEach((b) => {
            edges.push([nodes.indexOf(a), nodes.indexOf(b)]);
          });
        });
      }
    };

    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => (mouseRef.current.active = false);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      ctx.clearRect(0, 0, w, h);

      // ambient glow
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 1.5);
      g.addColorStop(0, "rgba(80, 140, 255, 0.10)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // nodes drift with mouse parallax
      nodes.forEach((n) => {
        const dx = mx - n.x;
        const dy = my - n.y;
        const dist2 = dx * dx + dy * dy;
        const influence = mouseRef.current.active ? Math.min(1, 8000 / (dist2 + 800)) : 0;
        n.vx += -dx * influence * 0.0002;
        n.vy += -dy * influence * 0.0002;
        n.vx *= 0.92;
        n.vy *= 0.92;
        n.x += n.vx;
        n.y += n.vy;
      });

      // edges
      ctx.lineWidth = 1;
      edges.forEach(([ai, bi]) => {
        const a = nodes[ai];
        const b = nodes[bi];
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        const distToMouse = mouseRef.current.active
          ? Math.hypot(midX - mx, midY - my)
          : 9999;
        const alpha = 0.06 + Math.max(0, (180 - distToMouse) / 180) * 0.35;
        ctx.strokeStyle = `rgba(120, 170, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // spawn pulses
      if (Math.random() < 0.35 && pulses.length < 60) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ from: edge[0], to: edge[1], t: 0, speed: 0.6 + Math.random() * 0.9 });
      }

      // draw pulses
      pulses = pulses.filter((p) => {
        p.t += dt * p.speed;
        if (p.t >= 1) return false;
        const a = nodes[p.from];
        const b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 8);
        grd.addColorStop(0, "rgba(140, 220, 255, 0.95)");
        grd.addColorStop(1, "rgba(140, 220, 255, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // nodes
      nodes.forEach((n) => {
        const dToMouse = mouseRef.current.active ? Math.hypot(n.x - mx, n.y - my) : 9999;
        const hot = Math.max(0, (160 - dToMouse) / 160);
        const r = n.r + hot * 2.5;
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        grd.addColorStop(0, `rgba(180, 220, 255, ${0.9})`);
        grd.addColorStop(0.4, `rgba(80, 160, 255, ${0.35 + hot * 0.4})`);
        grd.addColorStop(1, "rgba(80,160,255,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(220, 240, 255, 0.95)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/30 via-transparent to-emerald/20 opacity-60 blur-3xl" />
      <div className="glass-strong relative h-full w-full overflow-hidden rounded-[2rem] p-2 shadow-elegant">
        <canvas ref={canvasRef} className="h-full w-full rounded-[1.6rem]" aria-hidden />
        <div className="pointer-events-none absolute inset-2 rounded-[1.6rem] ring-1 ring-inset ring-white/10" />
        <div className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
          neural.net // forward pass
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald/80">
          ● live
        </div>
      </div>
    </div>
  );
}