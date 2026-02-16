import React from "react";
import { FaArrowDown } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6">
            <span className="block text-dark">Welcome to</span>
            <span className="block text-primary mt-2">Rithu Sociol</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Your Premier Digital Marketing Partner in Sri Lanka
          </p>

          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            We specialize in Social Media Marketing, Content Creation, and
            Digital Growth Strategies
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Our Services
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transform hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a
              href="#services"
              className="text-dark hover:text-primary transition-colors"
            >
              <FaArrowDown size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
