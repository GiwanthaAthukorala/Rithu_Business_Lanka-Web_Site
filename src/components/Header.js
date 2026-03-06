"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600&display=swap');
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-cinzel   { font-family: 'Cinzel', serif; }

        @keyframes blueFlow {
          0%   { background-position: 0%   center; }
          100% { background-position: 200% center; }
        }
        @keyframes navBlink {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.2; }
        }

        .animate-blue-flow {
          background: linear-gradient(90deg, #2B6CB0, #63B3ED, #C8D8E8, #63B3ED, #2B6CB0);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: blueFlow 4s linear infinite;
        }
        .animate-blink { animation: navBlink 2.4s ease-in-out infinite; }

        .clip-nav-btn  { clip-path: polygon(6px  0%, 100% 0%, calc(100% - 6px)  100%, 0% 100%); }
        .clip-nav-link { clip-path: polygon(8px  0%, 100% 0%, calc(100% - 8px)  100%, 0% 100%); }
        .clip-cta      { clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%); }

        /* Bottom scan-line when scrolled */
        .nav-inner::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #63B3ED 30%, #A8D8FF 50%, #63B3ED 70%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .nav-inner.scrolled::after { opacity: 1; }

        /* Logo underline on hover */
        .logo-accent {
          position: absolute;
          bottom: -4px; left: 0;
          width: 100%; height: 1px;
          background: linear-gradient(90deg, #63B3ED, transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .rbl-logo:hover .logo-accent { transform: scaleX(1); }

        /* Nav link hover/active bg */
        .nav-link-anchor { position: relative; }
        .nav-link-anchor::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(99,179,237,0.07);
          opacity: 0; transition: opacity 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .nav-link-anchor:hover::before,
        .nav-link-anchor.is-active::before { opacity: 1; }

        /* Nav link underbar */
        .link-bar {
          position: absolute;
          bottom: 0; left: 18px; right: 18px;
          height: 1px;
          background: #63B3ED;
          box-shadow: 0 0 6px rgba(99,179,237,0.6);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link-anchor:hover .link-bar,
        .nav-link-anchor.is-active .link-bar { transform: scaleX(1); }

        /* CTA shimmer */
        .nav-cta-link { position: relative; overflow: hidden; }
        .nav-cta-link::before {
          content: ''; position: absolute; inset: 0;
          background: white; opacity: 0; transition: opacity 0.3s;
        }
        .nav-cta-link:hover::before { opacity: 0.15; }

        /* Mobile menu slide */
        .mobile-menu {
          overflow: hidden;
          max-height: 0; opacity: 0;
          transition: max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s;
        }
        .mobile-menu.open { max-height: 450px; opacity: 1; }

        .mobile-link:hover .mobile-arrow,
        .mobile-link.is-active .mobile-arrow {
          color: #63B3ED;
          transform: translateX(4px);
        }
      `}</style>

      <nav
        ref={menuRef}
        className="font-rajdhani"
        style={{
          position: "fixed",
          top: "6px",
          left: "10px",
          right: "10px",
          zIndex: 9999,
          transition: "all 0.5s",
        }}
      >
        <div
          className={`nav-inner relative px-6 md:px-8 transition-all duration-500 ${isScrolled ? "scrolled" : ""}`}
          style={
            isScrolled
              ? {
                  background: "rgba(7,5,15,0.90)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  borderBottom: "1px solid rgba(99,179,237,0.18)",
                  boxShadow:
                    "0 4px 40px rgba(0,0,0,0.7), 0 0 60px rgba(99,179,237,0.06)",
                }
              : { background: "transparent" }
          }
        >
          {/* ── HUD micro bar ── */}
          <div
            className="flex justify-between items-center py-1 overflow-hidden"
            style={{ borderBottom: "1px solid rgba(99,179,237,0.08)" }}
          >
            <span
              className="font-rajdhani text-[9px] tracking-[0.28em] uppercase flex items-center"
              style={{ color: "rgba(99,179,237,0.4)" }}
            >
              <span
                className="animate-blink inline-block w-1.5 h-1.5 rounded-full mr-2"
                style={{
                  background: "#63B3ED",
                  boxShadow: "0 0 6px rgba(99,179,237,0.6)",
                  flexShrink: 0,
                }}
              />
              Rithu Business Lanka
            </span>
            <span
              className="font-rajdhani text-[9px] tracking-[0.28em] uppercase hidden sm:block"
              style={{ color: "rgba(99,179,237,0.4)" }}
            >
              {time}
            </span>
            <span
              className="font-rajdhani text-[9px] tracking-[0.28em] uppercase flex items-center"
              style={{ color: "rgba(99,179,237,0.4)" }}
            >
              COLOMBO · LK
              <span
                className="animate-blink inline-block w-1.5 h-1.5 rounded-full ml-2"
                style={{
                  background: "#63B3ED",
                  boxShadow: "0 0 6px rgba(99,179,237,0.6)",
                  flexShrink: 0,
                }}
              />
            </span>
          </div>

          {/* ── Main nav row ── */}
          <div className="flex justify-between items-center py-2">
            {/* Logo — uses next/image instead of <img> to fix ESLint warning */}
            <Link
              href="/"
              className="rbl-logo relative flex flex-col items-start leading-none no-underline"
              style={{ textDecoration: "none" }}
            >
              {/*
                FIX: Replaced <img src="/RBL.png"> with <Image> from next/image.
                - `fill` prop lets the image fill its parent container
                - Parent div controls the rendered size
                - `priority` loads the logo eagerly (good for LCP)
                - `sizes` helps Next.js pick the right resolution
              */}
              <div
                className="relative"
                style={{
                  width: "clamp(90px, 12vw, 150px)",
                  height: "clamp(32px, 4.5vw, 52px)",
                }}
              >
                <Image
                  src="/RBL.png"
                  alt="Rithu Business Lanka"
                  fill
                  priority
                  sizes="(max-width: 640px) 90px, (max-width: 1024px) 120px, 150px"
                  style={{
                    objectFit: "contain",
                    objectPosition: "left center",
                  }}
                />
              </div>

              <span
                className="font-rajdhani text-[8px] tracking-[0.35em] uppercase mt-1"
                style={{ color: "rgba(99,179,237,0.45)" }}
              >
                Digital Marketing Excellence
              </span>
              <span className="logo-accent" />
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
              {navItems.map((item, i) => {
                const href = `#${item.toLowerCase().replace(" ", "-")}`;
                const isActive = activeItem === item;
                return (
                  <li key={item}>
                    <Link
                      href={href}
                      onClick={() => setActiveItem(item)}
                      className={`nav-link-anchor clip-nav-link inline-flex items-center gap-1.5 px-4 py-2 font-rajdhani text-[12px] font-semibold tracking-[0.18em] uppercase no-underline transition-colors duration-300 ${isActive ? "is-active" : ""}`}
                      style={{
                        color: isActive ? "#63B3ED" : "rgba(255,255,255,0.45)",
                        textShadow: isActive
                          ? "0 0 12px rgba(99,179,237,0.5)"
                          : "none",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        className="text-[8px] font-normal"
                        style={{
                          color: "rgba(99,179,237,0.3)",
                          verticalAlign: "super",
                        }}
                      >
                        0{i + 1}
                      </span>
                      {item}
                      <span className="link-bar" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right: CTA + hamburger */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <Link
                href="#contact"
                className="nav-cta-link clip-cta hidden md:inline-flex items-center gap-2 px-6 py-2.5 font-rajdhani text-[11px] font-bold tracking-[0.2em] uppercase no-underline transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #2B6CB0, #63B3ED)",
                  color: "#ffffff",
                  boxShadow: "0 0 20px rgba(99,179,237,0.25)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 35px rgba(99,179,237,0.5)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(99,179,237,0.25)")
                }
              >
                Get Started ›
              </Link>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="clip-nav-btn flex md:hidden flex-col justify-center items-end gap-1.5 w-9 h-9 bg-transparent cursor-pointer px-2 transition-all duration-300"
                style={{ border: "1px solid rgba(99,179,237,0.25)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(99,179,237,0.55)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(99,179,237,0.25)")
                }
              >
                <span
                  className="block h-px transition-all duration-300"
                  style={{
                    background: "#63B3ED",
                    width: "100%",
                    transform: isOpen
                      ? "translateY(6px) rotate(45deg)"
                      : "none",
                  }}
                />
                <span
                  className="block h-px transition-all duration-300"
                  style={{
                    background: "#63B3ED",
                    width: "70%",
                    opacity: isOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block h-px transition-all duration-300"
                  style={{
                    background: "#63B3ED",
                    width: isOpen ? "100%" : "50%",
                    transform: isOpen
                      ? "translateY(-6px) rotate(-45deg)"
                      : "none",
                  }}
                />
              </button>
            </div>
          </div>

          {/* ── Mobile dropdown menu ── */}
          <div
            className={`mobile-menu absolute top-full left-0 right-0 ${isOpen ? "open" : ""}`}
            style={{
              background: "rgba(7,5,15,0.97)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              borderBottom: "1px solid rgba(99,179,237,0.15)",
              borderTop: "1px solid rgba(99,179,237,0.08)",
            }}
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
                    className={`mobile-link flex items-center justify-between py-3.5 font-rajdhani text-[14px] font-semibold tracking-[0.2em] uppercase no-underline transition-all duration-300 hover:pl-2 ${isActive ? "is-active pl-2" : ""}`}
                    style={{
                      borderBottom: "1px solid rgba(99,179,237,0.07)",
                      color: isActive ? "#63B3ED" : "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                    }}
                  >
                    <span>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgba(99,179,237,0.28)",
                          fontWeight: 400,
                        }}
                      >
                        0{i + 1} ·{" "}
                      </span>
                      {item}
                    </span>
                    <span
                      className="mobile-arrow text-base transition-all duration-300"
                      style={{ color: "rgba(99,179,237,0.35)" }}
                    >
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
                  className="clip-cta flex justify-center items-center gap-2 p-3.5 font-rajdhani text-[12px] font-bold tracking-[0.2em] uppercase no-underline transition-shadow duration-300"
                  style={{
                    background: "linear-gradient(135deg, #2B6CB0, #63B3ED)",
                    color: "#ffffff",
                    boxShadow: "0 0 24px rgba(99,179,237,0.3)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 0 40px rgba(99,179,237,0.5)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 0 24px rgba(99,179,237,0.3)")
                  }
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
