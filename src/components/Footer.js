"use client";

import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3500);
    }
  };

  const socials = [
    { name: "Facebook", short: "FB", color: "hover:bg-[#1877F2]" },
    { name: "Instagram", short: "IG", color: "hover:bg-[#E1306C]" },
    { name: "TikTok", short: "TT", color: "hover:bg-[#ff0050]" },
    { name: "WhatsApp", short: "WA", color: "hover:bg-[#25D366]" },
    { name: "LinkedIn", short: "LIN", color: "hover:bg-[#0A66C2]" },
    { name: "Twitter", short: "X", color: "hover:bg-[#1DA1F2]" },
  ];

  const services = [
    "Facebook Marketing",
    "Instagram Growth",
    "TikTok Marketing",
    "WhatsApp Business",
    "Logo Design",
    "AI Video Creation",
  ];

  const links = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Social Media", href: "#social-media" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700;900&family=Exo+2:wght@200;300;400;500&display=swap');

        .font-cinzel   { font-family: 'Cinzel', serif; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-exo      { font-family: 'Exo 2', sans-serif; }

        @keyframes fgShimmer  { 0%{left:-100%;} 100%{left:200%;} }
        @keyframes fgBlink    { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        @keyframes fgBlueFlow { 0%{background-position:0% center;} 100%{background-position:200% center;} }
        @keyframes fgFadeIn   { from{opacity:0;transform:translateY(6px);} to{opacity:1;transform:translateY(0);} }
        @keyframes fgPulse    { 0%,100%{opacity:1;box-shadow:0 0 8px rgba(74,222,128,0.7);} 50%{opacity:0.4;box-shadow:0 0 3px rgba(74,222,128,0.3);} }

        .anim-shimmer { animation: fgShimmer 3.5s ease-in-out infinite; }
        .anim-blink   { animation: fgBlink 2s ease-in-out infinite; }
        .anim-fadein  { animation: fgFadeIn 0.4s ease; }
        .anim-pulse   { animation: fgPulse 2.5s ease-in-out infinite; }

        /* Blue-silver animated gradient title */
        .blue-flow-text {
          background: linear-gradient(90deg, #2B6CB0 0%, #63B3ED 35%, #C8D8E8 55%, #63B3ED 75%, #2B6CB0 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fgBlueFlow 4s linear infinite;
          filter: drop-shadow(0 0 18px rgba(99,179,237,0.4));
        }

        /* Logo blue gradient text */
        .logo-blue {
          background: linear-gradient(135deg, #2B6CB0, #63B3ED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .clip-eyebrow { clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%); }
        .clip-btn-lg  { clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%); }
        .clip-btn-sm  { clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }

        /* Eyebrow shimmer — blue */
        .eyebrow-shimmer::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(99,179,237,0.12), transparent);
          animation: fgShimmer 3.5s ease-in-out infinite;
        }

        /* Nav link hover arrow — blue */
        .fg-link-item::before {
          content: '›'; color: #63B3ED; opacity: 0; font-size: 16px;
          transition: all 0.25s ease; transform: translateX(-6px);
          margin-right: 8px; display: inline-block;
        }
        .fg-link-item:hover::before { opacity: 1; transform: translateX(0); }

        /* Social button inner glow */
        .soc-btn::before {
          content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s;
        }
        .soc-btn:hover::before { opacity: 1; }

        /* Grid bg — blue tint */
        .fg-divider-grid {
          background-image:
            linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 20%, transparent 80%);
        }

        /* Newsletter input — blue focus */
        .nl-input {
          width: 100%; padding: 13px 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(99,179,237,0.18);
          color: rgba(255,255,255,0.8);
          font-size: 13px; font-weight: 300;
          outline: none; box-sizing: border-box;
          transition: border-color 0.3s;
        }
        .nl-input::placeholder { color: rgba(255,255,255,0.18); }
        .nl-input:focus { border-color: rgba(99,179,237,0.48); }
      `}</style>

      <footer
        className="font-exo relative overflow-hidden text-white/75"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 100%, #130d22 0%, #0a0618 55%, #07050f 100%)",
        }}
      >
        {/* Ambient glows — blue */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 700,
            height: 300,
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            filter: "blur(90px)",
            background:
              "radial-gradient(ellipse, rgba(99,179,237,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 350,
            height: 350,
            bottom: -80,
            left: -60,
            filter: "blur(90px)",
            background:
              "radial-gradient(circle, rgba(99,179,237,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 300,
            height: 300,
            bottom: -60,
            right: -40,
            filter: "blur(90px)",
            background:
              "radial-gradient(circle, rgba(99,179,237,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Grid bg */}
        <div className="fg-divider-grid absolute inset-0 pointer-events-none" />

        {/* Corner accents — blue */}
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-12 h-12 pointer-events-none z-20 ${cls}`}
            style={{ borderColor: "rgba(99,179,237,0.5)" }}
          />
        ))}

        {/* Top blue divider */}
        <div className="relative z-30 flex items-center gap-3.5 px-10">
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(99,179,237,0.22))",
            }}
          />
          <div
            className="w-1.75 h-1.75 rotate-45 shrink-0"
            style={{
              background: "#63B3ED",
              boxShadow:
                "0 0 10px rgba(99,179,237,0.7), 0 0 20px rgba(99,179,237,0.4)",
            }}
          />
          <div
            className="w-1.25 h-1.25 rotate-45 shrink-0 opacity-40 mx-1"
            style={{
              background: "#63B3ED",
              boxShadow: "0 0 10px rgba(99,179,237,0.5)",
            }}
          />
          <div
            className="w-1.75 h-1.75 rotate-45 shrink-0"
            style={{
              background: "#63B3ED",
              boxShadow:
                "0 0 10px rgba(99,179,237,0.7), 0 0 20px rgba(99,179,237,0.4)",
            }}
          />
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(99,179,237,0.22), transparent)",
            }}
          />
        </div>

        {/* Hero CTA Banner */}
        <div
          className="relative z-30 text-center px-6 pt-18 pb-16"
          style={{ borderBottom: "1px solid rgba(99,179,237,0.14)" }}
        >
          {/* Eyebrow */}
          <div className="inline-flex justify-center mb-8">
            <div
              className="eyebrow-shimmer clip-eyebrow font-rajdhani relative overflow-hidden
                inline-flex items-center gap-2.5 px-5 py-2
                text-[10px] font-semibold tracking-[.32em] uppercase"
              style={{
                color: "#63B3ED",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(99,179,237,0.2)",
              }}
            >
              <span
                className="anim-blink w-1.5 h-1.5 rounded-full inline-block"
                style={{
                  background: "#63B3ED",
                  boxShadow: "0 0 8px rgba(99,179,237,0.7)",
                }}
              />
              Begin Your Digital Journey
              <span
                className="anim-blink w-1.5 h-1.5 rounded-full inline-block"
                style={{
                  background: "#63B3ED",
                  boxShadow: "0 0 8px rgba(99,179,237,0.7)",
                }}
              />
            </div>
          </div>

          {/* Title */}
          <h2
            className="font-cinzel font-black leading-none tracking-tight mb-2"
            style={{ fontSize: "clamp(34px, 5.5vw, 68px)" }}
          >
            <span className="block" style={{ color: "rgba(255,255,255,0.88)" }}>
              Ready to Elevate
            </span>
            <span className="blue-flow-text block">Your Brand?</span>
          </h2>

          <p
            className="font-exo text-base font-extralight tracking-[.06em] mt-5 mb-10"
            style={{ color: "rgba(200,216,232,0.38)" }}
          >
            Partner with Sri Lanka&apos;s premier{" "}
            <em className="not-italic font-normal" style={{ color: "#63B3ED" }}>
              digital marketing
            </em>{" "}
            agency. We transform businesses into{" "}
            <em className="not-italic font-normal" style={{ color: "#63B3ED" }}>
              iconic brands
            </em>
            .
          </p>

          <div className="flex items-center justify-center gap-3.5 flex-wrap">
            {/* Primary CTA — blue */}
            <a
              href="#services"
              className="clip-btn-lg font-rajdhani inline-flex items-center gap-2.5 px-10 py-3.5
                text-xs font-bold tracking-[.22em] uppercase text-white no-underline
                transition-all duration-300 hover:-translate-y-0.75 hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, #2B6CB0, #63B3ED, #2B6CB0)",
                backgroundSize: "200% auto",
                boxShadow:
                  "0 0 25px rgba(99,179,237,0.3), 0 0 55px rgba(99,179,237,0.12)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(99,179,237,0.5), 0 0 70px rgba(99,179,237,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(99,179,237,0.3), 0 0 55px rgba(99,179,237,0.12)")
              }
            >
              Start Growing <span className="text-base">›</span>
            </a>

            {/* Outline CTA — blue */}
            <a
              href="#contact"
              className="clip-btn-lg font-rajdhani inline-flex items-center gap-2.5 px-10 py-3.5
                text-xs font-semibold tracking-[.22em] uppercase no-underline
                transition-all duration-300 hover:-translate-y-0.75"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(99,179,237,0.25)",
                color: "#63B3ED",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,179,237,0.6)";
                e.currentTarget.style.boxShadow =
                  "0 0 24px rgba(99,179,237,0.2), inset 0 0 20px rgba(99,179,237,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,179,237,0.25)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get in Touch <span className="text-base">›</span>
            </a>
          </div>
        </div>

        {/* Main Grid */}
        <div className="relative z-30 max-w-7xl mx-auto px-10 pt-16 max-sm:px-6 max-sm:pt-12">
          <div className="grid grid-cols-[2fr_1fr_1fr_1.6fr] gap-14 mb-13 max-[960px]:grid-cols-2 max-[960px]:gap-10 max-sm:grid-cols-1 max-sm:gap-9">
            {/* Brand */}
            <div>
              <div className="font-cinzel text-[26px] font-black tracking-[.02em] mb-3">
                <span className="logo-blue">Rithu</span>
                <span style={{ color: "rgba(255,255,255,0.55)" }}>
                  Business
                </span>
                <span className="logo-blue">Lanka</span>
              </div>
              <div
                className="font-rajdhani text-[9px] tracking-[.35em] uppercase mb-4"
                style={{ color: "rgba(99,179,237,0.4)" }}
              >
                Digital · Marketing · Excellence
              </div>
              <p
                className="font-exo text-[13.5px] font-light leading-[1.8] mb-7 max-w-60"
                style={{ color: "rgba(200,216,232,0.32)" }}
              >
                Your trusted partner for digital marketing excellence in Sri
                Lanka. We empower brands to thrive across every platform.
              </p>
              <div className="flex gap-2 flex-wrap">
                {socials.map((s) => (
                  <div
                    key={s.name}
                    title={s.name}
                    className={`soc-btn clip-btn-sm font-rajdhani relative overflow-hidden w-9 h-9
                      flex items-center justify-center text-[9px] font-bold tracking-[0.5px]
                      cursor-pointer transition-all duration-300 hover:text-white
                      hover:-translate-y-0.75 ${s.color}`}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(99,179,237,0.18)",
                      color: "rgba(99,179,237,0.5)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 18px rgba(99,179,237,0.25)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "none")
                    }
                  >
                    <span className="relative z-10">{s.short}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div
                className="font-rajdhani text-[10px] font-bold tracking-[.3em] uppercase mb-5
                  flex items-center gap-2.5"
                style={{ color: "rgba(99,179,237,0.4)" }}
              >
                Navigate
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(99,179,237,0.15), transparent)",
                  }}
                />
              </div>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="fg-link-item font-exo flex items-center text-[13.5px] font-light
                    no-underline py-1.25 transition-all duration-300 hover:translate-x-1.5 w-fit"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#63B3ED")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
                  }
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Services */}
            <div>
              <div
                className="font-rajdhani text-[10px] font-bold tracking-[.3em] uppercase mb-5
                  flex items-center gap-2.5"
                style={{ color: "rgba(99,179,237,0.4)" }}
              >
                Services
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(99,179,237,0.15), transparent)",
                  }}
                />
              </div>
              {services.map((s) => (
                <div
                  key={s}
                  className="group font-exo flex items-center gap-2 text-[13px] font-light
                    py-1.25 transition-all duration-300 cursor-default"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(200,216,232,0.6)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
                  }
                >
                  <div
                    className="w-1.25 h-1.25 rotate-45 shrink-0 transition-all duration-300
                      group-hover:scale-[1.4]"
                    style={{
                      background: "#63B3ED",
                      opacity: 0.3,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.boxShadow =
                        "0 0 8px rgba(99,179,237,0.7)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.3";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  {s}
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <div
                className="font-rajdhani text-[10px] font-bold tracking-[.3em] uppercase mb-5
                  flex items-center gap-2.5"
                style={{ color: "rgba(99,179,237,0.4)" }}
              >
                Stay Updated
                <div
                  className="flex-1 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(99,179,237,0.15), transparent)",
                  }}
                />
              </div>
              <p
                className="font-rajdhani text-[10px] tracking-[.25em] uppercase mb-3"
                style={{ color: "rgba(255,255,255,0.18)" }}
              >
                Marketing tips &amp; campaign updates
              </p>

              {subscribed ? (
                <div
                  className="anim-fadein clip-btn-sm font-rajdhani text-center py-3.5
                    text-xs tracking-[.25em] uppercase"
                  style={{
                    border: "1px solid rgba(99,179,237,0.3)",
                    background: "rgba(99,179,237,0.06)",
                    color: "#63B3ED",
                  }}
                >
                  ◆ Transmission received
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    className="clip-btn-sm nl-input mb-2.5"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  />
                  <button
                    className="clip-btn-sm font-rajdhani w-full border-none py-3.25
                      text-white text-xs font-bold tracking-[.25em] uppercase cursor-pointer
                      transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background:
                        "linear-gradient(135deg, #2B6CB0, #63B3ED, #2B6CB0)",
                      backgroundSize: "200% auto",
                      boxShadow: "0 0 20px rgba(99,179,237,0.22)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 30px rgba(99,179,237,0.4)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(99,179,237,0.22)")
                    }
                    onClick={handleSubscribe}
                  >
                    Subscribe ›
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="py-7 pb-10 flex items-center justify-between gap-4 flex-wrap"
            style={{ borderTop: "1px solid rgba(99,179,237,0.14)" }}
          >
            <div
              className="font-rajdhani text-[11px] tracking-[.2em] uppercase"
              style={{ color: "rgba(99,179,237,0.3)" }}
            >
              © {new Date().getFullYear()} Rithu Business Lanka (Giwantha
              Athukorala) · All rights reserved
            </div>
            <div className="flex items-center gap-5">
              <div
                className="font-rajdhani flex items-center gap-2 text-[10px] tracking-[.25em] uppercase"
                style={{ color: "rgba(99,179,237,0.35)" }}
              >
                <div
                  className="anim-pulse w-1.5 h-1.5 rounded-full bg-[#4ade80]"
                  style={{ boxShadow: "0 0 8px rgba(74,222,128,0.7)" }}
                />
                Accepting new clients
              </div>
              <div
                className="font-rajdhani text-[10px] tracking-[.2em] uppercase"
                style={{ color: "rgba(99,179,237,0.2)" }}
              >
                RBL · COLOMBO · LK
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
