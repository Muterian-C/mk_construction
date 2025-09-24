import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaArrowLeft, FaCreditCard, FaEye } from "react-icons/fa";

export default function CartPage() {
  const { cart, loading, removeFromCart } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 via-black to-red-800 text-white py-16 lg:py-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="container relative mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Your <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Cart</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200">
              Your architectural design collection awaits. Add premium designs to your cart and unlock them with secure payment.
            </p>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgb(249 250 251)"></path>
            </svg>
          </div>
        </section>

        {/* Empty Cart Content */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShoppingCart className="text-6xl text-red-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 text-lg">Start shopping to add premium architectural designs to your cart</p>
              <Link 
                to="/designs" 
                className="group/btn inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 px-8 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-400/25"
              >
                <FaEye className="mr-2" />
                Browse Designs
                <span className="group-hover/btn:translate-x-1 transition-transform duration-300 ml-2">→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-black to-red-800 text-white py-16 lg:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container relative mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Your <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Cart</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200">
            Review your selected designs. {cart.length} premium architectural {cart.length === 1 ? 'design' : 'designs'} ready for purchase.
          </p>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgb(249 250 251)"></path>
          </svg>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Cart Items ({cart.length})
                    </h2>
                    <div className="flex items-center gap-2 text-red-600">
                      <FaShoppingCart className="text-xl" />
                      <span className="font-semibold">Total: KES {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-all duration-300 group">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Design Image */}
                        <Link
                          to={`/designs/${item.id}`}
                          className="relative overflow-hidden rounded-2xl shadow-md flex-shrink-0"
                        >
                          <img
                            src={item.preview_url}
                            alt={item.title}
                            className="w-32 h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl"></div>
                        </Link>
                        
                        {/* Design Info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/designs/${item.design_id}`}
                            className="group/title block mb-3"
                          >
                            <h3 className="text-xl font-bold text-gray-800 group-hover/title:text-red-600 transition-colors line-clamp-1">
                              {item.title}
                            </h3>
                          </Link>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {item.description || "Premium architectural design available for instant download."}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
                              {item.category || "Architectural"}
                            </span>
                            <span>Digital Download</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-red-600">
                              KES {item.price.toLocaleString()}
                            </span>
                            
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="group/remove flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-2xl font-medium transition-all duration-300"
                            >
                              <FaTrash className="group-hover/remove:scale-110 transition-transform" />
                              Remove
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <Link 
                to="/designs" 
                className="group/continue w-full bg-white hover:bg-gray-50 text-gray-800 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-200 flex items-center justify-center gap-2"
              >
                <FaArrowLeft className="group-hover/continue:-translate-x-1 transition-transform" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 sticky top-6 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Summary</h2>
                  <p className="text-gray-600">{cart.length} item{cart.length !== 1 ? 's' : ''} in cart</p>
                </div>

                <div className="p-6">
                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>KES {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Platform Fee</span>
                      <span>KES 0</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>Included</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-800">
                        <span>Total</span>
                        <span className="text-red-600">KES {total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="group/checkout w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-400/25 flex items-center justify-center gap-2">
                    <FaCreditCard />
                    Proceed to Checkout
                    <span className="group-hover/checkout:translate-x-1 transition-transform duration-300">→</span>
                  </button>

                  {/* Security Notice */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      🔒 Secure payment · Instant download · 24/7 support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}