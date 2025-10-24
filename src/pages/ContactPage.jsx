import React, { useState } from "react";
import { 
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaHeadset,
  FaQuestionCircle,
  FaShoppingCart,
  FaFileAlt
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
      });
      
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Our Location",
      details: ["Nairobi, Kenya"],
      color: "from-red-500 to-red-600"
    },
    {
      icon: <FaPhone className="text-3xl" />,
      title: "Phone Number",
      details: ["+254 111 480 349"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email Address",
      details: ["info@mkconstruction.com"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "Support Hours",
      details: ["24/7 Available", "Quick Response Time"],
      color: "from-purple-500 to-purple-600"
    }
  ];

  const supportCategories = [
    {
      icon: <FaShoppingCart className="text-2xl" />,
      title: "Purchase Help",
      description: "Assistance with browsing, selecting, and buying designs"
    },
    {
      icon: <FaFileAlt className="text-2xl" />,
      title: "Download Issues",
      description: "Help with accessing and downloading your purchased files"
    },
    {
      icon: <FaQuestionCircle className="text-2xl" />,
      title: "Design Questions",
      description: "Inquiries about design specifications and customization"
    },
    {
      icon: <FaHeadset className="text-2xl" />,
      title: "Technical Support",
      description: "Platform issues, payment problems, or account help"
    }
  ];

  const faqs = [
    {
      question: "How do I purchase a design?",
      answer: "Browse our collection, click on any design, and hit 'Buy to Unlock'. Choose your payment method (M-Pesa, PayPal, or Stripe) and complete the transaction. You'll get instant access!"
    },
    {
      question: "What file formats do I receive?",
      answer: "Every purchase includes PDF documents, AutoCAD files (.dwg), and high-resolution images—everything you need to start your project."
    },
    {
      question: "Can I download my designs again?",
      answer: "Yes! Once purchased, you have lifetime access. Log into your dashboard anytime to re-download your designs."
    },
    {
      question: "Do you offer design customization?",
      answer: "Absolutely! Contact us after purchasing a design, and our team can customize it to match your specific requirements for an additional fee."
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
            We're Here to Help
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
            Get in <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-2xl lg:text-3xl font-light mb-8 text-gray-300 max-w-4xl mx-auto">
            Have questions? Need support? We're available 24/7 to assist you
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="rgb(254 242 242)"></path>
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Info Cards */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
              >
                <div className={`inline-flex p-4 bg-gradient-to-r ${info.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Support Categories */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              How Can We Help?
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Support Categories
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the category that best matches your inquiry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form and Social */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-200">
                <div className="mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-lg text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="+254 700 000 000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select a category</option>
                        <option value="purchase">Purchase Help</option>
                        <option value="download">Download Issues</option>
                        <option value="design">Design Questions</option>
                        <option value="technical">Technical Support</option>
                        <option value="customization">Design Customization</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                    className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold px-8 py-4 rounded-xl hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : status === 'success' ? (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>

                  {status === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-green-700 font-medium">Thank you! We'll get back to you within 24 hours.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Follow us on social media for updates, design inspiration, and special offers
                </p>
                <div className="space-y-4">
                  <a 
                    href="https://www.facebook.com/share/1FHARkdEPc/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 group border border-white/20"
                  >
                    <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                      <FaFacebookF className="text-xl" />
                    </div>
                    <span className="font-semibold">Facebook</span>
                  </a>
                  <a 
                    href="https://x.com/mkstudioke?t=S1uCFYYQa_nY9AxKkB3dVg&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 group border border-white/20"
                  >
                    <div className="p-2 bg-sky-500 rounded-lg group-hover:scale-110 transition-transform">
                      <FaTwitter className="text-xl" />
                    </div>
                    <span className="font-semibold">Twitter/X</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=r9j9168"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 group border border-white/20"
                  >
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform">
                      <FaInstagram className="text-xl" />
                    </div>
                    <span className="font-semibold">Instagram</span>
                  </a>
                  <a 
                    href="http://tiktok.com/@mk_constr.groupke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 group border border-white/20"
                  >
                    <div className="p-2 bg-black rounded-lg group-hover:scale-110 transition-transform border border-white/10">
                      <FaTiktok className="text-xl" />
                    </div>
                    <span className="font-semibold">TikTok</span>
                  </a>
                  <a 
                    href="#"
                    className="flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-xl transition-all duration-300 group border border-white/20"
                  >
                    <div className="p-2 bg-blue-700 rounded-lg group-hover:scale-110 transition-transform">
                      <FaLinkedinIn className="text-xl" />
                    </div>
                    <span className="font-semibold">LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-xl p-8 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <FaClock className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Quick Response</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We typically respond to all inquiries within <span className="font-bold text-green-700">24 hours</span>. For urgent matters, call us directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
              Common Questions
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common inquiries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-200 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-start">
                  <span className="text-red-500 mr-2">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-6">
                  {faq.answer}
                </p>
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
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Didn't Find What You're Looking For?
              </h2>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                Browse our design collection or check out our comprehensive help center
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
                  Browse Designs
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/30 backdrop-blur-sm flex items-center justify-center">
                  Visit Help Center
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;