import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleCategoryClick = (cat) => {
    navigate(`/products?category=${cat}`);
  };

  return (
    <div className="container mt-5">
      {/* Welcome Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Welcome to 🛍️ MadhuWebStore</h1>
        <p>
          Discover amazing products from different categories
        </p>
      </div>

      {/* Categories Section */}
      <h3 className="mb-4 text-center">Shop by Category</h3>

      <div className="row justify-content-center">
        {categories.map((cat) => (
          <div key={cat} className="col-md-3 col-sm-6 mb-4">
            <div
              className="card shadow-sm text-center p-3 category-card"
              style={{
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onClick={() => handleCategoryClick(cat)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="card-body">
                <div style={{ fontSize: "2.5rem" }}>
                  {cat === "electronics"
                    ? "⚡"
                    : cat === "jewelery"
                    ? "💎"
                    : cat.includes("clothing")
                    ? "👕"
                    : "🛒"}
                </div>
                <h5 className="mt-3 text-capitalize">{cat}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="text-center mt-5">
        <p>
          Start shopping today and grab amazing deals 💥
        </p>
      </div>
    </div>
  );
}
export default Home;
