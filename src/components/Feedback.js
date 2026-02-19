import React, { useState, useRef } from "react";
import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaExpand,
} from "react-icons/fa";
import Image from "next/image";

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
        style={{
          background: "rgba(8,8,15,0.9)",
          border: "1px solid rgba(201,168,76,0.3)",
          boxShadow: "0 0 60px rgba(201,168,76,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HUD corners */}
        {["tl", "tr", "bl", "br"].map((c) => (
          <div
            key={c}
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              zIndex: 10,
              ...(c === "tl"
                ? {
                    top: 0,
                    left: 0,
                    borderTop: "1px solid #C9A84C",
                    borderLeft: "1px solid #C9A84C",
                  }
                : {}),
              ...(c === "tr"
                ? {
                    top: 0,
                    right: 0,
                    borderTop: "1px solid #C9A84C",
                    borderRight: "1px solid #C9A84C",
                  }
                : {}),
              ...(c === "bl"
                ? {
                    bottom: 0,
                    left: 0,
                    borderBottom: "1px solid #C9A84C",
                    borderLeft: "1px solid #C9A84C",
                  }
                : {}),
              ...(c === "br"
                ? {
                    bottom: 0,
                    right: 0,
                    borderBottom: "1px solid #C9A84C",
                    borderRight: "1px solid #C9A84C",
                  }
                : {}),
            }}
          />
        ))}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 20,
            background: "rgba(201,168,76,0.15)",
            border: "1px solid rgba(201,168,76,0.4)",
            color: "#C9A84C",
            padding: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(201,168,76,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(201,168,76,0.15)";
          }}
        >
          <FaTimes size={16} />
        </button>
        <div style={{ position: "relative", width: "100%", minHeight: 500 }}>
          <Image
            src={image}
            alt="Customer feedback screenshot"
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            style={{ objectFit: "contain" }}
            priority={false}
          />
        </div>
      </div>
    </div>
  );
};

const Feedback = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);
  const testimonialsPerPage = 6;

  const feedbacks = [
    {
      id: 1,
      name: "Mohamed Rizvi",
      company: "Rizvi Electronics",
      rating: 5,
      comment:
        "Excellent service! Their Facebook boosting strategy increased my sales by 200% in just one month. The team is very professional and responsive.",
      date: "2024-02-15",
      screenshot: "/feedback/feedback1.jpg",
      platform: "Facebook",
    },
    {
      id: 2,
      name: "Sarah Perera",
      company: "Perera Fashions",
      rating: 5,
      comment:
        "The AI video they created for my Instagram went viral! Got over 100k views in 3 days. Highly recommended for social media marketing.",
      date: "2024-02-10",
      screenshot: "/feedback/feedback2.jpg",
      platform: "Instagram",
    },
    {
      id: 3,
      name: "Kamal Fernando",
      company: "Fernando's Restaurant",
      rating: 5,
      comment:
        "Their logo design and branding services transformed my business. The WhatsApp Business integration helped me connect with customers easily.",
      date: "2024-02-05",
      screenshot: "/feedback/feedback3.jpg",
      platform: "WhatsApp",
    },
    {
      id: 4,
      name: "Dilshan Jayawardena",
      company: "Dilshan Motors",
      rating: 4,
      comment:
        "Great TikTok marketing campaign! Reached younger audience effectively. Will definitely work with them again.",
      date: "2024-01-28",
      screenshot: "/feedback/feedback4.jpg",
      platform: "TikTok",
    },
    {
      id: 5,
      name: "Nadeeka Silva",
      company: "Silva Beauty Salon",
      rating: 5,
      comment:
        "The post designs are absolutely stunning! My engagement rate has increased significantly since I started using their services.",
      date: "2024-01-20",
      screenshot: "/feedback/feedback5.jpg",
      platform: "Instagram",
    },
    {
      id: 6,
      name: "Thusitha Ranasinghe",
      company: "Ranasinghe Hardware",
      rating: 5,
      comment:
        "Professional team, delivered exactly what they promised. My Facebook page growth has been amazing!",
      date: "2024-01-15",
      screenshot: "/feedback/feedback6.jpg",
      platform: "Facebook",
    },
    {
      id: 7,
      name: "Ruwan Pieris",
      company: "Pieris Jewelers",
      rating: 5,
      comment:
        "Their AI video creation service is top-notch. The videos they created for my products look professional and engaging.",
      date: "2024-01-10",
      screenshot: "/feedback/feedback7.jpg",
      platform: "TikTok",
    },
    {
      id: 8,
      name: "Chamari Atapattu",
      company: "Chamari Boutique",
      rating: 4,
      comment:
        "Very happy with their post boosting service. Good ROI and excellent customer support throughout the campaign.",
      date: "2024-01-05",
      screenshot: "/feedback/feedback8.jpg",
      platform: "Facebook",
    },
    {
      id: 9,
      name: "Lasantha Wickramasinghe",
      company: "Wickramasinghe Traders",
      rating: 5,
      comment:
        "Best digital marketing agency in Sri Lanka! Their team understands local market needs perfectly.",
      date: "2023-12-28",
      screenshot: "/feedback/feedback9.jpg",
      platform: "WhatsApp",
    },
  ];

  const platformConfig = {
    Facebook: {
      color: "#1877F2",
      glow: "rgba(24,119,242,0.3)",
      bg: "rgba(24,119,242,0.08)",
      border: "rgba(24,119,242,0.25)",
    },
    Instagram: {
      color: "#E1306C",
      glow: "rgba(225,48,108,0.3)",
      bg: "rgba(225,48,108,0.08)",
      border: "rgba(225,48,108,0.25)",
    },
    TikTok: {
      color: "#69C9D0",
      glow: "rgba(105,201,208,0.3)",
      bg: "rgba(105,201,208,0.08)",
      border: "rgba(105,201,208,0.25)",
    },
    WhatsApp: {
      color: "#25D366",
      glow: "rgba(37,211,102,0.3)",
      bg: "rgba(37,211,102,0.08)",
      border: "rgba(37,211,102,0.25)",
    },
  };

  const indexOfLast = currentPage * testimonialsPerPage;
  const indexOfFirst = indexOfLast - testimonialsPerPage;
  const currentTestimonials = feedbacks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(feedbacks.length / testimonialsPerPage);

  const stats = [
    { num: "500+", label: "Happy Clients", suffix: "" },
    { num: "98%", label: "Satisfaction Rate", suffix: "" },
    { num: "1000+", label: "Projects Delivered", suffix: "" },
    { num: "50+", label: "5-Star Reviews", suffix: "" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700&family=Exo+2:wght@200;300;400;500&display=swap');

        .fb-section {
          position: relative;
          padding: 120px 0;
          background: radial-gradient(ellipse 100% 50% at 50% 0%, #120d00 0%, #020205 40%, #000008 100%);
          overflow: hidden;
          font-family: 'Exo 2', sans-serif;
        }

        /* Grid bg */
        .fb-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
          background-size: 70px 70px;
          pointer-events: none;
        }

        /* Top glow */
        .fb-glow-top {
          position: absolute;
          top: -150px; left: 50%;
          transform: translateX(-50%);
          width: 800px; height: 400px;
          background: radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 65%);
          pointer-events: none;
          animation: glowPulse 5s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%,100% { opacity:0.6; }
          50% { opacity:1; }
        }

        /* Scanlines */
        .fb-scan {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px);
          pointer-events: none;
          z-index: 1;
        }

        .fb-container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── HEADER ── */
        .fb-header {
          text-align: center;
          margin-bottom: 70px;
        }
        .fb-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 20px;
          background: rgba(201,168,76,0.05);
          border: 1px solid rgba(201,168,76,0.2);
          padding: 7px 18px;
        }
        .fb-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #C9A84C;
          box-shadow: 0 0 8px rgba(201,168,76,0.8);
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .fb-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(36px, 5.5vw, 62px);
          font-weight: 700;
          color: rgba(255,255,255,0.92);
          line-height: 1.05;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        .fb-title-gold {
          background: linear-gradient(90deg, #C9A84C, #FFD700, #C9A84C);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldFlow 4s linear infinite;
          filter: drop-shadow(0 0 16px rgba(255,215,0,0.3));
        }
        @keyframes goldFlow {
          0%{background-position:0%} 100%{background-position:200%}
        }
        .fb-subtitle {
          font-size: 16px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.04em;
          font-weight: 300;
        }

        /* ── STATS ── */
        .fb-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 64px;
        }
        @media(max-width:768px){ .fb-stats{grid-template-columns:repeat(2,1fr);} }

        .fb-stat {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(201,168,76,0.15);
          padding: 24px 16px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
        }
        .fb-stat::before {
          content:'';
          position:absolute;
          inset:0;
          background: linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 60%);
          opacity:0;
          transition:opacity 0.3s;
        }
        .fb-stat:hover { border-color:rgba(201,168,76,0.45); box-shadow:0 0 30px rgba(201,168,76,0.12); transform:translateY(-4px); }
        .fb-stat:hover::before { opacity:1; }
        .fb-stat-num {
          font-family: 'Rajdhani', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: #FFD700;
          line-height: 1;
          text-shadow: 0 0 20px rgba(255,215,0,0.4);
        }
        .fb-stat-lbl {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-top: 6px;
          font-family: 'Rajdhani', sans-serif;
        }
        .fb-stat-line {
          position: absolute;
          bottom: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
          transform: scaleX(0);
          transition: transform 0.4s;
        }
        .fb-stat:hover .fb-stat-line { transform: scaleX(1); }

        /* ── CARD GRID ── */
        .fb-grid-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }
        @media(max-width:1024px){ .fb-grid-cards{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:640px){ .fb-grid-cards{grid-template-columns:1fr;} }

        /* ── CARD ── */
        .fb-card {
          background: rgba(8,8,15,0.7);
          border: 1px solid rgba(201,168,76,0.12);
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
          transition: border-color 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1);
          animation: cardReveal 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes cardReveal {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fb-card::before {
          content:'';
          position:absolute;
          top:0; left:0; right:0;
          height:1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
          transform: scaleX(0);
          transition: transform 0.5s;
        }
        .fb-card:hover { border-color:rgba(201,168,76,0.35); box-shadow:0 0 40px rgba(201,168,76,0.08), 0 20px 60px rgba(0,0,0,0.5); transform:translateY(-6px); }
        .fb-card:hover::before { transform: scaleX(1); }

        /* card inner glow on hover */
        .fb-card::after {
          content:'';
          position:absolute;
          inset:0;
          background: radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,168,76,0.04), transparent);
          opacity:0;
          transition:opacity 0.4s;
          pointer-events:none;
        }
        .fb-card:hover::after { opacity:1; }

        .fb-card-body { padding: 24px; }

        /* Avatar row */
        .fb-avatar-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
        }
        .fb-avatar {
          width: 46px; height: 46px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-size: 18px;
          font-weight: 700;
          color: #020205;
          flex-shrink: 0;
          position: relative;
          background: linear-gradient(135deg, #C9A84C, #FFD700);
          box-shadow: 0 0 16px rgba(201,168,76,0.3);
        }
        .fb-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.05em;
          line-height: 1.2;
        }
        .fb-company {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.08em;
          font-family: 'Exo 2', sans-serif;
        }

        /* Stars */
        .fb-stars {
          display: flex;
          align-items: center;
          gap: 3px;
          margin-bottom: 14px;
        }
        .fb-star-filled { color: #FFD700; filter: drop-shadow(0 0 4px rgba(255,215,0,0.6)); }
        .fb-star-empty  { color: rgba(255,255,255,0.12); }
        .fb-date {
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.15em;
          font-family: 'Rajdhani', sans-serif;
          margin-left: 8px;
        }

        /* Quote */
        .fb-quote {
          font-size: 13.5px;
          line-height: 1.7;
          color: rgba(255,255,255,0.5);
          margin-bottom: 18px;
          font-style: italic;
          position: relative;
          padding-left: 20px;
          font-weight: 300;
        }
        .fb-quote-icon {
          position: absolute;
          top: 2px; left: 0;
          color: rgba(201,168,76,0.3);
          font-size: 14px;
        }

        /* Platform badge */
        .fb-platform {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 5px 12px;
          margin-bottom: 16px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }

        /* Screenshot */
        .fb-screenshot {
          position: relative;
          height: 110px;
          overflow: hidden;
          cursor: pointer;
          border-top: 1px solid rgba(201,168,76,0.08);
        }
        .fb-screenshot-inner {
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.3);
          transition: background 0.3s;
        }
        .fb-screenshot:hover .fb-screenshot-inner { background: rgba(201,168,76,0.05); }
        .fb-screenshot-icon { font-size: 28px; margin-bottom: 6px; }
        .fb-screenshot-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          transition: color 0.3s;
        }
        .fb-screenshot:hover .fb-screenshot-label { color: rgba(201,168,76,0.7); }
        .fb-screenshot-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
          background: rgba(0,0,0,0.4);
        }
        .fb-screenshot:hover .fb-screenshot-overlay { opacity: 1; }
        .fb-screenshot-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #FFD700;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(201,168,76,0.4);
          padding: 8px 18px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }

        /* ── PAGINATION ── */
        .fb-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-bottom: 64px;
        }
        .fb-page-btn {
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          width: 40px; height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.2);
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.3s;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .fb-page-btn:hover:not(:disabled) {
          border-color: rgba(201,168,76,0.5);
          color: #C9A84C;
          background: rgba(201,168,76,0.06);
          box-shadow: 0 0 16px rgba(201,168,76,0.1);
        }
        .fb-page-btn.active {
          background: linear-gradient(135deg, #C9A84C, #FFD700);
          border-color: #FFD700;
          color: #000;
          box-shadow: 0 0 20px rgba(255,215,0,0.35);
        }
        .fb-page-btn:disabled { opacity:0.25; cursor:not-allowed; }

        /* ── CTA ── */
        .fb-cta-wrap {
          text-align: center;
          position: relative;
        }
        .fb-cta-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
          margin-bottom: 48px;
        }
        .fb-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 52px;
          background: linear-gradient(135deg, #C9A84C, #FFD700, #C9A84C);
          background-size: 200% auto;
          color: #000;
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 30px rgba(255,215,0,0.25), 0 0 60px rgba(201,168,76,0.1);
          position: relative;
          overflow: hidden;
        }
        .fb-cta-btn::before {
          content:'';
          position:absolute;
          top:-50%;left:-100%;
          width:60%;height:200%;
          background:rgba(255,255,255,0.15);
          transform:skewX(-20deg);
          transition:left 0.6s;
        }
        .fb-cta-btn:hover { background-position:right center; box-shadow:0 0 50px rgba(255,215,0,0.4), 0 0 80px rgba(201,168,76,0.2); transform:translateY(-3px) scale(1.02); }
        .fb-cta-btn:hover::before { left:160%; }
      `}</style>

      <section id="feedback" className="fb-section" ref={sectionRef}>
        <div className="fb-grid" />
        <div className="fb-glow-top" />
        <div className="fb-scan" />

        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />

        <div className="fb-container">
          {/* Header */}
          <div className="fb-header">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <div className="fb-eyebrow">
                <div className="fb-dot" />
                Client Testimonials
                <div className="fb-dot" />
              </div>
            </div>
            <h2 className="fb-title">
              What Our <span className="fb-title-gold">Clients Say</span>
            </h2>
            <p className="fb-subtitle">
              Real results from real businesses across Sri Lanka
            </p>
          </div>

          {/* Stats */}
          <div className="fb-stats">
            {stats.map((s) => (
              <div className="fb-stat" key={s.label}>
                <div className="fb-stat-num">{s.num}</div>
                <div className="fb-stat-lbl">{s.label}</div>
                <div className="fb-stat-line" />
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="fb-grid-cards">
            {currentTestimonials.map((fb, index) => {
              const pc = platformConfig[fb.platform] || {
                color: "#C9A84C",
                glow: "rgba(201,168,76,0.3)",
                bg: "rgba(201,168,76,0.08)",
                border: "rgba(201,168,76,0.25)",
              };
              return (
                <div
                  key={fb.id}
                  className="fb-card"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="fb-card-body">
                    {/* Avatar + name */}
                    <div className="fb-avatar-row">
                      <div className="fb-avatar">{fb.name.charAt(0)}</div>
                      <div>
                        <div className="fb-name">{fb.name}</div>
                        <div className="fb-company">{fb.company}</div>
                      </div>
                    </div>

                    {/* Stars + date */}
                    <div className="fb-stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={12}
                          className={
                            i < fb.rating ? "fb-star-filled" : "fb-star-empty"
                          }
                        />
                      ))}
                      <span className="fb-date">{fb.date}</span>
                    </div>

                    {/* Platform */}
                    <div
                      className="fb-platform"
                      style={{
                        color: pc.color,
                        background: pc.bg,
                        border: `1px solid ${pc.border}`,
                        boxShadow: `0 0 12px ${pc.glow}`,
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: pc.color,
                          boxShadow: `0 0 6px ${pc.glow}`,
                        }}
                      />
                      {fb.platform}
                    </div>

                    {/* Quote */}
                    <p className="fb-quote">
                      <FaQuoteLeft className="fb-quote-icon" />
                      {fb.comment}
                    </p>
                  </div>

                  {/* Screenshot */}
                  <div
                    className="fb-screenshot"
                    onClick={() => setSelectedImage(fb.screenshot)}
                  >
                    <div className="fb-screenshot-inner">
                      <div style={{ textAlign: "center" }}>
                        <div className="fb-screenshot-icon">📸</div>
                        <div className="fb-screenshot-label">
                          View Screenshot
                        </div>
                      </div>
                    </div>
                    <div className="fb-screenshot-overlay">
                      <div className="fb-screenshot-btn">
                        <FaExpand size={10} />
                        View Full Size
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="fb-pagination">
              <button
                className="fb-page-btn"
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft size={12} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`fb-page-btn ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="fb-page-btn"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          )}

          {/* CTA */}
          <div className="fb-cta-wrap">
            <div className="fb-cta-line" />
            <a href="#contact" className="fb-cta-btn">
              Join Our Happy Clients
              <span style={{ fontSize: 16 }}>›</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feedback;
