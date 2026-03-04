"use client";
import React, { useEffect, useRef, useState } from "react";

const Hero = () => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

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
            ctx.strokeStyle = `rgba(99, 179, 237, ${op})`;
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
        ctx.fillStyle = `rgba(148, 210, 255, ${p.alpha})`;
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
        @keyframes blueFlow {
          0%   { background-position: 0%   center; }
          100% { background-position: 200% center; }
        }
        @keyframes trackDown {
          0%   { top: -50%;  }
          100% { top:  120%; }
        }

        .blue-text-flow {
          background: linear-gradient(90deg, #2B6CB0 0%, #63B3ED 30%, #C8D8E8 55%, #63B3ED 75%, #2B6CB0 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: blueFlow 4s linear infinite;
          filter: drop-shadow(0 0 22px rgba(99,179,237,0.5));
        }

        .gs-top   { animation: pulseGlow 4s ease-in-out infinite; }
        .gs-left  { animation: pulseGlowStatic 6s ease-in-out infinite 1s; }
        .gs-right { animation: pulseGlowStatic 5s ease-in-out infinite 2s; }
        .hud-dot  { animation: blink 2s ease-in-out infinite; }

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
          background: linear-gradient(90deg, transparent, rgba(99,179,237,0.1), transparent);
          animation: shimmer 3s ease-in-out infinite 1s;
        }

        .anim-title-1 { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .anim-title-2 { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
        .anim-title-3 { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .anim-divider { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.60s both; }
        .anim-tagline { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
        .anim-stats   { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.70s both; }
        .anim-tags    { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s both; }
        .anim-cta     { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.82s both; }
        .anim-scroll  { animation: slideUp 1s   cubic-bezier(0.16,1,0.3,1) 1.10s both; }

        .stat-card {
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .stat-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(99,179,237,0.08) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .stat-card:hover::before { opacity: 1; }

        .btn-primary { clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%); }
        .btn-outline  { clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%); }

        .btn-primary::after {
          content: '';
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: linear-gradient(135deg, #A8D8FF, transparent, #63B3ED);
          z-index: -1; opacity: 0; transition: opacity 0.3s;
        }
        .btn-primary:hover::after { opacity: 0.4; }

        .btn-outline::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(99,179,237,0.12), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .btn-outline:hover::before { opacity: 1; }

        .btn-primary:hover .btn-arrow,
        .btn-outline:hover  .btn-arrow { transform: translateX(4px); }

        .scroll-track::after {
          content: '';
          position: absolute;
          top: -50%; left: 0;
          width: 100%; height: 50%;
          background: linear-gradient(to bottom, transparent, #63B3ED, rgba(99,179,237,0.3));
          animation: trackDown 2s ease-in-out infinite;
        }

        .side-label { writing-mode: vertical-lr; }
        .sl-left  { transform: translateY(-50%) rotate(180deg); }
        .sl-right { transform: translateY(-50%); }

        .scanlines {
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px, transparent 3px,
            rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
        }
      `}</style>

      <section
        id="home"
        className="font-exo relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #1a0d2e 0%, #0f0820 50%, #07050f 100%)",
          /* paddingTop pushes content below the fixed header (~88px tall) */
          paddingTop: "88px",
        }}
      >
        {/* Particle canvas — fills the full section behind everything */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 opacity-70"
          style={{ zIndex: 0 }}
        />

        {/* Atmospheric glow spots */}
        <div
          className="gs-top absolute rounded-full pointer-events-none"
          style={{
            zIndex: 1,
            width: "700px",
            height: "700px",
            top: "-300px",
            left: "50%",
            background:
              "radial-gradient(circle, rgba(99,179,237,0.18) 0%, transparent 65%)",
            transform: `translateX(calc(-50% + ${mousePos.x * 0.2}px))`,
          }}
        />
        <div
          className="gs-left absolute rounded-full pointer-events-none"
          style={{
            zIndex: 1,
            width: "400px",
            height: "400px",
            bottom: "10%",
            left: "-100px",
            background:
              "radial-gradient(circle, rgba(99,179,237,0.09) 0%, transparent 70%)",
          }}
        />
        <div
          className="gs-right absolute rounded-full pointer-events-none"
          style={{
            zIndex: 1,
            width: "350px",
            height: "350px",
            top: "20%",
            right: "-80px",
            background:
              "radial-gradient(circle, rgba(168,216,255,0.10) 0%, transparent 70%)",
          }}
        />

        {/* CRT scanlines */}
        <div
          className="scanlines absolute inset-0 pointer-events-none"
          style={{ zIndex: 2 }}
        />

        {/* Corner HUD brackets */}
        {[
          { cls: "top-8 left-8", border: "borderTop borderLeft" },
          { cls: "top-8 right-8", border: "borderTop borderRight" },
          { cls: "bottom-8 left-8", border: "borderBottom borderLeft" },
          { cls: "bottom-8 right-8", border: "borderBottom borderRight" },
        ].map(({ cls }, i) => (
          <div
            key={i}
            className={`hidden md:block absolute w-14 h-14 pointer-events-none ${cls}`}
            style={{
              zIndex: 10,
              borderTop: i < 2 ? "1px solid rgba(99,179,237,0.55)" : undefined,
              borderBottom:
                i >= 2 ? "1px solid rgba(99,179,237,0.55)" : undefined,
              borderLeft:
                i % 2 === 0 ? "1px solid rgba(99,179,237,0.55)" : undefined,
              borderRight:
                i % 2 === 1 ? "1px solid rgba(99,179,237,0.55)" : undefined,
            }}
          />
        ))}

        {/* Side labels */}
        <span
          className="side-label sl-left hidden md:block absolute left-5 top-1/2 pointer-events-none font-rajdhani"
          style={{
            zIndex: 10,
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(99,179,237,0.28)",
          }}
        >
          Digital Marketing Excellence
        </span>
        <span
          className="side-label sl-right hidden md:block absolute right-5 top-1/2 pointer-events-none font-rajdhani"
          style={{
            zIndex: 10,
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(99,179,237,0.28)",
          }}
        >
          Premier Partner · Sri Lanka
        </span>

        {/* ── Main content ── */}
        <div
          className={`relative text-center px-6 md:px-12 w-full transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ zIndex: 15, maxWidth: "1000px", margin: "0 auto" }}
        >
          {/* Eyebrow tag */}
          <div
            className="eyebrow-tag inline-flex items-center gap-2.5 font-rajdhani"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(99,179,237,0.25)",
              backdropFilter: "blur(16px)",
              padding: "8px 20px",
              borderRadius: "2px",
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#63B3ED",
              marginBottom: "32px",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#63B3ED",
                boxShadow: "0 0 8px rgba(99,179,237,0.7)",
                flexShrink: 0,
              }}
            />
            Welcome to Rithu Business Lanka Marketing
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#63B3ED",
                boxShadow: "0 0 8px rgba(99,179,237,0.7)",
                flexShrink: 0,
              }}
            />
          </div>

          {/* Main title */}
          <h1
            className="font-cinzel font-black leading-[0.95] mb-2"
            style={{
              fontSize: "clamp(40px, 7.5vw, 88px)",
              letterSpacing: "-0.01em",
            }}
          >
            <span className="anim-title-2 blue-text-flow block">RBL</span>
            <span
              className="anim-title-1 block"
              style={{
                color: "rgba(200,216,232,0.92)",
                textShadow: "0 0 40px rgba(99,179,237,0.15)",
              }}
            >
              Your Premier
            </span>
            <span className="anim-title-2 blue-text-flow block">
              Digital Partner
            </span>
            <span
              className="anim-title-3 block font-normal"
              style={{
                fontSize: "0.55em",
                letterSpacing: "0.25em",
                color: "rgba(200,216,232,0.3)",
                marginTop: "10px",
              }}
            >
              Rithu Business Lanka Marketing Excellence
            </span>
          </h1>

          {/* Divider */}
          <div className="anim-divider flex items-center justify-center gap-4 my-6">
            <div
              style={{
                flex: 1,
                maxWidth: "120px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #63B3ED)",
              }}
            />
            <div
              style={{
                width: "8px",
                height: "8px",
                background: "#63B3ED",
                transform: "rotate(45deg)",
                boxShadow:
                  "0 0 10px rgba(99,179,237,0.7), 0 0 20px rgba(99,179,237,0.4)",
              }}
            />
            <div
              style={{
                flex: 1,
                maxWidth: "120px",
                height: "1px",
                background: "linear-gradient(90deg, #63B3ED, transparent)",
              }}
            />
          </div>

          {/* Tagline */}
          <p
            className="anim-tagline font-exo font-extralight"
            style={{
              color: "rgba(200,216,232,0.5)",
              letterSpacing: "0.05em",
              marginBottom: "40px",
              fontSize: "clamp(14px, 2vw, 19px)",
            }}
          >
            Empowering brands through{" "}
            <span style={{ color: "#63B3ED", fontWeight: 400 }}>
              Social Media
            </span>
            ,{" "}
            <span style={{ color: "#63B3ED", fontWeight: 400 }}>
              Content Creation
            </span>{" "}
            &amp;{" "}
            <span style={{ color: "#63B3ED", fontWeight: 400 }}>
              Digital Growth
            </span>
          </p>

          {/* Stats */}
          <div
            className="anim-stats flex justify-center gap-3 flex-wrap"
            style={{ marginBottom: "44px" }}
          >
            {stats.map((s) => (
              <div
                key={s.lbl}
                className="stat-card relative overflow-hidden cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(99,179,237,0.2)",
                  backdropFilter: "blur(24px)",
                  padding: "16px 24px",
                  textAlign: "center",
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.55)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(99,179,237,0.2), inset 0 0 30px rgba(99,179,237,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="font-rajdhani font-bold leading-none"
                  style={{
                    fontSize: "30px",
                    color: "#63B3ED",
                    textShadow: "0 0 20px rgba(99,179,237,0.6)",
                  }}
                >
                  {s.num}
                </div>
                <div
                  className="font-rajdhani"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(200,216,232,0.35)",
                    marginTop: "4px",
                  }}
                >
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>

          {/* Service tags */}
          <div
            className="anim-tags flex justify-center gap-2 flex-wrap"
            style={{ marginBottom: "44px" }}
          >
            {services.map((t) => (
              <span
                key={t}
                className="font-rajdhani"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(99,179,237,0.7)",
                  padding: "6px 14px",
                  border: "1px solid rgba(99,179,237,0.15)",
                  background: "rgba(99,179,237,0.04)",
                  transition: "all 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#A8D8FF";
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.45)";
                  e.currentTarget.style.background = "rgba(99,179,237,0.09)";
                  e.currentTarget.style.boxShadow =
                    "0 0 16px rgba(99,179,237,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(99,179,237,0.7)";
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.15)";
                  e.currentTarget.style.background = "rgba(99,179,237,0.04)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="anim-cta flex gap-4 justify-center flex-wrap">
            <a
              href="#services"
              className="btn-primary relative inline-flex items-center gap-3 font-rajdhani no-underline overflow-hidden"
              style={{
                padding: "16px 40px",
                background:
                  "linear-gradient(135deg, #2B6CB0, #63B3ED, #2B6CB0)",
                backgroundSize: "200% auto",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "0 0 25px rgba(99,179,237,0.35), 0 0 60px rgba(99,179,237,0.15)",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundPosition = "right center";
                e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(99,179,237,0.55), 0 0 80px rgba(99,179,237,0.3)";
                e.currentTarget.style.transform =
                  "translateY(-3px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundPosition = "left center";
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(99,179,237,0.35), 0 0 60px rgba(99,179,237,0.15)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              Explore Services
              <span
                className="btn-arrow inline-block"
                style={{ transition: "transform 0.3s" }}
              >
                ›
              </span>
            </a>
            <a
              href="#contact"
              className="btn-outline relative inline-flex items-center gap-3 font-rajdhani no-underline overflow-hidden"
              style={{
                padding: "15px 40px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(99,179,237,0.38)",
                backdropFilter: "blur(16px)",
                color: "#63B3ED",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#63B3ED";
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(99,179,237,0.22), inset 0 0 25px rgba(99,179,237,0.06)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,179,237,0.38)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get in Touch
              <span
                className="btn-arrow inline-block"
                style={{ transition: "transform 0.3s" }}
              >
                ›
              </span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#services"
          className="anim-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 no-underline"
          style={{ zIndex: 20 }}
        >
          <span
            className="font-rajdhani"
            style={{
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(99,179,237,0.45)",
            }}
          >
            Scroll
          </span>
          <div
            className="scroll-track relative overflow-hidden"
            style={{
              width: "1px",
              height: "48px",
              background: "rgba(99,179,237,0.15)",
            }}
          />
        </a>
      </section>
    </>
  );
};

export default Hero;
