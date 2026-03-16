"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [visibleItems, setVisibleItems] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisibleItems(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1800);
  };

  const contacts = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: "+94 74 008 9006",
      href: "https://api.whatsapp.com/send/?phone=94767400723&text&type=phone_number&app_absent=0",
      iconColor: "#25D366",
      iconGlow: "rgba(37,211,102,0.5)",
      borderColor: "rgba(37,211,102,0.2)",
      borderHoverColor: "rgba(37,211,102,0.45)",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "info@rithusociol.com",
      href: "mailto:info@rithusociol.com",
      iconColor: "#63B3ED",
      iconGlow: "rgba(99,179,237,0.5)",
      borderColor: "rgba(99,179,237,0.2)",
      borderHoverColor: "rgba(99,179,237,0.45)",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "074 008 9006",
      href: "tel:+9474 008 9006",
      iconColor: "#69C9D0",
      iconGlow: "rgba(105,201,208,0.5)",
      borderColor: "rgba(105,201,208,0.2)",
      borderHoverColor: "rgba(105,201,208,0.45)",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Address",
      value: "Mawanella, Sri Lanka",
      href: null,
      iconColor: "#E1306C",
      iconGlow: "rgba(225,48,108,0.5)",
      borderColor: "rgba(225,48,108,0.2)",
      borderHoverColor: "rgba(225,48,108,0.45)",
    },
  ];

  const services = [
    "Facebook Marketing",
    "Instagram Marketing",
    "TikTok Marketing",
    "WhatsApp Business",
    "Post Boosting",
    "Logo Design",
    "AI Video Creation",
    "Post Design",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700&family=Exo+2:wght@200;300;400;500&display=swap');

        .font-cinzel   { font-family: 'Cinzel', serif; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-exo      { font-family: 'Exo 2', sans-serif; }

        @keyframes ctGlow    { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes ctBlink   { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes ctBlueFlow{ 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes ctFadeIn  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes waPulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }

        .anim-glow    { animation: ctGlow 5s ease-in-out infinite; }
        .anim-blink   { animation: ctBlink 2s ease-in-out infinite; }
        .anim-fadein  { animation: ctFadeIn .4s ease both; }
        .anim-spin    { animation: spin .7s linear infinite; }
        .anim-wapulse { animation: waPulse 2s ease-in-out infinite; }

        /* Blue-silver animated gradient title */
        .blue-text {
          background: linear-gradient(90deg, #2B6CB0, #63B3ED, #C8D8E8, #63B3ED, #2B6CB0);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ctBlueFlow 4s linear infinite;
          filter: drop-shadow(0 0 16px rgba(99,179,237,0.45));
        }

        .clip-btn    { clip-path: polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%); }
        .clip-input  { clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); }
        .clip-icon   { clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%); }
        .clip-wa-btn { clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%); }

        /* Submit button shimmer */
        .submit-btn::before {
          content:''; position:absolute;
          top:-50%; left:-100%; width:60%; height:200%;
          background:rgba(255,255,255,0.15); transform:skewX(-20deg);
          transition:left .6s;
        }
        .submit-btn:hover::before { left:160%; }

        /* Info item left accent bar */
        .info-item::before {
          content:''; position:absolute; left:0; top:0; bottom:0;
          width:2px; background:currentColor; opacity:0; transition:opacity .3s;
        }
        .info-item:hover::before { opacity:.6; }

        /* WhatsApp button inner glow */
        .wa-btn::before {
          content:''; position:absolute; inset:0;
          background:rgba(37,211,102,0.08); opacity:0; transition:opacity .3s;
        }
        .wa-btn:hover::before { opacity:1; }

        /* Form inputs — blue focus */
        .ct-input {
          width:100%; padding:14px 16px;
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(99,179,237,0.15);
          color:rgba(255,255,255,0.8);
          font-weight:300; font-size:14px;
          outline:none; transition:all .3s;
          tracking:wide;
        }
        .ct-input::placeholder { color:rgba(255,255,255,0.2); }
        .ct-input:focus {
          border-color:rgba(99,179,237,0.5);
          background:rgba(99,179,237,0.04);
          box-shadow:0 0 20px rgba(99,179,237,0.08);
        }
        .ct-input option { background:#0a0515; color:rgba(255,255,255,0.8); }

        .ct-layout-enter   { opacity:0; transform:translateY(30px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
        .ct-layout-visible { opacity:1; transform:translateY(0); }

        .scan-lines {
          background: repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px);
        }
        .bg-grid {
          background-image:
            linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px);
          background-size: 70px 70px;
        }
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        className="font-exo relative py-28 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 50% 0%, #110820 0%, #080515 40%, #07050f 100%)",
        }}
      >
        {/* Background layers */}
        <div className="bg-grid absolute inset-0 pointer-events-none" />

        {/* Top glow — blue */}
        <div
          className="anim-glow absolute pointer-events-none"
          style={{
            top: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 500,
            background:
              "radial-gradient(ellipse, rgba(99,179,237,0.09) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,179,237,0.05) 0%, transparent 65%)",
          }}
        />
        <div className="scan-lines absolute inset-0 pointer-events-none z-10" />

        {/* Corner decorations — blue */}
        {[
          "top-6 left-6 border-t border-l",
          "top-6 right-6 border-t border-r",
          "bottom-6 left-6 border-b border-l",
          "bottom-6 right-6 border-b border-r",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-12 h-12 pointer-events-none z-20 ${cls}`}
            style={{ borderColor: "rgba(99,179,237,0.4)" }}
          />
        ))}

        {/* Container */}
        <div className="relative z-30 max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-18">
            <div className="flex justify-center mb-5">
              <div
                className="font-rajdhani inline-flex items-center gap-2.5 text-[11px]
                  font-medium tracking-[.3em] uppercase px-4 py-1.75"
                style={{
                  color: "#63B3ED",
                  background: "rgba(99,179,237,0.05)",
                  border: "1px solid rgba(99,179,237,0.22)",
                }}
              >
                <span
                  className="anim-blink w-1.5 h-1.5 rounded-full inline-block"
                  style={{
                    background: "#63B3ED",
                    boxShadow: "0 0 8px rgba(99,179,237,0.8)",
                  }}
                />
                Let&apos;s Connect
                <span
                  className="anim-blink w-1.5 h-1.5 rounded-full inline-block"
                  style={{
                    background: "#63B3ED",
                    boxShadow: "0 0 8px rgba(99,179,237,0.8)",
                  }}
                />
              </div>
            </div>

            <h2
              className="font-cinzel font-bold leading-[1.05] mb-4 tracking-tight"
              style={{
                fontSize: "clamp(34px, 5vw, 60px)",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Get In <span className="blue-text">Touch</span>
            </h2>
            <p
              className="font-exo text-base font-light tracking-[.04em]"
              style={{ color: "rgba(200,216,232,0.35)" }}
            >
              Ready to grow your business? Let&apos;s build something great
              together
            </p>
          </div>

          {/* Layout grid */}
          <div
            className={`ct-layout-enter grid grid-cols-1 lg:grid-cols-2 gap-8 ${visibleItems ? "ct-layout-visible" : ""}`}
          >
            {/* LEFT — Form */}
            <div
              className="relative overflow-hidden backdrop-blur-2xl"
              style={{
                background: "rgba(7,5,18,0.78)",
                border: "1px solid rgba(99,179,237,0.12)",
              }}
            >
              {/* Top shimmer line — blue */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,rgba(99,179,237,0.45),transparent)",
                }}
              />
              <div className="p-10">
                <div
                  className="font-cinzel flex items-center gap-3 text-xl font-semibold tracking-[.05em] mb-8"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  Send a Message
                  <div
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg,rgba(99,179,237,0.3),transparent)",
                    }}
                  />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    {
                      name: "name",
                      type: "text",
                      placeholder: "Your Full Name",
                    },
                    {
                      name: "email",
                      type: "email",
                      placeholder: "Your Email Address",
                    },
                    {
                      name: "phone",
                      type: "tel",
                      placeholder: "Your Phone Number",
                    },
                  ].map((f) => (
                    <div key={f.name} className="relative">
                      <input
                        type={f.type}
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        required={f.name !== "phone"}
                        className="ct-input clip-input"
                        style={{ letterSpacing: "0.03em" }}
                      />
                    </div>
                  ))}

                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="ct-input clip-input appearance-none cursor-pointer"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2363B3ED' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 18px center",
                      }}
                    >
                      <option value="">Select a Service</option>
                      {services.map((s) => (
                        <option
                          key={s}
                          value={s.toLowerCase().replace(/ /g, "-")}
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      required
                      rows={4}
                      className="ct-input clip-input resize-none"
                      style={{ minHeight: "110px", letterSpacing: "0.03em" }}
                    />
                  </div>

                  {/* Submit button — blue */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="submit-btn clip-btn relative overflow-hidden w-full py-4
                      font-rajdhani font-bold text-sm tracking-[.2em] uppercase
                      text-white border-none cursor-pointer flex items-center justify-center gap-2.5
                      transition-all duration-300 hover:-translate-y-0.5
                      disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #2B6CB0, #63B3ED, #2B6CB0)",
                      backgroundSize: "200% auto",
                      boxShadow: "0 0 25px rgba(99,179,237,0.25)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 40px rgba(99,179,237,0.45)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 25px rgba(99,179,237,0.25)")
                    }
                  >
                    {sending ? (
                      <>
                        <span
                          className="anim-spin w-4 h-4 rounded-full border-2"
                          style={{
                            borderColor: "rgba(255,255,255,0.2)",
                            borderTopColor: "#ffffff",
                          }}
                        />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane size={13} />
                        Send Message
                      </>
                    )}
                  </button>

                  {submitted && (
                    <div
                      className="anim-fadein flex items-center gap-3 px-5 py-3.5
                        font-rajdhani text-[13px] font-semibold tracking-widest"
                      style={{
                        background: "rgba(37,211,102,0.08)",
                        border: "1px solid rgba(37,211,102,0.3)",
                        color: "#25D366",
                      }}
                    >
                      <FaCheckCircle size={16} />
                      Message received! We&apos;ll respond within 24 hours.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* RIGHT — Info + WhatsApp */}
            <div className="flex flex-col gap-5">
              {/* Contact info panel */}
              <div
                className="relative overflow-hidden backdrop-blur-2xl"
                style={{
                  background: "rgba(7,5,18,0.78)",
                  border: "1px solid rgba(99,179,237,0.12)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(99,179,237,0.45),transparent)",
                  }}
                />
                <div className="p-8 pb-6">
                  <div
                    className="font-cinzel flex items-center gap-3 text-xl font-semibold tracking-[.05em] mb-8"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    Contact Info
                    <div
                      className="flex-1 h-px"
                      style={{
                        background:
                          "linear-gradient(90deg,rgba(99,179,237,0.3),transparent)",
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    {contacts.map((c) => (
                      <div
                        key={c.label}
                        className="info-item relative flex items-start gap-4 px-6 py-5 cursor-default
                          transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:translate-x-1"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: `1px solid ${c.borderColor}`,
                          color: c.iconColor,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.borderColor =
                            c.borderHoverColor)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.borderColor = c.borderColor)
                        }
                      >
                        <div
                          className="clip-icon w-10 h-10 shrink-0 flex items-center justify-center"
                          style={{
                            background: `${c.iconColor}18`,
                            border: `1px solid ${c.borderColor}`,
                          }}
                        >
                          <c.icon
                            size={16}
                            style={{
                              color: c.iconColor,
                              filter: `drop-shadow(0 0 5px ${c.iconGlow})`,
                            }}
                          />
                        </div>
                        <div>
                          <div
                            className="font-rajdhani text-[10px] font-semibold tracking-[.25em] uppercase mb-1"
                            style={{ color: "rgba(255,255,255,0.25)" }}
                          >
                            {c.label}
                          </div>
                          <div
                            className="font-exo text-sm font-light tracking-[.02em] leading-relaxed"
                            style={{ color: "rgba(200,216,232,0.7)" }}
                          >
                            {c.href ? (
                              <a
                                href={c.href}
                                target={
                                  c.href.startsWith("http")
                                    ? "_blank"
                                    : undefined
                                }
                                rel="noopener noreferrer"
                                className="no-underline transition-colors duration-300"
                                style={{ color: "inherit" }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.color =
                                    "rgba(255,255,255,0.9)")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.color =
                                    "rgba(200,216,232,0.7)")
                                }
                              >
                                {c.value}
                              </a>
                            ) : (
                              c.value
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA — kept green, it's a brand color */}
              <div
                className="relative overflow-hidden p-8"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(10,30,15,0.9) 0%, rgba(5,18,10,0.95) 100%)",
                  border: "1px solid rgba(37,211,102,0.25)",
                  boxShadow: "0 0 40px rgba(37,211,102,0.06)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(37,211,102,0.5),transparent)",
                  }}
                />
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: -60,
                    right: -60,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle,rgba(37,211,102,0.1) 0%,transparent 65%)",
                  }}
                />

                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    className="anim-wapulse w-2 h-2 rounded-full inline-block"
                    style={{
                      background: "#25D366",
                      boxShadow: "0 0 8px rgba(37,211,102,0.8)",
                    }}
                  />
                  <span
                    className="font-rajdhani text-[10px] tracking-[.25em] uppercase"
                    style={{ color: "rgba(37,211,102,0.6)" }}
                  >
                    Available Now
                  </span>
                </div>

                <h3
                  className="font-cinzel text-lg font-semibold mb-2.5 tracking-[.03em]"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  Quick Chat on WhatsApp
                </h3>
                <p
                  className="font-exo text-[13px] font-light mb-6 leading-relaxed tracking-[.03em]"
                  style={{ color: "rgba(200,216,232,0.35)" }}
                >
                  Get instant responses from our team — usually within minutes.
                </p>

                <a
                  href="https://api.whatsapp.com/send/?phone=94767400723&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa-btn clip-wa-btn relative overflow-hidden inline-flex items-center
                    gap-2.5 px-8 py-3.5 font-rajdhani text-[13px] font-bold tracking-[.18em]
                    uppercase no-underline transition-all duration-300
                    hover:-translate-y-0.5"
                  style={{
                    background: "rgba(37,211,102,0.12)",
                    border: "1px solid rgba(37,211,102,0.4)",
                    color: "#25D366",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(37,211,102,0.7)";
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(37,211,102,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(37,211,102,0.4)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <FaWhatsapp size={15} />
                  Start WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
