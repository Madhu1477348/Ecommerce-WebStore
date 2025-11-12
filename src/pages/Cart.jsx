import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, updateQty, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();
  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2>Your cart is empty 🛒</h2>
        <p>Add some products from the products page.</p>
      </div>
    );
  }
  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 Your Cart</h2>

      <table className="table table-bordered text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>₹{item.price}</td>
              <td>
                <input
                  type="number"
                  value={item.qty}
                  min="1"
                  onChange={(e) => updateQty(item.id, Number(e.target.value))}
                  style={{ width: "60px" }}
                />
              </td>
              <td>₹{item.price * item.qty}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end mt-4">
        <h4>Total: ₹{total}</h4>
        <button
          className="btn btn-success me-2"
          onClick={() => navigate("/checkout-success")}
        >
          Checkout
        </button>
        <button className="btn btn-outline-danger" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
