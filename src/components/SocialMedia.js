import React, { useState } from "react";
import {
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaWhatsapp,
  FaLink,
  FaCheck,
} from "react-icons/fa";

const SocialMedia = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-4xl text-blue-600" />,
      color: "blue",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-4xl text-pink-600" />,
      color: "pink",
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="text-4xl text-black" />,
      color: "black",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-4xl text-green-500" />,
      color: "green",
    },
  ];

  const handleConnect = (platform) => {
    if (!connectedAccounts.includes(platform)) {
      setConnectedAccounts([...connectedAccounts, platform]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <section id="social-media" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {showNotification && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
            <FaCheck className="inline mr-2" /> Account connected successfully!
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Connect Your <span className="text-primary">Social Media</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Link your accounts to start growing your social media presence with
            us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {socialPlatforms.map((platform, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 flex justify-center">{platform.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{platform.name}</h3>
              {connectedAccounts.includes(platform.name) ? (
                <div className="mt-4 inline-flex items-center text-green-500 font-semibold">
                  <FaCheck className="mr-2" /> Connected
                </div>
              ) : (
                <button
                  onClick={() => handleConnect(platform.name)}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto"
                >
                  <FaLink className="mr-2" /> Connect
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-linear-to-r from-primary to-secondary rounded-3xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">
              Why Connect Your Social Media?
            </h3>
            <p className="text-xl opacity-90">
              Get the most out of your social media presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-semibold mb-2">Analytics & Insights</h4>
              <p className="opacity-80">
                Track your growth with detailed analytics
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h4 className="font-semibold mb-2">Automated Boosting</h4>
              <p className="opacity-80">
                Automatically boost your best-performing posts
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h4 className="font-semibold mb-2">AI-Powered Content</h4>
              <p className="opacity-80">
                Get AI-suggested content for your audience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
