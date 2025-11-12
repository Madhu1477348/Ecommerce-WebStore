import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";
function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading product...</h4>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-5">
        <h3>Product not found</h3>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.title.substring(0, 30)}... added to cart`, {
      icon: "🛒",
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-5">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow-sm"
            style={{ objectFit: "contain", maxHeight: "400px" }}
          />
        </div>
        <div className="col-md-7">
          <h3>{product.title}</h3>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-success fw-bold mb-3">
            ₹{(product.price * 85).toFixed(0)}
          </h4>
          <p>{product.description}</p>
          <button className="btn btn-primary mt-3" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
