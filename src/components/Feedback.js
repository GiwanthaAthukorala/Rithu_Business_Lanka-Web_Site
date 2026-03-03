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

/*
  Kept in <style> — genuinely not expressible in Tailwind:
  • @import Google Fonts
  • @keyframes (glowPulse, blink, goldFlow, cardReveal)
  • ::before / ::after pseudo-elements:
      – .fb-stat top-line reveal on hover
      – .fb-card top scan-line + inner glow
      – .fb-cta-btn shimmer sweep + background-position
      – .fb-stat inner gradient overlay
  • background-clip: text / -webkit-text-fill-color (gold title)
  • clip-path: polygon() (stats, platform badge, pagination, cta, screenshot btn)
  • repeating-linear-gradient scanline overlay
  • layered background-image grid pattern
  • .fb-screenshot hover child selectors (.fb-screenshot-inner, .fb-screenshot-label, .fb-screenshot-overlay)
  • filter: drop-shadow() on stars
*/

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
  const corners = [
    { pos: "top-0 left-0", border: "border-t border-l" },
    { pos: "top-0 right-0", border: "border-t border-r" },
    { pos: "bottom-0 left-0", border: "border-b border-l" },
    { pos: "bottom-0 right-0", border: "border-b border-r" },
  ];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
        bg-[rgba(0,0,0,0.95)] backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden
          bg-[rgba(8,8,15,0.9)] border border-[rgba(201,168,76,0.3)]
          shadow-[0_0_60px_rgba(201,168,76,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HUD corners */}
        {corners.map(({ pos, border }, i) => (
          <div
            key={i}
            className={`absolute w-5 h-5 z-10 ${pos} ${border} border-[#C9A84C]`}
          />
        ))}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex items-center justify-center
            p-2 cursor-pointer text-[#C9A84C]
            bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.4)]
            transition-all duration-300
            hover:bg-[rgba(201,168,76,0.3)]"
        >
          <FaTimes size={16} />
        </button>

        <div className="relative w-full min-h-125">
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

        /* Keyframes */
        @keyframes glowPulse {
          0%,100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }
        @keyframes blink {
          0%,100% { opacity: 1;   }
          50%      { opacity: 0.2; }
        }
        @keyframes goldFlow {
          0%   { background-position: 0%; }
          100% { background-position: 200%; }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Glow pulse */
        .fb-glow-top { animation: glowPulse 5s ease-in-out infinite; }

        /* Dot blink */
        .fb-dot { animation: blink 2s ease-in-out infinite; }

        /* Gold gradient text */
        .fb-title-gold {
          background: linear-gradient(90deg, #C9A84C, #FFD700, #C9A84C);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldFlow 4s linear infinite;
          filter: drop-shadow(0 0 16px rgba(255,215,0,0.3));
        }

        /* Background grid */
        .fb-grid-bg {
          background-image:
            linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
          background-size: 70px 70px;
        }

        /* CRT scanlines */
        .fb-scan {
          background: repeating-linear-gradient(
            to bottom, transparent 0, transparent 3px,
            rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
        }

        /* Stat card: clip + ::before overlay + ::after bottom line */
        .fb-stat {
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          position: relative;
          overflow: hidden;
        }
        .fb-stat::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .fb-stat:hover::before { opacity: 1; }
        .fb-stat::after {
          content: '';
          position: absolute;
          bottom: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
          transform: scaleX(0);
          transition: transform 0.4s;
        }
        .fb-stat:hover::after { transform: scaleX(1); }

        /* Feedback card: card reveal + top line + inner glow */
        .fb-card {
          animation: cardReveal 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .fb-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
          transform: scaleX(0);
          transition: transform 0.5s;
        }
        .fb-card:hover::before { transform: scaleX(1); }
        .fb-card::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,168,76,0.04), transparent);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .fb-card:hover::after { opacity: 1; }

        /* Screenshot section child hover selectors */
        .fb-screenshot:hover .fb-screenshot-inner { background: rgba(201,168,76,0.05); }
        .fb-screenshot:hover .fb-screenshot-label { color: rgba(201,168,76,0.7); }
        .fb-screenshot:hover .fb-screenshot-overlay { opacity: 1; }

        /* Platform badge + screenshot btn + pagination clip */
        .fb-platform   { clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }
        .fb-scr-btn    { clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }
        .fb-page-btn   { clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }
        .fb-cta-btn    { clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%); background-size: 200% auto; }

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

        /* Star glow */
        .fb-star-filled { color: #FFD700; filter: drop-shadow(0 0 4px rgba(255,215,0,0.6)); }
        .fb-star-empty  { color: rgba(255,255,255,0.12); }
      `}</style>

      <section
        id="feedback"
        ref={sectionRef}
        className="font-exo relative overflow-hidden py-30
          bg-[radial-gradient(ellipse_100%_50%_at_50%_0%,#120d00_0%,#020205_40%,#000008_100%)]"
      >
        {/* Background grid */}
        <div className="fb-grid-bg absolute inset-0 pointer-events-none z-0" />

        {/* Top glow */}
        <div
          className="fb-glow-top absolute -top-37.5 left-1/2 -translate-x-1/2 pointer-events-none
            w-200 h-100
            bg-[radial-gradient(ellipse,rgba(201,168,76,0.1)_0%,transparent_65%)]"
        />

        {/* CRT scanlines */}
        <div className="fb-scan absolute inset-0 pointer-events-none z-1" />

        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />

        {/* Inner container */}
        <div className="relative z-2 max-w-300 mx-auto px-6">
          {/* ── Header ── */}
          <div className="text-center mb-17.5">
            <div className="flex justify-center mb-5">
              <div
                className="fb-platform inline-flex items-center gap-2.5
                font-rajdhani text-[11px] font-medium tracking-[0.3em] uppercase text-[#C9A84C]
                bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.2)] px-4.5 py-1.75"
              >
                <div className="fb-dot w-1.25 h-1.25 rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
                Client Testimonials
                <div className="fb-dot w-1.25 h-1.25 rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
              </div>
            </div>
            <h2
              className="font-cinzel text-[clamp(36px,5.5vw,62px)] font-bold
              text-[rgba(255,255,255,0.92)] leading-[1.05] mb-4 tracking-[-0.01em]"
            >
              What Our <span className="fb-title-gold">Clients Say</span>
            </h2>
            <p className="font-exo text-[16px] font-light text-[rgba(255,255,255,0.35)] tracking-[0.04em]">
              Real results from real businesses across Sri Lanka
            </p>
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((s) => (
              <div
                key={s.label}
                className="fb-stat bg-[rgba(255,255,255,0.02)] border border-[rgba(201,168,76,0.15)]
                  px-4 py-6 text-center
                  transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:border-[rgba(201,168,76,0.45)] hover:shadow-[0_0_30px_rgba(201,168,76,0.12)]
                  hover:-translate-y-1"
              >
                <div
                  className="font-rajdhani text-[36px] font-bold text-[#FFD700] leading-none
                  [text-shadow:0_0_20px_rgba(255,215,0,0.4)]"
                >
                  {s.num}
                </div>
                <div
                  className="font-rajdhani text-[11px] tracking-[0.18em] uppercase
                  text-[rgba(255,255,255,0.3)] mt-1.5"
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
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
                  className="fb-card relative bg-[rgba(8,8,15,0.7)] border border-[rgba(201,168,76,0.12)]
                    backdrop-blur-xl overflow-hidden
                    transition-[border-color,box-shadow,transform] duration-450
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    hover:border-[rgba(201,168,76,0.35)]
                    hover:shadow-[0_0_40px_rgba(201,168,76,0.08),0_20px_60px_rgba(0,0,0,0.5)]
                    hover:-translate-y-1.5"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="p-6">
                    {/* Avatar + name */}
                    <div className="flex items-center gap-3.5 mb-4.5">
                      <div
                        className="w-11.5 h-11.5 rounded-sm flex items-center justify-center
                        font-cinzel text-[18px] font-bold text-[#020205] shrink-0
                        bg-[linear-gradient(135deg,#C9A84C,#FFD700)]
                        shadow-[0_0_16px_rgba(201,168,76,0.3)]"
                      >
                        {fb.name.charAt(0)}
                      </div>
                      <div>
                        <div
                          className="font-rajdhani text-[16px] font-semibold
                          text-[rgba(255,255,255,0.9)] tracking-[0.05em] leading-[1.2]"
                        >
                          {fb.name}
                        </div>
                        <div className="font-exo text-[12px] text-[rgba(255,255,255,0.3)] tracking-[0.08em]">
                          {fb.company}
                        </div>
                      </div>
                    </div>

                    {/* Stars + date */}
                    <div className="flex items-center gap-0.75 mb-3.5">
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
                        className="font-rajdhani text-[10px] text-[rgba(255,255,255,0.2)]
                        tracking-[0.15em] ml-2"
                      >
                        {fb.date}
                      </span>
                    </div>

                    {/* Platform badge */}
                    <div
                      className="fb-platform inline-flex items-center gap-1.5
                        font-rajdhani text-[10px] font-semibold tracking-[0.2em] uppercase
                        px-3 py-1.25 mb-4"
                      style={{
                        color: pc.color,
                        background: pc.bg,
                        border: `1px solid ${pc.border}`,
                        boxShadow: `0 0 12px ${pc.glow}`,
                      }}
                    >
                      <div
                        className="w-1.25 h-1.25 rounded-full"
                        style={{
                          background: pc.color,
                          boxShadow: `0 0 6px ${pc.glow}`,
                        }}
                      />
                      {fb.platform}
                    </div>

                    {/* Quote */}
                    <p
                      className="font-exo relative text-[13.5px] leading-[1.7]
                      text-[rgba(255,255,255,0.5)] italic font-light mb-4.5 pl-5"
                    >
                      <FaQuoteLeft className="absolute top-0.5 left-0 text-[rgba(201,168,76,0.3)] text-[14px]" />
                      {fb.comment}
                    </p>
                  </div>

                  {/* Screenshot */}
                  <div
                    className="fb-screenshot relative h-27.5 overflow-hidden cursor-pointer
                      border-t border-[rgba(201,168,76,0.08)]"
                    onClick={() => setSelectedImage(fb.screenshot)}
                  >
                    <div
                      className="fb-screenshot-inner w-full h-full flex items-center justify-center
                      bg-[rgba(0,0,0,0.3)] transition-[background] duration-300"
                    >
                      <div className="text-center">
                        <div className="text-[28px] mb-1.5">📸</div>
                        <div
                          className="fb-screenshot-label font-rajdhani text-[10px] tracking-[0.2em]
                          uppercase text-[rgba(255,255,255,0.25)] transition-[color] duration-300"
                        >
                          View Screenshot
                        </div>
                      </div>
                    </div>
                    <div
                      className="fb-screenshot-overlay absolute inset-0 flex items-center justify-center
                      opacity-0 transition-opacity duration-300 bg-[rgba(0,0,0,0.4)]"
                    >
                      <div
                        className="fb-scr-btn flex items-center gap-1.75
                        font-rajdhani text-[11px] font-semibold tracking-[0.15em] uppercase
                        text-[#FFD700] bg-[rgba(0,0,0,0.6)] border border-[rgba(201,168,76,0.4)]
                        px-4.5 py-2"
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

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-16">
              <button
                className="fb-page-btn w-10 h-10 flex items-center justify-center
                  font-rajdhani text-[13px] font-semibold tracking-widest
                  bg-transparent border border-[rgba(201,168,76,0.2)] text-[rgba(255,255,255,0.4)]
                  cursor-pointer transition-all duration-300
                  hover:border-[rgba(201,168,76,0.5)] hover:text-[#C9A84C]
                  hover:bg-[rgba(201,168,76,0.06)] hover:shadow-[0_0_16px_rgba(201,168,76,0.1)]
                  disabled:opacity-25 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft size={12} />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`fb-page-btn w-10 h-10 flex items-center justify-center
                    font-rajdhani text-[13px] font-semibold tracking-widest
                    cursor-pointer transition-all duration-300
                    ${
                      currentPage === i + 1
                        ? "bg-[linear-gradient(135deg,#C9A84C,#FFD700)] border border-[#FFD700] text-black shadow-[0_0_20px_rgba(255,215,0,0.35)]"
                        : "bg-transparent border border-[rgba(201,168,76,0.2)] text-[rgba(255,255,255,0.4)] hover:border-[rgba(201,168,76,0.5)] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.06)]"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="fb-page-btn w-10 h-10 flex items-center justify-center
                  font-rajdhani text-[13px] font-semibold tracking-widest
                  bg-transparent border border-[rgba(201,168,76,0.2)] text-[rgba(255,255,255,0.4)]
                  cursor-pointer transition-all duration-300
                  hover:border-[rgba(201,168,76,0.5)] hover:text-[#C9A84C]
                  hover:bg-[rgba(201,168,76,0.06)] hover:shadow-[0_0_16px_rgba(201,168,76,0.1)]
                  disabled:opacity-25 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          )}

          {/* ── CTA ── */}
          <div className="text-center relative">
            <div className="h-px bg-[linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)] mb-12" />
            <a
              href="#contact"
              className="fb-cta-btn relative inline-flex items-center gap-3 px-13 py-4.5
                bg-[linear-gradient(135deg,#C9A84C,#FFD700,#C9A84C)] text-black
                font-rajdhani text-[14px] font-bold tracking-[0.2em] uppercase no-underline overflow-hidden
                shadow-[0_0_30px_rgba(255,215,0,0.25),0_0_60px_rgba(201,168,76,0.1)]
                transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:shadow-[0_0_50px_rgba(255,215,0,0.4),0_0_80px_rgba(201,168,76,0.2)]
                hover:-translate-y-0.75 hover:scale-[1.02]"
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
