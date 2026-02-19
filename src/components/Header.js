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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-bright: #FFD700;
          --gold-glow: rgba(201,168,76,0.5);
          --dark: #020205;
          --glass: rgba(2,2,5,0.75);
          --glass-border: rgba(201,168,76,0.18);
        }

        /* ── NAV BASE ── */
        .rbl-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9999;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          font-family: 'Rajdhani', sans-serif;
        }

        /* Scrolled glass state */
        .rbl-nav.scrolled .nav-inner {
          background: var(--glass);
          backdrop-filter: blur(24px) saturate(1.6);
          -webkit-backdrop-filter: blur(24px) saturate(1.6);
          border-bottom: 1px solid var(--glass-border);
          box-shadow: 0 4px 40px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.04);
        }
        .rbl-nav.scrolled .nav-inner::after {
          opacity: 1;
        }

        /* Transparent state */
        .nav-inner {
          position: relative;
          padding: 0 32px;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          background: transparent;
        }
        /* Gold scan line that appears on scroll */
        .nav-inner::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold-bright) 50%, var(--gold) 70%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s;
        }

        /* Top HUD micro-bar */
        .hud-micro {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0;
          border-bottom: 1px solid rgba(201,168,76,0.07);
          overflow: hidden;
        }
        .hud-micro-text {
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.35);
        }
        .hud-dot {
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 6px var(--gold-glow);
          animation: navBlink 2.4s ease-in-out infinite;
          margin: 0 8px;
          vertical-align: middle;
        }
        @keyframes navBlink {
          0%,100% { opacity:1; } 50% { opacity:0.2; }
        }

        /* ── MAIN ROW ── */
        .nav-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
        }

        /* ── LOGO ── */
        .rbl-logo {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          line-height: 1;
          position: relative;
        }
        .logo-top {
          font-family: 'Cinzel', serif;
          font-size: 22px;
          font-weight: 600;
          background: linear-gradient(90deg, #C9A84C, #FFD700, #C9A84C);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldFlow 4s linear infinite;
          letter-spacing: 0.05em;
        }
        @keyframes goldFlow {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .logo-sub {
          font-family: 'Rajdhani', sans-serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.45);
          margin-top: 2px;
        }
        .logo-accent {
          position: absolute;
          bottom: -4px; left: 0;
          width: 100%; height: 1px;
          background: linear-gradient(90deg, var(--gold), transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .rbl-logo:hover .logo-accent { transform: scaleX(1); }

        /* ── DESKTOP LINKS ── */
        .nav-links {
          display: none;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0; padding: 0;
        }
        @media (min-width: 768px) {
          .nav-links { display: flex; }
        }

        .nav-link-item {
          position: relative;
        }
        .nav-link-item a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.3s;
          position: relative;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .nav-link-item a::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(201,168,76,0.07);
          opacity: 0;
          transition: opacity 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .nav-link-item a:hover { color: var(--gold); }
        .nav-link-item a:hover::before { opacity: 1; }

        .nav-link-item a.active {
          color: var(--gold);
          text-shadow: 0 0 12px rgba(255,215,0,0.4);
        }
        .nav-link-item a.active::before { opacity: 1; }

        /* Bottom bar under active link */
        .nav-link-item a .link-bar {
          position: absolute;
          bottom: 0; left: 18px; right: 18px;
          height: 1px;
          background: var(--gold);
          box-shadow: 0 0 6px var(--gold-glow);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link-item a:hover .link-bar,
        .nav-link-item a.active .link-bar { transform: scaleX(1); }

        /* Link index number */
        .link-idx {
          font-size: 8px;
          color: rgba(201,168,76,0.3);
          font-weight: 400;
          margin-right: 2px;
          vertical-align: super;
        }

        /* ── CTA BUTTON ── */
        .nav-cta {
          display: none;
        }
        @media (min-width: 768px) {
          .nav-cta { display: inline-flex; }
        }
        .nav-cta a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: linear-gradient(135deg, #C9A84C, #FFD700);
          color: #000;
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 20px rgba(255,215,0,0.2);
          margin-left: 16px;
          position: relative;
          overflow: hidden;
        }
        .nav-cta a::before {
          content: '';
          position: absolute;
          inset: 0;
          background: white;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .nav-cta a:hover::before { opacity: 0.15; }
        .nav-cta a:hover {
          box-shadow: 0 0 35px rgba(255,215,0,0.45);
          transform: translateY(-2px);
        }

        /* ── HAMBURGER ── */
        .nav-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: 1px solid rgba(201,168,76,0.2);
          cursor: pointer;
          padding: 8px;
          transition: border-color 0.3s;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        @media (min-width: 768px) { .nav-hamburger { display: none; } }
        .nav-hamburger:hover { border-color: rgba(201,168,76,0.5); }
        .hb-line {
          height: 1px;
          background: var(--gold);
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          display: block;
        }
        .hb-line:nth-child(1) { width: 100%; }
        .hb-line:nth-child(2) { width: 70%; }
        .hb-line:nth-child(3) { width: 50%; }
        .nav-hamburger.open .hb-line:nth-child(1) { transform: translateY(6px) rotate(45deg); width: 100%; }
        .nav-hamburger.open .hb-line:nth-child(2) { opacity: 0; transform: translateX(8px); }
        .nav-hamburger.open .hb-line:nth-child(3) { transform: translateY(-6px) rotate(-45deg); width: 100%; }

        /* ── MOBILE MENU ── */
        .mobile-menu {
          position: absolute;
          top: calc(100% + 1px);
          left: 0; right: 0;
          background: rgba(2,2,5,0.97);
          backdrop-filter: blur(30px);
          border-bottom: 1px solid rgba(201,168,76,0.15);
          border-top: 1px solid rgba(201,168,76,0.08);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s;
          opacity: 0;
        }
        .mobile-menu.open {
          max-height: 400px;
          opacity: 1;
        }
        .mobile-menu-inner {
          padding: 16px 24px 24px;
        }
        .mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid rgba(201,168,76,0.06);
          text-decoration: none;
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          transition: color 0.3s, padding-left 0.3s;
        }
        .mobile-link:last-child { border-bottom: none; }
        .mobile-link:hover, .mobile-link.active {
          color: var(--gold);
          padding-left: 8px;
        }
        .mobile-link-num {
          font-size: 10px;
          color: rgba(201,168,76,0.25);
          font-weight: 400;
        }
        .mobile-link-arrow {
          font-size: 16px;
          color: rgba(201,168,76,0.3);
          transition: color 0.3s, transform 0.3s;
        }
        .mobile-link:hover .mobile-link-arrow {
          color: var(--gold);
          transform: translateX(4px);
        }
        .mobile-cta-wrap {
          padding-top: 20px;
        }
        .mobile-cta {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          padding: 14px;
          background: linear-gradient(135deg, #C9A84C, #FFD700);
          color: #000;
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          transition: box-shadow 0.3s;
          box-shadow: 0 0 24px rgba(255,215,0,0.25);
        }
        .mobile-cta:hover { box-shadow: 0 0 40px rgba(255,215,0,0.4); }
      `}</style>

      <nav ref={menuRef} className={`rbl-nav${isScrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          {/* HUD micro bar */}
          <div className="hud-micro">
            <span className="hud-micro-text">
              <span className="hud-dot" />
              SYS · ONLINE
            </span>
            <span className="hud-micro-text">{time}</span>
            <span className="hud-micro-text">
              COLOMBO · LK
              <span className="hud-dot" />
            </span>
          </div>

          {/* Main nav row */}
          <div className="nav-row">
            {/* Logo */}
            <Link href="/" className="rbl-logo">
              <span className="logo-top">Rithu Social</span>
              <span className="logo-sub">Business Lanka Marketing</span>
              <span className="logo-accent" />
            </Link>

            {/* Desktop nav links */}
            <ul className="nav-links">
              {navItems.map((item, i) => {
                const href = `#${item.toLowerCase().replace(" ", "-")}`;
                const isActive = activeItem === item;
                return (
                  <li className="nav-link-item" key={item}>
                    <Link
                      href={href}
                      className={isActive ? "active" : ""}
                      onClick={() => setActiveItem(item)}
                    >
                      <span className="link-idx">0{i + 1}</span>
                      {item}
                      <span className="link-bar" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA + hamburger */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="nav-cta">
                <Link href="#contact">Get Started ›</Link>
              </div>

              <button
                className={`nav-hamburger${isOpen ? " open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <span className="hb-line" />
                <span className="hb-line" />
                <span className="hb-line" />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`mobile-menu${isOpen ? " open" : ""}`}>
            <div className="mobile-menu-inner">
              {navItems.map((item, i) => {
                const href = `#${item.toLowerCase().replace(" ", "-")}`;
                const isActive = activeItem === item;
                return (
                  <Link
                    key={item}
                    href={href}
                    className={`mobile-link${isActive ? " active" : ""}`}
                    onClick={() => {
                      setActiveItem(item);
                      setIsOpen(false);
                    }}
                  >
                    <span>
                      <span className="mobile-link-num">0{i + 1} · </span>
                      {item}
                    </span>
                    <span className="mobile-link-arrow">›</span>
                  </Link>
                );
              })}

              <div className="mobile-cta-wrap">
                <Link
                  href="#contact"
                  className="mobile-cta"
                  onClick={() => setIsOpen(false)}
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
