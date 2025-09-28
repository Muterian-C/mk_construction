// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./context/ProtectedRoute";
import Gallery from "./pages/Gallery";
import DesignDetails from "./pages/DesignDetails";
import AdminDashboard from "./pages/admin/AdminDashboard"; // NEW
import Navbar from "./pages/Navbar";
import AddDesign from "./pages/admin/AddDesign";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";  // ✅ add this
import ManageDesigns from "./pages/admin/ManageDesign";
import EditDesign from "./pages/admin/EditDesign";
import ManageUsers from "./pages/admin/ManageUsers";
import Footer from "./pages/Footer";
import Dashboard from "./pages/UsersDashboard";


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
            <Route path="/admin/add-design" element={<AddDesign />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin/designs" element={<ManageDesigns/>}/>
            <Route path="/admin/users" element={<ManageUsers/>}/>
            <Route path="/admin/edit-design/:id" element={<EditDesign />} />

            {/* User dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard /> {/* user dashboard for now */}
                </ProtectedRoute>
              }
            />

            {/* Admin dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
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
