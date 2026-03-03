"use client";
import React, { useEffect, useRef, useState } from "react";

const Hero = () => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  // Animated particle grid on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;
    const particles = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = 18,
      rows = 12;
    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r <= rows; r++) {
        particles.push({
          bx: (c / cols) * W,
          by: (r / rows) * H,
          x: (c / cols) * W,
          y: (r / rows) * H,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.1,
        });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (Math.abs(p.x - p.bx) > 25) p.vx *= -1;
        if (Math.abs(p.y - p.by) > 25) p.vy *= -1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = (W / cols) * 1.6;
          if (dist < threshold) {
            const op = (1 - dist / threshold) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(201, 168, 76, ${op})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    setTimeout(() => setLoaded(true), 100);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const stats = [
    { num: "200+", lbl: "Brands Grown" },
    { num: "5×", lbl: "Average ROI" },
    { num: "98%", lbl: "Client Satisfaction" },
    { num: "3yr", lbl: "Sri Lanka Expertise" },
  ];

  const services = [
    "Social Media",
    "Content Creation",
    "SEO Strategy",
    "Brand Identity",
    "Paid Ads",
  ];

  return (
    <>
      {/*
        Kept in <style> — things Tailwind cannot express:
        • @import Google Fonts
        • @keyframes (goldFlow, pulseGlow, shimmer, slideDown, slideUp, blink, trackDown)
        • ::before / ::after pseudo-elements (eyebrow shimmer, scroll track line, btn glow ring, stat card overlay, glass btn fill)
        • clip-path: polygon() (stat cards, buttons)
        • writing-mode: vertical-lr (side labels)
        • repeating-linear-gradient scanlines
        • filter: drop-shadow (gold title)
        • background-clip: text / -webkit-text-fill-color (gold gradient title)
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700;900&family=Exo+2:wght@200;300;400&display=swap');

        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-cinzel   { font-family: 'Cinzel', serif; }
        .font-exo      { font-family: 'Exo 2', sans-serif; }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
          50%       { opacity: 1;   transform: translateX(-50%) scale(1.1); }
        }
        @keyframes pulseGlowStatic {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.3; }
        }
        @keyframes shimmer {
          0%   { left: -100%; }
          100% { left:  200%; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes goldFlow {
          0%   { background-position: 0%   center; }
          100% { background-position: 200% center; }
        }
        @keyframes trackDown {
          0%   { top: -50%;  }
          100% { top:  120%; }
        }

        /* Animated gold gradient text */
        .gold-text-flow {
          background: linear-gradient(90deg, #C9A84C 0%, #FFD700 35%, #FFF8DC 55%, #FFD700 75%, #C9A84C 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldFlow 4s linear infinite;
          filter: drop-shadow(0 0 20px rgba(255,215,0,0.4));
        }

        /* Radial glow spots */
        .gs-top {
          animation: pulseGlow 4s ease-in-out infinite;
        }
        .gs-left  { animation: pulseGlowStatic 6s ease-in-out infinite 1s; }
        .gs-right { animation: pulseGlowStatic 5s ease-in-out infinite 2s; }

        /* HUD dot blink */
        .hud-dot { animation: blink 2s ease-in-out infinite; }

        /* Eyebrow tag shimmer sweep */
        .eyebrow-tag {
          animation: slideDown 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
          position: relative;
          overflow: hidden;
        }
        .eyebrow-tag::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent);
          animation: shimmer 3s ease-in-out infinite 1s;
        }

        /* Staggered slide-up animations */
        .anim-title-1  { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .anim-title-2  { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
        .anim-title-3  { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .anim-divider  { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.60s both; }
        .anim-tagline  { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
        .anim-stats    { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.70s both; }
        .anim-tags     { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s both; }
        .anim-cta      { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.82s both; }
        .anim-scroll   { animation: slideUp 1s   cubic-bezier(0.16,1,0.3,1) 1.10s both; }

        /* Stat card clip + hover overlay */
        .stat-card {
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .stat-card:hover::before { opacity: 1; }

        /* Button clip-paths */
        .btn-primary { clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%); }
        .btn-outline  { clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%); }

        /* Primary button glow ring */
        .btn-primary::after {
          content: '';
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: linear-gradient(135deg, #FFD700, transparent, #C9A84C);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-primary:hover::after { opacity: 0.4; }

        /* Outline button inner glow */
        .btn-outline::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-outline:hover::before { opacity: 1; }

        /* Arrow hover nudge */
        .btn-primary:hover .btn-arrow,
        .btn-outline:hover  .btn-arrow { transform: translateX(4px); }

        /* Scroll track animated line */
        .scroll-track::after {
          content: '';
          position: absolute;
          top: -50%; left: 0;
          width: 100%; height: 50%;
          background: linear-gradient(to bottom, transparent, #C9A84C, rgba(201,168,76,0.3));
          animation: trackDown 2s ease-in-out infinite;
        }

        /* Side labels vertical text */
        .side-label { writing-mode: vertical-lr; }
        .sl-left    { transform: translateY(-50%) rotate(180deg); }
        .sl-right   { transform: translateY(-50%); }

        /* CRT scanline overlay */
        .scanlines {
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,0.08) 3px,
            rgba(0,0,0,0.08) 4px
          );
        }
      `}</style>

      <section
        id="home"
        className="font-exo relative min-h-screen flex items-center justify-center overflow-hidden
          bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#1a1200_0%,#08080F_50%,#000008_100%)]"
      >
        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70" />

        {/* Atmospheric glow spots */}
        <div
          className="gs-top absolute rounded-full pointer-events-none z-1
            w-175 h-175 -top-75 left-1/2
            bg-[radial-gradient(circle,rgba(201,168,76,0.18)_0%,transparent_65%)]"
          style={{
            transform: `translateX(calc(-50% + ${mousePos.x * 0.2}px))`,
          }}
        />
        <div
          className="gs-left absolute rounded-full pointer-events-none z-1
            w-100 h-100 bottom-[10%] -left-25
            bg-[radial-gradient(circle,rgba(255,215,0,0.08)_0%,transparent_70%)]"
        />
        <div
          className="gs-right absolute rounded-full pointer-events-none z-1
            w-87.5 h-87.5 top-[20%] -right-20
            bg-[radial-gradient(circle,rgba(201,168,76,0.1)_0%,transparent_70%)]"
        />

        {/* CRT scanlines */}
        <div className="scanlines absolute inset-0 z-2 pointer-events-none" />

        {/* Corner HUD brackets */}
        <div className="hidden md:block absolute w-15 h-15 z-10 pointer-events-none top-8 left-8 border-t border-l border-[#C9A84C]" />
        <div className="hidden md:block absolute w-15 h-15 z-10 pointer-events-none top-8 right-8 border-t border-r border-[#C9A84C]" />
        <div className="hidden md:block absolute w-15 h-15 z-10 pointer-events-none bottom-8 left-8 border-b border-l border-[#C9A84C]" />
        <div className="hidden md:block absolute w-15 h-15 z-10 pointer-events-none bottom-8 right-8 border-b border-r border-[#C9A84C]" />

        {/* Top HUD bar */}
        {/* <div
          className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6
          font-rajdhani text-[10px] tracking-[0.2em] uppercase text-[rgba(201,168,76,0.5)]"
        >
          <span>SYS.ONLINE</span>
          <div className="hud-dot w-1.5 h-1.5 rounded-full bg-[#C9A84C] shadow-[0_0_6px_rgba(201,168,76,0.6),0_0_12px_rgba(201,168,76,0.6)]" />
          <span>RBL · DIGITAL · 2025</span>
          <div className="hud-dot w-1.5 h-1.5 rounded-full bg-[#C9A84C] shadow-[0_0_6px_rgba(201,168,76,0.6),0_0_12px_rgba(201,168,76,0.6)]" />
          <span>COLOMBO · LK</span>
        </div>*/}

        {/* Side labels */}
        <span
          className="side-label sl-left hidden md:block absolute left-5 top-1/2 z-10 pointer-events-none
          font-rajdhani text-[10px] tracking-[0.3em] uppercase text-[rgba(201,168,76,0.25)]"
        >
          Digital Marketing Excellence
        </span>
        <span
          className="side-label sl-right hidden md:block absolute right-5 top-1/2 z-10 pointer-events-none
          font-rajdhani text-[10px] tracking-[0.3em] uppercase text-[rgba(201,168,76,0.25)]"
        >
          Premier Partner · Sri Lanka
        </span>

        {/* Main content */}
        <div
          className={`relative z-15 text-center px-12 max-w-250 w-full
            transition-[opacity,transform] duration-900 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7.5"}`}
        >
          {/* Eyebrow tag */}
          <div
            className="eyebrow-tag inline-flex items-center gap-2.5
            bg-[rgba(255,255,255,0.03)] border border-[rgba(201,168,76,0.2)]
            backdrop-blur-xl px-5 py-2 rounded-sm
            font-rajdhani text-[12px] font-medium tracking-[0.3em] uppercase text-[#C9A84C] mb-9"
          >
            <div className="w-1.25 h-1.25 rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.6)]" />
            Welcome to Rithu Business Lanka Marketing
            <div className="w-1.25 h-1.25 rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.6)]" />
          </div>

          {/* Main title */}
          <h1
            className="font-cinzel font-black leading-[0.95] tracking-[-0.01em] mb-1.5
            text-[clamp(42px,7.5vw,88px)]"
          >
            <span className="anim-title-2 gold-text-flow block">RBL</span>
            <span className="anim-title-1 block text-[rgba(255,255,255,0.9)] [text-shadow:0_0_40px_rgba(255,255,255,0.1)]">
              Your Premier
            </span>
            <span className="anim-title-2 gold-text-flow block">
              Digital Partner
            </span>
            <span className="anim-title-3 block text-[0.6em] font-normal tracking-[0.25em] text-[rgba(255,255,255,0.35)] mt-2">
              Rithu Bussiness Lanka Marketing Excellence
            </span>
          </h1>

          {/* Gold divider */}
          <div className="anim-divider flex items-center justify-center gap-4 my-7">
            <div className="flex-1 max-w-30 h-px bg-[linear-gradient(90deg,transparent,#C9A84C)]" />
            <div className="w-2 h-2 bg-[#C9A84C] rotate-45 shadow-[0_0_10px_rgba(201,168,76,0.6),0_0_20px_rgba(201,168,76,0.6)]" />
            <div className="flex-1 max-w-30 h-px bg-[linear-gradient(90deg,#C9A84C,transparent)]" />
          </div>

          {/* Tagline */}
          <p
            className="anim-tagline font-exo font-extralight text-[rgba(255,255,255,0.5)] tracking-[0.05em] mb-12
            text-[clamp(15px,2vw,20px)]"
          >
            Empowering brands through{" "}
            <span className="text-[#C9A84C] font-normal">Social Media</span>,{" "}
            <span className="text-[#C9A84C] font-normal">Content Creation</span>{" "}
            &amp;{" "}
            <span className="text-[#C9A84C] font-normal">Digital Growth</span>
          </p>

          {/* Stats */}
          <div className="anim-stats flex justify-center gap-4 mb-13 flex-wrap">
            {stats.map((s) => (
              <div
                key={s.lbl}
                className="stat-card relative bg-[rgba(255,255,255,0.03)] border border-[rgba(201,168,76,0.2)]
                  backdrop-blur-2xl px-7 py-4.5 text-center overflow-hidden cursor-default
                  transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:border-[rgba(201,168,76,0.5)] hover:shadow-[0_0_30px_rgba(201,168,76,0.15),inset_0_0_30px_rgba(201,168,76,0.05)]
                  hover:-translate-y-1"
              >
                <div
                  className="font-rajdhani text-[32px] font-bold text-[#C9A84C] leading-none
                  [text-shadow:0_0_20px_rgba(255,215,0,0.5)]"
                >
                  {s.num}
                </div>
                <div className="font-rajdhani text-[10px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.3)] mt-1">
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>

          {/* Service tags */}
          <div className="anim-tags flex justify-center gap-2.5 flex-wrap mb-13">
            {services.map((t) => (
              <span
                key={t}
                className="font-rajdhani text-[11px] font-medium tracking-[0.2em] uppercase
                  text-[rgba(201,168,76,0.7)] px-4 py-1.75
                  border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)]
                  transition-all duration-300
                  hover:text-[#C9A84C] hover:border-[rgba(201,168,76,0.4)]
                  hover:bg-[rgba(201,168,76,0.08)] hover:shadow-[0_0_16px_rgba(201,168,76,0.1)]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="anim-cta flex gap-4 justify-center flex-wrap">
            <a
              href="#services"
              className="btn-primary relative inline-flex items-center gap-3 px-11 py-4.25
                bg-[linear-gradient(135deg,#C9A84C,#FFD700,#C9A84C)] bg-size-[200%_auto]
                text-black font-rajdhani text-[13px] font-bold tracking-[0.2em] uppercase no-underline
                border-none cursor-pointer overflow-hidden
                shadow-[0_0_25px_rgba(255,215,0,0.3),0_0_60px_rgba(201,168,76,0.15)]
                transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:bg-position-[right_center]
                hover:shadow-[0_0_40px_rgba(255,215,0,0.5),0_0_80px_rgba(201,168,76,0.3)]
                hover:-translate-y-0.75 hover:scale-[1.02]"
            >
              Explore Services
              <span className="btn-arrow inline-block transition-transform duration-300">
                ›
              </span>
            </a>
            <a
              href="#contact"
              className="btn-outline relative inline-flex items-center gap-3 px-11 py-4
                bg-[rgba(255,255,255,0.03)] border border-[rgba(201,168,76,0.35)] backdrop-blur-xl
                text-[#C9A84C] font-rajdhani text-[13px] font-semibold tracking-[0.2em] uppercase no-underline
                cursor-pointer overflow-hidden
                transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:border-[#C9A84C]
                hover:shadow-[0_0_25px_rgba(201,168,76,0.2),inset_0_0_25px_rgba(201,168,76,0.05)]
                hover:-translate-y-0.75"
            >
              Get in Touch
              <span className="btn-arrow inline-block transition-transform duration-300">
                ›
              </span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#services"
          className="anim-scroll absolute bottom-9 left-1/2 -translate-x-1/2 z-20
            flex flex-col items-center gap-2 no-underline"
        >
          <span className="font-rajdhani text-[9px] tracking-[0.35em] uppercase text-[rgba(201,168,76,0.4)]">
            Scroll
          </span>
          <div className="scroll-track relative w-px h-12.5 bg-[rgba(201,168,76,0.15)] overflow-hidden" />
        </a>
      </section>
    </>
  );
};

export default Hero;
