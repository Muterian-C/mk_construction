// src/pages/PaymentPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import axios from "../api/axios";
import {
  FaCreditCard,
  FaMobile,
  FaPaypal,
  FaLock,
  FaCheckCircle,
  FaArrowLeft,
  FaShieldAlt,
  FaSyncAlt,
  FaReceipt,
  FaCheck,
  FaStar,
  FaDownload,
  FaHeadset,
  FaAward
} from "react-icons/fa";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, token } = useAuth();
  const { cartItems, clearCart } = useCart();

  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [paypalEmail, setPaypalEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const isCartPurchase = location.pathname.includes('/checkout/cart');
  const designs = isCartPurchase ? cartItems : (design ? [design] : []);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (location.pathname.includes('/checkout/cart')) {
      setLoading(false);
    } else if (id) {
      fetchDesignDetails();
    } else {
      setLoading(false);
    }
  }, [id, isAuthenticated, navigate, location, cartItems]);

  const fetchDesignDetails = async () => {
    try {
      const response = await axios.get(`/api/designs/${id}`);
      setDesign(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching design:", error);
      setLoading(false);
      setErrors({ fetch: `Failed to load design: ${error.response?.data?.error || error.message}` });
    }
  };

  const calculateTotal = () => {
    return designs.reduce((total, item) => total + (item.price || 0), 0);
  };

  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === "mpesa") {
      if (!phoneNumber.trim()) {
        newErrors.phoneNumber = "Phone number is required";
      } else if (!/^(\+254|0)[17]\d{8}$/.test(phoneNumber.replace(/\s/g, ''))) {
        newErrors.phoneNumber = "Please enter a valid Kenyan phone number";
      }
    } else if (paymentMethod === "card") {
      if (!cardDetails.number.trim()) newErrors.cardNumber = "Card number is required";
      if (!cardDetails.expiry.trim()) newErrors.cardExpiry = "Expiry date is required";
      if (!cardDetails.cvv.trim()) newErrors.cardCvv = "CVV is required";
      if (!cardDetails.name.trim()) newErrors.cardName = "Cardholder name is required";

      if (cardDetails.number && !/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }
      if (cardDetails.cvv && !/^\d{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cardCvv = "Please enter a valid CVV";
      }
    } else if (paymentMethod === "paypal") {
      if (!paypalEmail.trim()) {
        newErrors.paypalEmail = "PayPal email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail)) {
        newErrors.paypalEmail = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setProcessing(true);
    setErrors({});

    try {
      const paymentData = {
        payment_method: paymentMethod,
        amount: calculateTotal(),
        items: designs.map(item => ({
          design_id: item.id,
          title: item.title,
          price: item.price
        }))
      };

      if (paymentMethod === "mpesa") {
        paymentData.phone_number = phoneNumber;
      } else if (paymentMethod === "card") {
        paymentData.card_details = cardDetails;
      } else if (paymentMethod === "paypal") {
        paymentData.paypal_email = paypalEmail;
      }

      const response = await axios.post("/api/payments/process", paymentData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setSuccess(true);
        setOrderDetails(response.data.order);

        if (isCartPurchase) {
          clearCart();
        }
      } else {
        setErrors({ payment: response.data.error || "Payment failed. Please try again." });
      }
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage = error.response?.data?.error || "Payment processing failed. Please try again.";
      setErrors({ payment: errorMessage });
    } finally {
      setProcessing(false);
    }
  };

  const paymentMethods = [
    {
      id: "mpesa",
      name: "M-Pesa",
      icon: FaMobile,
      description: "Instant payment via M-Pesa",
      color: "from-green-500 to-emerald-600",
      badge: "Most Popular",
      features: ["Instant", "Secure", "No Fees"]
    },
    {
      id: "card",
      name: "Credit Card",
      icon: FaCreditCard,
      description: "Visa, MasterCard, American Express",
      color: "from-blue-500 to-indigo-600",
      badge: "Secure",
      features: ["256-bit SSL", "Visa Secure", "3D Secure"]
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: FaPaypal,
      description: "Global payments & buyer protection",
      color: "from-blue-400 to-cyan-500",
      badge: "Global",
      features: ["Buyer Protection", "Instant", "Global"]
    }
  ];

  if (loading && !design) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full animate-pulse mx-auto mb-6"></div>
            <div className="absolute inset-0 border-4 border-slate-600/30 rounded-full animate-spin"></div>
          </div>
          <h3 className="text-white text-xl font-semibold mb-2">Preparing Your Checkout</h3>
          <p className="text-slate-300">Securing your payment experience...</p>
        </div>
      </div>
    );
  }

  if (!isCartPurchase && !design) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-white/8 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/15 shadow-2xl">
            <div className="w-32 h-32 bg-gradient-to-br from-slate-600/20 to-slate-700/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
              <span className="text-6xl">🎨</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Design Not Found</h1>
            <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto">
              The design you're looking for is no longer available or doesn't exist.
            </p>
            {errors.fetch && (
              <div className="bg-red-500/15 backdrop-blur-sm rounded-2xl p-4 border border-red-400/25 mb-8 max-w-md mx-auto">
                <p className="text-red-200 text-sm">{errors.fetch}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/designs")}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 hover:brightness-110"
              >
                Explore Designs
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="bg-white/15 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/25 transition-all duration-300 border border-white/20 hover:border-white/30 hover:shadow-lg"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success && orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 flex items-center justify-center p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white/8 backdrop-blur-xl rounded-3xl p-10 border border-white/15 shadow-2xl relative overflow-hidden">
            {/* Animated Success Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 opacity-20 animate-pulse"></div>
            <div className="absolute inset-[2px] rounded-3xl bg-slate-950"></div>
            
            <div className="relative z-10">
              {/* Animated Success Icon */}
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/25 animate-bounce">
                  <FaCheckCircle className="text-white text-6xl" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-green-400/30 animate-ping"></div>
              </div>

              <h1 className="text-4xl font-bold text-white text-center mb-4">Payment Successful!</h1>
              <p className="text-emerald-200 text-lg text-center mb-8 max-w-md mx-auto">
                Your design files are ready for instant download in your dashboard.
              </p>

              {/* Order Details Card */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                    <FaReceipt className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl">Order Confirmed</h3>
                    <p className="text-slate-300">Thank you for your purchase</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-300">Order ID</span>
                    <span className="font-mono text-white font-semibold">{orderDetails.id}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-300">Transaction</span>
                    <span className="font-mono text-white text-sm">{orderDetails.transaction_id}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10 bg-gradient-to-r from-green-500/10 to-emerald-500/10 -mx-4 px-4">
                    <span className="text-slate-300">Amount Paid</span>
                    <span className="font-bold text-emerald-400 text-xl">KES {orderDetails.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-300">Payment Method</span>
                    <span className="text-white font-semibold capitalize bg-white/10 px-3 py-1 rounded-full">
                      {orderDetails.payment_method}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 hover:brightness-110"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => navigate("/designs")}
                  className="flex-1 bg-white/15 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white/25 transition-all duration-300 border border-white/20 hover:border-white/30 hover:shadow-lg"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800/10 via-slate-900 to-slate-950"></div>
      
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Payment Section */}
            <div className="lg:w-2/3">
              <div className="bg-white/8 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
                {/* Header */}
                <div className="mb-10">
                  <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 font-medium mb-8 group"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all group-hover:shadow-lg">
                      <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span className="font-medium">Back to {isCartPurchase ? 'Cart' : 'Design'}</span>
                  </button>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <FaLock className="text-white text-xl" />
                    </div>
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">Secure Checkout</h1>
                      <p className="text-slate-300 text-lg">Complete your purchase with confidence</p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold text-white mb-8 tracking-tight">Choose Payment Method</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`relative p-6 rounded-2xl transition-all duration-500 text-left group overflow-hidden ${
                          paymentMethod === method.id
                            ? "bg-gradient-to-br from-white/15 to-white/8 border-2 border-white/25 shadow-2xl shadow-blue-500/15 transform scale-105"
                            : "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 hover:shadow-xl"
                        }`}
                      >
                        {/* Background Glow */}
                        {paymentMethod === method.id && (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 animate-pulse"></div>
                        )}
                        
                        {/* Badge */}
                        {method.badge && (
                          <span className="absolute -top-2 left-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                            {method.badge}
                          </span>
                        )}
                        
                        {/* Checkmark */}
                        {paymentMethod === method.id && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                            <FaCheck className="text-white text-xs" />
                          </div>
                        )}

                        <div className="relative z-10">
                          <div className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <method.icon className="text-white text-2xl" />
                          </div>
                          
                          <div className="font-bold text-white text-lg mb-3 tracking-tight">{method.name}</div>
                          <div className="text-slate-300 text-sm mb-4 leading-relaxed">{method.description}</div>
                          
                          {/* Features */}
                          <div className="flex flex-wrap gap-2">
                            {method.features.map((feature, idx) => (
                              <span key={idx} className="text-xs bg-white/10 text-slate-300 px-2 py-1 rounded-full">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handlePayment} className="space-y-8">
                  {/* M-Pesa Payment */}
                  {paymentMethod === "mpesa" && (
                    <div className="bg-gradient-to-br from-green-500/8 to-emerald-500/8 rounded-2xl p-7 border border-emerald-500/20">
                      <div className="flex items-center gap-4 mb-7">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <FaMobile className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-xl mb-1 tracking-tight">M-Pesa Payment</h3>
                          <p className="text-emerald-200">Instant & secure mobile payment</p>
                        </div>
                      </div>                      
                      <div>
                        <label className="block text-white font-semibold mb-4 tracking-tight">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="0712 345 678 or +254712345678"
                          className={`w-full px-5 py-4 bg-white/6 border-2 rounded-2xl text-black placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-green-400 focus:ring-offset-2 focus:border-transparent transition-all duration-300 ${
                            errors.phoneNumber ? "border-red-400 bg-red-500/10" : "border-white/15 focus:border-green-400"
                          }`}
                        />
                        {errors.phoneNumber && (
                          <p className="text-red-300 text-sm mt-3 flex items-center gap-2">
                            <span>⚠</span> {errors.phoneNumber}
                          </p>
                        )}
                        
                        <div className="mt-5 p-4 bg-white/6 rounded-xl border border-emerald-400/20">
                          <p className="text-emerald-200 text-sm flex items-start gap-3">
                            <FaCheckCircle className="text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>You'll receive an M-Pesa prompt to authorize this payment instantly.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Payment */}
                  {paymentMethod === "card" && (
                    <div className="bg-gradient-to-br from-blue-500/8 to-indigo-500/8 rounded-2xl p-7 border border-blue-500/20">
                      <div className="flex items-center gap-4 mb-7">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <FaCreditCard className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-xl mb-1 tracking-tight">Card Payment</h3>
                          <p className="text-blue-200">Secure credit/debit card payment</p>
                        </div>
                      </div>
                      
                      <div className="space-y-5">
                        <div>
                          <label className="block text-white font-semibold mb-4 tracking-tight">
                            Cardholder Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="John Doe"
                            className={`w-full px-5 py-4 bg-white/6 border-2 rounded-2xl text-black placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2 focus:border-transparent transition-all duration-300 ${
                              errors.cardName ? "border-red-400 bg-red-500/10" : "border-white/15 focus:border-blue-400"
                            }`}
                          />
                          {errors.cardName && <p className="text-red-300 text-sm mt-3">⚠ {errors.cardName}</p>}
                        </div>

                        <div>
                          <label className="block text-white font-semibold mb-4 tracking-tight">
                            Card Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className={`w-full px-5 py-4 bg-white/6 border-2 rounded-2xl text-black placeholder-slate-400 font-mono focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2 focus:border-transparent transition-all duration-300 ${
                              errors.cardNumber ? "border-red-400 bg-red-500/10" : "border-white/15 focus:border-blue-400"
                            }`}
                          />
                          {errors.cardNumber && <p className="text-red-300 text-sm mt-3">⚠ {errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label className="block text-white font-semibold mb-4 tracking-tight">
                              Expiry Date <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                              placeholder="MM/YY"
                              maxLength={5}
                              className={`w-full px-5 py-4 bg-white/6 border-2 rounded-2xl text-black placeholder-slate-400 font-mono focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2 focus:border-transparent transition-all duration-300 ${
                                errors.cardExpiry ? "border-red-400 bg-red-500/10" : "border-white/15 focus:border-blue-400"
                              }`}
                            />
                            {errors.cardExpiry && <p className="text-red-300 text-sm mt-3">⚠ {errors.cardExpiry}</p>}
                          </div>

                          <div>
                            <label className="block text-white font-semibold mb-4 tracking-tight">
                              CVV <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                              placeholder="123"
                              maxLength={4}
                              className={`w-full px-5 py-4 bg-white/6 border-2 rounded-2xl text-black placeholder-slate-400 font-mono focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2 focus:border-transparent transition-all duration-300 ${
                                errors.cardCvv ? "border-red-400 bg-red-500/10" : "border-white/15 focus:border-blue-400"
                              }`}
                            />
                            {errors.cardCvv && <p className="text-red-300 text-sm mt-3">⚠ {errors.cardCvv}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal Payment */}
                  {paymentMethod === "paypal" && (
                    <div className="bg-gradient-to-br from-cyan-500/8 to-blue-500/8 rounded-2xl p-7 border border-cyan-500/20">
                      <div className="flex items-center gap-4 mb-7">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <FaPaypal className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-xl mb-1 tracking-tight">PayPal</h3>
                          <p className="text-cyan-200">Global payments with buyer protection</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white font-semibold mb-4 tracking-tight">
                          PayPal Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          placeholder="your-email@example.com"
                          className={`w-full px-5 py-4 bg-white/6 border-2 rounded-2xl text-black placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-cyan-400 focus:ring-offset-2 focus:border-transparent transition-all duration-300 ${
                            errors.paypalEmail ? "border-red-400 bg-red-500/10" : "border-white/15 focus:border-cyan-400"
                          }`}
                        />
                        {errors.paypalEmail && <p className="text-red-300 text-sm mt-3">⚠ {errors.paypalEmail}</p>}
                        
                        <div className="mt-5 p-4 bg-white/6 rounded-xl border border-cyan-400/20">
                          <p className="text-cyan-200 text-sm flex items-start gap-3">
                            <FaShieldAlt className="text-cyan-400 mt-0.5 flex-shrink-0" />
                            <span>You'll be redirected to PayPal's secure platform to complete your payment with buyer protection.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Assurance */}
                  <div className="bg-gradient-to-r from-blue-500/8 to-indigo-600/8 rounded-2xl p-7 border border-blue-500/20">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <FaShieldAlt className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-3 tracking-tight">Bank-Level Security</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Your payment is protected with 256-bit SSL encryption. We never store your sensitive card details. 
                          All transactions are processed through PCI-DSS compliant payment processors.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Errors */}
                  {errors.payment && (
                    <div className="bg-red-500/15 backdrop-blur-sm rounded-2xl p-7 border-2 border-red-400/25 animate-pulse">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xl">⚠</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-2 tracking-tight">Payment Issue</h4>
                          <p className="text-red-200 leading-relaxed">{errors.payment}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-4 group relative overflow-hidden hover:brightness-110"
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {processing ? (
                      <>
                        <FaSyncAlt className="animate-spin text-xl relative z-10" />
                        <span className="relative z-10 tracking-tight">Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <FaLock className="group-hover:scale-110 transition-transform duration-300 relative z-10" />
                        <span className="relative z-10 tracking-tight">Pay KES {calculateTotal().toLocaleString()}</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-slate-400 text-sm leading-relaxed">
                    By completing this purchase, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white/8 backdrop-blur-xl rounded-3xl p-7 border border-white/15 shadow-2xl lg:sticky lg:top-8">
                <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">Order Summary</h2>

                {/* Design Items */}
                <div className="space-y-5 mb-8 max-h-80 overflow-y-auto pr-2">
                  {designs.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white/6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group hover:shadow-lg">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/10 shadow-inner group-hover:shadow-lg transition-all duration-300">
                        <img
                          src={item.preview_url || item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1 tracking-tight">{item.title}</h3>
                        <p className="text-slate-300 text-xs capitalize mb-2">{item.category}</p>
                        <p className="text-blue-400 font-bold text-sm">KES {item.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 border-t-2 border-white/10 pt-6 mb-8">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span className="font-semibold">KES {calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Service Fee</span>
                    <span className="font-semibold text-green-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Tax (VAT)</span>
                    <span className="font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-white border-t-2 border-white/10 pt-4">
                    <span>Total</span>
                    <span className="text-blue-400">KES {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="space-y-5">
                  <div className="flex items-center justify-center gap-3 text-sm text-white bg-green-500/15 py-3 px-4 rounded-xl border border-green-400/25">
                    <FaLock className="text-green-400" />
                    <span className="font-semibold tracking-tight">256-bit SSL Encrypted</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-white/6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                      <FaAward className="text-yellow-400 mx-auto mb-2 text-lg" />
                      <div className="font-semibold text-white text-xs tracking-tight">Quality</div>
                      <div className="text-slate-300 text-xs">Guaranteed</div>
                    </div>
                    <div className="p-3 bg-white/6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                      <FaDownload className="text-green-400 mx-auto mb-2 text-lg" />
                      <div className="font-semibold text-white text-xs tracking-tight">Instant</div>
                      <div className="text-slate-300 text-xs">Download</div>
                    </div>
                    <div className="p-3 bg-white/6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                      <FaHeadset className="text-blue-400 mx-auto mb-2 text-lg" />
                      <div className="font-semibold text-white text-xs tracking-tight">24/7</div>
                      <div className="text-slate-300 text-xs">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;