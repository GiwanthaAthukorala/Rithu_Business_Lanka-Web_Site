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
      iconColor: "text-[#25D366]",
      iconBg: "bg-[#25D366]/10",
      iconBorder: "border-[#25D366]/20",
      iconGlow: "drop-shadow-[0_0_5px_rgba(37,211,102,0.5)]",
      borderHover: "hover:border-[#25D366]/40",
      textColor: "text-[#25D366]",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "info@rithusociol.com",
      href: "mailto:info@rithusociol.com",
      iconColor: "text-[#C9A84C]",
      iconBg: "bg-[#C9A84C]/10",
      iconBorder: "border-[#C9A84C]/20",
      iconGlow: "drop-shadow-[0_0_5px_rgba(201,168,76,0.5)]",
      borderHover: "hover:border-[#C9A84C]/40",
      textColor: "text-[#C9A84C]",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "074 008 9006",
      href: "tel:+9474 008 9006",
      iconColor: "text-[#69C9D0]",
      iconBg: "bg-[#69C9D0]/10",
      iconBorder: "border-[#69C9D0]/20",
      iconGlow: "drop-shadow-[0_0_5px_rgba(105,201,208,0.5)]",
      borderHover: "hover:border-[#69C9D0]/40",
      textColor: "text-[#69C9D0]",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Address",
      value: "Mawanella, Sri Lanka, Sri Lanka",
      href: null,
      iconColor: "text-[#E1306C]",
      iconBg: "bg-[#E1306C]/10",
      iconBorder: "border-[#E1306C]/20",
      iconGlow: "drop-shadow-[0_0_5px_rgba(225,48,108,0.5)]",
      borderHover: "hover:border-[#E1306C]/40",
      textColor: "text-[#E1306C]",
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

  const inputClass =
    "w-full px-4 py-3.5 bg-white/3 border border-[#C9A84C]/15 text-white/80 font-light text-sm outline-none transition-all duration-300 focus:border-[#C9A84C]/50 focus:bg-[#C9A84C]/4 focus:shadow-[0_0_20px_rgba(201,168,76,0.08)] placeholder:text-white/20 tracking-wide";

  return (
    <>
      {/* Keyframe animations via a single global <style> tag — only for things Tailwind can't express */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700&family=Exo+2:wght@200;300;400;500&display=swap');

        .font-cinzel   { font-family: 'Cinzel', serif; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-exo      { font-family: 'Exo 2', sans-serif; }

        @keyframes ctGlow    { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes ctBlink   { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes ctGoldFlow{ 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes ctFadeIn  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes waPulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }

        .anim-glow     { animation: ctGlow 5s ease-in-out infinite; }
        .anim-blink    { animation: ctBlink 2s ease-in-out infinite; }
        .anim-gold     { animation: ctGoldFlow 4s linear infinite; background-size:200% auto; }
        .anim-fadein   { animation: ctFadeIn .4s ease both; }
        .anim-spin     { animation: spin .7s linear infinite; }
        .anim-wapulse  { animation: waPulse 2s ease-in-out infinite; }

        .clip-btn      { clip-path: polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%); }
        .clip-input    { clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); }
        .clip-icon     { clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%); }
        .clip-wa-btn   { clip-path: polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%); }

        .gold-text {
          background: linear-gradient(90deg,#C9A84C,#FFD700,#C9A84C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 16px rgba(255,215,0,0.3));
        }

        .submit-btn::before {
          content:''; position:absolute;
          top:-50%; left:-100%; width:60%; height:200%;
          background:rgba(255,255,255,0.15); transform:skewX(-20deg);
          transition:left .6s;
        }
        .submit-btn:hover::before { left:160%; }
        .info-item::before {
          content:''; position:absolute; left:0; top:0; bottom:0;
          width:2px; background:currentColor; opacity:0; transition:opacity .3s;
        }
        .info-item:hover::before { opacity:.6; }

        .wa-btn::before {
          content:''; position:absolute; inset:0;
          background:rgba(37,211,102,0.08); opacity:0; transition:opacity .3s;
        }
        .wa-btn:hover::before { opacity:1; }

        .ct-layout-enter { opacity:0; transform:translateY(30px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
        .ct-layout-visible { opacity:1; transform:translateY(0); }

        .scan-lines {
          background: repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px);
        }
        .bg-grid {
          background-image:
            linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
          background-size: 70px 70px;
        }
      `}</style>

      <section
        id="contact"
        ref={sectionRef}
        className="font-exo relative py-28 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 50% 0%, #120d00 0%, #020205 40%, #000008 100%)",
        }}
      >
        {/* Background layers */}
        <div className="bg-grid absolute inset-0 pointer-events-none" />
        <div
          className="anim-glow absolute pointer-events-none"
          style={{
            top: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 500,
            background:
              "radial-gradient(ellipse, rgba(201,168,76,0.09) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)",
          }}
        />
        <div className="scan-lines absolute inset-0 pointer-events-none z-1" />

        {/* Corner decorations */}
        {[
          "top-6 left-6 border-t border-l",
          "top-6 right-6 border-t border-r",
          "bottom-6 left-6 border-b border-l",
          "bottom-6 right-6 border-b border-r",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-12 h-12 border-[#C9A84C]/40 pointer-events-none z-5 ${cls}`}
          />
        ))}

        {/* Container */}
        <div className="relative z-2 max-w-290 mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-18">
            <div className="flex justify-center mb-5">
              <div className="font-rajdhani inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[.3em] uppercase text-[#C9A84C] bg-[#C9A84C]/5 border border-[#C9A84C]/20 px-4.5 py-1.75">
                <span className="anim-blink w-1.25 h-1.25 rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
                Let&apos;s Connect
                <span className="anim-blink w-1.25 h-1.25 rounded-full bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
              </div>
            </div>
            <h2 className="font-cinzel text-[clamp(34px,5vw,60px)] font-bold text-white/90 leading-[1.05] mb-4 tracking-tight">
              Get In <span className="anim-gold gold-text">Touch</span>
            </h2>
            <p className="font-exo text-base text-white/35 tracking-[.04em] font-light">
              Ready to grow your business? Let&apos;s build something great
              together
            </p>
          </div>

          {/* Layout grid */}
          <div
            className={`ct-layout-enter grid grid-cols-1 lg:grid-cols-2 gap-8 ${
              visibleItems ? "ct-layout-visible" : ""
            }`}
          >
            {/* LEFT — Form */}
            <div
              className="relative overflow-hidden backdrop-blur-2xl"
              style={{
                background: "rgba(8,8,15,0.75)",
                border: "1px solid rgba(201,168,76,0.12)",
              }}
            >
              {/* top shimmer line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,rgba(201,168,76,0.45),transparent)",
                }}
              />
              <div className="p-10">
                <div className="font-cinzel flex items-center gap-3 text-xl font-semibold text-white/85 tracking-[.05em] mb-8">
                  Send a Message
                  <div
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg,rgba(201,168,76,0.3),transparent)",
                    }}
                  />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4.5">
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
                        className={`clip-input ${inputClass}`}
                      />
                    </div>
                  ))}

                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`clip-input ${inputClass} appearance-none cursor-pointer`}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A84C' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 18px center",
                      }}
                    >
                      <option value="" className="bg-[#08080F] text-white/80">
                        Select a Service
                      </option>
                      {services.map((s) => (
                        <option
                          key={s}
                          value={s.toLowerCase().replace(/ /g, "-")}
                          className="bg-[#08080F] text-white/80"
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
                      className={`clip-input ${inputClass} resize-none min-h-27.5`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="submit-btn clip-btn relative overflow-hidden w-full py-4 font-rajdhani font-bold text-sm tracking-[.2em] uppercase text-black border-none cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                    style={{
                      background:
                        "linear-gradient(135deg,#C9A84C,#FFD700,#C9A84C)",
                      backgroundSize: "200% auto",
                      boxShadow: "0 0 25px rgba(255,215,0,0.2)",
                    }}
                  >
                    {sending ? (
                      <>
                        <span className="anim-spin w-4 h-4 rounded-full border-2 border-black/20 border-t-black" />
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
                    <div className="anim-fadein flex items-center gap-3 bg-[#25D366]/8 border border-[#25D366]/30 px-5 py-3.5 text-[#25D366] font-rajdhani text-[13px] font-semibold tracking-widest">
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
                  background: "rgba(8,8,15,0.75)",
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,168,76,0.45),transparent)",
                  }}
                />
                <div className="p-8 pb-6">
                  <div className="font-cinzel flex items-center gap-3 text-xl font-semibold text-white/85 tracking-[.05em] mb-8">
                    Contact Info
                    <div
                      className="flex-1 h-px"
                      style={{
                        background:
                          "linear-gradient(90deg,rgba(201,168,76,0.3),transparent)",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    {contacts.map((c) => (
                      <div
                        key={c.label}
                        className={`info-item relative flex items-start gap-4 px-6 py-5 bg-white/2 border border-[#C9A84C]/10 ${c.borderHover} transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:translate-x-1 cursor-default ${c.textColor}`}
                      >
                        <div
                          className={`clip-icon w-10 h-10 shrink-0 flex items-center justify-center ${c.iconBg} border ${c.iconBorder}`}
                        >
                          <c.icon
                            size={16}
                            className={`${c.iconColor} ${c.iconGlow}`}
                          />
                        </div>
                        <div>
                          <div className="font-rajdhani text-[10px] font-semibold tracking-[.25em] uppercase text-white/25 mb-1">
                            {c.label}
                          </div>
                          <div className="font-exo text-sm text-white/70 font-light tracking-[.02em] leading-relaxed transition-colors duration-300 group-hover:text-white/90">
                            {c.href ? (
                              <a
                                href={c.href}
                                target={
                                  c.href.startsWith("http")
                                    ? "_blank"
                                    : undefined
                                }
                                rel="noopener noreferrer"
                                className="text-inherit no-underline hover:text-white/90 transition-colors duration-300"
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

              {/* WhatsApp CTA */}
              <div
                className="relative overflow-hidden p-8"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(10,30,15,0.9) 0%, rgba(5,20,10,0.95) 100%)",
                  border: "1px solid rgba(37,211,102,0.25)",
                  boxShadow: "0 0 40px rgba(37,211,102,0.06)",
                }}
              >
                {/* top shimmer */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(37,211,102,0.5),transparent)",
                  }}
                />
                {/* glow orb */}
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
                  <span className="anim-wapulse w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_8px_rgba(37,211,102,0.8)]" />
                  <span className="font-rajdhani text-[10px] tracking-[.25em] uppercase text-[#25D366]/60">
                    Available Now
                  </span>
                </div>

                <h3 className="font-cinzel text-lg font-semibold text-white/90 mb-2.5 tracking-[.03em]">
                  Quick Chat on WhatsApp
                </h3>
                <p className="font-exo text-[13px] text-white/35 font-light mb-6 leading-relaxed tracking-[.03em]">
                  Get instant responses from our team — usually within minutes.
                </p>

                <a
                  href="https://wa.me/94771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa-btn clip-wa-btn relative overflow-hidden inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#25D366]/12 border border-[#25D366]/40 text-[#25D366] font-rajdhani text-[13px] font-bold tracking-[.18em] uppercase no-underline transition-all duration-300 hover:border-[#25D366]/70 hover:shadow-[0_0_30px_rgba(37,211,102,0.25)] hover:-translate-y-0.5"
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
