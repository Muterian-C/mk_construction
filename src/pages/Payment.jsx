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
  FaReceipt
} from "react-icons/fa";

const PaymentPage = () => {
  const { id } = useParams(); // For single design purchase
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

  // Check if it's cart purchase or single design purchase
  const isCartPurchase = location.pathname.includes('cart');
  const designs = isCartPurchase ? cartItems : (design ? [design] : []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (isCartPurchase) {
      // For cart purchases, use cart items
      setLoading(false);
    } else if (id) {
      // For single design purchase, fetch design details
      fetchDesignDetails();
    }
  }, [id, isCartPurchase, isAuthenticated, navigate, location]);

  const fetchDesignDetails = async () => {
    try {
      const response = await axios.get(`/api/designs/${id}`);
      setDesign(response.data);
    } catch (error) {
      console.error("Error fetching design:", error);
      alert("Error loading design details");
      navigate("/designs");
    } finally {
      setLoading(false);
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
      
      // Basic card validation
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

      // Add payment method specific data
      if (paymentMethod === "mpesa") {
        paymentData.phone_number = phoneNumber;
      } else if (paymentMethod === "card") {
        paymentData.card_details = cardDetails;
      } else if (paymentMethod === "paypal") {
        paymentData.paypal_email = paypalEmail;
      }

      // Call the actual backend API
      const response = await axios.post("/api/payments/process", paymentData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setSuccess(true);
        setOrderDetails(response.data.order);
        
        // Clear cart if this was a cart purchase
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
      description: "Pay via M-Pesa. You'll receive a prompt on your phone.",
      color: "from-green-500 to-emerald-600",
      popular: true
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: FaCreditCard,
      description: "Pay securely with your Visa, MasterCard, or American Express.",
      color: "from-blue-500 to-indigo-600",
      popular: false
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: FaPaypal,
      description: "Pay with your PayPal account or credit card through PayPal.",
      color: "from-blue-400 to-cyan-500",
      popular: false
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (success && orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 py-12">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-200 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-green-600 text-4xl" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your design files are now available for download.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaReceipt className="text-red-600" />
                Order Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-semibold">{orderDetails.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-semibold">{orderDetails.transaction_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-semibold text-green-600">KES {orderDetails.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold capitalize">{orderDetails.payment_method}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-red-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-red-700 transition-all duration-300"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate("/designs")}
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-300 transition-all duration-300"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors font-semibold"
                >
                  <FaArrowLeft />
                  Back
                </button>
                <h1 className="text-3xl font-bold text-gray-800">Complete Payment</h1>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Payment Method</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                        paymentMethod === method.id
                          ? `border-red-500 bg-red-50 ring-2 ring-red-200`
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`bg-gradient-to-r ${method.color} text-white p-2 rounded-xl`}>
                            <method.icon className="text-lg" />
                          </div>
                          <span className="font-semibold text-gray-800">{method.name}</span>
                        </div>
                        {method.popular && (
                          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePayment} className="space-y-6">
                {/* M-Pesa Payment */}
                {paymentMethod === "mpesa" && (
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaMobile className="text-green-600" />
                      M-Pesa Details
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g., 0712 345 678 or +254712345678"
                        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors.phoneNumber ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">
                        You'll receive an M-Pesa prompt on this number to complete the payment.
                      </p>
                    </div>
                  </div>
                )}

                {/* Card Payment */}
                {paymentMethod === "card" && (
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaCreditCard className="text-blue-600" />
                      Card Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Full name as shown on card"
                          className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cardName ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.cardName && (
                          <p className="text-red-600 text-sm mt-1">{errors.cardName}</p>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cardNumber ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cardExpiry ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.cardExpiry && (
                          <p className="text-red-600 text-sm mt-1">{errors.cardExpiry}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                          placeholder="123"
                          maxLength={4}
                          className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cardCvv ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.cardCvv && (
                          <p className="text-red-600 text-sm mt-1">{errors.cardCvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal Payment */}
                {paymentMethod === "paypal" && (
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaPaypal className="text-blue-400" />
                      PayPal Details
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PayPal Email *
                      </label>
                      <input
                        type="email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        placeholder="your-email@example.com"
                        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                          errors.paypalEmail ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.paypalEmail && (
                        <p className="text-red-600 text-sm mt-1">{errors.paypalEmail}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">
                        You'll be redirected to PayPal to complete your payment.
                      </p>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <FaShieldAlt className="text-blue-600 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Secure Payment</h4>
                      <p className="text-blue-700 text-sm mt-1">
                        Your payment information is encrypted and secure. We do not store your card details.
                      </p>
                    </div>
                  </div>
                </div>

                {errors.payment && (
                  <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
                    <p className="text-red-700 text-sm">{errors.payment}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {processing ? (
                    <>
                      <FaSyncAlt className="animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <FaLock />
                      Pay KES {calculateTotal().toLocaleString()}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {designs.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <img
                      src={item.preview_url || item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 text-sm line-clamp-1">{item.title}</h3>
                      <p className="text-gray-600 text-xs">{item.category}</p>
                      <p className="text-red-600 font-semibold text-sm">KES {item.price?.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>KES {calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span>KES 0</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>KES 0</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-800 border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span className="text-red-600">KES {calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <FaLock className="text-green-600" />
                  Secure SSL Encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;