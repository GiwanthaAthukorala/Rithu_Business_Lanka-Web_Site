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
      className="relative overflow-hidden cursor-pointer px-6 pt-7 pb-8"
      style={{
        border: `1px solid ${hovered ? "rgba(99,179,237,0.38)" : "rgba(99,179,237,0.14)"}`,
        backdropFilter: "blur(16px)",
        background: "rgba(255,255,255,0.025)",
        clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,179,237,0.1)"
          : "none",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s,
                     transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s,
                     border-color 0.4s, box-shadow 0.4s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner HUD brackets — blue */}
      {[
        "top-1.5 left-1.5 border-t border-l",
        "top-1.5 right-1.5 border-t border-r",
        "bottom-1.5 left-1.5 border-b border-l",
        "bottom-1.5 right-1.5 border-b border-r",
      ].map((cls, i) => (
        <span
          key={i}
          className={`absolute w-3.5 h-3.5 pointer-events-none ${cls}`}
          style={{
            borderColor: hovered
              ? "rgba(99,179,237,0.5)"
              : "rgba(99,179,237,0.22)",
            transition: "border-color 0.4s",
          }}
        />
      ))}

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
        <span
          className="font-rajdhani text-[10px] font-semibold tracking-[0.25em]"
          style={{ color: "rgba(99,179,237,0.45)" }}
        >
          {service.tag}
        </span>
        <span
          className="font-rajdhani text-[9px] font-medium tracking-[0.15em] uppercase"
          style={{ color: "rgba(200,216,232,0.25)" }}
        >
          {service.metric}
        </span>
      </div>

      {/* Icon */}
      <div
        className="inline-flex items-center justify-center w-14 h-14 rounded-sm mb-5"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? service.iconColor + "55" : "rgba(99,179,237,0.12)"}`,
          boxShadow: hovered
            ? `0 0 28px ${service.iconGlow}, 0 0 60px ${service.iconGlow}`
            : "none",
          transform: hovered ? "scale(1.1) translateY(-2px)" : "scale(1)",
          clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Icon style={{ color: service.iconColor, fontSize: 28 }} />
      </div>

      {/* Text */}
      <h3
        className="font-rajdhani text-[17px] font-bold tracking-[0.05em] uppercase m-0 mb-2.5"
        style={{ color: "rgba(255,255,255,0.88)" }}
      >
        {service.title}
      </h3>
      <p
        className="font-exo text-[13px] font-light leading-[1.7] m-0 mb-4.5"
        style={{ color: "rgba(200,216,232,0.35)" }}
      >
        {service.description}
      </p>

      {/* CTA */}
      <a
        href="#contact"
        className="inline-flex items-center gap-2 font-rajdhani text-[11px] font-semibold
          tracking-[0.2em] uppercase no-underline"
        style={{
          color: "#63B3ED",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.35s, transform 0.35s, gap 0.35s",
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

      {/* Bottom blue bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent, #63B3ED, transparent)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
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
        @keyframes titleBlueFlow {
          0%   { background-position: 0%   center; }
          100% { background-position: 250% center; }
        }

        /* Blue-silver animated gradient title */
        .svc-title-blue {
          background: linear-gradient(90deg, #2B6CB0, #63B3ED, #C8D8E8, #63B3ED, #2B6CB0);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleBlueFlow 5s linear infinite;
          filter: drop-shadow(0 0 16px rgba(99,179,237,0.4));
        }

        /* Eyebrow flanking lines — blue */
        .svc-eyebrow::before, .svc-eyebrow::after {
          content: '';
          display: block;
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, #63B3ED);
        }
        .svc-eyebrow::after {
          background: linear-gradient(90deg, #63B3ED, transparent);
        }

        /* Background grid — blue tint */
        .svc-grid-bg {
          background-image:
            linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .svc-blob-1 { animation: blobDrift1 14s ease-in-out infinite; }
        .svc-blob-2 { animation: blobDrift2 18s ease-in-out infinite; }

        /* Footer btn */
        .svc-footer-btn {
          clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
          background-size: 200% auto;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-footer-btn:hover {
          background-position: right center;
        }
      `}</style>

      <section
        id="services"
        className="font-exo relative overflow-hidden py-30 pb-35"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 0%, #120820 0%, #0a0515 45%, #07050f 100%)",
        }}
      >
        {/* Background grid */}
        <div className="svc-grid-bg absolute inset-0 pointer-events-none z-0" />

        {/* Glow blobs — blue */}
        <div
          className="svc-blob-1 absolute rounded-full pointer-events-none z-0"
          style={{
            width: "500px",
            height: "500px",
            top: "-120px",
            left: "-120px",
            background:
              "radial-gradient(circle, rgba(99,179,237,0.09) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="svc-blob-2 absolute rounded-full pointer-events-none z-0"
          style={{
            width: "600px",
            height: "600px",
            bottom: "-150px",
            right: "-100px",
            background:
              "radial-gradient(circle, rgba(99,179,237,0.07) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        {/* ── Header ── */}
        <div ref={titleRef} className="relative z-10 text-center mb-20 px-6">
          {/* Eyebrow */}
          <div
            className="svc-eyebrow inline-flex items-center gap-3 font-rajdhani text-[10px] font-medium tracking-[0.35em] uppercase mb-5"
            style={{ color: "rgba(99,179,237,0.55)" }}
          >
            What We Offer
          </div>

          {/* Title */}
          <h2
            className={`font-cinzel font-bold leading-none tracking-[-0.01em] m-0 mb-2
              transition-[opacity,transform] duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{
              fontSize: "clamp(36px, 6vw, 68px)",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Our <span className="svc-title-blue">Services</span>
          </h2>

          {/* Divider — blue */}
          <div
            className={`flex items-center justify-center gap-3 mx-auto mt-7 max-w-75
              transition-opacity duration-800 delay-300
              ${titleVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, #63B3ED)",
              }}
            />
            <div
              className="w-1.75 h-1.75 rotate-45"
              style={{
                background: "#63B3ED",
                boxShadow:
                  "0 0 10px rgba(99,179,237,0.6), 0 0 20px rgba(99,179,237,0.4)",
              }}
            />
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(90deg, #63B3ED, transparent)",
              }}
            />
          </div>

          {/* Sub */}
          <p
            className={`font-exo font-extralight max-w-130 mx-auto mt-5 leading-[1.7]
              transition-[opacity,transform] duration-800 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              fontSize: "clamp(14px, 1.8vw, 18px)",
              color: "rgba(200,216,232,0.35)",
            }}
          >
            Comprehensive digital marketing solutions engineered for measurable
            growth across every platform.
          </p>
        </div>

        {/* Cards grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto px-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="relative z-10 text-center mt-16 px-6">
          <p
            className="font-rajdhani text-[11px] tracking-[0.3em] uppercase mb-5"
            style={{ color: "rgba(99,179,237,0.38)" }}
          >
            Ready to scale your brand?
          </p>
          <a
            href="#contact"
            className="svc-footer-btn inline-flex items-center gap-2.5 px-12 py-4
              font-rajdhani text-[13px] font-bold tracking-[0.2em] uppercase no-underline
              hover:-translate-y-0.75"
            style={{
              background: "linear-gradient(135deg, #2B6CB0, #63B3ED, #2B6CB0)",
              color: "#ffffff",
              boxShadow: "0 0 30px rgba(99,179,237,0.3)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 50px rgba(99,179,237,0.55)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 30px rgba(99,179,237,0.3)")
            }
          >
            Start Your Project ›
          </a>
        </div>
      </section>
    </>
  );
};

export default Services;
