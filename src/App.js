// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./context/ProtectedRoute";
import Gallery from "./pages/Gallery";
import DesignDetails from "./pages/DesignDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Navbar from "./pages/Navbar";
import AddDesign from "./pages/admin/AddDesign";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import ManageDesigns from "./pages/admin/ManageDesign";
import EditDesign from "./pages/admin/EditDesign";
import ManageUsers from "./pages/admin/ManageUsers";
import Footer from "./pages/Footer";
import Dashboard from "./pages/UsersDashboard";
// In your main App.js or index.js
import './styles/animations.css';
import AdminDesignDetails from "./pages/admin/AdminDesignDetails";
import PaymentPage from "./pages/Payment";
import ManageOrders from "./pages/admin/ManageOrders";
import Analytics from "./pages/admin/Analytics";
// In your App.jsx or routing file
import ResetPassword from './pages/ResetPassword';
import AuthSuccess from "./pages/AuthSuccess";
import AboutUs from "./pages/AboutUs"
import Services from "./pages/OurServices";
import Contact from "./pages/ContactPage";


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />   {/* <- Navbar always visible */}
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/designs" element={<Gallery />} />
            <Route path="/designs/:id" element={<DesignDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout/:id" element={<PaymentPage />} />
            <Route path="/checkout/cart" element={<PaymentPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth/google/success" element={<AuthSuccess />} />
            {/* User dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard /> {/* user dashboard for now */}
                </ProtectedRoute>
              }
            />

            {/* Protected Admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            // Add this to your routes
            <Route
              path="/admin/designs/:id"
              element={
                <ProtectedRoute role="admin">
                  <AdminDesignDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/add-design"
              element={
                <ProtectedRoute role="admin">
                  <AddDesign />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/designs"
              element={
                <ProtectedRoute role="admin">
                  <ManageDesigns />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute role="admin">
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute role="admin">
                  <ManageOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute role="admin">
                  <Analytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/edit-design/:id"
              element={
                <ProtectedRoute role="admin">
                  <EditDesign />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
