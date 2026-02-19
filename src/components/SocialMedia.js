import React, { useState, useEffect, useRef } from "react";
import {
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaWhatsapp,
  FaLink,
  FaCheck,
} from "react-icons/fa";

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

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: <FaFacebook />,
      color: "#1877F2",
      glow: "rgba(24,119,242,0.4)",
      gradient: "linear-gradient(135deg, #1877F2, #0a4fa0)",
      desc: "Reach billions through targeted campaigns",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      color: "#E1306C",
      glow: "rgba(225,48,108,0.4)",
      gradient:
        "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
      desc: "Engage audiences with visual storytelling",
    },
    {
      name: "TikTok",
      icon: <FaTiktok />,
      color: "#69C9D0",
      glow: "rgba(105,201,208,0.4)",
      gradient: "linear-gradient(135deg, #010101, #69C9D0, #EE1D52)",
      desc: "Go viral with short-form content",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      color: "#25D366",
      glow: "rgba(37,211,102,0.4)",
      gradient: "linear-gradient(135deg, #128C7E, #25D366)",
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

        :root {
          --gold: #C9A84C;
          --gold-bright: #FFD700;
          --gold-glow: rgba(201,168,76,0.5);
          --dark: #020205;
          --dark-2: #08080F;
          --dark-card: rgba(12,12,20,0.9);
          --glass: rgba(255,255,255,0.03);
          --glass-border: rgba(201,168,76,0.18);
        }

        /* ── SECTION ── */
        .sm-section {
          position: relative;
          background: radial-gradient(ellipse 100% 60% at 50% 0%, #0d0a00 0%, var(--dark-2) 40%, #000008 100%);
          padding: 120px 0 100px;
          overflow: hidden;
          font-family: 'Exo 2', sans-serif;
        }

        /* grid bg */
        .sm-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px);
          background-size: 70px 70px;
          pointer-events: none;
        }

        /* ambient glows */
        .sm-glow-l, .sm-glow-r {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .sm-glow-l {
          width: 500px; height: 500px;
          top: 0; left: -150px;
          background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
        }
        .sm-glow-r {
          width: 450px; height: 450px;
          bottom: 0; right: -100px;
          background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
        }

        /* scanlines */
        .sm-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom, transparent 0px, transparent 3px,
            rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
        }

        /* corner accents */
        .sm-corner {
          position: absolute;
          width: 40px; height: 40px;
          pointer-events: none; z-index: 5;
        }
        .sm-ctL { top: 24px; left: 24px; border-top: 1px solid rgba(201,168,76,0.4); border-left: 1px solid rgba(201,168,76,0.4); }
        .sm-ctR { top: 24px; right: 24px; border-top: 1px solid rgba(201,168,76,0.4); border-right: 1px solid rgba(201,168,76,0.4); }
        .sm-cbL { bottom: 24px; left: 24px; border-bottom: 1px solid rgba(201,168,76,0.4); border-left: 1px solid rgba(201,168,76,0.4); }
        .sm-cbR { bottom: 24px; right: 24px; border-bottom: 1px solid rgba(201,168,76,0.4); border-right: 1px solid rgba(201,168,76,0.4); }

        .sm-inner {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── HEADER ── */
        .sm-header {
          text-align: center;
          margin-bottom: 72px;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1);
        }
        .sm-header.vis { opacity: 1; transform: none; }

        .sm-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
          padding: 7px 20px;
          border: 1px solid rgba(201,168,76,0.2);
          background: rgba(201,168,76,0.04);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        .sm-eyebrow::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent);
          animation: shim 3s ease-in-out infinite;
        }
        @keyframes shim {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        .sm-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(36px, 5.5vw, 62px);
          font-weight: 700;
          line-height: 1.05;
          color: rgba(255,255,255,0.92);
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        .sm-title-gold {
          background: linear-gradient(90deg, #C9A84C, #FFD700, #C9A84C);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldFlow 4s linear infinite;
          filter: drop-shadow(0 0 16px rgba(255,215,0,0.35));
        }
        @keyframes goldFlow {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .sm-subtitle {
          font-size: clamp(15px, 1.8vw, 18px);
          color: rgba(255,255,255,0.38);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 200;
        }

        /* ── PLATFORM CARDS ── */
        .sm-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 72px;
        }

        .sm-card {
          position: relative;
          background: var(--dark-card);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(24px);
          padding: 36px 28px;
          overflow: hidden;
          cursor: default;
          transition: transform 0.4s cubic-bezier(.16,1,.3,1), box-shadow 0.4s cubic-bezier(.16,1,.3,1), border-color 0.4s;
          clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
          opacity: 0; transform: translateY(40px);
        }
        .sm-card.vis {
          animation: cardReveal 0.7s cubic-bezier(.16,1,.3,1) forwards;
        }
        @keyframes cardReveal {
          to { opacity: 1; transform: translateY(0); }
        }

        /* top accent bar */
        .sm-card-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        /* glow blob */
        .sm-card-blob {
          position: absolute;
          width: 160px; height: 160px;
          border-radius: 50%;
          filter: blur(50px);
          top: -40px; right: -40px;
          opacity: 0.12;
          transition: opacity 0.4s;
          pointer-events: none;
        }

        .sm-card:hover {
          transform: translateY(-6px);
          border-color: rgba(201,168,76,0.4);
        }
        .sm-card:hover .sm-card-blob { opacity: 0.22; }
        .sm-card:hover .sm-card-bar { opacity: 1; }

        /* icon ring */
        .sm-icon-ring {
          width: 70px; height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 30px;
          color: white;
          position: relative;
          z-index: 2;
          border: 1px solid rgba(255,255,255,0.12);
          transition: transform 0.4s cubic-bezier(.16,1,.3,1), box-shadow 0.4s;
        }
        .sm-card:hover .sm-icon-ring {
          transform: scale(1.08) rotate(-5deg);
        }

        .sm-card-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          text-align: center;
          margin-bottom: 8px;
          position: relative; z-index: 2;
        }
        .sm-card-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.32);
          text-align: center;
          line-height: 1.6;
          margin-bottom: 24px;
          position: relative; z-index: 2;
        }

        /* connect btn */
        .sm-connect-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px 20px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(.16,1,.3,1);
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          z-index: 2;
        }
        .sm-connect-btn.idle {
          background: rgba(201,168,76,0.08);
          color: var(--gold);
          border: 1px solid rgba(201,168,76,0.3);
        }
        .sm-connect-btn.idle::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.15), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .sm-connect-btn.idle:hover {
          background: rgba(201,168,76,0.14);
          border-color: rgba(201,168,76,0.6);
          box-shadow: 0 0 20px rgba(201,168,76,0.2);
          transform: scale(1.02);
        }
        .sm-connect-btn.idle:hover::before { opacity: 1; }

        .sm-connect-btn.done {
          background: rgba(37,211,102,0.08);
          color: #25D366;
          border: 1px solid rgba(37,211,102,0.3);
          cursor: default;
        }

        /* ── WHY CONNECT PANEL ── */
        .sm-why {
          position: relative;
          background: rgba(10,10,18,0.95);
          border: 1px solid rgba(201,168,76,0.2);
          backdrop-filter: blur(30px);
          padding: 56px 48px;
          overflow: hidden;
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(.16,1,.3,1) 0.3s, transform 0.8s cubic-bezier(.16,1,.3,1) 0.3s;
        }
        .sm-why.vis { opacity: 1; transform: none; }

        /* why top bar */
        .sm-why::before {
          content: '';
          position: absolute;
          top: 0; left: 5%; right: 5%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        /* why bottom bar */
        .sm-why::after {
          content: '';
          position: absolute;
          bottom: 0; left: 5%; right: 5%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
        }

        .sm-why-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .sm-why-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          margin-bottom: 10px;
        }
        .sm-why-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.05em;
          font-weight: 200;
        }

        .sm-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
        }

        .sm-feature {
          position: relative;
          padding: 30px 24px;
          background: rgba(201,168,76,0.03);
          border: 1px solid rgba(201,168,76,0.1);
          text-align: center;
          transition: all 0.4s cubic-bezier(.16,1,.3,1);
          overflow: hidden;
        }
        .sm-feature::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.06), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .sm-feature:hover {
          border-color: rgba(201,168,76,0.3);
          box-shadow: 0 0 30px rgba(201,168,76,0.08), inset 0 0 20px rgba(201,168,76,0.04);
          transform: translateY(-4px);
        }
        .sm-feature:hover::after { opacity: 1; }

        .sm-feat-icon {
          font-size: 36px;
          margin-bottom: 16px;
          display: block;
          filter: drop-shadow(0 0 12px rgba(201,168,76,0.3));
        }
        .sm-feat-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 10px;
        }
        .sm-feat-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          line-height: 1.7;
          font-weight: 200;
        }

        /* ── NOTIFICATION TOAST ── */
        .sm-toast {
          position: fixed;
          top: 24px; right: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(8,8,15,0.95);
          border: 1px solid rgba(37,211,102,0.5);
          backdrop-filter: blur(24px);
          padding: 14px 24px;
          box-shadow: 0 0 30px rgba(37,211,102,0.2);
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          animation: toastIn 0.5s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: none; }
        }
        .sm-toast-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #25D366;
          box-shadow: 0 0 10px rgba(37,211,102,0.8);
          animation: toastBlink 1s ease-in-out infinite;
        }
        @keyframes toastBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .sm-toast-txt {
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #25D366;
        }
        .sm-toast-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.05em;
          margin-top: 1px;
        }

        /* ── DIVIDER ── */
        .sm-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 72px;
        }
        .sd-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2)); }
        .sd-line.r { background: linear-gradient(90deg, rgba(201,168,76,0.2), transparent); }
        .sd-diamond {
          width: 6px; height: 6px;
          background: var(--gold);
          transform: rotate(45deg);
          box-shadow: 0 0 8px var(--gold-glow);
        }

        @media (max-width: 640px) {
          .sm-why { padding: 36px 20px; }
          .sm-corner { display: none; }
        }
      `}</style>

      {/* Notification toast */}
      {showNotification && (
        <div className="sm-toast">
          <div className="sm-toast-dot" />
          <div>
            <div className="sm-toast-txt">
              <FaCheck style={{ marginRight: 6 }} />
              {notifPlatform} Connected
            </div>
            <div className="sm-toast-sub">Account linked successfully</div>
          </div>
        </div>
      )}

      <section id="social-media" className="sm-section" ref={sectionRef}>
        <div className="sm-grid-bg" />
        <div className="sm-glow-l" />
        <div className="sm-glow-r" />
        <div className="sm-scanlines" />
        <div className="sm-corner sm-ctL" />
        <div className="sm-corner sm-ctR" />
        <div className="sm-corner sm-cbL" />
        <div className="sm-corner sm-cbR" />

        <div className="sm-inner">
          {/* Header */}
          <div className={`sm-header ${visible ? "vis" : ""}`}>
            <div className="sm-eyebrow">
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  boxShadow: "0 0 8px var(--gold-glow)",
                  display: "inline-block",
                }}
              />
              Platform Integration
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  boxShadow: "0 0 8px var(--gold-glow)",
                  display: "inline-block",
                }}
              />
            </div>
            <h2 className="sm-title">
              Connect Your <span className="sm-title-gold">Social Media</span>
            </h2>
            <p className="sm-subtitle">
              Link your accounts and start growing your social media presence
              with intelligent automation
            </p>
          </div>

          {/* Platform cards */}
          <div className="sm-cards">
            {socialPlatforms.map((p, i) => (
              <div
                key={p.name}
                className={`sm-card ${visible ? "vis" : ""}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {/* top accent bar */}
                <div
                  className="sm-card-bar"
                  style={{ background: p.gradient }}
                />
                {/* glow blob */}
                <div className="sm-card-blob" style={{ background: p.color }} />

                {/* icon */}
                <div
                  className="sm-icon-ring"
                  style={{
                    background: p.gradient,
                    boxShadow: `0 0 24px ${p.glow}, 0 0 48px ${p.glow.replace("0.4", "0.15")}`,
                  }}
                >
                  {p.icon}
                </div>

                <div className="sm-card-name">{p.name}</div>
                <div className="sm-card-desc">{p.desc}</div>

                {connectedAccounts.includes(p.name) ? (
                  <button className="sm-connect-btn done">
                    <FaCheck style={{ fontSize: 12 }} />
                    Connected
                  </button>
                ) : (
                  <button
                    className="sm-connect-btn idle"
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
          <div className="sm-divider">
            <div className="sd-line" />
            <div className="sd-diamond" />
            <div className="sd-line r" />
          </div>

          {/* Why connect panel */}
          <div className={`sm-why ${visible ? "vis" : ""}`}>
            <div className="sm-why-header">
              <h3 className="sm-why-title">Why Connect Your Social Media?</h3>
              <p className="sm-why-sub">
                Unlock the full power of your online presence
              </p>
            </div>
            <div className="sm-why-grid">
              {features.map((f) => (
                <div className="sm-feature" key={f.title}>
                  <span className="sm-feat-icon">{f.icon}</span>
                  <div className="sm-feat-title">{f.title}</div>
                  <div className="sm-feat-desc">{f.desc}</div>
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
