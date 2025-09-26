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
                  Explore, customize, and build your dream space with confidence.
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
                    View Designs
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
                  Your next masterpiece awaits. Continue building your legacy with our latest designs 
                  and powerful project management tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/designs"
                    className="group relative bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-600/25"
                  >
                    <span className="relative z-10">Browse Designs</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    Go to Dashboard
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

      {/* Featured Designs Carousel Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-800 bg-clip-text text-transparent">
              Featured Designs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our most popular architectural masterpieces
            </p>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-2xl mx-auto text-center">
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">{item.title}</h3>
                      <p className="text-lg md:text-xl mb-6 opacity-90">{item.description}</p>
                      <Link
                        to={item.link}
                        className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-3 rounded-2xl font-semibold hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        {item.cta}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Swiper Styles */}
          <style jsx>{`
            .swiper-pagination-bullet {
              background: white;
              opacity: 0.5;
              width: 12px;
              height: 12px;
            }
            .swiper-pagination-bullet-active {
              background: #dc2626;
              opacity: 1;
            }
            .swiper-button-next,
            .swiper-button-prev {
              color: white;
              background: rgba(0, 0, 0, 0.5);
              width: 50px;
              height: 50px;
              border-radius: 50%;
              backdrop-filter: blur(10px);
            }
            .swiper-button-next:after,
            .swiper-button-prev:after {
              font-size: 20px;
            }
          `}</style>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-red-800 bg-clip-text text-transparent">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to bring architectural excellence to life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                icon: "🏗️",
                title: "Architectural Designs",
                description: "Browse our curated collection of professional designs for residential, commercial, and specialized projects.",
                color: "from-gray-800 to-gray-900"
              },
              {
                icon: "💳",
                title: "Secure Payments",
                description: "Multiple payment options including M-Pesa, PayPal, and cards with instant design access upon purchase.",
                color: "from-red-600 to-red-800"
              },
              {
                icon: "🎯",
                title: "Expert Support",
                description: "Dedicated support team and architectural consultants to guide you from concept to completion.",
                color: "from-gray-700 to-red-700"
              }
            ].map((service, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} mb-6 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {service.description}
                </p>
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
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

      {/* Call To Action */}
      {!user && (
        <section className="relative py-20 bg-gradient-to-r from-red-800 via-red-900 to-black text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-20 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
          </div>
          <div className="container relative mx-auto text-center px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Something{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Amazing?
              </span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-red-100">
              Join thousands of architects, builders, and dreamers who trust MK Construction 
              to deliver exceptional designs and unmatched quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signup"
                className="group relative bg-gradient-to-r from-red-600 to-red-800 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-600/25"
              >
                <span className="relative z-10">Sign Up Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-2xl font-semibold text-xl hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}