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
  const [focused, setFocused] = useState("");
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
      value: "+94 77 123 4567",
      href: "https://wa.me/94771234567",
      color: "#25D366",
      glow: "rgba(37,211,102,0.35)",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "info@rithusociol.com",
      href: "mailto:info@rithusociol.com",
      color: "#C9A84C",
      glow: "rgba(201,168,76,0.35)",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+94 11 234 5678",
      href: "tel:+94111234567",
      color: "#69C9D0",
      glow: "rgba(105,201,208,0.35)",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Address",
      value: "123, Galle Road, Colombo 03, Sri Lanka",
      href: null,
      color: "#E1306C",
      glow: "rgba(225,48,108,0.35)",
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

        .ct-section {
          position: relative;
          padding: 120px 0;
          background: radial-gradient(ellipse 100% 50% at 50% 0%, #120d00 0%, #020205 40%, #000008 100%);
          overflow: hidden;
          font-family: 'Exo 2', sans-serif;
        }

        .ct-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
          background-size: 70px 70px;
          pointer-events: none;
        }
        .ct-glow {
          position: absolute;
          top: -200px; left: 50%; transform: translateX(-50%);
          width: 900px; height: 500px;
          background: radial-gradient(ellipse, rgba(201,168,76,0.09) 0%, transparent 65%);
          pointer-events: none;
          animation: ctGlow 5s ease-in-out infinite;
        }
        .ct-glow-br {
          position: absolute;
          bottom: -100px; right: -100px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%);
          pointer-events: none;
        }
        @keyframes ctGlow { 0%,100%{opacity:.6} 50%{opacity:1} }
        .ct-scan {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px);
          pointer-events: none; z-index: 1;
        }

        /* Corners */
        .ct-corner { position:absolute; width:50px; height:50px; pointer-events:none; z-index:5; }
        .ct-corner-tl { top:24px; left:24px; border-top:1px solid rgba(201,168,76,0.4); border-left:1px solid rgba(201,168,76,0.4); }
        .ct-corner-tr { top:24px; right:24px; border-top:1px solid rgba(201,168,76,0.4); border-right:1px solid rgba(201,168,76,0.4); }
        .ct-corner-bl { bottom:24px; left:24px; border-bottom:1px solid rgba(201,168,76,0.4); border-left:1px solid rgba(201,168,76,0.4); }
        .ct-corner-br { bottom:24px; right:24px; border-bottom:1px solid rgba(201,168,76,0.4); border-right:1px solid rgba(201,168,76,0.4); }

        .ct-container {
          position: relative; z-index: 2;
          max-width: 1160px; margin: 0 auto; padding: 0 24px;
        }

        /* Header */
        .ct-header { text-align:center; margin-bottom:72px; }
        .ct-eyebrow {
          display: inline-flex; align-items:center; gap:10px;
          font-family:'Rajdhani',sans-serif; font-size:11px; font-weight:500;
          letter-spacing:.3em; text-transform:uppercase; color:#C9A84C;
          background:rgba(201,168,76,0.05); border:1px solid rgba(201,168,76,0.2);
          padding:7px 18px; margin-bottom:20px;
        }
        .ct-dot {
          width:5px; height:5px; border-radius:50%; background:#C9A84C;
          box-shadow:0 0 8px rgba(201,168,76,0.8); animation:ctBlink 2s ease-in-out infinite;
        }
        @keyframes ctBlink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .ct-title {
          font-family:'Cinzel',serif; font-size:clamp(34px,5vw,60px);
          font-weight:700; color:rgba(255,255,255,0.92); line-height:1.05;
          margin-bottom:16px; letter-spacing:-0.01em;
        }
        .ct-title-gold {
          background: linear-gradient(90deg,#C9A84C,#FFD700,#C9A84C);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:ctGoldFlow 4s linear infinite;
          filter:drop-shadow(0 0 16px rgba(255,215,0,0.3));
        }
        @keyframes ctGoldFlow { 0%{background-position:0%} 100%{background-position:200%} }
        .ct-subtitle { font-size:16px; color:rgba(255,255,255,0.35); letter-spacing:.04em; font-weight:300; }

        /* Layout */
        .ct-layout {
          display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
          opacity: 0; transform: translateY(30px);
          transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
        }
        .ct-layout.ct-visible { opacity:1; transform:translateY(0); }
        @media(max-width:900px){ .ct-layout{grid-template-columns:1fr;} }

        /* Panel shared */
        .ct-panel {
          background: rgba(8,8,15,0.75);
          border: 1px solid rgba(201,168,76,0.12);
          backdrop-filter: blur(24px);
          position: relative; overflow: hidden;
        }
        .ct-panel::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(201,168,76,0.45),transparent);
        }
        .ct-panel-inner { padding: 40px; }

        .ct-panel-title {
          font-family:'Cinzel',serif; font-size:20px; font-weight:600;
          color:rgba(255,255,255,0.85); letter-spacing:.05em; margin-bottom:32px;
          display:flex; align-items:center; gap:12px;
        }
        .ct-panel-title-line {
          flex:1; height:1px;
          background:linear-gradient(90deg,rgba(201,168,76,0.3),transparent);
        }

        /* Form inputs */
        .ct-field { margin-bottom: 18px; position:relative; }
        .ct-input, .ct-select, .ct-textarea {
          width:100%; padding:14px 18px;
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(201,168,76,0.15);
          color:rgba(255,255,255,0.8);
          font-family:'Exo 2',sans-serif; font-size:14px; font-weight:300;
          outline:none; transition:all .3s cubic-bezier(.16,1,.3,1);
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          letter-spacing:.03em;
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color:rgba(255,255,255,0.2); }
        .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
          border-color:rgba(201,168,76,0.5);
          background:rgba(201,168,76,0.04);
          box-shadow:0 0 20px rgba(201,168,76,0.08);
        }
        .ct-select { appearance:none; cursor:pointer; }
        .ct-select option { background:#08080F; color:rgba(255,255,255,0.8); }
        .ct-textarea { resize:none; min-height:110px; }
        .ct-field-glow {
          position:absolute; bottom:0; left:8%; right:8%; height:1px;
          background:linear-gradient(90deg,transparent,rgba(201,168,76,0.6),transparent);
          transform:scaleX(0); transition:transform .4s;
        }
        .ct-input:focus ~ .ct-field-glow,
        .ct-select:focus ~ .ct-field-glow,
        .ct-textarea:focus ~ .ct-field-glow { transform:scaleX(1); }

        /* Submit btn */
        .ct-submit {
          width:100%; padding:16px;
          background:linear-gradient(135deg,#C9A84C,#FFD700,#C9A84C);
          background-size:200% auto;
          color:#000; font-family:'Rajdhani',sans-serif;
          font-size:14px; font-weight:700; letter-spacing:.2em; text-transform:uppercase;
          border:none; cursor:pointer;
          clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
          transition:all .4s cubic-bezier(.16,1,.3,1);
          box-shadow:0 0 25px rgba(255,215,0,0.2);
          display:flex; align-items:center; justify-content:center; gap:10px;
          position:relative; overflow:hidden;
        }
        .ct-submit::before {
          content:''; position:absolute;
          top:-50%; left:-100%; width:60%; height:200%;
          background:rgba(255,255,255,0.15); transform:skewX(-20deg);
          transition:left .6s;
        }
        .ct-submit:hover { background-position:right center; box-shadow:0 0 40px rgba(255,215,0,0.4); transform:translateY(-2px); }
        .ct-submit:hover::before { left:160%; }
        .ct-submit:disabled { opacity:.6; cursor:not-allowed; transform:none; }

        /* Sending spinner */
        .ct-spinner {
          width:16px; height:16px; border:2px solid rgba(0,0,0,0.2);
          border-top-color:#000; border-radius:50%;
          animation:spin .7s linear infinite;
        }
        @keyframes spin { to{transform:rotate(360deg)} }

        /* Success toast */
        .ct-success {
          display:flex; align-items:center; gap:12px;
          background:rgba(37,211,102,0.08); border:1px solid rgba(37,211,102,0.3);
          padding:14px 20px; margin-top:16px;
          color:#25D366; font-family:'Rajdhani',sans-serif;
          font-size:13px; font-weight:600; letter-spacing:.1em;
          animation:ctFadeIn .4s ease both;
        }
        @keyframes ctFadeIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }

        /* Right col */
        .ct-right { display:flex; flex-direction:column; gap:20px; }

        /* Contact info cards */
        .ct-info-item {
          display:flex; align-items:flex-start; gap:16px;
          padding:20px 24px;
          background:rgba(255,255,255,0.02);
          border:1px solid rgba(201,168,76,0.1);
          position:relative; overflow:hidden;
          transition:all .35s cubic-bezier(.16,1,.3,1);
          cursor:default;
        }
        .ct-info-item::before {
          content:''; position:absolute; left:0; top:0; bottom:0;
          width:2px; background:currentColor; opacity:0; transition:opacity .3s;
        }
        .ct-info-item:hover { border-color:rgba(201,168,76,0.3); transform:translateX(4px); }
        .ct-info-item:hover::before { opacity:0.6; }
        .ct-info-icon-wrap {
          width:40px; height:40px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
        }
        .ct-info-label {
          font-family:'Rajdhani',sans-serif; font-size:10px; font-weight:600;
          letter-spacing:.25em; text-transform:uppercase;
          color:rgba(255,255,255,0.25); margin-bottom:4px;
        }
        .ct-info-value {
          font-size:14px; color:rgba(255,255,255,0.7);
          font-weight:300; letter-spacing:.02em; line-height:1.5;
          transition:color .3s;
        }
        .ct-info-value a { color:inherit; text-decoration:none; transition:color .3s; }
        .ct-info-item:hover .ct-info-value, .ct-info-item:hover .ct-info-value a { color:rgba(255,255,255,0.9); }

        /* WhatsApp CTA card */
        .ct-wa-card {
          position:relative; overflow:hidden;
          background:linear-gradient(135deg, rgba(10,30,15,0.9) 0%, rgba(5,20,10,0.95) 100%);
          border:1px solid rgba(37,211,102,0.25);
          padding:32px;
          box-shadow:0 0 40px rgba(37,211,102,0.06);
        }
        .ct-wa-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(37,211,102,0.5),transparent);
        }
        .ct-wa-glow {
          position:absolute; top:-60px; right:-60px;
          width:200px; height:200px; border-radius:50%;
          background:radial-gradient(circle,rgba(37,211,102,0.1) 0%,transparent 65%);
          pointer-events:none;
        }
        .ct-wa-title {
          font-family:'Cinzel',serif; font-size:18px; font-weight:600;
          color:rgba(255,255,255,0.9); margin-bottom:10px; letter-spacing:.03em;
        }
        .ct-wa-subtitle {
          font-size:13px; color:rgba(255,255,255,0.35); font-weight:300;
          margin-bottom:24px; line-height:1.6; letter-spacing:.03em;
        }
        .ct-wa-btn {
          display:inline-flex; align-items:center; gap:10px;
          padding:14px 32px;
          background:rgba(37,211,102,0.12); border:1px solid rgba(37,211,102,0.4);
          color:#25D366; font-family:'Rajdhani',sans-serif;
          font-size:13px; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
          text-decoration:none;
          clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
          transition:all .35s cubic-bezier(.16,1,.3,1);
          box-shadow:0 0 20px rgba(37,211,102,0.1);
          position:relative; overflow:hidden;
        }
        .ct-wa-btn::before {
          content:''; position:absolute; inset:0;
          background:rgba(37,211,102,0.08); opacity:0; transition:opacity .3s;
        }
        .ct-wa-btn:hover { border-color:rgba(37,211,102,0.7); box-shadow:0 0 30px rgba(37,211,102,0.25); transform:translateY(-2px); }
        .ct-wa-btn:hover::before { opacity:1; }
        .ct-wa-pulse {
          width:8px; height:8px; border-radius:50%; background:#25D366;
          box-shadow:0 0 8px rgba(37,211,102,0.8); animation:waPulse 2s ease-in-out infinite;
        }
        @keyframes waPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
      `}</style>

      <section id="contact" className="ct-section" ref={sectionRef}>
        <div className="ct-bg-grid" />
        <div className="ct-glow" />
        <div className="ct-glow-br" />
        <div className="ct-scan" />
        <div className="ct-corner ct-corner-tl" />
        <div className="ct-corner ct-corner-tr" />
        <div className="ct-corner ct-corner-bl" />
        <div className="ct-corner ct-corner-br" />

        <div className="ct-container">
          {/* Header */}
          <div className="ct-header">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <div className="ct-eyebrow">
                <div className="ct-dot" />
                Let&apos;s Connect
                <div className="ct-dot" />
              </div>
            </div>
            <h2 className="ct-title">
              Get In <span className="ct-title-gold">Touch</span>
            </h2>
            <p className="ct-subtitle">
              Ready to grow your business? Let&apos;s build something great
              together
            </p>
          </div>

          {/* Layout */}
          <div className={`ct-layout ${visibleItems ? "ct-visible" : ""}`}>
            {/* Left — Form */}
            <div className="ct-panel">
              <div className="ct-panel-inner">
                <div className="ct-panel-title">
                  Send a Message
                  <div className="ct-panel-title-line" />
                </div>

                <form onSubmit={handleSubmit}>
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
                    <div className="ct-field" key={f.name}>
                      <input
                        type={f.type}
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        required={f.name !== "phone"}
                        className="ct-input"
                        onFocus={() => setFocused(f.name)}
                        onBlur={() => setFocused("")}
                      />
                      <div className="ct-field-glow" />
                    </div>
                  ))}

                  <div className="ct-field">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="ct-select"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A84C' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
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
                    <div className="ct-field-glow" />
                  </div>

                  <div className="ct-field">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      required
                      rows={4}
                      className="ct-textarea"
                    />
                    <div className="ct-field-glow" />
                  </div>

                  <button
                    type="submit"
                    className="ct-submit"
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <div className="ct-spinner" /> Transmitting...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane size={13} /> Send Message
                      </>
                    )}
                  </button>

                  {submitted && (
                    <div className="ct-success">
                      <FaCheckCircle size={16} />
                      Message received! We&apos;ll respond within 24 hours.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right — Info + WhatsApp */}
            <div className="ct-right">
              {/* Contact info */}
              <div className="ct-panel">
                <div
                  className="ct-panel-inner"
                  style={{ padding: "32px 32px 24px" }}
                >
                  <div className="ct-panel-title">
                    Contact Info
                    <div className="ct-panel-title-line" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {contacts.map((c) => (
                      <div
                        className="ct-info-item"
                        key={c.label}
                        style={{ color: c.color }}
                      >
                        <div
                          className="ct-info-icon-wrap"
                          style={{
                            background: `${c.color}18`,
                            border: `1px solid ${c.color}30`,
                            boxShadow: `0 0 12px ${c.glow}`,
                          }}
                        >
                          <c.icon
                            size={16}
                            style={{
                              color: c.color,
                              filter: `drop-shadow(0 0 5px ${c.glow})`,
                            }}
                          />
                        </div>
                        <div>
                          <div className="ct-info-label">{c.label}</div>
                          <div className="ct-info-value">
                            {c.href ? (
                              <a
                                href={c.href}
                                target={
                                  c.href.startsWith("http")
                                    ? "_blank"
                                    : undefined
                                }
                                rel="noopener noreferrer"
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
              <div className="ct-wa-card">
                <div className="ct-wa-glow" />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <div className="ct-wa-pulse" />
                  <span
                    style={{
                      fontFamily: "'Rajdhani',sans-serif",
                      fontSize: 10,
                      letterSpacing: ".25em",
                      textTransform: "uppercase",
                      color: "rgba(37,211,102,0.6)",
                    }}
                  >
                    Available Now
                  </span>
                </div>
                <div className="ct-wa-title">Quick Chat on WhatsApp</div>
                <p className="ct-wa-subtitle">
                  Get instant responses from our team — usually within minutes.
                </p>
                <a
                  href="https://wa.me/94771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-wa-btn"
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
