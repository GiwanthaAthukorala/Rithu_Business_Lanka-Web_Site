"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaWhatsapp,
  FaLink,
  FaCheck,
} from "react-icons/fa";

/*
  Kept in <style> — genuinely not expressible in Tailwind:
  • @import Google Fonts
  • @keyframes (shim, goldFlow, cardReveal, toastIn, toastBlink)
  • ::before / ::after pseudo-elements:
      – .sm-eyebrow shimmer sweep
      – .sm-why top/bottom gold bar lines
      – .sm-feature inner glow overlay
      – .sm-connect-btn.idle inner gradient
  • background-clip: text / -webkit-text-fill-color (gold title)
  • clip-path: polygon() (cards, buttons, toast)
  • repeating-linear-gradient scanline overlay
  • layered background-image grid pattern
  • .sm-card:hover child selectors (.sm-card-blob, .sm-card-bar, .sm-icon-ring)
  • .sm-connect-btn.idle:hover::before
  • filter: blur() on ambient glow blobs
*/

const socialPlatforms = [
  {
    name: "Facebook",
    icon: <FaFacebook />,
    color: "#1877F2",
    glow: "rgba(24,119,242,0.4)",
    gradient: "linear-gradient(135deg,#1877F2,#0a4fa0)",
    desc: "Reach billions through targeted campaigns",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    color: "#E1306C",
    glow: "rgba(225,48,108,0.4)",
    gradient: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
    desc: "Engage audiences with visual storytelling",
  },
  {
    name: "TikTok",
    icon: <FaTiktok />,
    color: "#69C9D0",
    glow: "rgba(105,201,208,0.4)",
    gradient: "linear-gradient(135deg,#010101,#69C9D0,#EE1D52)",
    desc: "Go viral with short-form content",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp />,
    color: "#25D366",
    glow: "rgba(37,211,102,0.4)",
    gradient: "linear-gradient(135deg,#128C7E,#25D366)",
    desc: "Direct engagement with your customers",
  },
];

const features = [
  {
    icon: "📊",
    title: "Analytics & Insights",
    desc: "Track your growth with real-time detailed analytics and performance metrics",
  },
  {
    icon: "🚀",
    title: "Automated Boosting",
    desc: "Automatically boost your best-performing posts to maximize reach",
  },
  {
    icon: "🤖",
    title: "AI-Powered Content",
    desc: "Get AI-suggested content tailored perfectly for your audience",
  },
];

const SocialMedia = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notifPlatform, setNotifPlatform] = useState("");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleConnect = (platform) => {
    if (!connectedAccounts.includes(platform)) {
      setConnectedAccounts((p) => [...p, platform]);
      setNotifPlatform(platform);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3500);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700&family=Exo+2:wght@200;300;400&display=swap');

        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-cinzel   { font-family: 'Cinzel', serif; }
        .font-exo      { font-family: 'Exo 2', sans-serif; }

        /* ── Keyframes ── */
        @keyframes shim {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes goldFlow {
          0%   { background-position: 0%   center; }
          100% { background-position: 200% center; }
        }
        @keyframes cardReveal {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes toastBlink {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.4; }
        }

        /* Gold gradient text */
        .sm-title-gold {
          background: linear-gradient(90deg, #C9A84C, #FFD700, #C9A84C);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldFlow 4s linear infinite;
          filter: drop-shadow(0 0 16px rgba(255,215,0,0.35));
        }

        /* Eyebrow shimmer sweep */
        .sm-eyebrow {
          position: relative;
          overflow: hidden;
        }
        .sm-eyebrow::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent);
          animation: shim 3s ease-in-out infinite;
        }

        /* Background grid */
        .sm-grid-bg {
          background-image:
            linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px);
          background-size: 70px 70px;
        }

        /* Scanlines */
        .sm-scanlines {
          background: repeating-linear-gradient(
            to bottom, transparent 0px, transparent 3px,
            rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
        }

        /* Platform card clip + reveal animation */
        .sm-card {
          clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
          opacity: 0;
          transform: translateY(40px);
        }
        .sm-card.vis { animation: cardReveal 0.7s cubic-bezier(.16,1,.3,1) forwards; }

        /* Card child hover selectors (requires parent selector) */
        .sm-card:hover .sm-card-blob { opacity: 0.22; }
        .sm-card:hover .sm-card-bar  { opacity: 1; }
        .sm-card:hover .sm-icon-ring { transform: scale(1.08) rotate(-5deg); }

        /* Connect button idle: clip + ::before glow */
        .sm-connect-btn {
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
        }
        .sm-connect-btn.idle::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.15), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .sm-connect-btn.idle:hover::before { opacity: 1; }

        /* Why panel top/bottom gold bars */
        .sm-why {
          position: relative;
        }
        .sm-why::before {
          content: '';
          position: absolute;
          top: 0; left: 5%; right: 5%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
        }
        .sm-why::after {
          content: '';
          position: absolute;
          bottom: 0; left: 5%; right: 5%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
        }

        /* Feature card inner glow overlay */
        .sm-feature {
          position: relative;
          overflow: hidden;
        }
        .sm-feature::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.06), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .sm-feature:hover::after { opacity: 1; }

        /* Toast */
        .sm-toast {
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          animation: toastIn 0.5s cubic-bezier(.16,1,.3,1) both;
        }
        .sm-toast-dot { animation: toastBlink 1s ease-in-out infinite; }
      `}</style>

      {/* ── Notification toast ── */}
      {showNotification && (
        <div
          className="sm-toast fixed top-6 right-6 z-9999 flex items-center gap-3
          bg-[rgba(8,8,15,0.95)] border border-[rgba(37,211,102,0.5)] backdrop-blur-2xl
          px-6 py-3.5 shadow-[0_0_30px_rgba(37,211,102,0.2)]"
        >
          <div className="sm-toast-dot w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_10px_rgba(37,211,102,0.8)]" />
          <div>
            <div className="font-rajdhani text-[13px] font-semibold tracking-widest uppercase text-[#25D366] flex items-center gap-1.5">
              <FaCheck style={{ fontSize: 12 }} />
              {notifPlatform} Connected
            </div>
            <div className="font-exo text-[11px] text-[rgba(255,255,255,0.3)] tracking-[0.05em] mt-px">
              Account linked successfully
            </div>
          </div>
        </div>
      )}

      <section
        id="social-media"
        ref={sectionRef}
        className="font-exo relative overflow-hidden py-30 pb-25
          bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,#0d0a00_0%,#08080F_40%,#000008_100%)]"
      >
        {/* Background grid */}
        <div className="sm-grid-bg absolute inset-0 pointer-events-none z-0" />

        {/* Ambient glow blobs */}
        <div
          className="absolute rounded-full pointer-events-none z-0 blur-[100px]
          w-125 h-125 top-0 -left-37.5
          bg-[radial-gradient(circle,rgba(201,168,76,0.07)_0%,transparent_70%)]"
        />
        <div
          className="absolute rounded-full pointer-events-none z-0 blur-[100px]
          w-112.5 h-112.5 bottom-0 -right-25
          bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)]"
        />

        {/* CRT scanlines */}
        <div className="sm-scanlines absolute inset-0 pointer-events-none z-0" />

        {/* Corner accents */}
        <div className="hidden sm:block absolute w-10 h-10 pointer-events-none z-5 top-6 left-6 border-t border-l border-[rgba(201,168,76,0.4)]" />
        <div className="hidden sm:block absolute w-10 h-10 pointer-events-none z-5 top-6 right-6 border-t border-r border-[rgba(201,168,76,0.4)]" />
        <div className="hidden sm:block absolute w-10 h-10 pointer-events-none z-5 bottom-6 left-6 border-b border-l border-[rgba(201,168,76,0.4)]" />
        <div className="hidden sm:block absolute w-10 h-10 pointer-events-none z-5 bottom-6 right-6 border-b border-r border-[rgba(201,168,76,0.4)]" />

        {/* ── Inner container ── */}
        <div className="relative z-10 max-w-300 mx-auto px-6">
          {/* Header */}
          <div
            className={`text-center mb-18 transition-[opacity,transform] duration-800
              ease-[cubic-bezier(0.16,1,0.3,1)]
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7.5"}`}
          >
            {/* Eyebrow */}
            <div
              className="sm-eyebrow inline-flex items-center gap-2.5
              font-rajdhani text-[11px] font-medium tracking-[0.3em] uppercase text-[#C9A84C]
              mb-5 px-5 py-1.75 border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)]
              backdrop-blur-[10px]"
            >
              <span className="w-1.25 h-1.25 rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.5)] inline-block" />
              Platform Integration
              <span className="w-1.25 h-1.25 rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.5)] inline-block" />
            </div>

            {/* Title */}
            <h2
              className="font-cinzel text-[clamp(36px,5.5vw,62px)] font-bold leading-[1.05]
              tracking-[-0.01em] text-[rgba(255,255,255,0.92)] mb-4"
            >
              Connect Your <span className="sm-title-gold">Social Media</span>
            </h2>

            {/* Subtitle */}
            <p
              className="font-exo text-[clamp(15px,1.8vw,18px)] font-extralight
              text-[rgba(255,255,255,0.38)] max-w-130 mx-auto leading-[1.7]"
            >
              Link your accounts and start growing your social media presence
              with intelligent automation
            </p>
          </div>

          {/* Platform cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-18">
            {socialPlatforms.map((p, i) => (
              <div
                key={p.name}
                className={`sm-card bg-[rgba(12,12,20,0.9)] border border-[rgba(201,168,76,0.18)]
                  backdrop-blur-2xl px-7 py-9 overflow-hidden cursor-default
                  transition-[transform,box-shadow,border-color] duration-400
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:-translate-y-1.5 hover:border-[rgba(201,168,76,0.4)]
                  hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]
                  ${visible ? "vis" : ""}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {/* Top accent bar */}
                <div
                  className="sm-card-bar absolute top-0 left-0 right-0 h-0.5 opacity-70 transition-opacity duration-300"
                  style={{ background: p.gradient }}
                />
                {/* Glow blob */}
                <div
                  className="sm-card-blob absolute w-40 h-40 rounded-full blur-[50px]
                    -top-10 -right-10 opacity-[0.12] transition-opacity duration-400 pointer-events-none"
                  style={{ background: p.color }}
                />

                {/* Icon ring */}
                <div
                  className="sm-icon-ring w-17.5 h-17.5 rounded-full flex items-center justify-center
                    mx-auto mb-5 text-[30px] text-white relative z-2
                    border border-[rgba(255,255,255,0.12)]
                    transition-[transform,box-shadow] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    background: p.gradient,
                    boxShadow: `0 0 24px ${p.glow}, 0 0 48px ${p.glow.replace("0.4", "0.15")}`,
                  }}
                >
                  {p.icon}
                </div>

                {/* Name */}
                <div
                  className="font-rajdhani text-[22px] font-bold tracking-widest uppercase
                  text-[rgba(255,255,255,0.9)] text-center mb-2 relative z-2"
                >
                  {p.name}
                </div>

                {/* Desc */}
                <div
                  className="font-exo text-[13px] text-[rgba(255,255,255,0.32)] text-center
                  leading-[1.6] mb-6 relative z-2"
                >
                  {p.desc}
                </div>

                {/* Connect button */}
                {connectedAccounts.includes(p.name) ? (
                  <button
                    className="sm-connect-btn done relative flex items-center justify-center
                    gap-2 w-full py-3 px-5 font-rajdhani text-[12px] font-semibold tracking-[0.2em]
                    uppercase border-none cursor-default z-2
                    bg-[rgba(37,211,102,0.08)] text-[#25D366] border border-[rgba(37,211,102,0.3)]"
                  >
                    <FaCheck style={{ fontSize: 12 }} />
                    Connected
                  </button>
                ) : (
                  <button
                    className="sm-connect-btn idle relative flex items-center justify-center
                      gap-2 w-full py-3 px-5 font-rajdhani text-[12px] font-semibold tracking-[0.2em]
                      uppercase border-none cursor-pointer z-2 overflow-hidden
                      bg-[rgba(201,168,76,0.08)] text-[#C9A84C] border border-[rgba(201,168,76,0.3)]
                      transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                      hover:bg-[rgba(201,168,102,0.14)] hover:border-[rgba(201,168,76,0.6)]
                      hover:shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:scale-[1.02]"
                    onClick={() => handleConnect(p.name)}
                  >
                    <FaLink style={{ fontSize: 11 }} />
                    Connect Account
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 mb-18">
            <div className="flex-1 h-px bg-[linear-gradient(90deg,transparent,rgba(201,168,76,0.2))]" />
            <div className="w-1.5 h-1.5 bg-[#C9A84C] rotate-45 shadow-[0_0_8px_rgba(201,168,76,0.5)]" />
            <div className="flex-1 h-px bg-[linear-gradient(90deg,rgba(201,168,76,0.2),transparent)]" />
          </div>

          {/* Why connect panel */}
          <div
            className={`sm-why bg-[rgba(10,10,18,0.95)] border border-[rgba(201,168,76,0.2)]
              backdrop-blur-[30px] px-12 py-14 overflow-hidden
              transition-[opacity,transform] duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300
              sm:px-5 sm:py-9
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h3
                className="font-cinzel text-[clamp(24px,3.5vw,36px)] font-semibold
                text-[rgba(255,255,255,0.9)] mb-2.5"
              >
                Why Connect Your Social Media?
              </h3>
              <p
                className="font-exo text-[14px] font-extralight text-[rgba(255,255,255,0.3)]
                tracking-[0.05em]"
              >
                Unlock the full power of your online presence
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="sm-feature px-6 py-7 bg-[rgba(201,168,76,0.03)]
                    border border-[rgba(201,168,76,0.1)] text-center
                    transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                    hover:border-[rgba(201,168,76,0.3)]
                    hover:shadow-[0_0_30px_rgba(201,168,76,0.08),inset_0_0_20px_rgba(201,168,76,0.04)]
                    hover:-translate-y-1"
                >
                  <span
                    className="block text-[36px] mb-4
                    filter-[drop-shadow(0_0_12px_rgba(201,168,76,0.3))]"
                  >
                    {f.icon}
                  </span>
                  <div
                    className="font-rajdhani text-[16px] font-bold tracking-widest uppercase
                    text-[#C9A84C] mb-2.5"
                  >
                    {f.title}
                  </div>
                  <div
                    className="font-exo text-[13px] font-extralight text-[rgba(255,255,255,0.35)]
                    leading-[1.7]"
                  >
                    {f.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialMedia;
