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
  FaCheck
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
      popular: true
    },
    {
      id: "card",
      name: "Card",
      icon: FaCreditCard,
      description: "Visa, MasterCard, Amex",
      color: "from-blue-500 to-indigo-600",
      popular: false
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: FaPaypal,
      description: "Secure PayPal checkout",
      color: "from-blue-400 to-cyan-500",
      popular: false
    }
  ];

  if (loading && !design) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-slate-100 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-red-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-red-600 animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!isCartPurchase && !design) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-slate-100 flex items-center justify-center py-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🛒</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">No Items to Purchase</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your cart is empty or the design you're looking for doesn't exist.
            </p>
            {errors.fetch && (
              <div className="bg-red-50 rounded-2xl p-4 border border-red-100 mb-6 max-w-md mx-auto">
                <p className="text-red-700 text-sm">{errors.fetch}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/designs")}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
              >
                Browse Designs
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="bg-gray-100 text-gray-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-slate-100 flex items-center justify-center py-12">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-green-100">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
              <FaCheckCircle className="text-white text-5xl" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">Payment Successful!</h1>
            <p className="text-gray-600 mb-8 text-center max-w-md mx-auto">
              Your design files are ready for download in your dashboard.
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-6 mb-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FaReceipt className="text-red-600 text-lg" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">Order Details</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 text-sm">Order ID</span>
                  <span className="font-semibold text-gray-900">{orderDetails.id}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 text-sm">Transaction ID</span>
                  <span className="font-semibold text-gray-900 font-mono text-xs">{orderDetails.transaction_id}</span>
                </div>
                <div className="flex justify-between items-center py-2 bg-green-50 -mx-3 px-3 rounded-lg">
                  <span className="text-gray-600 text-sm">Amount Paid</span>
                  <span className="font-bold text-green-600 text-lg">KES {orderDetails.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 text-sm">Payment Method</span>
                  <span className="font-semibold text-gray-900 capitalize">{orderDetails.payment_method}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate("/designs")}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-slate-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
              {/* Header */}
              <div className="mb-8">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors font-medium mb-6 group"
                >
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
                <p className="text-gray-600">Complete your purchase safely and securely</p>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`relative border-2 rounded-2xl p-4 transition-all duration-300 text-left ${
                        paymentMethod === method.id
                          ? "border-red-500 bg-gradient-to-br from-red-50 to-red-100/50 shadow-lg shadow-red-500/10"
                          : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
                      }`}
                    >
                      {paymentMethod === method.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <FaCheck className="text-white text-xs" />
                        </div>
                      )}
                      {method.popular && (
                        <span className="absolute -top-2 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-lg">
                          Popular
                        </span>
                      )}
                      <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                        <method.icon className="text-white text-xl" />
                      </div>
                      <div className="font-semibold text-gray-900 mb-1">{method.name}</div>
                      <div className="text-xs text-gray-600">{method.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePayment} className="space-y-6">
                {/* M-Pesa Payment */}
                {paymentMethod === "mpesa" && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                        <FaMobile className="text-white text-lg" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg">M-Pesa Payment</h3>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="0712 345 678 or +254712345678"
                        className={`w-full px-4 py-3.5 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                          errors.phoneNumber ? "border-red-300 bg-red-50" : "border-gray-200"
                        }`}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                          <span className="font-semibold">⚠</span> {errors.phoneNumber}
                        </p>
                      )}
                      <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">ℹ</span>
                          <span>You'll receive an M-Pesa prompt on this number to authorize the payment.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Payment */}
                {paymentMethod === "card" && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <FaCreditCard className="text-white text-lg" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg">Card Information</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                          className={`w-full px-4 py-3.5 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                            errors.cardName ? "border-red-300 bg-red-50" : "border-gray-200"
                          }`}
                        />
                        {errors.cardName && (
                          <p className="text-red-600 text-sm mt-2">⚠ {errors.cardName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className={`w-full px-4 py-3.5 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono ${
                            errors.cardNumber ? "border-red-300 bg-red-50" : "border-gray-200"
                          }`}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-600 text-sm mt-2">⚠ {errors.cardNumber}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                            placeholder="MM/YY"
                            maxLength={5}
                            className={`w-full px-4 py-3.5 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono ${
                              errors.cardExpiry ? "border-red-300 bg-red-50" : "border-gray-200"
                            }`}
                          />
                          {errors.cardExpiry && (
                            <p className="text-red-600 text-sm mt-2">⚠ {errors.cardExpiry}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                            placeholder="123"
                            maxLength={4}
                            className={`w-full px-4 py-3.5 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono ${
                              errors.cardCvv ? "border-red-300 bg-red-50" : "border-gray-200"
                            }`}
                          />
                          {errors.cardCvv && (
                            <p className="text-red-600 text-sm mt-2">⚠ {errors.cardCvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal Payment */}
                {paymentMethod === "paypal" && (
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50/50 rounded-2xl p-6 border border-cyan-200">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-400/25">
                        <FaPaypal className="text-white text-lg" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg">PayPal Account</h3>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PayPal Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        placeholder="your-email@example.com"
                        className={`w-full px-4 py-3.5 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                          errors.paypalEmail ? "border-red-300 bg-red-50" : "border-gray-200"
                        }`}
                      />
                      {errors.paypalEmail && (
                        <p className="text-red-600 text-sm mt-2">⚠ {errors.paypalEmail}</p>
                      )}
                      <div className="mt-3 p-3 bg-white rounded-lg border border-cyan-200">
                        <p className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">ℹ</span>
                          <span>You'll be redirected to PayPal to complete your secure payment.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                      <FaShieldAlt className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Secure & Encrypted</h4>
                      <p className="text-sm text-gray-700">
                        Your payment is protected with 256-bit SSL encryption. We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>

                {errors.payment && (
                  <div className="bg-red-50 rounded-2xl p-5 border-2 border-red-200 animate-shake">
                    <div className="flex items-start gap-3">
                      <span className="text-red-600 text-xl flex-shrink-0">⚠</span>
                      <div>
                        <h4 className="font-semibold text-red-900 mb-1">Payment Failed</h4>
                        <p className="text-red-700 text-sm">{errors.payment}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-3 group"
                >
                  {processing ? (
                    <>
                      <FaSyncAlt className="animate-spin text-xl" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <FaLock className="group-hover:scale-110 transition-transform" />
                      <span>Pay KES {calculateTotal().toLocaleString()}</span>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-600">
                  By completing this purchase, you agree to our Terms of Service
                </p>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 lg:sticky lg:top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {designs.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 shadow-inner">
                      <img
                        src={item.preview_url || item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{item.title}</h3>
                      <p className="text-gray-600 text-xs capitalize">{item.category}</p>
                      <p className="text-red-600 font-bold text-sm mt-1">KES {item.price?.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t-2 border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">KES {calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span className="font-medium">KES 0</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (16% VAT)</span>
                  <span className="font-medium">KES 0</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 border-t-2 border-gray-200 pt-4">
                  <span>Total</span>
                  <span className="text-red-600">KES {calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-green-50 py-3 px-4 rounded-xl border border-green-200">
                  <FaLock className="text-green-600" />
                  <span className="font-medium">Secure SSL Encryption</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="font-semibold text-gray-900">30-Day</div>
                    <div>Money Back</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="font-semibold text-gray-900">Instant</div>
                    <div>Download</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="font-semibold text-gray-900">24/7</div>
                    <div>Support</div>
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