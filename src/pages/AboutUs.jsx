import React from "react";
import { Link } from "react-router-dom";
import {
  FaRocket,
  FaEye,
  FaBullseye,
  FaShieldAlt,
  FaLightbulb,
  FaUsers,
  FaHandshake,
  FaDownload,
  FaLock,
  FaCreditCard,
  FaGlobe,
  FaChartLine,
  FaAward
} from "react-icons/fa";

const AboutUs = () => {
  const platformFeatures = [
    {
      icon: "🔍",
      title: "Browse Protected Previews",
      description: "Explore our curated collection with watermarked images to protect design integrity before purchase."
    },
    {
      icon: "🔓",
      title: "One-Click Unlocking",
      description: "Simple purchase process - select your design and unlock full access instantly with secure payment."
    },
    {
      icon: "💳",
      title: "Flexible Payment Options",
      description: "Pay your way with M-Pesa, PayPal, or Stripe - trusted payment gateways for your security."
    },
    {
      icon: "📥",
      title: "Instant Digital Delivery",
      description: "Download high-quality files immediately in multiple formats: PDF, CAD, and high-res images."
    }
  ];

  const whyChooseUs = [
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Secure Platform",
      description: "Bank-level encryption, watermarked previews, and verified payment gateways protect both buyers and designs."
    },
    {
      icon: <FaDownload className="text-2xl" />,
      title: "Lifetime Access",
      description: "Purchase once, download forever. Access your designs anytime through your personal dashboard."
    },
    {
      icon: <FaGlobe className="text-2xl" />,
      title: "Global Accessibility",
      description: "Shop from anywhere, anytime. Our platform works seamlessly on desktop, tablet, and mobile devices."
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Expert Designs",
      description: "Every design is created by licensed architects and engineers with years of professional experience."
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Multiple Formats",
      description: "Receive your designs in PDF for viewing, CAD for modifications, and high-resolution images for presentations."
    },
    {
      icon: <FaHandshake className="text-2xl" />,
      title: "Dedicated Support",
      description: "24/7 customer support to help with purchases, downloads, and design-related questions."
    }
  ];

  const stats = [
    { number: "500+", label: "Premium Designs" },
    { number: "10,000+", label: "Happy Customers" },
    { number: "15+", label: "Years Experience" },
    { number: "24/7", label: "Platform Access" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-red-900 to-black text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-red-600/20 backdrop-blur-sm border border-red-500/30 px-6 py-3 rounded-full text-red-200 mb-6">
            <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
            Your Digital Architecture Marketplace
          </div>

          <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
            About <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">MK Construction</span>
          </h1>
          <p className="text-2xl lg:text-3xl font-light mb-8 text-gray-300 max-w-4xl mx-auto">
            Democratizing Access to Professional Architectural Designs Through Digital Innovation
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto"></div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="rgb(254 242 242)"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl">
                <FaRocket className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                Our Story
              </h2>
            </div>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                <span className="font-bold text-red-600">MK Construction</span> was born from a simple observation: accessing professional architectural designs shouldn't require expensive consultations, lengthy contracts, or months of waiting. We recognized that thousands of people—homeowners, developers, builders, and dreamers—needed quality architectural plans but faced barriers of cost, time, and accessibility.
              </p>
              <p>
                With over 15 years of combined experience in architecture and construction, our founders decided to revolutionize the industry by creating Kenya's first comprehensive digital marketplace for architectural designs. We've transformed traditional architectural services into an instant, affordable, and transparent online platform.
              </p>
              <p>
                Today, <span className="font-semibold text-red-600">MK Construction</span> offers 500+ professionally crafted designs spanning residential, commercial, and custom projects. Our platform combines cutting-edge technology with architectural excellence, allowing anyone to browse watermarked previews, purchase securely, and download instantly—all from the comfort of their home or office.
              </p>
              <p className="text-xl font-semibold text-gray-800 pt-4">
                We're not just selling designs—we're democratizing architecture.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-lg text-gray-300 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Vision */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-xl p-8 lg:p-10 border border-red-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl">
                <FaEye className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To become the leading digital marketplace for premium architectural designs across Africa, making professional house plans accessible and affordable to everyone, everywhere—transforming how people build their dreams.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl">
                <FaBullseye className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To democratize access to professional architectural designs through a secure digital platform that delivers expertly crafted, ready-to-build plans instantly—with transparent pricing, multiple payment options, and lifetime access for every customer.
            </p>
          </div>
        </section>

        {/* How Our Platform Works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Simple & Secure Process
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              How Our Platform Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From browsing to building—your journey in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              What Sets Us Apart
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Why Choose MK Construction
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More than just a marketplace—your trusted partner in architectural excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Promise */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl shadow-2xl p-8 lg:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>

            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <FaAward className="text-4xl text-yellow-300" />
                </div>
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Our Promise to You
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto text-gray-100 mb-8">
                At <span className="font-bold text-yellow-300">MK Construction</span>, we're committed to transparency, quality, and accessibility. Every design is professionally crafted, every transaction is secure, and every customer gets lifetime access to their purchases. We don't just sell designs—we empower dreams.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <FaLock className="text-3xl text-yellow-300 mb-3 mx-auto" />
                  <h4 className="font-bold text-lg mb-2">100% Secure</h4>
                  <p className="text-gray-200 text-sm">Encrypted payments & protected designs</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <FaChartLine className="text-3xl text-yellow-300 mb-3 mx-auto" />
                  <h4 className="font-bold text-lg mb-2">Professional Quality</h4>
                  <p className="text-gray-200 text-sm">Licensed architects & engineers</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <FaCreditCard className="text-3xl text-yellow-300 mb-3 mx-auto" />
                  <h4 className="font-bold text-lg mb-2">Flexible Payments</h4>
                  <p className="text-gray-200 text-sm">M-Pesa, PayPal & Stripe accepted</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/designs">
                  <button className="group bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
                    Browse Design Library
                    <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>

                <Link to="/about">
                  <button className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 border border-white/30 backdrop-blur-sm flex items-center justify-center">
                    Learn How It Works
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-200">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Built on Trust & Innovation
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every aspect of our platform is designed with your success in mind
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: "🛡️", label: "Secure Payments" },
                { icon: "⚡", label: "Instant Downloads" },
                { icon: "♾️", label: "Lifetime Access" },
                { icon: "🌍", label: "Global Reach" }
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="text-gray-700 font-semibold">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;