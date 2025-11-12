import React, { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);
  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card shadow p-4 text-center"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <span style={{ fontSize: "3rem" }}>✅</span>
        </div>
        <h3>Order Placed Successfully!</h3>
        <p className="text-muted mt-2">
          Thank you for shopping with us. Your items will be delivered soon.
        </p>
        <Link to="/products" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
export default CheckoutSuccess;
