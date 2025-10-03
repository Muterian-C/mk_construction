// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function Home() {
  const { user } = useAuth();

  // Carousel data
  const carouselItems = [
    {
      id: 1,
      title: "Modern Residential Designs",
      description: "Contemporary homes with innovative layouts and sustainable features",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      cta: "View Residential Designs",
      link: "/designs?category=residential"
    },
    {
      id: 2,
      title: "Commercial Excellence",
      description: "Professional spaces designed for productivity and brand identity",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      cta: "Explore Commercial Projects",
      link: "/designs?category=commercial"
    },
    {
      id: 3,
      title: "Custom Architectural Solutions",
      description: "Tailored designs to match your unique vision and requirements",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      cta: "Start Custom Project",
      link: "/contact"
    },
    {
      id: 4,
      title: "Sustainable Architecture",
      description: "Eco-friendly designs that harmonize with environment",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      cta: "Learn About Sustainability",
      link: "/about"
    }
  ];

  // How It Works Steps
  const workflowSteps = [
    {
      step: 1,
      title: "Browse Designs",
      description: "Explore our curated collection of architectural designs with watermarked previews",
      icon: "🔍",
      color: "from-blue-500 to-blue-600"
    },
    {
      step: 2,
      title: "Select & Unlock",
      description: "Choose your favorite design and click 'Buy to Unlock' for full access",
      icon: "🔓",
      color: "from-green-500 to-green-600"
    },
    {
      step: 3,
      title: "Secure Payment",
      description: "Pay securely using M-Pesa, PayPal, or Stripe with instant confirmation",
      icon: "💳",
      color: "from-purple-500 to-purple-600"
    },
    {
      step: 4,
      title: "Access & Download",
      description: "View full designs online and download high-quality files (PDF/CAD/Images)",
      icon: "📥",
      color: "from-red-500 to-red-600"
    },
    {
      step: 5,
      title: "Manage Projects",
      description: "Access your purchased designs anytime through your personal dashboard",
      icon: "📊",
      color: "from-orange-500 to-orange-600"
    }
  ];

  // Payment Methods
  const paymentMethods = [
    {
      name: "M-Pesa",
      icon: "📱",
      description: "Instant mobile payments",
      color: "from-green-500 to-green-700"
    },
    {
      name: "PayPal",
      icon: "🌐",
      description: "Secure online transactions",
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Stripe",
      icon: "💝",
      description: "Card payments worldwide",
      color: "from-purple-500 to-purple-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-red-900 to-black text-white">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative mx-auto text-center px-6">
          {!user ? (
            <div className="animate-fade-in-up space-y-8">
              <div className="inline-flex items-center bg-red-600/20 backdrop-blur-sm border border-red-500/30 px-6 py-3 rounded-full text-red-200 mb-4">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                Premium Architectural Designs
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                Build Your
                <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Dream Space
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-300 font-light">
                Discover <span className="text-red-400 font-semibold">watermarked previews</span>, unlock with secure payments, and transform your vision into reality with professional architectural designs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/signup"
                  className="group relative bg-gradient-to-r from-red-500 to-red-700 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-red-400 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-500/30"
                >
                  <span className="relative z-10 flex items-center">
                    Start Building Free
                    <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link
                  to="/designs"
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-12 py-6 rounded-2xl font-semibold text-xl hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105 flex items-center"
                >
                  Browse Designs
                  <svg className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-8 mt-16 text-gray-400">
                {['Secure Payments', 'Instant Access', 'Premium Quality', '24/7 Support'].map((item) => (
                  <div key={item} className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in-up space-y-8">
              <div className="inline-flex items-center bg-red-600/20 backdrop-blur-sm border border-red-500/30 px-6 py-3 rounded-full text-red-200 mb-4">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                Welcome Back, Architect!
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                Ready to
                <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Create More?
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-300 font-light">
                Your next masterpiece awaits. Access your purchased designs or explore new additions to our collection.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/designs"
                  className="group relative bg-gradient-to-r from-red-500 to-red-700 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-red-400 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-500/30"
                >
                  <span className="relative z-10 flex items-center">
                    Browse New Designs
                    <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link
                  to="/dashboard"
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-12 py-6 rounded-2xl font-semibold text-xl hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105 flex items-center"
                >
                  My Dashboard
                  <svg className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Simple 5-Step Process
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From browsing watermarked previews to downloading your full design - a seamless journey to your dream space
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 transform -translate-y-1/2 z-0"></div>
            
            {workflowSteps.map((step, index) => (
              <div key={step.step} className="relative z-10 group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 group-hover:-translate-y-2 h-full">
                  {/* Step number with connecting dots */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                      {step.icon}
                    </div>
                    <div className="text-3xl font-black text-gray-300 opacity-50">0{step.step}</div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {step.description}
                  </p>
                  
                  {/* Progress indicator for mobile */}
                  <div className="lg:hidden mt-6 flex items-center justify-center">
                    {index < workflowSteps.length - 1 && (
                      <div className="w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 relative">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Designs Carousel Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              Protected Previews
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-800 bg-clip-text text-transparent">
              Featured Designs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore watermarked previews of our most popular architectural masterpieces
            </p>
          </div>

          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
              },
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            className="mySwiper rounded-3xl shadow-2xl overflow-hidden"
            effect="fade"
            speed={1000}
          >
            {carouselItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden group">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Enhanced overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Watermark pattern */}
                  <div className="absolute inset-0 opacity-10 bg-repeat" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dominant-baseline='middle' fill='white' font-family='Arial' font-weight='bold'%3EMK CONSTRUCTION PREVIEW%3C/text%3E%3C/svg%3E")`
                  }}></div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                    <div className="max-w-4xl mx-auto">
                      <div className="inline-flex items-center bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-red-400/30">
                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                        Protected Preview - Watermarked
                      </div>
                      
                      <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          to={item.link}
                          className="inline-flex items-center justify-center bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg flex-1 sm:flex-none"
                        >
                          Explore Category
                          <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                        <button className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-500 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex-1 sm:flex-none group">
                          <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Buy to Unlock Full Design
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom navigation buttons */}
            <div className="swiper-button-next !text-white !w-16 !h-16 after:!text-2xl after:!font-bold"></div>
            <div className="swiper-button-prev !text-white !w-16 !h-16 after:!text-2xl after:!font-bold"></div>
          </Swiper>
        </div>
      </section>

      {/* Enhanced Payment Methods Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Trusted & Secure
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
              Multiple Payment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Choose your preferred secure payment method for instant access to purchased designs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {paymentMethods.map((method, index) => (
              <div key={index} className="group relative">
                <div className={`relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-gray-100 h-full overflow-hidden`}>
                  {/* Background gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 text-center">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-r ${method.color} mb-6 text-5xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      {method.icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-gray-800">{method.name}</h3>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">{method.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-center text-green-600 font-medium">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Instant Confirmation
                      </div>
                      <div className="flex items-center justify-center text-green-600 font-medium">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Bank-Level Security
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
              Why Choose Us
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">
              Why Choose MK Construction?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Secure Watermarked Previews",
                description: "Browse designs safely with protected preview images before purchase"
              },
              {
                icon: "⚡",
                title: "Instant Access",
                description: "Get immediate online viewing and download links after payment"
              },
              {
                icon: "📱",
                title: "Mobile Optimized",
                description: "Access your designs and dashboard from any device, anywhere"
              },
              {
                icon: "💾",
                title: "Lifetime Access",
                description: "Re-download purchased designs anytime through your dashboard"
              },
              {
                icon: "🎨",
                title: "Multiple Formats",
                description: "Download designs in PDF, CAD, and high-resolution image formats"
              },
              {
                icon: "👥",
                title: "Dedicated Support",
                description: "Get help from our architectural experts throughout your project"
              }
            ].map((benefit, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-gray-300 group-hover:-translate-y-2">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="container relative mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { number: "500+", label: "Design Templates" },
              { number: "10K+", label: "Happy Clients" },
              { number: "15+", label: "Years Experience" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-xl text-gray-300 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-red-800 via-red-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
        </div>
        <div className="container relative mx-auto text-center px-6">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Start Your Project Today
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Ready to Unlock Your
            <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Dream Design?
            </span>
          </h2>
          
          <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-red-100">
            Browse our collection, choose your favorite design, and unlock it with secure payment. 
            Start building your vision today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/designs"
              className="group relative bg-gradient-to-r from-red-600 to-red-800 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-600/25"
            >
              <span className="relative z-10 flex items-center">
                Browse Designs Now
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            {!user && (
              <Link
                to="/signup"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-12 py-6 rounded-2xl font-semibold text-xl hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105 flex items-center"
              >
                Create Free Account
                <svg className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </Link>
            )}
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-red-200 text-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Secure Watermarked Previews
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Multiple Payment Options
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Instant Download Access
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}