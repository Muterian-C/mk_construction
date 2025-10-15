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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/50 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-purple-600 rounded-full animate-pulse mx-auto mb-6"></div>
            <div className="absolute inset-0 border-4 border-red-200/30 rounded-full animate-spin"></div>
          </div>
          <h3 className="text-white text-xl font-semibold mb-2">Preparing Your Checkout</h3>
          <p className="text-red-200">Securing your payment experience...</p>
        </div>
      </div>
    );
  }

  if (!isCartPurchase && !design) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/50 to-purple-900 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center border border-white/20 shadow-2xl">
            <div className="w-32 h-32 bg-gradient-to-br from-red-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
              <span className="text-6xl">🎨</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Design Not Found</h1>
            <p className="text-red-200 text-lg mb-8 max-w-md mx-auto">
              The design you're looking for is no longer available or doesn't exist.
            </p>
            {errors.fetch && (
              <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-4 border border-red-400/30 mb-8 max-w-md mx-auto">
                <p className="text-red-200 text-sm">{errors.fetch}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/designs")}
                className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Explore Designs
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/50 to-purple-900 flex items-center justify-center p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
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
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaReceipt className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-xl">Order Confirmed</h3>
                  <p className="text-red-200">Thank you for your purchase</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-red-200">Order ID</span>
                  <span className="font-mono text-white font-semibold">{orderDetails.id}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-red-200">Transaction</span>
                  <span className="font-mono text-white text-sm">{orderDetails.transaction_id}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10 bg-gradient-to-r from-green-500/10 to-emerald-500/10 -mx-4 px-4">
                  <span className="text-red-200">Amount Paid</span>
                  <span className="font-bold text-emerald-400 text-xl">KES {orderDetails.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-red-200">Payment Method</span>
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
                className="flex-1 bg-gradient-to-r from-red-500 to-purple-600 text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate("/designs")}
                className="flex-1 bg-white/10 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/50 to-purple-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"></div>
      
      <div className="relative z-10 py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Payment Section */}
            <div className="lg:w-2/3">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
                {/* Header */}
                <div className="mb-8">
                  <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-3 text-red-200 hover:text-white transition-all duration-300 font-medium mb-6 group"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span>Back to {isCartPurchase ? 'Cart' : 'Design'}</span>
                  </button>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <FaLock className="text-white text-xl" />
                    </div>
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">Secure Checkout</h1>
                      <p className="text-red-200">Complete your purchase with confidence</p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-6">Choose Payment Method</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`relative p-5 rounded-2xl transition-all duration-500 text-left group overflow-hidden ${
                          paymentMethod === method.id
                            ? "bg-gradient-to-br from-white/20 to-white/10 border-2 border-white/30 shadow-2xl shadow-purple-500/25 transform scale-105"
                            : "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-lg"
                        }`}
                      >
                        {/* Background Glow */}
                        {paymentMethod === method.id && (
                          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-600/10 animate-pulse"></div>
                        )}
                        
                        {/* Badge */}
                        {method.badge && (
                          <span className="absolute -top-2 left-4 bg-gradient-to-r from-red-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                            {method.badge}
                          </span>
                        )}
                        
                        {/* Checkmark */}
                        {paymentMethod === method.id && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                            <FaCheck className="text-white text-xs" />
                          </div>
                        )}

                        <div className="relative z-10">
                          <div className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                            <method.icon className="text-white text-2xl" />
                          </div>
                          
                          <div className="font-bold text-white text-lg mb-2">{method.name}</div>
                          <div className="text-red-200 text-sm mb-3">{method.description}</div>
                          
                          {/* Features */}
                          <div className="flex flex-wrap gap-1">
                            {method.features.map((feature, idx) => (
                              <span key={idx} className="text-xs bg-white/10 text-red-200 px-2 py-1 rounded-full">
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
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* M-Pesa Payment */}
                  {paymentMethod === "mpesa" && (
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-400/20">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <FaMobile className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-xl">M-Pesa Payment</h3>
                          <p className="text-emerald-200">Instant & secure mobile payment</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="0712 345 678 or +254712345678"
                          className={`w-full px-4 py-4 bg-white/5 border-2 rounded-2xl text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.phoneNumber ? "border-red-400 bg-red-500/10" : "border-white/10 focus:border-green-400"
                          }`}
                        />
                        {errors.phoneNumber && (
                          <p className="text-red-300 text-sm mt-2 flex items-center gap-2">
                            <span>⚠</span> {errors.phoneNumber}
                          </p>
                        )}
                        
                        <div className="mt-4 p-4 bg-white/5 rounded-xl border border-emerald-400/20">
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
                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-blue-400/20">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <FaCreditCard className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-xl">Card Payment</h3>
                          <p className="text-blue-200">Secure credit/debit card payment</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-white font-medium mb-3">
                            Cardholder Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="John Doe"
                            className={`w-full px-4 py-4 bg-white/5 border-2 rounded-2xl text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                              errors.cardName ? "border-red-400 bg-red-500/10" : "border-white/10 focus:border-blue-400"
                            }`}
                          />
                          {errors.cardName && <p className="text-red-300 text-sm mt-2">⚠ {errors.cardName}</p>}
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-3">
                            Card Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className={`w-full px-4 py-4 bg-white/5 border-2 rounded-2xl text-white placeholder-red-300 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                              errors.cardNumber ? "border-red-400 bg-red-500/10" : "border-white/10 focus:border-blue-400"
                            }`}
                          />
                          {errors.cardNumber && <p className="text-red-300 text-sm mt-2">⚠ {errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white font-medium mb-3">
                              Expiry Date <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                              placeholder="MM/YY"
                              maxLength={5}
                              className={`w-full px-4 py-4 bg-white/5 border-2 rounded-2xl text-white placeholder-red-300 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                errors.cardExpiry ? "border-red-400 bg-red-500/10" : "border-white/10 focus:border-blue-400"
                              }`}
                            />
                            {errors.cardExpiry && <p className="text-red-300 text-sm mt-2">⚠ {errors.cardExpiry}</p>}
                          </div>

                          <div>
                            <label className="block text-white font-medium mb-3">
                              CVV <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                              placeholder="123"
                              maxLength={4}
                              className={`w-full px-4 py-4 bg-white/5 border-2 rounded-2xl text-white placeholder-red-300 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                errors.cardCvv ? "border-red-400 bg-red-500/10" : "border-white/10 focus:border-blue-400"
                              }`}
                            />
                            {errors.cardCvv && <p className="text-red-300 text-sm mt-2">⚠ {errors.cardCvv}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal Payment */}
                  {paymentMethod === "paypal" && (
                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-400/20">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <FaPaypal className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-xl">PayPal</h3>
                          <p className="text-cyan-200">Global payments with buyer protection</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-3">
                          PayPal Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          placeholder="your-email@example.com"
                          className={`w-full px-4 py-4 bg-white/5 border-2 rounded-2xl text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${
                            errors.paypalEmail ? "border-red-400 bg-red-500/10" : "border-white/10 focus:border-cyan-400"
                          }`}
                        />
                        {errors.paypalEmail && <p className="text-red-300 text-sm mt-2">⚠ {errors.paypalEmail}</p>}
                        
                        <div className="mt-4 p-4 bg-white/5 rounded-xl border border-cyan-400/20">
                          <p className="text-cyan-200 text-sm flex items-start gap-3">
                            <FaShieldAlt className="text-cyan-400 mt-0.5 flex-shrink-0" />
                            <span>You'll be redirected to PayPal's secure platform to complete your payment with buyer protection.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Assurance */}
                  <div className="bg-gradient-to-r from-red-500/10 to-purple-600/10 rounded-2xl p-6 border border-red-400/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <FaShieldAlt className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-2">Bank-Level Security</h4>
                        <p className="text-red-200 text-sm">
                          Your payment is protected with 256-bit SSL encryption. We never store your sensitive card details. 
                          All transactions are processed through PCI-DSS compliant payment processors.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Errors */}
                  {errors.payment && (
                    <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-400/30 animate-shake">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xl">⚠</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-1">Payment Issue</h4>
                          <p className="text-red-200">{errors.payment}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-gradient-to-r from-red-500 to-purple-600 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-4 group relative overflow-hidden"
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {processing ? (
                      <>
                        <FaSyncAlt className="animate-spin text-xl relative z-10" />
                        <span className="relative z-10">Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <FaLock className="group-hover:scale-110 transition-transform relative z-10" />
                        <span className="relative z-10">Pay KES {calculateTotal().toLocaleString()}</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-red-300 text-sm">
                    By completing this purchase, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl lg:sticky lg:top-8">
                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

                {/* Design Items */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {designs.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/10 shadow-inner group-hover:shadow-lg transition-shadow">
                        <img
                          src={item.preview_url || item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-sm line-clamp-1">{item.title}</h3>
                        <p className="text-red-300 text-xs capitalize mb-1">{item.category}</p>
                        <p className="text-red-400 font-bold text-sm">KES {item.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t-2 border-white/10 pt-4 mb-6">
                  <div className="flex justify-between text-red-200">
                    <span>Subtotal</span>
                    <span className="font-semibold">KES {calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-red-200">
                    <span>Service Fee</span>
                    <span className="font-semibold text-green-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-red-200">
                    <span>Tax (VAT)</span>
                    <span className="font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-white border-t-2 border-white/10 pt-4">
                    <span>Total</span>
                    <span className="text-red-400">KES {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3 text-sm text-white bg-green-500/20 py-3 px-4 rounded-xl border border-green-400/30">
                    <FaLock className="text-green-400" />
                    <span className="font-semibold">256-bit SSL Encrypted</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <FaAward className="text-yellow-400 mx-auto mb-1" />
                      <div className="font-semibold text-white text-xs">Quality</div>
                      <div className="text-red-300 text-xs">Guaranteed</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <FaDownload className="text-green-400 mx-auto mb-1" />
                      <div className="font-semibold text-white text-xs">Instant</div>
                      <div className="text-red-300 text-xs">Download</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <FaHeadset className="text-blue-400 mx-auto mb-1" />
                      <div className="font-semibold text-white text-xs">24/7</div>
                      <div className="text-red-300 text-xs">Support</div>
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