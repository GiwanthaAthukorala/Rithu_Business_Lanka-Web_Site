"use client";
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

const stats = [
  { num: "500+", label: "Happy Clients" },
  { num: "98%", label: "Satisfaction Rate" },
  { num: "1000+", label: "Projects Delivered" },
  { num: "50+", label: "5-Star Reviews" },
];

/* ── Image Modal ── */
const ImageModal = ({ image, onClose }) => {
  if (!image) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
        style={{
          background: "rgba(7,5,15,0.9)",
          border: "1px solid rgba(99,179,237,0.3)",
          boxShadow: "0 0 60px rgba(99,179,237,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HUD corners — blue */}
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-5 h-5 z-10 ${cls}`}
            style={{ borderColor: "#63B3ED" }}
          />
        ))}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex items-center justify-center p-2 cursor-pointer
            transition-all duration-300"
          style={{
            color: "#63B3ED",
            background: "rgba(99,179,237,0.12)",
            border: "1px solid rgba(99,179,237,0.4)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(99,179,237,0.25)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(99,179,237,0.12)")
          }
        >
          <FaTimes size={16} />
        </button>

        <div className="relative w-full min-h-[500px]">
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

/* ── Main Component ── */
const Feedback = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);
  const testimonialsPerPage = 6;

  const indexOfLast = currentPage * testimonialsPerPage;
  const indexOfFirst = indexOfLast - testimonialsPerPage;
  const currentTestimonials = feedbacks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(feedbacks.length / testimonialsPerPage);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700&family=Exo+2:wght@200;300;400;500&display=swap');

        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-cinzel   { font-family: 'Cinzel', serif; }
        .font-exo      { font-family: 'Exo 2', sans-serif; }

        @keyframes glowPulse {
          0%,100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }
        @keyframes blink {
          0%,100% { opacity: 1;   }
          50%      { opacity: 0.2; }
        }
        @keyframes blueFlow {
          0%   { background-position: 0%; }
          100% { background-position: 200%; }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fb-glow-top { animation: glowPulse 5s ease-in-out infinite; }
        .fb-dot      { animation: blink 2s ease-in-out infinite; }

        /* Blue-silver animated gradient title */
        .fb-title-blue {
          background: linear-gradient(90deg, #2B6CB0, #63B3ED, #C8D8E8, #63B3ED, #2B6CB0);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: blueFlow 4s linear infinite;
          filter: drop-shadow(0 0 16px rgba(99,179,237,0.45));
        }

        /* Background grid — blue tint */
        .fb-grid-bg {
          background-image:
            linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px);
          background-size: 70px 70px;
        }

        /* CRT scanlines */
        .fb-scan {
          background: repeating-linear-gradient(
            to bottom, transparent 0, transparent 3px,
            rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
        }

        /* Stat card — blue */
        .fb-stat {
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          position: relative;
          overflow: hidden;
        }
        .fb-stat::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(99,179,237,0.08) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .fb-stat:hover::before { opacity: 1; }
        .fb-stat::after {
          content: '';
          position: absolute;
          bottom: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,179,237,0.55), transparent);
          transform: scaleX(0);
          transition: transform 0.4s;
        }
        .fb-stat:hover::after { transform: scaleX(1); }

        /* Feedback card — blue */
        .fb-card {
          animation: cardReveal 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .fb-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,179,237,0.55), transparent);
          transform: scaleX(0);
          transition: transform 0.5s;
        }
        .fb-card:hover::before { transform: scaleX(1); }
        .fb-card::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 40% at 50% 0%, rgba(99,179,237,0.05), transparent);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .fb-card:hover::after { opacity: 1; }

        /* Screenshot hover child selectors */
        .fb-screenshot:hover .fb-screenshot-inner { background: rgba(99,179,237,0.05); }
        .fb-screenshot:hover .fb-screenshot-label { color: rgba(99,179,237,0.75); }
        .fb-screenshot:hover .fb-screenshot-overlay { opacity: 1; }

        /* Clip paths */
        .fb-platform { clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }
        .fb-scr-btn  { clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }
        .fb-page-btn { clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }
        .fb-cta-btn  {
          clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
          background-size: 200% auto;
        }

        /* CTA shimmer sweep */
        .fb-cta-btn::before {
          content: '';
          position: absolute;
          top: -50%; left: -100%;
          width: 60%; height: 200%;
          background: rgba(255,255,255,0.15);
          transform: skewX(-20deg);
          transition: left 0.6s;
        }
        .fb-cta-btn:hover::before { left: 160%; }
        .fb-cta-btn:hover { background-position: right center; }

        /* Stars */
        .fb-star-filled { color: #63B3ED; filter: drop-shadow(0 0 4px rgba(99,179,237,0.7)); }
        .fb-star-empty  { color: rgba(255,255,255,0.12); }
      `}</style>

      <section
        id="feedback"
        ref={sectionRef}
        className="font-exo relative overflow-hidden py-30"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 50% 0%, #110820 0%, #080515 40%, #07050f 100%)",
        }}
      >
        {/* Background grid */}
        <div className="fb-grid-bg absolute inset-0 pointer-events-none z-0" />

        {/* Top glow — blue */}
        <div
          className="fb-glow-top absolute -top-[150px] left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "800px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(99,179,237,0.1) 0%, transparent 65%)",
          }}
        />

        {/* CRT scanlines */}
        <div className="fb-scan absolute inset-0 pointer-events-none z-[1]" />

        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />

        {/* Inner container */}
        <div className="relative z-[2] max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-[70px]">
            <div className="flex justify-center mb-5">
              <div
                className="fb-platform inline-flex items-center gap-2.5 font-rajdhani
                  text-[11px] font-medium tracking-[0.3em] uppercase px-4 py-1.75"
                style={{
                  color: "#63B3ED",
                  background: "rgba(99,179,237,0.05)",
                  border: "1px solid rgba(99,179,237,0.22)",
                }}
              >
                <div
                  className="fb-dot w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "#63B3ED",
                    boxShadow: "0 0 8px rgba(99,179,237,0.8)",
                  }}
                />
                Client Testimonials
                <div
                  className="fb-dot w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "#63B3ED",
                    boxShadow: "0 0 8px rgba(99,179,237,0.8)",
                  }}
                />
              </div>
            </div>

            <h2
              className="font-cinzel font-bold leading-[1.05] mb-4 tracking-[-0.01em]"
              style={{
                fontSize: "clamp(36px, 5.5vw, 62px)",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              What Our <span className="fb-title-blue">Clients Say</span>
            </h2>
            <p
              className="font-exo text-[16px] font-light tracking-[0.04em]"
              style={{ color: "rgba(200,216,232,0.35)" }}
            >
              Real results from real businesses across Sri Lanka
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((s) => (
              <div
                key={s.label}
                className="fb-stat px-4 py-6 text-center cursor-default
                  transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(99,179,237,0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.45)";
                  e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(99,179,237,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.15)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="font-rajdhani font-bold leading-none"
                  style={{
                    fontSize: "36px",
                    color: "#63B3ED",
                    textShadow: "0 0 20px rgba(99,179,237,0.5)",
                  }}
                >
                  {s.num}
                </div>
                <div
                  className="font-rajdhani text-[11px] tracking-[0.18em] uppercase mt-1.5"
                  style={{ color: "rgba(200,216,232,0.3)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {currentTestimonials.map((fb, index) => {
              const pc = platformConfig[fb.platform] || {
                color: "#63B3ED",
                glow: "rgba(99,179,237,0.3)",
                bg: "rgba(99,179,237,0.08)",
                border: "rgba(99,179,237,0.25)",
              };
              return (
                <div
                  key={fb.id}
                  className="fb-card relative backdrop-blur-xl overflow-hidden
                    transition-[border-color,box-shadow,transform] duration-450
                    ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
                  style={{
                    background: "rgba(8,6,18,0.75)",
                    border: "1px solid rgba(99,179,237,0.12)",
                    animationDelay: `${index * 0.08}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(99,179,237,0.35)";
                    e.currentTarget.style.boxShadow =
                      "0 0 40px rgba(99,179,237,0.08), 0 20px 60px rgba(0,0,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(99,179,237,0.12)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="p-6">
                    {/* Avatar + name */}
                    <div className="flex items-center gap-3.5 mb-4.5">
                      <div
                        className="w-11 h-11 rounded-sm flex items-center justify-center
                          font-cinzel text-[18px] font-bold text-white shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #2B6CB0, #63B3ED)",
                          boxShadow: "0 0 16px rgba(99,179,237,0.35)",
                        }}
                      >
                        {fb.name.charAt(0)}
                      </div>
                      <div>
                        <div
                          className="font-rajdhani text-[16px] font-semibold tracking-[0.05em] leading-[1.2]"
                          style={{ color: "rgba(255,255,255,0.9)" }}
                        >
                          {fb.name}
                        </div>
                        <div
                          className="font-exo text-[12px] tracking-[0.08em]"
                          style={{ color: "rgba(200,216,232,0.3)" }}
                        >
                          {fb.company}
                        </div>
                      </div>
                    </div>

                    {/* Stars + date */}
                    <div className="flex items-center gap-1 mb-3.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={12}
                          className={
                            i < fb.rating ? "fb-star-filled" : "fb-star-empty"
                          }
                        />
                      ))}
                      <span
                        className="font-rajdhani text-[10px] tracking-[0.15em] ml-2"
                        style={{ color: "rgba(200,216,232,0.22)" }}
                      >
                        {fb.date}
                      </span>
                    </div>

                    {/* Platform badge — keeps brand color */}
                    <div
                      className="fb-platform inline-flex items-center gap-1.5
                        font-rajdhani text-[10px] font-semibold tracking-[0.2em] uppercase
                        px-3 py-1 mb-4"
                      style={{
                        color: pc.color,
                        background: pc.bg,
                        border: `1px solid ${pc.border}`,
                        boxShadow: `0 0 12px ${pc.glow}`,
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: pc.color,
                          boxShadow: `0 0 6px ${pc.glow}`,
                        }}
                      />
                      {fb.platform}
                    </div>

                    {/* Quote */}
                    <p
                      className="font-exo relative text-[13.5px] leading-[1.7] italic font-light mb-4.5 pl-5"
                      style={{ color: "rgba(200,216,232,0.5)" }}
                    >
                      <FaQuoteLeft
                        className="absolute top-0.5 left-0 text-[14px]"
                        style={{ color: "rgba(99,179,237,0.35)" }}
                      />
                      {fb.comment}
                    </p>
                  </div>

                  {/* Screenshot */}
                  <div
                    className="fb-screenshot relative h-[110px] overflow-hidden cursor-pointer"
                    style={{ borderTop: "1px solid rgba(99,179,237,0.08)" }}
                    onClick={() => setSelectedImage(fb.screenshot)}
                  >
                    <div
                      className="fb-screenshot-inner w-full h-full flex items-center justify-center
                        transition-[background] duration-300"
                      style={{ background: "rgba(0,0,0,0.3)" }}
                    >
                      <div className="text-center">
                        <div className="text-[28px] mb-1.5">📸</div>
                        <div
                          className="fb-screenshot-label font-rajdhani text-[10px] tracking-[0.2em]
                            uppercase transition-[color] duration-300"
                          style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                          View Screenshot
                        </div>
                      </div>
                    </div>
                    <div
                      className="fb-screenshot-overlay absolute inset-0 flex items-center
                        justify-center opacity-0 transition-opacity duration-300"
                      style={{ background: "rgba(0,0,0,0.4)" }}
                    >
                      <div
                        className="fb-scr-btn flex items-center gap-1.75 font-rajdhani
                          text-[11px] font-semibold tracking-[0.15em] uppercase px-4 py-2"
                        style={{
                          color: "#63B3ED",
                          background: "rgba(0,0,0,0.6)",
                          border: "1px solid rgba(99,179,237,0.45)",
                        }}
                      >
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
            <div className="flex justify-center items-center gap-2 mb-16">
              <button
                className="fb-page-btn w-10 h-10 flex items-center justify-center
                  font-rajdhani text-[13px] font-semibold tracking-widest
                  cursor-pointer transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(99,179,237,0.2)",
                  color: "rgba(255,255,255,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.5)";
                  e.currentTarget.style.color = "#63B3ED";
                  e.currentTarget.style.background = "rgba(99,179,237,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.2)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                  e.currentTarget.style.background = "transparent";
                }}
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft size={12} />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className="fb-page-btn w-10 h-10 flex items-center justify-center
                    font-rajdhani text-[13px] font-semibold tracking-widest
                    cursor-pointer transition-all duration-300"
                  style={
                    currentPage === i + 1
                      ? {
                          background:
                            "linear-gradient(135deg, #2B6CB0, #63B3ED)",
                          border: "1px solid #63B3ED",
                          color: "#ffffff",
                          boxShadow: "0 0 20px rgba(99,179,237,0.4)",
                        }
                      : {
                          background: "transparent",
                          border: "1px solid rgba(99,179,237,0.2)",
                          color: "rgba(255,255,255,0.4)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (currentPage !== i + 1) {
                      e.currentTarget.style.borderColor =
                        "rgba(99,179,237,0.5)";
                      e.currentTarget.style.color = "#63B3ED";
                      e.currentTarget.style.background =
                        "rgba(99,179,237,0.06)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== i + 1) {
                      e.currentTarget.style.borderColor =
                        "rgba(99,179,237,0.2)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="fb-page-btn w-10 h-10 flex items-center justify-center
                  font-rajdhani text-[13px] font-semibold tracking-widest
                  cursor-pointer transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(99,179,237,0.2)",
                  color: "rgba(255,255,255,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.5)";
                  e.currentTarget.style.color = "#63B3ED";
                  e.currentTarget.style.background = "rgba(99,179,237,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.2)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                  e.currentTarget.style.background = "transparent";
                }}
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          )}

          {/* CTA */}
          <div className="text-center relative">
            <div
              className="h-px mb-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(99,179,237,0.3), transparent)",
              }}
            />
            <a
              href="#contact"
              className="fb-cta-btn relative inline-flex items-center gap-3 px-[52px] py-[18px]
                font-rajdhani text-[14px] font-bold tracking-[0.2em] uppercase no-underline overflow-hidden
                transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:-translate-y-0.75 hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, #2B6CB0, #63B3ED, #2B6CB0)",
                color: "#ffffff",
                boxShadow:
                  "0 0 30px rgba(99,179,237,0.3), 0 0 60px rgba(99,179,237,0.12)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 50px rgba(99,179,237,0.5), 0 0 80px rgba(99,179,237,0.22)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(99,179,237,0.3), 0 0 60px rgba(99,179,237,0.12)")
              }
            >
              Join Our Happy Clients
              <span className="text-base">›</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feedback;
