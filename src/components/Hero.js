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

    // Create grid nodes
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

      // Update positions with gentle drift
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (Math.abs(p.x - p.bx) > 25) p.vx *= -1;
        if (Math.abs(p.y - p.by) > 25) p.vy *= -1;
      });

      // Draw connecting lines
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

      // Draw nodes
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700;900&family=Exo+2:wght@200;300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold:       #C9A84C;
          --gold-bright:#FFD700;
          --gold-glow:  rgba(201,168,76,0.6);
          --gold-dim:   rgba(201,168,76,0.15);
          --neon-gold:  #FFD700;
          --dark:       #020205;
          --dark-2:     #08080F;
          --glass-bg:   rgba(255,255,255,0.03);
          --glass-border: rgba(201,168,76,0.2);
        }

        body { background: var(--dark); }

        /* ── SECTION ── */
        .rbl-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, #1a1200 0%, var(--dark-2) 50%, #000008 100%);
          overflow: hidden;
          font-family: 'Exo 2', sans-serif;
        }

        /* ── CANVAS ── */
        .rbl-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.7;
        }

        /* ── RADIAL GLOW SPOTS ── */
        .glow-spot {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        }
        .gs-top {
          width: 700px; height: 700px;
          top: -300px; left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 65%);
          animation: pulseGlow 4s ease-in-out infinite;
        }
        .gs-left {
          width: 400px; height: 400px;
          bottom: 10%; left: -100px;
          background: radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%);
          animation: pulseGlow 6s ease-in-out infinite 1s;
        }
        .gs-right {
          width: 350px; height: 350px;
          top: 20%; right: -80px;
          background: radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%);
          animation: pulseGlow 5s ease-in-out infinite 2s;
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
        }

        /* ── SCAN LINES ── */
        .scanlines {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,0.08) 3px,
            rgba(0,0,0,0.08) 4px
          );
        }

        /* ── CORNER ACCENTS ── */
        .corner {
          position: absolute;
          width: 60px; height: 60px;
          z-index: 10;
          pointer-events: none;
        }
        .corner-tl { top: 32px; left: 32px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
        .corner-tr { top: 32px; right: 32px; border-top: 1px solid var(--gold); border-right: 1px solid var(--gold); }
        .corner-bl { bottom: 32px; left: 32px; border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold); }
        .corner-br { bottom: 32px; right: 32px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }

        /* ── HUD STATUS BAR (top) ── */
        .hud-bar {
          position: absolute;
          top: 20px; left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 24px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.5);
        }
        .hud-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 6px var(--gold-glow), 0 0 12px var(--gold-glow);
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ── MAIN CONTENT ── */
        .rbl-content {
          position: relative;
          z-index: 15;
          text-align: center;
          padding: 0 24px;
          max-width: 1000px;
          width: 100%;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .rbl-content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── EYEBROW TAG ── */
        .eyebrow-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(20px);
          padding: 8px 20px;
          border-radius: 2px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 36px;
          position: relative;
          overflow: hidden;
          animation: slideDown 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }
        .eyebrow-tag::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent);
          animation: shimmer 3s ease-in-out infinite 1s;
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── MAIN TITLE ── */
        .main-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(42px, 7.5vw, 88px);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
          animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .title-line-1 {
          display: block;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 0 40px rgba(255,255,255,0.1);
        }
        .title-line-2 {
          display: block;
          background: linear-gradient(90deg, #C9A84C 0%, #FFD700 35%, #FFF8DC 55%, #FFD700 75%, #C9A84C 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldFlow 4s linear infinite, slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both;
          filter: drop-shadow(0 0 20px rgba(255,215,0,0.4));
        }
        @keyframes goldFlow {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .title-line-3 {
          display: block;
          font-size: 0.6em;
          font-weight: 400;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.35);
          margin-top: 8px;
          animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both;
        }

        /* ── NEON DIVIDER ── */
        .neon-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 28px 0;
          animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s both;
        }
        .nd-line {
          flex: 1;
          max-width: 120px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold));
        }
        .nd-line.right {
          background: linear-gradient(90deg, var(--gold), transparent);
        }
        .nd-diamond {
          width: 8px; height: 8px;
          background: var(--gold);
          transform: rotate(45deg);
          box-shadow: 0 0 10px var(--gold-glow), 0 0 20px var(--gold-glow);
        }

        /* ── TAGLINE ── */
        .tagline {
          font-family: 'Exo 2', sans-serif;
          font-size: clamp(15px, 2vw, 20px);
          font-weight: 200;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.05em;
          margin-bottom: 48px;
          animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both;
        }
        .tagline span {
          color: var(--gold);
          font-weight: 400;
        }

        /* ── GLASS STAT CARDS ── */
        .stats-row {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 52px;
          flex-wrap: wrap;
          animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both;
        }
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.2);
          backdrop-filter: blur(24px);
          padding: 18px 28px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          cursor: default;
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
        .stat-card:hover {
          border-color: rgba(201,168,76,0.5);
          box-shadow: 0 0 30px rgba(201,168,76,0.15), inset 0 0 30px rgba(201,168,76,0.05);
          transform: translateY(-4px);
        }
        .stat-card:hover::before { opacity: 1; }
        .stat-num {
          font-family: 'Rajdhani', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: var(--gold);
          line-height: 1;
          text-shadow: 0 0 20px rgba(255,215,0,0.5);
        }
        .stat-lbl {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-top: 4px;
          font-family: 'Rajdhani', sans-serif;
        }

        /* ── SERVICE TAGS ── */
        .service-tags {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 52px;
          animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s both;
        }
        .stag {
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.7);
          padding: 7px 16px;
          border: 1px solid rgba(201,168,76,0.15);
          background: rgba(201,168,76,0.04);
          transition: all 0.3s;
        }
        .stag:hover {
          color: var(--gold);
          border-color: rgba(201,168,76,0.4);
          background: rgba(201,168,76,0.08);
          box-shadow: 0 0 16px rgba(201,168,76,0.1);
        }

        /* ── CTA BUTTONS ── */
        .cta-row {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.82s both;
        }

        .btn-neon-gold {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 17px 44px;
          background: linear-gradient(135deg, #C9A84C, #FFD700, #C9A84C);
          background-size: 200% auto;
          color: #000;
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 25px rgba(255,215,0,0.3), 0 0 60px rgba(201,168,76,0.15);
          overflow: hidden;
        }
        .btn-neon-gold:hover {
          background-position: right center;
          box-shadow: 0 0 40px rgba(255,215,0,0.5), 0 0 80px rgba(201,168,76,0.3);
          transform: translateY(-3px) scale(1.02);
        }
        .btn-neon-gold::after {
          content: '';
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: linear-gradient(135deg, #FFD700, transparent, #C9A84C);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-neon-gold:hover::after { opacity: 0.4; }

        .btn-glass {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 44px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.35);
          backdrop-filter: blur(20px);
          color: var(--gold);
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          overflow: hidden;
        }
        .btn-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-glass:hover {
          border-color: var(--gold);
          box-shadow: 0 0 25px rgba(201,168,76,0.2), inset 0 0 25px rgba(201,168,76,0.05);
          transform: translateY(-3px);
        }
        .btn-glass:hover::before { opacity: 1; }

        /* Arrow icon */
        .btn-arrow {
          display: inline-block;
          transition: transform 0.3s;
        }
        .btn-neon-gold:hover .btn-arrow,
        .btn-glass:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* ── SCROLL INDICATOR ── */
        .scroll-ind {
          position: absolute;
          bottom: 36px; left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 20;
          text-decoration: none;
          animation: slideUp 1s cubic-bezier(0.16,1,0.3,1) 1.1s both;
        }
        .scroll-txt {
          font-family: 'Rajdhani', sans-serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.4);
        }
        .scroll-track {
          width: 1px; height: 50px;
          background: rgba(201,168,76,0.15);
          position: relative;
          overflow: hidden;
        }
        .scroll-track::after {
          content: '';
          position: absolute;
          top: -50%;
          left: 0;
          width: 100%; height: 50%;
          background: linear-gradient(to bottom, transparent, var(--gold), rgba(201,168,76,0.3));
          animation: trackDown 2s ease-in-out infinite;
        }
        @keyframes trackDown {
          0% { top: -50%; }
          100% { top: 120%; }
        }

        /* ── FLOATING SIDE LABELS ── */
        .side-label {
          position: absolute;
          font-family: 'Rajdhani', sans-serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.25);
          z-index: 10;
          writing-mode: vertical-lr;
          pointer-events: none;
        }
        .sl-left { left: 20px; top: 50%; transform: translateY(-50%) rotate(180deg); }
        .sl-right { right: 20px; top: 50%; transform: translateY(-50%); }

        @media (max-width: 768px) {
          .side-label, .corner { display: none; }
          .stats-row { gap: 10px; }
          .stat-card { padding: 14px 18px; }
          .stat-num { font-size: 26px; }
        }
      `}</style>

      <section id="home" className="rbl-hero">
        {/* Particle canvas */}
        <canvas ref={canvasRef} className="rbl-canvas" />

        {/* Atmospheric glows */}
        <div
          className="glow-spot gs-top"
          style={{
            transform: `translateX(calc(-50% + ${mousePos.x * 0.2}px))`,
          }}
        />
        <div className="glow-spot gs-left" />
        <div className="glow-spot gs-right" />

        {/* CRT scanlines */}
        <div className="scanlines" />

        {/* Corner HUD brackets */}
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        {/* Top HUD bar */}
        <div className="hud-bar">
          <span>SYS.ONLINE</span>
          <div className="hud-dot" />
          <span>RBL · DIGITAL · 2025</span>
          <div className="hud-dot" />
          <span>COLOMBO · LK</span>
        </div>

        {/* Side labels */}
        <span className="side-label sl-left">Digital Marketing Excellence</span>
        <span className="side-label sl-right">Premier Partner · Sri Lanka</span>

        {/* Main content */}
        <div className={`rbl-content ${loaded ? "visible" : ""}`}>
          {/* Eyebrow tag */}
          <div className="eyebrow-tag">
            <div
              style={{
                width: 5,
                height: 5,
                background: "var(--gold)",
                borderRadius: "50%",
                boxShadow: "0 0 8px var(--gold-glow)",
              }}
            />
            Welcome to Rithu Business Lanka Marketing
            <div
              style={{
                width: 5,
                height: 5,
                background: "var(--gold)",
                borderRadius: "50%",
                boxShadow: "0 0 8px var(--gold-glow)",
              }}
            />
          </div>

          {/* Title */}
          <h1 className="main-title">
            <span className="title-line-1">Your Premier</span>
            <span className="title-line-2">Digital Partner</span>
            <span className="title-line-3">Lanka · Marketing · Excellence</span>
          </h1>

          {/* Gold divider */}
          <div className="neon-divider">
            <div className="nd-line" />
            <div className="nd-diamond" />
            <div className="nd-line right" />
          </div>

          {/* Tagline */}
          <p className="tagline">
            Empowering brands through <span>Social Media</span>,{" "}
            <span>Content Creation</span> &amp; <span>Digital Growth</span>
          </p>

          {/* Stats */}
          <div className="stats-row">
            {[
              { num: "200+", lbl: "Brands Grown" },
              { num: "5×", lbl: "Average ROI" },
              { num: "98%", lbl: "Client Satisfaction" },
              { num: "3yr", lbl: "Sri Lanka Expertise" },
            ].map((s) => (
              <div className="stat-card" key={s.lbl}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Service tags */}
          <div className="service-tags">
            {[
              "Social Media",
              "Content Creation",
              "SEO Strategy",
              "Brand Identity",
              "Paid Ads",
            ].map((t) => (
              <span className="stag" key={t}>
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="cta-row">
            <a href="#services" className="btn-neon-gold">
              Explore Services
              <span className="btn-arrow">›</span>
            </a>
            <a href="#contact" className="btn-glass">
              Get in Touch
              <span className="btn-arrow">›</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#services" className="scroll-ind">
          <span className="scroll-txt">Scroll</span>
          <div className="scroll-track" />
        </a>
      </section>
    </>
  );
};

export default Hero;
