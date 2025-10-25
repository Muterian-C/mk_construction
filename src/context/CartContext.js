import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { token } = useAuth(); // from your AuthContext
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend
  useEffect(() => {
    if (token) {
      api
        .get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setCart(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setCart([]);
      setLoading(false);
    }
  }, [token]);

  const addToCart = async (designId) => {
    if (!token) return alert("Please login first");

    try {
      await api.post(
        "/cart",
        { design_id: designId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh cart
      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error adding to cart");
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(cart.filter((item) => item.id !== cartId));
    } catch (err) {
      alert("Error removing from cart");
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
