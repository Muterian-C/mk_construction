import React from "react";
import { 
  FaHome,
  FaBuilding,
  FaWarehouse,
  FaPalette,
  FaDownload,
  FaCreditCard,
  FaShieldAlt,
  FaHeadset,
  FaFileAlt,
  FaMobile,
  FaChartLine,
  FaCheckCircle,
  FaLock,
  FaGlobe,
  FaClock,
  FaRedo
} from "react-icons/fa";

const Services = () => {
  const mainServices = [
    {
      icon: <FaHome className="text-4xl" />,
      title: "Residential Designs",
      description: "Browse hundreds of modern house plans from cozy bungalows to luxurious villas. Each design includes floor plans, elevations, and detailed specifications.",
      features: ["1-5 Bedroom Houses", "Modern & Traditional Styles", "Multiple Size Options", "Customizable Layouts"],
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200"
    },
    {
      icon: <FaBuilding className="text-4xl" />,
      title: "Commercial Designs",
      description: "Professional plans for offices, retail spaces, restaurants, and business complexes. Optimized for functionality and brand identity.",
      features: ["Office Buildings", "Retail Stores", "Restaurants & Cafes", "Mixed-Use Developments"],
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200"
    },
    {
      icon: <FaWarehouse className="text-4xl" />,
      title: "Specialty Structures",
      description: "Unique designs for warehouses, industrial buildings, educational facilities, and custom projects tailored to specific needs.",
      features: ["Warehouses & Storage", "Schools & Institutions", "Healthcare Facilities", "Custom Projects"],
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-200"
    },
    {
      icon: <FaPalette className="text-4xl" />,
      title: "Design Customization",
      description: "Need modifications? Our team can customize any purchased design to match your specific requirements, plot size, or preferences.",
      features: ["Layout Adjustments", "Room Size Changes", "Style Modifications", "Additional Features"],
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      borderColor: "border-red-200"
    }
  ];

  const platformServices = [
    {
      icon: <FaDownload className="text-3xl" />,
      title: "Instant Digital Downloads",
      description: "Get immediate access to your purchased designs in multiple formats: PDF for viewing, CAD files for editing, and high-resolution images for presentations."
    },
    {
      icon: <FaCreditCard className="text-3xl" />,
      title: "Flexible Payment Options",
      description: "Pay securely using M-Pesa, PayPal, or Stripe. Choose the payment method that works best for you with instant confirmation and receipt."
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Secure Watermarked Previews",
      description: "Browse our entire collection safely with protected preview images. Only full designs are unlocked after purchase, protecting both buyers and creators."
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "24/7 Customer Support",
      description: "Our dedicated support team is available around the clock to help with purchases, downloads, technical issues, or design questions."
    },
    {
      icon: <FaFileAlt className="text-3xl" />,
      title: "Multiple File Formats",
      description: "Every design package includes PDF documents, AutoCAD files (.dwg), and high-quality images—everything you need to start building."
    },
    {
      icon: <FaMobile className="text-3xl" />,
      title: "Mobile-Optimized Platform",
      description: "Shop and manage your designs from any device. Our platform works seamlessly on desktop, tablet, and mobile for convenience on the go."
    }
  ];

  const benefits = [
    {
      icon: <FaCheckCircle className="text-2xl text-green-500" />,
      title: "One-Time Payment",
      description: "No subscriptions or hidden fees—pay once and own the design forever"
    },
    {
      icon: <FaRedo className="text-2xl text-blue-500" />,
      title: "Lifetime Access",
      description: "Re-download your purchased designs anytime through your dashboard"
    },
    {
      icon: <FaClock className="text-2xl text-purple-500" />,
      title: "Instant Delivery",
      description: "Access your files immediately after payment—no waiting periods"
    },
    {
      icon: <FaLock className="text-2xl text-red-500" />,
      title: "Secure Transactions",
      description: "Bank-level encryption protects all your payment information"
    },
    {
      icon: <FaGlobe className="text-2xl text-indigo-500" />,
      title: "Global Accessibility",
      description: "Shop from anywhere in the world, 24/7/365"
    },
    {
      icon: <FaChartLine className="text-2xl text-orange-500" />,
      title: "Professional Quality",
      description: "All designs created by licensed architects and engineers"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Browse Collection",
      description: "Explore 500+ designs with watermarked previews across residential, commercial, and specialty categories"
    },
    {
      step: "02",
      title: "Select Design",
      description: "Choose your favorite design and click 'Buy to Unlock' to proceed to secure checkout"
    },
    {
      step: "03",
      title: "Secure Payment",
      description: "Complete payment using M-Pesa, PayPal, or Stripe with instant confirmation"
    },
    {
      step: "04",
      title: "Download Files",
      description: "Access full designs immediately and download in PDF, CAD, and image formats"
    }
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
            Digital Architecture Marketplace
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
            Our <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-2xl lg:text-3xl font-light mb-8 text-gray-300 max-w-4xl mx-auto">
            Browse, Purchase & Download Professional Architectural Designs Instantly
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-6 text-gray-300">
            {['500+ Designs', 'Instant Download', 'Multiple Formats', 'Lifetime Access'].map((item) => (
              <div key={item} className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </div>
            ))}
          </div>
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
        {/* Design Categories */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Design Categories
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Explore Our Design Collections
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional architectural plans for every project type and budget
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <div 
                key={index}
                className={`group bg-gradient-to-br ${service.bgColor} rounded-3xl shadow-xl hover:shadow-2xl p-8 border ${service.borderColor} transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className={`inline-flex p-4 bg-gradient-to-r ${service.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Services */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
              Platform Features
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              What You Get With Every Purchase
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More than just designs—a complete digital solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformServices.map((service, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-gray-200 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Process */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Simple Process
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From browsing to building in four easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div 
                key={index}
                className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-200 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="text-6xl font-black text-red-100 absolute top-4 right-4 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
              Platform Benefits
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Why Choose Our Platform
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl shadow-2xl p-8 lg:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Ready to Get Started?
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Start Building Your Dream Today
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto text-gray-100 mb-8">
                Browse our collection of 500+ professional designs and unlock your perfect plan in minutes
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-white text-gray-900 font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
                  Browse All Designs
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 border border-white/30 backdrop-blur-sm flex items-center justify-center">
                  Contact Support
                  <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-8 text-gray-200">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Instant Access
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Secure Payments
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lifetime Downloads
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;