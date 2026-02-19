import React, { useRef, useEffect, useState } from "react";
import {
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaWhatsapp,
  FaRocket,
  FaPalette,
  FaRobot,
  FaPenFancy,
} from "react-icons/fa";

const services = [
  {
    icon: FaFacebook,
    iconColor: "#4F9EFF",
    iconGlow: "rgba(79,158,255,0.35)",
    tag: "01",
    title: "Facebook Marketing",
    description:
      "Targeted Facebook campaigns with laser-focused audience segmentation and engaging content strategies.",
    metric: "3.2× avg. reach",
  },
  {
    icon: FaInstagram,
    iconColor: "#FF6BB5",
    iconGlow: "rgba(255,107,181,0.35)",
    tag: "02",
    title: "Instagram Growth",
    description:
      "Strategic content calendars and engagement tactics that convert followers into loyal customers.",
    metric: "↑ 280% engagement",
  },
  {
    icon: FaTiktok,
    iconColor: "#E0E0E0",
    iconGlow: "rgba(224,224,224,0.25)",
    tag: "03",
    title: "TikTok Marketing",
    description:
      "Viral-first content production designed to dominate the For You Page and reach Gen-Z audiences.",
    metric: "10M+ views delivered",
  },
  {
    icon: FaWhatsapp,
    iconColor: "#4EDB82",
    iconGlow: "rgba(78,219,130,0.35)",
    tag: "04",
    title: "WhatsApp Business",
    description:
      "Direct customer connection via WhatsApp Business API — automation, broadcasts & support flows.",
    metric: "98% open rate",
  },
  {
    icon: FaRocket,
    iconColor: "#B47AFF",
    iconGlow: "rgba(180,122,255,0.35)",
    tag: "05",
    title: "Post Boosting",
    description:
      "Amplify your best content with intelligent paid promotion to reach audiences that convert.",
    metric: "5× ROAS average",
  },
  {
    icon: FaPalette,
    iconColor: "#FF9F4A",
    iconGlow: "rgba(255,159,74,0.35)",
    tag: "06",
    title: "Logo Design",
    description:
      "Distinctive brand identities crafted with precision — logos that command attention and trust.",
    metric: "100% custom design",
  },
  {
    icon: FaRobot,
    iconColor: "#4ADFDF",
    iconGlow: "rgba(74,223,223,0.35)",
    tag: "07",
    title: "AI Video Creation",
    description:
      "Cutting-edge AI-powered video production — cinematic, fast, and built for maximum engagement.",
    metric: "72hr turnaround",
  },
  {
    icon: FaPenFancy,
    iconColor: "#FF6B6B",
    iconGlow: "rgba(255,107,107,0.35)",
    tag: "08",
    title: "Post Design",
    description:
      "Scroll-stopping social media visuals that express your brand personality and drive action.",
    metric: "400+ posts created",
  },
];

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef(null);
  const Icon = service.icon;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="svc-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner brackets */}
      <span className="card-corner tl" />
      <span className="card-corner tr" />
      <span className="card-corner bl" />
      <span className="card-corner br" />

      {/* Glow on hover */}
      <div
        className="card-glow"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${service.iconGlow} 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Top row */}
      <div className="card-top-row">
        <span className="card-tag">{service.tag}</span>
        <span className="card-metric">{service.metric}</span>
      </div>

      {/* Icon */}
      <div
        className="card-icon-wrap"
        style={{
          boxShadow: hovered
            ? `0 0 28px ${service.iconGlow}, 0 0 60px ${service.iconGlow}`
            : "none",
          borderColor: hovered
            ? service.iconColor + "55"
            : "rgba(201,168,76,0.12)",
          transform: hovered ? "scale(1.1) translateY(-2px)" : "scale(1)",
        }}
      >
        <Icon style={{ color: service.iconColor, fontSize: 28 }} />
      </div>

      {/* Text */}
      <h3 className="card-title">{service.title}</h3>
      <p className="card-desc">{service.description}</p>

      {/* CTA */}
      <a
        href="#contact"
        className="card-cta"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
        }}
      >
        Enquire Now
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 7h12M7 1l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      {/* Bottom gold bar */}
      <div
        className="card-bottom-bar"
        style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
      />
    </div>
  );
};

const Services = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTitleVisible(true);
      },
      { threshold: 0.3 },
    );
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

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
          --glass: rgba(255,255,255,0.025);
          --glass-border: rgba(201,168,76,0.15);
        }

        .svc-section {
          position: relative;
          background: radial-gradient(ellipse 100% 80% at 50% 0%, #0d0900 0%, var(--dark-2) 45%, #000008 100%);
          padding: 120px 0 140px;
          overflow: hidden;
          font-family: 'Exo 2', sans-serif;
        }

        /* Background grid */
        .svc-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* Glow blobs */
        .svc-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .svc-blob-1 {
          width: 500px; height: 500px;
          top: -120px; left: -120px;
          background: radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%);
          animation: blobDrift1 14s ease-in-out infinite;
        }
        .svc-blob-2 {
          width: 600px; height: 600px;
          bottom: -150px; right: -100px;
          background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
          animation: blobDrift2 18s ease-in-out infinite;
        }
        @keyframes blobDrift1 {
          0%,100% { transform: translate(0,0); } 50% { transform: translate(50px,70px); }
        }
        @keyframes blobDrift2 {
          0%,100% { transform: translate(0,0); } 50% { transform: translate(-40px,-50px); }
        }

        /* ── HEADER ── */
        .svc-header {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-bottom: 80px;
          padding: 0 24px;
        }

        .svc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.55);
          margin-bottom: 20px;
        }
        .svc-eyebrow::before, .svc-eyebrow::after {
          content: '';
          display: block;
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold));
        }
        .svc-eyebrow::after {
          background: linear-gradient(90deg, var(--gold), transparent);
        }

        .svc-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(36px, 6vw, 68px);
          font-weight: 700;
          line-height: 1.0;
          color: rgba(255,255,255,0.92);
          margin: 0 0 8px;
          letter-spacing: -0.01em;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-title.show {
          opacity: 1;
          transform: translateY(0);
        }
        .svc-title-gold {
          background: linear-gradient(90deg, #C9A84C, #FFD700, #FFF3CC, #FFD700, #C9A84C);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleGoldFlow 5s linear infinite;
          filter: drop-shadow(0 0 16px rgba(255,215,0,0.3));
        }
        @keyframes titleGoldFlow {
          0% { background-position: 0% center; }
          100% { background-position: 250% center; }
        }

        .svc-sub {
          font-family: 'Exo 2', sans-serif;
          font-size: clamp(14px, 1.8vw, 18px);
          font-weight: 200;
          color: rgba(255,255,255,0.35);
          max-width: 520px;
          margin: 20px auto 0;
          line-height: 1.7;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s 0.2s cubic-bezier(0.16,1,0.3,1), transform 0.8s 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-sub.show { opacity: 1; transform: translateY(0); }

        /* Gold divider under title */
        .svc-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 28px auto 0;
          max-width: 300px;
          opacity: 0;
          transition: opacity 0.8s 0.3s;
        }
        .svc-divider.show { opacity: 1; }
        .sd-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold));
        }
        .sd-line.r { background: linear-gradient(90deg, var(--gold), transparent); }
        .sd-diamond {
          width: 7px; height: 7px;
          background: var(--gold);
          transform: rotate(45deg);
          box-shadow: 0 0 10px var(--gold-glow), 0 0 20px var(--gold-glow);
        }

        /* ── GRID ── */
        .svc-grid {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 20px;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }
        @media (min-width: 640px) { .svc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .svc-grid { grid-template-columns: repeat(4, 1fr); } }

        /* ── CARD ── */
        .svc-card {
          position: relative;
          background: var(--glass);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(20px);
          padding: 28px 24px 32px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.16,1,0.3,1);
          clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
        }
        .svc-card:hover {
          border-color: rgba(201,168,76,0.35);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.08);
          transform: translateY(-6px);
        }

        /* Corner HUD brackets */
        .card-corner {
          position: absolute;
          width: 14px; height: 14px;
          pointer-events: none;
          transition: border-color 0.4s;
        }
        .card-corner.tl { top: 6px; left: 6px; border-top: 1px solid rgba(201,168,76,0.25); border-left: 1px solid rgba(201,168,76,0.25); }
        .card-corner.tr { top: 6px; right: 6px; border-top: 1px solid rgba(201,168,76,0.25); border-right: 1px solid rgba(201,168,76,0.25); }
        .card-corner.bl { bottom: 6px; left: 6px; border-bottom: 1px solid rgba(201,168,76,0.25); border-left: 1px solid rgba(201,168,76,0.25); }
        .card-corner.br { bottom: 6px; right: 6px; border-bottom: 1px solid rgba(201,168,76,0.25); border-right: 1px solid rgba(201,168,76,0.25); }
        .svc-card:hover .card-corner { border-color: rgba(201,168,76,0.6); }

        /* Hover glow */
        .card-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: opacity 0.5s;
        }

        /* Top row */
        .card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .card-tag {
          font-family: 'Rajdhani', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: rgba(201,168,76,0.4);
        }
        .card-metric {
          font-family: 'Rajdhani', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
        }

        /* Icon */
        .card-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 58px; height: 58px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 2px;
          margin-bottom: 20px;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }

        .card-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.88);
          margin: 0 0 10px;
          text-transform: uppercase;
        }

        .card-desc {
          font-family: 'Exo 2', sans-serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.35);
          line-height: 1.7;
          margin: 0 0 18px;
        }

        /* CTA */
        .card-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          text-decoration: none;
          transition: opacity 0.35s, transform 0.35s, gap 0.3s;
        }
        .card-cta:hover { gap: 12px; }

        /* Bottom bar */
        .card-bottom-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }

        /* ── BOTTOM CTA ── */
        .svc-footer {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-top: 64px;
          padding: 0 24px;
        }
        .svc-footer-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.35);
          margin-bottom: 20px;
        }
        .svc-footer-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 48px;
          background: linear-gradient(135deg, #C9A84C, #FFD700, #C9A84C);
          background-size: 200% auto;
          color: #000;
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 30px rgba(255,215,0,0.25);
        }
        .svc-footer-btn:hover {
          background-position: right center;
          box-shadow: 0 0 50px rgba(255,215,0,0.45);
          transform: translateY(-3px);
        }
      `}</style>

      <section id="services" className="svc-section">
        <div className="svc-grid-bg" />
        <div className="svc-blob svc-blob-1" />
        <div className="svc-blob svc-blob-2" />

        {/* Header */}
        <div className="svc-header" ref={titleRef}>
          <div className="svc-eyebrow">What We Offer</div>

          <h2 className={`svc-title${titleVisible ? " show" : ""}`}>
            Our <span className="svc-title-gold">Services</span>
          </h2>

          <div className={`svc-divider${titleVisible ? " show" : ""}`}>
            <div className="sd-line" />
            <div className="sd-diamond" />
            <div className="sd-line r" />
          </div>

          <p className={`svc-sub${titleVisible ? " show" : ""}`}>
            Comprehensive digital marketing solutions engineered for measurable
            growth across every platform.
          </p>
        </div>

        {/* Cards grid */}
        <div className="svc-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="svc-footer">
          <p className="svc-footer-label">Ready to scale your brand?</p>
          <a href="#contact" className="svc-footer-btn">
            Start Your Project ›
          </a>
        </div>
      </section>
    </>
  );
};

export default Services;
