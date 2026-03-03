"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [time, setTime] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = ["Home", "Services", "Social Media", "FeedBack", "Contact"];

  return (
    <>
      {/*
        Only truly CSS-only things that Tailwind cannot express:
        - @import for Google Fonts
        - @keyframes animations
        - clip-path polygon helpers
        - ::before / ::after pseudo-elements
        - CSS custom-property driven scan-line
        Everything else is pure Tailwind utility classes.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600&display=swap');

        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-cinzel   { font-family: 'Cinzel', serif; }

        @keyframes goldFlow {
          0%   { background-position: 0%   center; }
          100% { background-position: 200% center; }
        }
        @keyframes navBlink {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.2; }
        }

        .animate-gold-flow {
          background: linear-gradient(90deg, #C9A84C, #FFD700, #C9A84C);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldFlow 4s linear infinite;
        }
        .animate-blink { animation: navBlink 2.4s ease-in-out infinite; }

        /* clip-path shortcuts */
        .clip-nav-btn  { clip-path: polygon(6px  0%, 100% 0%, calc(100% - 6px)  100%, 0% 100%); }
        .clip-nav-link { clip-path: polygon(8px  0%, 100% 0%, calc(100% - 8px)  100%, 0% 100%); }
        .clip-cta      { clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%); }

        /* Scan-line on scrolled state via ::after */
        .nav-inner::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #C9A84C 30%, #FFD700 50%, #C9A84C 70%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .nav-inner.scrolled::after { opacity: 1; }

        /* Logo underline reveal */
        .logo-accent {
          position: absolute;
          bottom: -4px; left: 0;
          width: 100%; height: 1px;
          background: linear-gradient(90deg, #C9A84C, transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .rbl-logo:hover .logo-accent { transform: scaleX(1); }

        /* Nav-link bg fill on hover / active */
        .nav-link-anchor::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(201,168,76,0.07);
          opacity: 0;
          transition: opacity 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .nav-link-anchor:hover::before,
        .nav-link-anchor.is-active::before { opacity: 1; }

        /* Nav-link underbar */
        .link-bar {
          position: absolute;
          bottom: 0; left: 18px; right: 18px;
          height: 1px;
          background: #C9A84C;
          box-shadow: 0 0 6px rgba(201,168,76,0.5);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link-anchor:hover .link-bar,
        .nav-link-anchor.is-active .link-bar { transform: scaleX(1); }

        /* CTA shimmer */
        .nav-cta-link { position: relative; overflow: hidden; }
        .nav-cta-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: white;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .nav-cta-link:hover::before { opacity: 0.15; }

        /* Mobile menu slide */
        .mobile-menu {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s;
        }
        .mobile-menu.open { max-height: 400px; opacity: 1; }

        /* Mobile link arrow hover */
        .mobile-link:hover .mobile-arrow,
        .mobile-link.is-active .mobile-arrow {
          color: #C9A84C;
          transform: translateX(4px);
        }
      `}</style>

      <nav
        ref={menuRef}
        className="fixed top-1 left-2.5 right-2.5 z-9999 transition-all duration-500 font-rajdhani"
      >
        {/* Inner wrapper — glass blur when scrolled */}
        <div
          className={[
            "nav-inner relative px-8 transition-all duration-500",
            isScrolled
              ? "scrolled bg-[rgba(2,2,5,0.75)] backdrop-blur-2xl border-b border-[rgba(201,168,76,0.18)] shadow-[0_4px_40px_rgba(0,0,0,0.6),0_0_60px_rgba(201,168,76,0.04)]"
              : "bg-transparent",
          ].join(" ")}
        >
          {/* ── HUD micro bar ── */}
          <div className="flex justify-between items-center py-1.25 border-b border-[rgba(201,168,76,0.07)] overflow-hidden">
            <span className="font-rajdhani text-[9px] tracking-[0.28em] uppercase text-[rgba(201,168,76,0.35)]">
              <span className="inline-block w-1.25 h-1.25 rounded-full bg-[#C9A84C] shadow-[0_0_6px_rgba(201,168,76,0.5)] animate-blink mr-2 align-middle" />
              Rithu Business Lanka
            </span>
            <span className="font-rajdhani text-[9px] tracking-[0.28em] uppercase text-[rgba(201,168,76,0.35)]">
              {time}
            </span>
            <span className="font-rajdhani text-[9px] tracking-[0.28em] uppercase text-[rgba(201,168,76,0.35)]">
              COLOMBO · LK
              <span className="inline-block w-1.25 h-1.25 rounded-full bg-[#C9A84C] shadow-[0_0_6px_rgba(201,168,76,0.5)] animate-blink ml-2 align-middle" />
            </span>
          </div>

          {/* ── Main nav row ── */}
          <div className="flex justify-between items-center py-3.5">
            {/* Logo */}
            <Link
              href="/"
              className="rbl-logo relative flex flex-col leading-none no-underline"
            >
              <span className="animate-gold-flow font-cinzel text-[22px] font-semibold tracking-[0.05em]">
                Rithu Bussiness Lanka
              </span>
              <span className="font-rajdhani text-[9px] tracking-[0.35em] uppercase text-[rgba(201,168,76,0.45)] mt-0.5">
                Business Lanka Marketing
              </span>
              <span className="logo-accent" />
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
              {navItems.map((item, i) => {
                const href = `#${item.toLowerCase().replace(" ", "-")}`;
                const isActive = activeItem === item;
                return (
                  <li key={item} className="relative">
                    <Link
                      href={href}
                      onClick={() => setActiveItem(item)}
                      className={[
                        "nav-link-anchor clip-nav-link relative inline-flex items-center gap-1.5 px-4.5 py-2",
                        "font-rajdhani text-[12px] font-semibold tracking-[0.18em] uppercase no-underline",
                        "transition-colors duration-300",
                        isActive
                          ? "is-active text-[#C9A84C] [text-shadow:0_0_12px_rgba(255,215,0,0.4)]"
                          : "text-[rgba(255,255,255,0.45)] hover:text-[#C9A84C]",
                      ].join(" ")}
                    >
                      <span className="text-[8px] text-[rgba(201,168,76,0.3)] font-normal align-super mr-0.5">
                        0{i + 1}
                      </span>
                      {item}
                      <span className="link-bar" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right side: CTA + hamburger */}
            <div className="flex items-center">
              {/* CTA — desktop only */}
              <div className="hidden md:inline-flex ml-4">
                <Link
                  href="#contact"
                  className={[
                    "nav-cta-link clip-cta inline-flex items-center gap-2 px-6 py-2.5",
                    "bg-linear-to-br from-[#C9A84C] to-[#FFD700] text-black",
                    "font-rajdhani text-[11px] font-bold tracking-[0.2em] uppercase no-underline",
                    "shadow-[0_0_20px_rgba(255,215,0,0.2)]",
                    "transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,215,0,0.45)] hover:-translate-y-0.5",
                  ].join(" ")}
                >
                  Get Started ›
                </Link>
              </div>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className={[
                  "clip-nav-btn flex md:hidden flex-col justify-center items-end gap-1.25",
                  "w-9 h-9 bg-transparent border border-[rgba(201,168,76,0.2)] cursor-pointer px-2",
                  "transition-colors duration-300 hover:border-[rgba(201,168,76,0.5)]",
                ].join(" ")}
              >
                <span
                  className={[
                    "block h-px bg-[#C9A84C] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen ? "w-full translate-y-1.5 rotate-45" : "w-full",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-px bg-[#C9A84C] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen ? "opacity-0 translate-x-2 w-[70%]" : "w-[70%]",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-px bg-[#C9A84C] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen ? "w-full -translate-y-1.5 -rotate-45" : "w-[50%]",
                  ].join(" ")}
                />
              </button>
            </div>
          </div>

          {/* ── Mobile menu ── */}
          <div
            className={`mobile-menu absolute top-full left-0 right-0
              bg-[rgba(2,2,5,0.97)] backdrop-blur-[30px]
              border-b border-[rgba(201,168,76,0.15)]
              border-t border-t-[rgba(201,168,76,0.08)]
              ${isOpen ? "open" : ""}`}
          >
            <div className="px-6 pt-4 pb-6">
              {navItems.map((item, i) => {
                const href = `#${item.toLowerCase().replace(" ", "-")}`;
                const isActive = activeItem === item;
                return (
                  <Link
                    key={item}
                    href={href}
                    onClick={() => {
                      setActiveItem(item);
                      setIsOpen(false);
                    }}
                    className={[
                      "mobile-link flex items-center justify-between py-3.5",
                      "border-b border-[rgba(201,168,76,0.06)]",
                      "font-rajdhani text-[14px] font-semibold tracking-[0.2em] uppercase no-underline",
                      "transition-all duration-300 hover:pl-2",
                      isActive
                        ? "is-active text-[#C9A84C] pl-2"
                        : "text-[rgba(255,255,255,0.5)] hover:text-[#C9A84C]",
                    ].join(" ")}
                  >
                    <span>
                      <span className="text-[10px] text-[rgba(201,168,76,0.25)] font-normal">
                        0{i + 1} ·{" "}
                      </span>
                      {item}
                    </span>
                    <span className="mobile-arrow text-base text-[rgba(201,168,76,0.3)] transition-all duration-300">
                      ›
                    </span>
                  </Link>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-5">
                <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className={[
                    "clip-cta flex justify-center items-center gap-2 p-3.5",
                    "bg-linear-to-br from-[#C9A84C] to-[#FFD700] text-black",
                    "font-rajdhani text-[12px] font-bold tracking-[0.2em] uppercase no-underline",
                    "shadow-[0_0_24px_rgba(255,215,0,0.25)] transition-shadow duration-300",
                    "hover:shadow-[0_0_40px_rgba(255,215,0,0.4)]",
                  ].join(" ")}
                >
                  Get Started ›
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
