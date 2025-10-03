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