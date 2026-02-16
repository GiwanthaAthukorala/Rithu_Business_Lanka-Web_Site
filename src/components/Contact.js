import React, { useState } from "react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to grow your business? Contact us today for a free
            consultation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="mb-4">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select a Service</option>
                  <option value="facebook">Facebook Marketing</option>
                  <option value="instagram">Instagram Marketing</option>
                  <option value="tiktok">TikTok Marketing</option>
                  <option value="whatsapp">WhatsApp Business</option>
                  <option value="boosting">Post Boosting</option>
                  <option value="logo">Logo Design</option>
                  <option value="video">AI Video Creation</option>
                  <option value="post">Post Design</option>
                </select>
              </div>
              <div className="mb-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="text-primary text-xl">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <h4 className="font-semibold">WhatsApp</h4>
                    <a
                      href="https://wa.me/94771234567"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      +94 77 123 4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-primary text-xl">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a
                      href="mailto:info@rithusociol.com"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      info@rithusociol.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-primary text-xl">
                    <FaPhone />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <a
                      href="tel:+94111234567"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      +94 11 234 5678
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-primary text-xl">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-600">
                      123, Galle Road,
                      <br />
                      Colombo 03,
                      <br />
                      Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-500 rounded-3xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Quick Chat on WhatsApp
              </h3>
              <p className="mb-6 opacity-90">
                Get instant responses from our team on WhatsApp
              </p>
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-green-500 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                <FaWhatsapp className="mr-2 text-xl" />
                Start WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
