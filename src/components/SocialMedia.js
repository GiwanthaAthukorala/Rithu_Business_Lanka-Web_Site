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

        @keyframes shim {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes blueFlow {
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

        /* Blue-silver animated gradient title */
        .sm-title-blue {
          background: linear-gradient(90deg, #2B6CB0, #63B3ED, #C8D8E8, #63B3ED, #2B6CB0);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: blueFlow 4s linear infinite;
          filter: drop-shadow(0 0 16px rgba(99,179,237,0.45));
        }

        /* Eyebrow shimmer sweep — blue */
        .sm-eyebrow {
          position: relative;
          overflow: hidden;
        }
        .sm-eyebrow::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(99,179,237,0.1), transparent);
          animation: shim 3s ease-in-out infinite;
        }

        /* Background grid — blue tint */
        .sm-grid-bg {
          background-image:
            linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px);
          background-size: 70px 70px;
        }

        /* Scanlines */
        .sm-scanlines {
          background: repeating-linear-gradient(
            to bottom, transparent 0px, transparent 3px,
            rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
        }

        /* Platform card clip + reveal */
        .sm-card {
          clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
          opacity: 0;
          transform: translateY(40px);
        }
        .sm-card.vis { animation: cardReveal 0.7s cubic-bezier(.16,1,.3,1) forwards; }

        .sm-card:hover .sm-card-blob { opacity: 0.22; }
        .sm-card:hover .sm-card-bar  { opacity: 1; }
        .sm-card:hover .sm-icon-ring { transform: scale(1.08) rotate(-5deg); }

        /* Connect button idle */
        .sm-connect-btn {
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
        }
        .sm-connect-btn.idle::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(99,179,237,0.15), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .sm-connect-btn.idle:hover::before { opacity: 1; }

        /* Why panel top/bottom blue bars */
        .sm-why { position: relative; }
        .sm-why::before {
          content: '';
          position: absolute;
          top: 0; left: 5%; right: 5%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #63B3ED, transparent);
        }
        .sm-why::after {
          content: '';
          position: absolute;
          bottom: 0; left: 5%; right: 5%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,179,237,0.4), transparent);
        }

        /* Feature card inner glow overlay — blue */
        .sm-feature {
          position: relative;
          overflow: hidden;
        }
        .sm-feature::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(99,179,237,0.07), transparent);
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

      {/* Notification toast */}
      {showNotification && (
        <div
          className="sm-toast fixed top-6 right-6 z-50 flex items-center gap-3
            backdrop-blur-2xl px-6 py-3.5"
          style={{
            background: "rgba(7,5,15,0.95)",
            border: "1px solid rgba(37,211,102,0.5)",
            boxShadow: "0 0 30px rgba(37,211,102,0.2)",
          }}
        >
          <div
            className="sm-toast-dot w-2 h-2 rounded-full"
            style={{
              background: "#25D366",
              boxShadow: "0 0 10px rgba(37,211,102,0.8)",
            }}
          />
          <div>
            <div
              className="font-rajdhani text-[13px] font-semibold tracking-widest uppercase flex items-center gap-1.5"
              style={{ color: "#25D366" }}
            >
              <FaCheck style={{ fontSize: 12 }} />
              {notifPlatform} Connected
            </div>
            <div
              className="font-exo text-[11px] tracking-[0.05em] mt-px"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Account linked successfully
            </div>
          </div>
        </div>
      )}

      <section
        id="social-media"
        ref={sectionRef}
        className="font-exo relative overflow-hidden py-30 pb-25"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 0%, #100820 0%, #0a0515 40%, #07050f 100%)",
        }}
      >
        {/* Background grid */}
        <div className="sm-grid-bg absolute inset-0 pointer-events-none z-0" />

        {/* Ambient glow blobs — blue */}
        <div
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: "500px",
            height: "500px",
            top: 0,
            left: "-150px",
            background:
              "radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: "450px",
            height: "450px",
            bottom: 0,
            right: "-100px",
            background:
              "radial-gradient(circle, rgba(99,179,237,0.06) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        {/* CRT scanlines */}
        <div className="sm-scanlines absolute inset-0 pointer-events-none z-0" />

        {/* Corner accents — blue */}
        {[
          "top-6 left-6 border-t border-l",
          "top-6 right-6 border-t border-r",
          "bottom-6 left-6 border-b border-l",
          "bottom-6 right-6 border-b border-r",
        ].map((cls, i) => (
          <div
            key={i}
            className={`hidden sm:block absolute w-10 h-10 pointer-events-none z-10 ${cls}`}
            style={{ borderColor: "rgba(99,179,237,0.4)" }}
          />
        ))}

        {/* Inner container */}
        <div className="relative z-20 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div
            className={`text-center mb-18 transition-[opacity,transform] duration-800
              ease-[cubic-bezier(0.16,1,0.3,1)]
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7.5"}`}
          >
            {/* Eyebrow */}
            <div
              className="sm-eyebrow inline-flex items-center gap-2.5 font-rajdhani
                text-[11px] font-medium tracking-[0.3em] uppercase mb-5 px-5 py-1.75
                backdrop-blur-[10px]"
              style={{
                color: "#63B3ED",
                border: "1px solid rgba(99,179,237,0.22)",
                background: "rgba(99,179,237,0.04)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{
                  background: "#63B3ED",
                  boxShadow: "0 0 8px rgba(99,179,237,0.6)",
                }}
              />
              Platform Integration
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{
                  background: "#63B3ED",
                  boxShadow: "0 0 8px rgba(99,179,237,0.6)",
                }}
              />
            </div>

            {/* Title */}
            <h2
              className="font-cinzel font-bold leading-[1.05] tracking-[-0.01em] mb-4"
              style={{
                fontSize: "clamp(36px, 5.5vw, 62px)",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              Connect Your <span className="sm-title-blue">Social Media</span>
            </h2>

            {/* Subtitle */}
            <p
              className="font-exo font-extralight max-w-130 mx-auto leading-[1.7]"
              style={{
                fontSize: "clamp(15px, 1.8vw, 18px)",
                color: "rgba(200,216,232,0.38)",
              }}
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
                className={`sm-card backdrop-blur-2xl px-7 py-9 overflow-hidden cursor-default
                  transition-[transform,box-shadow,border-color] duration-400
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:-translate-y-1.5
                  ${visible ? "vis" : ""}`}
                style={{
                  background: "rgba(12,10,22,0.9)",
                  border: "1px solid rgba(99,179,237,0.18)",
                  animationDelay: `${i * 0.12}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.4)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.18)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Top accent bar — platform color kept */}
                <div
                  className="sm-card-bar absolute top-0 left-0 right-0 h-0.5 opacity-70 transition-opacity duration-300"
                  style={{ background: p.gradient }}
                />
                {/* Glow blob */}
                <div
                  className="sm-card-blob absolute w-40 h-40 rounded-full -top-10 -right-10
                    opacity-[0.12] transition-opacity duration-400 pointer-events-none"
                  style={{ background: p.color, filter: "blur(50px)" }}
                />

                {/* Icon ring — platform color kept */}
                <div
                  className="sm-icon-ring w-20 h-20 rounded-full flex items-center
                    justify-center mx-auto mb-5 text-[30px] text-white relative z-20
                    transition-[transform,box-shadow] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    background: p.gradient,
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: `0 0 24px ${p.glow}, 0 0 48px ${p.glow.replace("0.4", "0.15")}`,
                  }}
                >
                  {p.icon}
                </div>

                {/* Name */}
                <div
                  className="font-rajdhani text-[22px] font-bold tracking-widest uppercase
                    text-center mb-2 relative z-20"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {p.name}
                </div>

                {/* Desc */}
                <div
                  className="font-exo text-[13px] text-center leading-[1.6] mb-6 relative z-20"
                  style={{ color: "rgba(200,216,232,0.32)" }}
                >
                  {p.desc}
                </div>

                {/* Connect button */}
                {connectedAccounts.includes(p.name) ? (
                  <button
                    className="sm-connect-btn done relative flex items-center justify-center
                      gap-2 w-full py-3 px-5 font-rajdhani text-[12px] font-semibold
                      tracking-[0.2em] uppercase border-none cursor-default z-20"
                    style={{
                      background: "rgba(37,211,102,0.08)",
                      color: "#25D366",
                      border: "1px solid rgba(37,211,102,0.3)",
                    }}
                  >
                    <FaCheck style={{ fontSize: 12 }} />
                    Connected
                  </button>
                ) : (
                  <button
                    className="sm-connect-btn idle relative flex items-center justify-center
                      gap-2 w-full py-3 px-5 font-rajdhani text-[12px] font-semibold
                      tracking-[0.2em] uppercase border-none cursor-pointer z-20 overflow-hidden
                      transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      background: "rgba(99,179,237,0.07)",
                      color: "#63B3ED",
                      border: "1px solid rgba(99,179,237,0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(99,179,237,0.13)";
                      e.currentTarget.style.borderColor =
                        "rgba(99,179,237,0.6)";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(99,179,237,0.2)";
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(99,179,237,0.07)";
                      e.currentTarget.style.borderColor =
                        "rgba(99,179,237,0.3)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    onClick={() => handleConnect(p.name)}
                  >
                    <FaLink style={{ fontSize: 11 }} />
                    Connect Account
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Decorative divider — blue */}
          <div className="flex items-center gap-4 mb-18">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(99,179,237,0.22))",
              }}
            />
            <div
              className="w-1.5 h-1.5 rotate-45"
              style={{
                background: "#63B3ED",
                boxShadow: "0 0 8px rgba(99,179,237,0.6)",
              }}
            />
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(99,179,237,0.22), transparent)",
              }}
            />
          </div>

          {/* Why connect panel */}
          <div
            className={`sm-why backdrop-blur-[30px] px-12 py-14 overflow-hidden
              transition-[opacity,transform] duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300
              sm:px-5 sm:py-9
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{
              background: "rgba(8,6,18,0.95)",
              border: "1px solid rgba(99,179,237,0.18)",
            }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h3
                className="font-cinzel font-semibold mb-2.5"
                style={{
                  fontSize: "clamp(24px, 3.5vw, 36px)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Why Connect Your Social Media?
              </h3>
              <p
                className="font-exo text-[14px] font-extralight tracking-[0.05em]"
                style={{ color: "rgba(200,216,232,0.3)" }}
              >
                Unlock the full power of your online presence
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="sm-feature px-6 py-7 text-center
                    transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                    hover:-translate-y-1"
                  style={{
                    background: "rgba(99,179,237,0.03)",
                    border: "1px solid rgba(99,179,237,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(99,179,237,0.3)";
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(99,179,237,0.08), inset 0 0 20px rgba(99,179,237,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(99,179,237,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span className="block text-[36px] mb-4">{f.icon}</span>
                  <div
                    className="font-rajdhani text-[16px] font-bold tracking-widest uppercase mb-2.5"
                    style={{ color: "#63B3ED" }}
                  >
                    {f.title}
                  </div>
                  <div
                    className="font-exo text-[13px] font-extralight leading-[1.7]"
                    style={{ color: "rgba(200,216,232,0.35)" }}
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
