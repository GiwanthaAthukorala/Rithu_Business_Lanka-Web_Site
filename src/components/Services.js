import React from "react";
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

const Services = () => {
  const services = [
    {
      icon: <FaFacebook className="text-4xl text-blue-600" />,
      title: "Facebook Marketing",
      description:
        "Boost your business with targeted Facebook campaigns and engaging content",
    },
    {
      icon: <FaInstagram className="text-4xl text-pink-600" />,
      title: "Instagram Growth",
      description:
        "Grow your Instagram presence with strategic content and engagement",
    },
    {
      icon: <FaTiktok className="text-4xl text-black" />,
      title: "TikTok Marketing",
      description: "Create viral content and reach younger audiences on TikTok",
    },
    {
      icon: <FaWhatsapp className="text-4xl text-green-500" />,
      title: "WhatsApp Business",
      description:
        "Connect with customers directly through WhatsApp Business API",
    },
    {
      icon: <FaRocket className="text-4xl text-purple-600" />,
      title: "Post Boosting",
      description: "Amplify your reach with strategic post boosting campaigns",
    },
    {
      icon: <FaPalette className="text-4xl text-orange-500" />,
      title: "Logo Design",
      description:
        "Professional logo design that represents your brand identity",
    },
    {
      icon: <FaRobot className="text-4xl text-cyan-500" />,
      title: "AI Video Creation",
      description:
        "Cutting-edge AI-powered video content for maximum engagement",
    },
    {
      icon: <FaPenFancy className="text-4xl text-red-500" />,
      title: "Post Design",
      description: "Eye-catching social media posts that stop the scroll",
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital marketing solutions tailored for your business
            growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-dark">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href="#contact"
                  className="text-primary font-semibold hover:underline"
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
