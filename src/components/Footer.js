"use client";

import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3500);
    }
  };

  const socials = [
    { name: "Facebook", short: "FB", color: "hover:bg-[#1877F2]" },
    { name: "Instagram", short: "IG", color: "hover:bg-[#E1306C]" },
    { name: "TikTok", short: "TT", color: "hover:bg-[#ff0050]" },
    { name: "WhatsApp", short: "WA", color: "hover:bg-[#25D366]" },
    { name: "LinkedIn", short: "LIN", color: "hover:bg-[#0A66C2]" },
    { name: "Twitter", short: "X", color: "hover:bg-[#1DA1F2]" },
  ];

  const services = [
    "Facebook Marketing",
    "Instagram Growth",
    "TikTok Marketing",
    "WhatsApp Business",
    "Logo Design",
    "AI Video Creation",
  ];

  const links = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Social Media", href: "#social-media" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700;900&family=Exo+2:wght@200;300;400;500&display=swap');

        .font-cinzel   { font-family: 'Cinzel', serif; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-exo      { font-family: 'Exo 2', sans-serif; }

        @keyframes fgShimmer { 0%{left:-100%;} 100%{left:200%;} }
        @keyframes fgBlink   { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        @keyframes fgGoldFlow{ 0%{background-position:0% center;} 100%{background-position:200% center;} }
        @keyframes fgFadeIn  { from{opacity:0;transform:translateY(6px);} to{opacity:1;transform:translateY(0);} }
        @keyframes fgPulse   { 0%,100%{opacity:1;box-shadow:0 0 8px rgba(74,222,128,0.7);} 50%{opacity:0.4;box-shadow:0 0 3px rgba(74,222,128,0.3);} }

        .anim-shimmer  { animation: fgShimmer 3.5s ease-in-out infinite; }
        .anim-blink    { animation: fgBlink 2s ease-in-out infinite; }
        .anim-gold     { animation: fgGoldFlow 4s linear infinite; background-size: 200% auto; }
        .anim-fadein   { animation: fgFadeIn 0.4s ease; }
        .anim-pulse    { animation: fgPulse 2.5s ease-in-out infinite; }

        .clip-eyebrow  { clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%); }
        .clip-btn-lg   { clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%); }
        .clip-btn-sm   { clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }

        .gold-gradient-text {
          background: linear-gradient(90deg, #C9A84C 0%, #FFD700 35%, #FFF8DC 55%, #FFD700 75%, #C9A84C 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 18px rgba(255,215,0,0.35));
        }
        .logo-r {
          background: linear-gradient(135deg, #C9A84C, #FFD700);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .eyebrow-shimmer::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent);
          animation: fgShimmer 3.5s ease-in-out infinite;
        }

        .fg-link-item::before {
          content: '›'; color: #C9A84C; opacity: 0; font-size: 16px;
          transition: all 0.25s ease; transform: translateX(-6px);
          margin-right: 8px; display: inline-block;
        }
        .fg-link-item:hover::before { opacity: 1; transform: translateX(0); }

        .soc-btn::before {
          content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s;
        }
        .soc-btn:hover::before { opacity: 1; }

        .fg-divider-grid {
          background-image: linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 20%, transparent 80%);
        }
      `}</style>

      <footer
        className="font-exo relative overflow-hidden text-white/75"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 100%, #1a1200 0%, #08080F 55%, #000008 100%)",
        }}
      >
        {/* Ambient glows */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 700,
            height: 300,
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            filter: "blur(90px)",
            background:
              "radial-gradient(ellipse, rgba(201,168,76,0.13) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 350,
            height: 350,
            bottom: -80,
            left: -60,
            filter: "blur(90px)",
            background:
              "radial-gradient(circle, rgba(255,215,0,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 300,
            height: 300,
            bottom: -60,
            right: -40,
            filter: "blur(90px)",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Grid bg */}
        <div className="fg-divider-grid absolute inset-0 pointer-events-none" />

        {/* Corner accents */}
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-12.5 h-12.5 border-[#C9A84C] pointer-events-none z-5 ${cls}`}
          />
        ))}

        {/* Top gold divider */}
        <div className="relative z-2 flex items-center gap-3.5 px-10">
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(201,168,76,0.22))",
            }}
          />
          <div className="w-1.75 h-1.75 bg-[#C9A84C] rotate-45 shrink-0 shadow-[0_0_10px_rgba(201,168,76,0.6),0_0_20px_rgba(201,168,76,0.6)]" />
          <div className="w-1.25 h-1.25 bg-[#C9A84C] rotate-45 shrink-0 opacity-40 mx-1 shadow-[0_0_10px_rgba(201,168,76,0.6)]" />
          <div className="w-1.75 h-1.75 bg-[#C9A84C] rotate-45 shrink-0 shadow-[0_0_10px_rgba(201,168,76,0.6),0_0_20px_rgba(201,168,76,0.6)]" />
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(201,168,76,0.22), transparent)",
            }}
          />
        </div>

        {/* Hero CTA Banner */}
        <div className="relative z-2 text-center px-6 pt-18 pb-16 border-b border-[#C9A84C]/18">
          {/* Eyebrow */}
          <div className="inline-flex justify-center mb-8">
            <div className="eyebrow-shimmer clip-eyebrow font-rajdhani relative overflow-hidden inline-flex items-center gap-2.5 bg-white/3 border border-[#C9A84C]/18 px-5 py-2 text-[10px] font-semibold tracking-[.32em] uppercase text-[#C9A84C]">
              <span className="anim-blink w-1.25 h-1.25 bg-[#C9A84C] rounded-full shadow-[0_0_8px_rgba(201,168,76,0.6)]" />
              Begin Your Digital Journey
              <span className="anim-blink w-1.25 h-1.25 bg-[#C9A84C] rounded-full shadow-[0_0_8px_rgba(201,168,76,0.6)]" />
            </div>
          </div>

          {/* Title */}
          <h2 className="font-cinzel text-[clamp(34px,5.5vw,68px)] font-black leading-none tracking-tight mb-2">
            <span className="block text-white/88">Ready to Elevate</span>
            <span className="anim-gold gold-gradient-text block">
              Your Brand?
            </span>
          </h2>

          <p className="font-exo text-base font-extralight text-white/38 tracking-[.06em] mt-5 mb-10">
            Partner with Sri Lanka&apos;s premier{" "}
            <em className="not-italic text-[#C9A84C] font-normal">
              digital marketing
            </em>{" "}
            agency. We transform businesses into{" "}
            <em className="not-italic text-[#C9A84C] font-normal">
              iconic brands
            </em>
            .
          </p>

          <div className="flex items-center justify-center gap-3.5 flex-wrap">
            <a
              href="#services"
              className="clip-btn-lg font-rajdhani inline-flex items-center gap-2.5 px-10 py-3.75 text-xs font-bold tracking-[.22em] uppercase text-black no-underline transition-all duration-300 hover:-translate-y-0.75 hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, #C9A84C, #FFD700, #C9A84C)",
                backgroundSize: "200% auto",
                boxShadow:
                  "0 0 25px rgba(255,215,0,0.28), 0 0 55px rgba(201,168,76,0.12)",
              }}
            >
              Start Growing{" "}
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                ›
              </span>
            </a>
            <a
              href="#contact"
              className="clip-btn-lg font-rajdhani inline-flex items-center gap-2.5 px-10 py-3.5 bg-white/3 border border-[#C9A84C]/22 text-[#C9A84C] text-xs font-semibold tracking-[.22em] uppercase no-underline transition-all duration-300 hover:border-[#C9A84C] hover:shadow-[0_0_24px_rgba(201,168,76,0.18),inset_0_0_20px_rgba(201,168,76,0.05)] hover:-translate-y-0.75"
            >
              Get in Touch <span className="text-base">›</span>
            </a>
          </div>
        </div>

        {/* Main Grid */}
        <div className="relative z-2 max-w-295 mx-auto px-10 pt-16 max-sm:px-6 max-sm:pt-12">
          <div className="grid grid-cols-[2fr_1fr_1fr_1.6fr] gap-14 mb-13 max-[960px]:grid-cols-2 max-[960px]:gap-10 max-sm:grid-cols-1 max-sm:gap-9">
            {/* Brand */}
            <div>
              <div className="font-cinzel text-[26px] font-black tracking-[.02em] mb-3">
                <span className="logo-r">Rithu</span>
                <span className="text-white/55">Bussiness</span>
                <span className="logo-r">Lanka</span>
              </div>
              <div className="font-rajdhani text-[9px] tracking-[.35em] uppercase text-[#C9A84C]/38 mb-4">
                Digital · Marketing · Excellence
              </div>
              <p className="font-exo text-[13.5px] font-light text-white/32 leading-[1.8] mb-7 max-w-60">
                Your trusted partner for digital marketing excellence in Sri
                Lanka. We empower brands to thrive across every platform.
              </p>
              <div className="flex gap-2 flex-wrap">
                {socials.map((s) => (
                  <div
                    key={s.name}
                    title={s.name}
                    className={`soc-btn clip-btn-sm font-rajdhani relative overflow-hidden w-9 h-9 bg-white/3 border border-[#C9A84C]/18 flex items-center justify-center text-[9px] font-bold tracking-[0.5px] text-[#C9A84C]/50 cursor-pointer transition-all duration-300 hover:text-white hover:shadow-[0_0_18px_rgba(201,168,76,0.3)] hover:-translate-y-0.75 ${s.color}`}
                  >
                    <span className="relative z-1">{s.short}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div className="font-rajdhani text-[10px] font-bold tracking-[.3em] uppercase text-[#C9A84C]/38 mb-5 flex items-center gap-2.5 after:content-[''] after:flex-1 after:h-px after:bg-linear-to-r after:from-[#C9A84C]/12 after:to-transparent">
                Navigate
              </div>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="fg-link-item font-exo flex items-center text-white/30 text-[13.5px] font-light no-underline py-1.25 transition-all duration-300 hover:text-[#C9A84C] hover:translate-x-1.5 w-fit"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Services */}
            <div>
              <div className="font-rajdhani text-[10px] font-bold tracking-[.3em] uppercase text-[#C9A84C]/38 mb-5 flex items-center gap-2.5 after:content-[''] after:flex-1 after:h-px after:bg-linear-to-r after:from-[#C9A84C]/12 after:to-transparent">
                Services
              </div>
              {services.map((s) => (
                <div
                  key={s}
                  className="group font-exo flex items-center gap-2.25 text-white/30 text-[13px] font-light py-1.25 transition-all duration-300 hover:text-white/60"
                >
                  <div className="w-1.25 h-1.25 bg-[#C9A84C] rotate-45 opacity-30 shrink-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(201,168,76,0.6)] group-hover:scale-[1.4]" />
                  {s}
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <div className="font-rajdhani text-[10px] font-bold tracking-[.3em] uppercase text-[#C9A84C]/38 mb-5 flex items-center gap-2.5 after:content-[''] after:flex-1 after:h-px after:bg-linear-to-r after:from-[#C9A84C]/12 after:to-transparent">
                Stay Updated
              </div>
              <p className="font-rajdhani text-[10px] tracking-[.25em] uppercase text-white/18 mb-3">
                Marketing tips &amp; campaign updates
              </p>
              {subscribed ? (
                <div className="anim-fadein clip-btn-sm font-rajdhani text-center py-3.5 border border-[#C9A84C]/30 bg-[#C9A84C]/6 text-xs tracking-[.25em] uppercase text-[#C9A84C]">
                  ◆ Transmission received
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    className="clip-btn-sm font-exo w-full bg-white/3 border border-[#C9A84C]/18 px-4.5 py-3.25 text-white/80 text-[13px] font-light outline-none box-border mb-2.5 placeholder:text-white/18 focus:border-[#C9A84C]/45 transition-colors duration-300"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  />
                  <button
                    className="clip-btn-sm font-rajdhani w-full border-none py-3.25 text-black text-xs font-bold tracking-[.25em] uppercase cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background:
                        "linear-gradient(135deg, #C9A84C, #FFD700, #C9A84C)",
                      backgroundSize: "200% auto",
                      boxShadow: "0 0 20px rgba(255,215,0,0.2)",
                    }}
                    onClick={handleSubscribe}
                  >
                    Subscribe ›
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#C9A84C]/18 py-7 pb-10 flex items-center justify-between gap-4 flex-wrap">
            <div className="font-rajdhani text-[11px] tracking-[.2em] uppercase text-[#C9A84C]/28">
              © {new Date().getFullYear()} Rithu Business Lanka(Giwantha
              Athukorala) · All rights reserved
            </div>
            <div className="flex items-center gap-5">
              <div className="font-rajdhani flex items-center gap-2 text-[10px] tracking-[.25em] uppercase text-[#C9A84C]/32">
                <div className="anim-pulse w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
                Accepting new clients
              </div>
              <div className="font-rajdhani text-[10px] tracking-[.2em] uppercase text-[#C9A84C]/18">
                RBL · COLOMBO · LK
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
