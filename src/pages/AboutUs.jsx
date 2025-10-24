// src/pages/AboutUs.jsx
import React from "react";
import { 
  FaRocket, 
  FaEye, 
  FaBullseye, 
  FaHome, 
  FaHardHat, 
  FaStore, 
  FaComments,
  FaAward,
  FaShieldAlt,
  FaLightbulb,
  FaUsers,
  FaHandshake
} from "react-icons/fa";

const AboutUs = () => {
  const services = [
    {
      icon: <FaHome className="text-3xl" />,
      title: "Architectural Design & 3D Modeling",
      description: "Professional house plans, 3D renders, and visualizations."
    },
    {
      icon: <FaHardHat className="text-3xl" />,
      title: "Construction & Project Management",
      description: "Full-service building solutions from start to finish."
    },
    {
      icon: <FaStore className="text-3xl" />,
      title: "Digital Design Marketplace",
      description: "Browse, purchase, and download ready-made architectural plans."
    },
    {
      icon: <FaComments className="text-3xl" />,
      title: "Consultation Services",
      description: "Expert advice on planning, budgeting, and sustainable construction practices."
    }
  ];

  const whyChooseUs = [
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Experienced Team",
      description: "Skilled architects, engineers, and designers committed to quality."
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Quality Assurance",
      description: "We prioritize precision, durability, and compliance in every project."
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Innovation",
      description: "We integrate technology to make construction more accessible and efficient."
    },
    {
      icon: <FaHandshake className="text-2xl" />,
      title: "Customer Focus",
      description: "We listen, we design, and we build — together with you."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            About <span className="text-yellow-300">MK Construction</span>
          </h1>
          <p className="text-2xl lg:text-3xl font-light mb-8 text-gray-100">
            Building Dreams. Designing the Future.
          </p>
          <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8"></div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-100 rounded-2xl">
                <FaRocket className="text-red-600 text-2xl" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                Our Story
              </h2>
            </div>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                At <span className="font-semibold text-red-600">MK Construction</span>, we believe that every great structure begins with a great idea — and the right plan to bring it to life. For over a decade, we've been at the forefront of innovative construction, architectural design, and project development across Kenya and beyond.
              </p>
              <p>
                From modern homes to commercial spaces, we specialize in creating sustainable, functional, and visually stunning designs tailored to each client's vision and lifestyle. Our team combines technical expertise, creativity, and local insight to deliver construction solutions that stand the test of time.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Vision */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-xl p-8 border border-red-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500 rounded-2xl">
                <FaEye className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To be a trusted leader in modern construction and digital architectural design, empowering individuals and businesses to build better, smarter, and more sustainably.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl p-8 border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-600 rounded-2xl">
                <FaBullseye className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To simplify access to professional construction designs and services through innovation, transparency, and technology, ensuring that anyone can turn their dream project into reality — efficiently and affordably.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              What We Do
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Comprehensive construction and design services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="p-4 bg-red-100 rounded-2xl inline-block group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300 mb-4">
                  <div className="text-red-600 group-hover:text-white">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Discover what sets MK Construction apart in the industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-200 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-500 rounded-xl group-hover:bg-red-600 transition-colors duration-300">
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Promise */}
        <section>
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl shadow-2xl p-8 lg:p-12 text-white text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-2xl">
                <FaAward className="text-3xl text-yellow-300" />
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Our Promise
            </h2>
            <p className="text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto text-gray-100">
              At <span className="font-bold text-yellow-300">MK Construction</span>, we don't just build structures — we build trust, value, and lasting partnerships. Whether you're a homeowner, developer, or architect, we're here to help you design, plan, and build with confidence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started Today
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 border border-white/30">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;