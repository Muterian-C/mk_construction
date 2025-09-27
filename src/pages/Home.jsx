// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-red-900 to-black text-white py-24 lg:py-32">
        {/* Background Pattern - FIXED */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-600 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-800 rounded-full opacity-15 animate-bounce"></div>
        
        <div className="container relative mx-auto text-center px-6">
          {!user ? (
            <>
              <div className="animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    MK Construction
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-gray-200">
                  Transform your vision into reality with our premium architectural designs. 
                  Explore watermarked previews, unlock full designs with secure payments, and bring your dream space to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/signup"
                    className="group relative bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-600/25"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
                  </Link>
                  <Link
                    to="/designs"
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    Browse Designs
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    {user?.name || user?.username || "Architect"}
                  </span>{" "}
                  <span className="inline-block animate-wave">👷‍♂️</span>
                </h1>
                <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-gray-200">
                  Your next masterpiece awaits. Access your purchased designs or explore new additions to our collection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/designs"
                    className="group relative bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-600/25"
                  >
                    <span className="relative z-10">Browse New Designs</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    My Dashboard
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgb(248 250 252)"></path>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-800 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, secure, and seamless process to access premium architectural designs
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-red-500 transform -translate-x-1/2 hidden lg:block"></div>
            
            <div className="space-y-12 lg:space-y-0">
              {workflowSteps.map((step, index) => (
                <div 
                  key={step.step}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'} mb-8 lg:mb-0`}>
                    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl font-bold text-white mr-4`}>
                          {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Step Number */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl font-bold text-white shadow-2xl border-4 border-white`}>
                      {step.step}
                    </div>
                  </div>

                  {/* Spacer for alternating sides */}
                  <div className="lg:w-1/2 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designs Carousel Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-800 bg-clip-text text-transparent">
              Featured Designs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore watermarked previews of our most popular architectural masterpieces
            </p>
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mt-4">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
              Click "Buy to Unlock" for full access to any design
            </div>
          </div>

          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper rounded-3xl shadow-2xl"
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
            }}
          >
            {carouselItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Watermark Overlay */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2220%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22rgba(255,255,255,0.3)%22 font-family=%22Arial%22%3EMK CONSTRUCTION PREVIEW%3C/text%3E%3C/svg%3E')] opacity-40"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-2xl mx-auto text-center">
                      <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                        Preview Version - Watermarked
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">{item.title}</h3>
                      <p className="text-lg md:text-xl mb-6 opacity-90">{item.description}</p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                          to={item.link}
                          className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-3 rounded-2xl font-semibold hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                          {item.cta}
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                        <button className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                          Buy to Unlock Full Design
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-800 bg-clip-text text-transparent">
              Secure Payment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your preferred payment method for instant access to purchased designs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {paymentMethods.map((method, index) => (
              <div key={index} className="group text-center">
                <div className={`relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-gray-200`}>
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${method.color} mb-6 text-4xl group-hover:scale-110 transition-transform duration-300`}>
                    {method.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{method.name}</h3>
                  <p className="text-gray-600">{method.description}</p>
                  <div className="mt-4 inline-flex items-center text-sm text-green-600 font-medium">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Instant Confirmation
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-800 bg-clip-text text-transparent">
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
              <div key={index} className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="container relative mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Design Templates" },
              { number: "10K+", label: "Happy Clients" },
              { number: "15+", label: "Years Experience" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-800 via-red-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
        </div>
        <div className="container relative mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Unlock Your Dream Design?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-red-100">
            Browse our collection, choose your favorite design, and unlock it with secure payment. 
            Start building your vision today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/designs"
              className="group relative bg-gradient-to-r from-red-600 to-red-800 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-600/25"
            >
              <span className="relative z-10">Browse Designs Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
            </Link>
            {!user && (
              <Link
                to="/signup"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-2xl font-semibold text-xl hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105"
              >
                Create Account
              </Link>
            )}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-red-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Secure Watermarked Previews
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Multiple Payment Options
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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