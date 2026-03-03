"use client";
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

/*
  Kept in <style> — genuinely not expressible in Tailwind:
  • @import Google Fonts
  • @keyframes (blobDrift1, blobDrift2, titleGoldFlow)
  • ::before / ::after on .svc-eyebrow (decorative lines flanking label)
  • background-clip: text / -webkit-text-fill-color (gold gradient title)
  • clip-path: polygon() on cards, icon wrap, footer button
  • repeating/layered background-image grid pattern
  • filter: blur() on blob divs (Tailwind's blur applies to the element itself, not as a filter-blur on bg)
  • .svc-card hover child selector (.svc-card:hover .card-corner)
  • card-bottom-bar transform-origin + scaleX driven by JS inline style
  • card-cta gap hover (gap transition not possible in Tailwind)
*/
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
      className="svc-card relative border border-[rgba(201,168,76,0.15)] backdrop-blur-xl
        overflow-hidden cursor-pointer
        transition-[border-color,box-shadow,transform] duration-400
        ease-[cubic-bezier(0.16,1,0.3,1)]
        hover:border-[rgba(201,168,76,0.35)]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(201,168,76,0.08)]
        hover:-translate-y-1.5
        bg-[rgba(255,255,255,0.025)] px-6 pt-7 pb-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`,
        clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner HUD brackets */}
      <span className="absolute top-1.5 left-1.5 w-3.5 h-3.5 pointer-events-none border-t border-l border-[rgba(201,168,76,0.25)] transition-[border-color] duration-400 group-hover:border-[rgba(201,168,76,0.6)]" />
      <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 pointer-events-none border-t border-r border-[rgba(201,168,76,0.25)] transition-[border-color] duration-400" />
      <span className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 pointer-events-none border-b border-l border-[rgba(201,168,76,0.25)] transition-[border-color] duration-400" />
      <span className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 pointer-events-none border-b border-r border-[rgba(201,168,76,0.25)] transition-[border-color] duration-400" />

      {/* Hover glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${service.iconGlow} 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Top row */}
      <div className="flex justify-between items-center mb-5">
        <span className="font-rajdhani text-[10px] font-semibold tracking-[0.25em] text-[rgba(201,168,76,0.4)]">
          {service.tag}
        </span>
        <span className="font-rajdhani text-[9px] font-medium tracking-[0.15em] text-[rgba(255,255,255,0.2)] uppercase">
          {service.metric}
        </span>
      </div>

      {/* Icon */}
      <div
        className="inline-flex items-center justify-center w-14.5 h-14.5
          bg-[rgba(255,255,255,0.03)] border border-[rgba(201,168,76,0.12)]
          rounded-sm mb-5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          boxShadow: hovered
            ? `0 0 28px ${service.iconGlow}, 0 0 60px ${service.iconGlow}`
            : "none",
          borderColor: hovered
            ? service.iconColor + "55"
            : "rgba(201,168,76,0.12)",
          transform: hovered ? "scale(1.1) translateY(-2px)" : "scale(1)",
          clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
        }}
      >
        <Icon style={{ color: service.iconColor, fontSize: 28 }} />
      </div>

      {/* Text */}
      <h3 className="font-rajdhani text-[17px] font-bold tracking-[0.05em] text-[rgba(255,255,255,0.88)] uppercase m-0 mb-2.5">
        {service.title}
      </h3>
      <p className="font-exo text-[13px] font-light text-[rgba(255,255,255,0.35)] leading-[1.7] m-0 mb-4.5">
        {service.description}
      </p>

      {/* CTA */}
      <a
        href="#contact"
        className="card-cta inline-flex items-center gap-2 font-rajdhani text-[11px] font-semibold
          tracking-[0.2em] uppercase text-[#C9A84C] no-underline
          transition-[opacity,transform,gap] duration-350"
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
        className="absolute bottom-0 left-0 right-0 h-px
          bg-[linear-gradient(90deg,transparent,#C9A84C,transparent)]
          origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
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

        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-cinzel   { font-family: 'Cinzel', serif; }
        .font-exo      { font-family: 'Exo 2', sans-serif; }

        @keyframes blobDrift1 {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(50px,70px); }
        }
        @keyframes blobDrift2 {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(-40px,-50px); }
        }
        @keyframes titleGoldFlow {
          0%   { background-position: 0%   center; }
          100% { background-position: 250% center; }
        }

        /* Animated gradient title text */
        .svc-title-gold {
          background: linear-gradient(90deg, #C9A84C, #FFD700, #FFF3CC, #FFD700, #C9A84C);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleGoldFlow 5s linear infinite;
          filter: drop-shadow(0 0 16px rgba(255,215,0,0.3));
        }

        /* Eyebrow flanking lines via ::before / ::after */
        .svc-eyebrow::before, .svc-eyebrow::after {
          content: '';
          display: block;
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C);
        }
        .svc-eyebrow::after {
          background: linear-gradient(90deg, #C9A84C, transparent);
        }

        /* Background grid — layered linear-gradients */
        .svc-grid-bg {
          background-image:
            linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* Blob animations */
        .svc-blob-1 { animation: blobDrift1 14s ease-in-out infinite; }
        .svc-blob-2 { animation: blobDrift2 18s ease-in-out infinite; }

        /* card-cta gap on hover */
        .card-cta:hover { gap: 12px; }

        /* Footer btn clip + hover */
        .svc-footer-btn {
          clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
          background-size: 200% auto;
        }
        .svc-footer-btn:hover {
          background-position: right center;
        }
      `}</style>

      <section
        id="services"
        className="font-exo relative overflow-hidden py-30 pb-35
          bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,#0d0900_0%,#08080F_45%,#000008_100%)]"
      >
        {/* Background grid */}
        <div className="svc-grid-bg absolute inset-0 pointer-events-none z-0" />

        {/* Glow blobs */}
        <div
          className="svc-blob-1 absolute rounded-full pointer-events-none z-0
            w-125 h-125 -top-30 -left-30
            bg-[radial-gradient(circle,rgba(201,168,76,0.09)_0%,transparent_70%)]
            blur-[100px]"
        />
        <div
          className="svc-blob-2 absolute rounded-full pointer-events-none z-0
            w-150 h-150 -bottom-37.5 -right-25
            bg-[radial-gradient(circle,rgba(201,168,76,0.07)_0%,transparent_70%)]
            blur-[100px]"
        />

        {/* ── Header ── */}
        <div ref={titleRef} className="relative z-10 text-center mb-20 px-6">
          {/* Eyebrow */}
          <div
            className="svc-eyebrow inline-flex items-center gap-3
            font-rajdhani text-[10px] font-medium tracking-[0.35em] uppercase
            text-[rgba(201,168,76,0.55)] mb-5"
          >
            What We Offer
          </div>

          {/* Title */}
          <h2
            className={`font-cinzel text-[clamp(36px,6vw,68px)] font-bold leading-none
              tracking-[-0.01em] text-[rgba(255,255,255,0.92)] m-0 mb-2
              transition-[opacity,transform] duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            Our <span className="svc-title-gold">Services</span>
          </h2>

          {/* Divider */}
          <div
            className={`flex items-center justify-center gap-3 mx-auto mt-7 max-w-75
              transition-opacity duration-800 delay-300
              ${titleVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex-1 h-px bg-[linear-gradient(90deg,transparent,#C9A84C)]" />
            <div className="w-1.75 h-1.75 bg-[#C9A84C] rotate-45 shadow-[0_0_10px_rgba(201,168,76,0.5),0_0_20px_rgba(201,168,76,0.5)]" />
            <div className="flex-1 h-px bg-[linear-gradient(90deg,#C9A84C,transparent)]" />
          </div>

          {/* Sub */}
          <p
            className={`font-exo text-[clamp(14px,1.8vw,18px)] font-extralight
              text-[rgba(255,255,255,0.35)] max-w-130 mx-auto mt-5 leading-[1.7]
              transition-[opacity,transform] duration-800 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Comprehensive digital marketing solutions engineered for measurable
            growth across every platform.
          </p>
        </div>

        {/* Cards grid */}
        <div
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5
          max-w-7xl mx-auto px-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="relative z-10 text-center mt-16 px-6">
          <p
            className="font-rajdhani text-[11px] tracking-[0.3em] uppercase
            text-[rgba(201,168,76,0.35)] mb-5"
          >
            Ready to scale your brand?
          </p>
          <a
            href="#contact"
            className="svc-footer-btn inline-flex items-center gap-2.5 px-12 py-4
              bg-[linear-gradient(135deg,#C9A84C,#FFD700,#C9A84C)] text-black
              font-rajdhani text-[13px] font-bold tracking-[0.2em] uppercase no-underline
              shadow-[0_0_30px_rgba(255,215,0,0.25)]
              transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
              hover:shadow-[0_0_50px_rgba(255,215,0,0.45)] hover:-translate-y-0.75"
          >
            Start Your Project ›
          </a>
        </div>
      </section>
    </>
  );
};

export default Services;
