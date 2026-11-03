import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

// Intro cinematográfica (só na 1.ª visita à página inicial de cada sessão):
// um carro de luxo sai de um túnel, de frente, em alta velocidade. Quando os
// faróis chegam perto, inundam o ecrã de luz branca e o site "abre" ao meio.
//
// Tudo é desenhado num <canvas> (sem vídeo nem imagens pesadas) e o tempo é
// uma função pura: render(t) desenha o fotograma do segundo t.

const SESSION_KEY = "reis-intro-visto";

// ── Linha do tempo (segundos) ────────────────────────────────────────────
const T_APPROACH_START = 0.3;
const T_APPROACH_END = 3.5;
const T_FLOOD_START = 2.7;
const T_FLOOD_END = 3.7; // ecrã todo branco
const T_LOGO_IN = 3.75;
const T_OPEN = 4.35; // as duas metades abrem
const T_END = 5.35;

// ── Geometria do túnel (metros; y positivo = para baixo) ─────────────────
const CAM_Y = 0.62; // câmara baixa, perto do asfalto
const HALF_W = 5;
const CEIL_Y = -3.8;
const RING_GAP = 7;
const RING_COUNT = 46;
const FAR_Z = 300;

// ── Carro: fotografia real (a mesma do anúncio do Porsche 911 Carrera 4S) ──
const CAR_SRC = "/cars/porsche-911-carrera-4s.png";
const IMG_W = 1757;
const IMG_H = 720;
const PX_PER_M = 277; // pixels da fotografia por metro (corpo do carro ≈ 4,2 m)
const ANCHOR = [700, 570]; // ponto do chão (para-choques), na fotografia
const LIGHTS = [
  [308, 292], // farol esquerdo
  [830, 308], // farol direito
];
const LANE_X = 0.3; // metros em relação ao eixo da estrada

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => {
  const x = clamp((v - a) / (b - a), 0, 1);
  return x * x * (3 - 2 * x);
};

function roundedArch(r = 2, steps = 6) {
  // contorno da secção do túnel (de baixo-esquerda, por cima, até baixo-direita)
  const pts = [[-HALF_W, CAM_Y]];
  const cy = CEIL_Y + r;
  pts.push([-HALF_W, cy]);
  for (let i = 1; i <= steps; i++) {
    const a = Math.PI + (i / steps) * (Math.PI / 2);
    pts.push([-HALF_W + r + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  for (let i = 0; i <= steps; i++) {
    const a = (3 * Math.PI) / 2 + (i / steps) * (Math.PI / 2);
    pts.push([HALF_W - r + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  pts.push([HALF_W, CAM_Y]);
  return pts;
}
const ARCH = roundedArch();

// Desenha o carro (fotografia) numa tela auxiliar, já com a iluminação do
// momento: escuro/contraluz ao longe e iluminado à medida que se aproxima.
function paintCar(off, img, widthPx, ambient) {
  const w = Math.max(2, Math.min(1500, Math.ceil(widthPx)));
  const h = Math.max(1, Math.round((w * IMG_H) / IMG_W));
  if (off.width !== w || off.height !== h) {
    off.width = w;
    off.height = h;
  }
  const c = off.getContext("2d");
  c.globalCompositeOperation = "source-over";
  c.clearRect(0, 0, w, h);
  c.drawImage(img, 0, 0, w, h);
  c.globalCompositeOperation = "source-atop";
  // contraluz ao longe → luz normal ao perto
  const dark = 0.92 * (1 - ambient);
  if (dark > 0.01) {
    c.fillStyle = `rgba(3,4,8,${dark})`;
    c.fillRect(0, 0, w, h);
  }
  // reflexo frio das luzes do teto no capô e no tejadilho
  const top = c.createLinearGradient(0, 0, 0, h * 0.7);
  top.addColorStop(0, `rgba(185,205,255,${0.1 + 0.18 * ambient})`);
  top.addColorStop(1, "rgba(185,205,255,0)");
  c.fillStyle = top;
  c.fillRect(0, 0, w, h);
  c.globalCompositeOperation = "source-over";
  return off;
}

function render(ctx, W, H, t, assets) {
  const f = H * 0.95;
  const u = clamp((t - T_APPROACH_START) / (T_APPROACH_END - T_APPROACH_START), 0, 1);
  const zEnd = Math.max(1.1, (0.54 * f) / (0.36 * W));
  const zCar = zEnd * Math.pow(200 / zEnd, 1 - Math.pow(u, 1.3));
  const light = smooth(0.25, 1, u);

  // vibração suave da câmara, cada vez maior com a velocidade
  const shake = (0.4 + 2.2 * u) * (H / 800);
  const vx = W / 2 + Math.sin(t * 47) * shake * 0.6;
  const vy = H * 0.47 + Math.sin(t * 61 + 1.3) * shake;
  const P = (x, y, z) => [vx + (x * f) / z, vy + (y * f) / z];

  // distância percorrida pelo túnel: 45 m/s a acelerar até ~115 m/s
  const dist = 45 * t + (70 * (t * t)) / 6.8;

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#020203";
  ctx.fillRect(0, 0, W, H);

  // saída do túnel ao fundo: luz branca azulada
  {
    const [px, py] = P(0, -1.6, FAR_Z);
    const g = ctx.createRadialGradient(px, py, 0, px, py, H * 0.22);
    g.addColorStop(0, "rgba(235,242,255,0.95)");
    g.addColorStop(0.18, "rgba(190,210,255,0.45)");
    g.addColorStop(1, "rgba(120,150,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // linhas longitudinais (cantos do túnel)
  const lon = [
    [-HALF_W, CAM_Y],
    [HALF_W, CAM_Y],
    [-HALF_W, -1.0],
    [HALF_W, -1.0],
    [-HALF_W + 0.8, CEIL_Y],
    [HALF_W - 0.8, CEIL_Y],
    [-2.2, CAM_Y],
    [2.2, CAM_Y],
  ];
  ctx.lineWidth = 1;
  lon.forEach(([x, y], i) => {
    const a = P(x, y, 0.8);
    const b = P(x, y, FAR_Z);
    const grad = ctx.createLinearGradient(a[0], a[1], b[0], b[1]);
    const strong = i < 2 ? 0.22 : 0.1;
    grad.addColorStop(0, `rgba(210,220,240,${strong})`);
    grad.addColorStop(1, "rgba(210,220,240,0)");
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
  });

  // anéis do túnel + luzes que passam a grande velocidade
  const total = RING_GAP * RING_COUNT;
  const rings = [];
  for (let i = 0; i < RING_COUNT; i++) {
    const z = ((((i * RING_GAP - dist) % total) + total) % total) + 0.9;
    rings.push({ z, i });
  }
  rings.sort((a, b) => b.z - a.z);

  for (const { z, i } of rings) {
    const fade = clamp(1 - z / 200, 0, 1);
    const near = smooth(0.9, 4, z);
    const alpha = fade * near * 0.55;
    if (alpha <= 0.01) continue;
    ctx.lineWidth = clamp((0.02 * f) / z, 0.6, 3);
    ctx.strokeStyle = `rgba(185,198,225,${alpha})`;
    ctx.beginPath();
    ARCH.forEach(([x, y], n) => {
      const [sx, sy] = P(x, y, z);
      if (n === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    });
    ctx.stroke();

    // luzes do teto (barra) e das paredes
    ctx.globalCompositeOperation = "lighter";
    const lw = clamp((0.14 * f) / z, 1, 22);
    const [c1x, c1y] = P(-1.4, CEIL_Y + 0.04, z);
    const [c2x, c2y] = P(1.4, CEIL_Y + 0.04, z);
    ctx.strokeStyle = `rgba(235,242,255,${clamp(fade * near * 1.1, 0, 1)})`;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(c1x, c1y);
    ctx.lineTo(c2x, c2y);
    ctx.stroke();
    if (z < 90) {
      ctx.strokeStyle = `rgba(255,255,255,${0.12 * near})`;
      ctx.lineWidth = lw * 3.4;
      ctx.stroke();
    }
    if (i % 2 === 0) {
      for (const side of [-1, 1]) {
        const [w1x, w1y] = P(side * (HALF_W - 0.05), -1.1, z);
        const [w2x, w2y] = P(side * (HALF_W - 0.05), -1.1, z + 3.2);
        ctx.strokeStyle = `rgba(255,214,150,${clamp(fade * near * 0.9, 0, 1)})`;
        ctx.lineWidth = clamp((0.08 * f) / z, 1, 12);
        ctx.beginPath();
        ctx.moveTo(w1x, w1y);
        ctx.lineTo(w2x, w2y);
        ctx.stroke();
      }
    }
    ctx.globalCompositeOperation = "source-over";
  }

  // traços da faixa central (a passar depressa)
  ctx.globalCompositeOperation = "lighter";
  const dashGap = 9;
  const dashTotal = dashGap * 40;
  for (let i = 0; i < 40; i++) {
    const z = ((((i * dashGap - dist) % dashTotal) + dashTotal) % dashTotal) + 0.9;
    const z2 = z + 3.4;
    const fade = clamp(1 - z / 220, 0, 1) * smooth(2, 9, z);
    const [ax, ay] = P(-0.09, CAM_Y, z);
    const [bx, by] = P(0.09, CAM_Y, z);
    const [cx2, cy2] = P(0.09, CAM_Y, z2);
    const [dx, dy] = P(-0.09, CAM_Y, z2);
    ctx.fillStyle = `rgba(255,255,255,${0.7 * fade})`;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineTo(cx2, cy2);
    ctx.lineTo(dx, dy);
    ctx.closePath();
    ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";

  // carro (fotografia real)
  const ambient = smooth(0.05, 0.85, u);
  const [sx, sy] = P(LANE_X, CAM_Y, zCar);
  const k = f / (zCar * PX_PER_M); // pixels do ecrã por pixel da fotografia
  const drawW = IMG_W * k;
  const drawH = IMG_H * k;
  const left = sx - ANCHOR[0] * k;
  const top = sy - ANCHOR[1] * k;
  const off = paintCar(assets.off, assets.img, drawW, ambient);

  // rasto de movimento: cópias ténues, mais longe
  for (let g = 3; g >= 1; g--) {
    const zg = zCar * (1 + 0.035 * g * (0.4 + u));
    const kg = f / (zg * PX_PER_M);
    const [gx, gy] = P(LANE_X, CAM_Y, zg);
    ctx.globalAlpha = 0.1 * (1 - g / 4) * (0.3 + u);
    ctx.drawImage(off, gx - ANCHOR[0] * kg, gy - ANCHOR[1] * kg, IMG_W * kg, IMG_H * kg);
  }
  ctx.globalAlpha = 1;

  // reflexo no asfalto (espelhado e a desvanecer)
  {
    const rf = assets.refl;
    const rw = off.width;
    const rh = Math.round(off.height * 0.55);
    if (rf.width !== rw || rf.height !== rh) {
      rf.width = rw;
      rf.height = rh;
    }
    const rc = rf.getContext("2d");
    rc.globalCompositeOperation = "source-over";
    rc.clearRect(0, 0, rw, rh);
    // a parte de baixo do carro, virada ao contrário
    const srcH = rh; // altura (px da tela auxiliar) da parte do carro que se reflete
    rc.save();
    rc.translate(0, rh);
    rc.scale(1, -1);
    const srcY = Math.max(0, off.height * (ANCHOR[1] / IMG_H) - srcH);
    rc.drawImage(off, 0, srcY, off.width, srcH, 0, 0, rw, srcH);
    rc.restore();
    rc.globalCompositeOperation = "destination-in";
    const fade = rc.createLinearGradient(0, 0, 0, rh);
    fade.addColorStop(0, "rgba(0,0,0,0.55)");
    fade.addColorStop(1, "rgba(0,0,0,0)");
    rc.fillStyle = fade;
    rc.fillRect(0, 0, rw, rh);
    rc.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.5;
    ctx.drawImage(rf, left, sy, drawW, (rh / off.height) * drawH);
    ctx.globalAlpha = 1;
  }

  ctx.drawImage(off, left, top, drawW, drawH);

  // luz dos faróis: brilho, raios horizontais e luz projetada no asfalto
  ctx.globalCompositeOperation = "lighter";
  const groundY = sy;
  const R = 5 + light * ((f * 0.24) / zCar) + light * 6;
  const lights = LIGHTS.map(([lx, ly]) => [sx + (lx - ANCHOR[0]) * k, sy + (ly - ANCHOR[1]) * k]);
  const hy = (lights[0][1] + lights[1][1]) / 2;
  const hx0 = (lights[0][0] + lights[1][0]) / 2;

  // luz no chão, à frente do carro
  {
    const rad = Math.max(W, H) * (0.15 + 0.55 * light);
    ctx.save();
    ctx.translate(vx, groundY + 0.02 * H);
    ctx.scale(1, 0.38);
    const rg = ctx.createRadialGradient(0, 0, 0, 0, 0, rad);
    rg.addColorStop(0, `rgba(235,240,255,${0.3 * light})`);
    rg.addColorStop(1, "rgba(235,240,255,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(-rad, -rad, rad * 2, rad * 2);
    ctx.restore();
  }

  for (const [x, y] of lights) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, R);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.1, "rgba(255,255,255,0.8)");
    g.addColorStop(0.35, `rgba(215,228,255,${0.26 * (0.3 + light)})`);
    g.addColorStop(1, "rgba(180,205,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - R, y - R, R * 2, R * 2);

    // raio anamórfico horizontal (subtil)
    const sw = W * (0.1 + 0.42 * light);
    const sh = 1 + 3.5 * light;
    const a = 0.12 + 0.5 * light;
    const sg = ctx.createLinearGradient(x - sw, y, x + sw, y);
    sg.addColorStop(0, "rgba(160,190,255,0)");
    sg.addColorStop(0.3, `rgba(190,210,255,${a * 0.1})`);
    sg.addColorStop(0.5, `rgba(255,255,255,${a})`);
    sg.addColorStop(0.7, `rgba(190,210,255,${a * 0.1})`);
    sg.addColorStop(1, "rgba(160,190,255,0)");
    ctx.fillStyle = sg;
    ctx.fillRect(x - sw, y - sh / 2, sw * 2, sh);
  }

  // vinheta
  ctx.globalCompositeOperation = "source-over";
  const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.25, W / 2, H / 2, Math.max(W, H) * 0.75);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, `rgba(0,0,0,${0.7 * (1 - smooth(T_FLOOD_START, T_FLOOD_END, t))})`);
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  // abertura de entrada (do preto) e inundação de luz branca
  const fadeIn = 1 - smooth(0, 0.45, t);
  if (fadeIn > 0) {
    ctx.fillStyle = `rgba(0,0,0,${fadeIn})`;
    ctx.fillRect(0, 0, W, H);
  }
  const flood = smooth(T_FLOOD_START, T_FLOOD_END, t);
  if (flood > 0) {
    // sobre-exposição: a luz alastra a partir dos faróis e depois cobre tudo
    ctx.globalCompositeOperation = "lighter";
    const fr = Math.hypot(W, H) * (0.1 + flood * 1.15);
    const fg = ctx.createRadialGradient(hx0, hy, 0, hx0, hy, fr);
    fg.addColorStop(0, `rgba(255,255,255,${clamp(flood * 2.5, 0, 1)})`);
    fg.addColorStop(0.55, `rgba(255,255,255,${0.85 * flood})`);
    fg.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = fg;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgba(255,255,255,${Math.pow(flood, 2.2)})`;
    ctx.fillRect(0, 0, W, H);
  }
}

export default function Intro() {
  const { t } = useLanguage();
  const [active, setActive] = useState(() => {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
      return !sessionStorage.getItem(SESSION_KEY);
    } catch {
      return false;
    }
  });
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const logoRef = useRef(null);
  const skipRef = useRef(null);
  const finishRef = useRef(() => {});

  useEffect(() => {
    if (!active) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) {
      setActive(false);
      return undefined;
    }
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* sem sessionStorage — a intro volta a aparecer, sem problema */
    }

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    let raf = 0;
    let start = null;
    let assets = null;
    let phase = 0; // 0 = canvas · 1 = painéis brancos · 2 = a abrir
    let ended = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      return [w, h];
    }

    function finish() {
      if (ended) return;
      ended = true;
      cancelAnimationFrame(raf);
      const root = rootRef.current;
      html.style.overflow = prevOverflow;
      if (!root) {
        setActive(false);
        return;
      }
      root
        .animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, fill: "forwards" })
        .finished.then(() => setActive(false), () => setActive(false));
    }
    finishRef.current = finish;

    function openDoors() {
      const opts = { duration: 950, easing: "cubic-bezier(0.77, 0, 0.18, 1)", fill: "forwards" };
      leftRef.current?.animate([{ transform: "translateX(0)" }, { transform: "translateX(-101%)" }], opts);
      rightRef.current?.animate([{ transform: "translateX(0)" }, { transform: "translateX(101%)" }], opts);
      logoRef.current?.animate(
        [
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(1.25)" },
        ],
        { duration: 520, easing: "ease-in", fill: "forwards" }
      );
      skipRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" });
    }

    function frame(now) {
      if (start === null) start = now;
      const tt = (now - start) / 1000;
      const [w, h] = resize();

      if (phase === 0) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        render(ctx, w, h, tt, assets);
        if (tt >= T_FLOOD_END) {
          phase = 1;
          // painéis brancos por cima do canvas (que já está todo branco)
          if (leftRef.current) leftRef.current.style.visibility = "visible";
          if (rightRef.current) rightRef.current.style.visibility = "visible";
          canvas.style.visibility = "hidden";
          if (rootRef.current) rootRef.current.style.backgroundColor = "transparent";
        }
      }
      if (phase === 1 && tt >= T_LOGO_IN && logoRef.current) {
        logoRef.current.style.opacity = "1";
        logoRef.current.style.transform = "scale(1)";
      }
      if (phase === 1 && tt >= T_OPEN) {
        phase = 2;
        openDoors();
      }
      if (tt >= T_END) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    }
    // só arranca quando a fotografia do carro estiver carregada
    const img = new Image();
    img.src = CAR_SRC;
    // rede lenta: não deixa o visitante a olhar para um ecrã preto
    const giveUp = setTimeout(() => {
      if (!assets) finish();
    }, 4000);
    img.decode().then(
      () => {
        clearTimeout(giveUp);
        if (ended) return;
        assets = { img, off: document.createElement("canvas"), refl: document.createElement("canvas") };
        raf = requestAnimationFrame(frame);
      },
      () => finish() // sem fotografia não há intro: abre o site normalmente
    );

    function onKey(e) {
      if (e.key === "Escape") finish();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      ended = true;
      clearTimeout(giveUp);
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
    };
  }, [active]);

  if (!active) return null;

  const panel = "absolute top-0 h-full w-1/2 bg-white";

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] bg-black print:hidden"
      role="presentation"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div
        ref={leftRef}
        className={`${panel} left-0`}
        style={{ visibility: "hidden", boxShadow: "6px 0 40px 8px rgba(255,255,255,0.9)" }}
      />
      <div
        ref={rightRef}
        className={`${panel} right-0`}
        style={{ visibility: "hidden", boxShadow: "-6px 0 40px 8px rgba(255,255,255,0.9)" }}
      />

      <div
        ref={logoRef}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4"
        style={{ opacity: 0, transform: "scale(0.92)", transition: "opacity 0.5s, transform 0.7s" }}
      >
        <img src="/reis-mark.png" alt="" className="h-10 w-auto sm:h-14" />
        <span className="font-sans text-[12px] tracking-[0.45em] text-black/70 sm:text-[13px]">
          PRIME MOTORS
        </span>
      </div>

      <button
        ref={skipRef}
        type="button"
        onClick={() => finishRef.current()}
        className="absolute bottom-6 right-6 border border-white px-4 py-2 font-sans text-xs tracking-[0.2em] text-white mix-blend-difference sm:bottom-8 sm:right-10"
      >
        {t("home.introSkip").toUpperCase()}
      </button>
    </div>
  );
}
