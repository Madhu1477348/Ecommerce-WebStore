import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

function Products() {
  // 🧠 State Variables
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 🧠 Hooks for cart and route
  const { addToCart } = useCart();
  const location = useLocation();

  // ✅ 1️⃣ Effect: Get category from URL (e.g. ?category=jewelery)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromURL = params.get("category");
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [location.search]);

  // ✅ 2️⃣ Effect: Fetch products and categories from API
  useEffect(() => {
    async function loadData() {
      try {
        const productRes = await fetch("https://fakestoreapi.com/products");
        const productData = await productRes.json();

        const categoryRes = await fetch("https://fakestoreapi.com/products/categories");
        const categoryData = await categoryRes.json();

        setProducts(productData);
        setFilteredProducts(productData);
        setCategories(["all", ...categoryData]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ✅ 3️⃣ Effect: Filter products when category/search changes
  useEffect(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
    setCurrentPage(1); // reset to first page
  }, [products, selectedCategory, searchQuery]);

  // ✅ Add to cart handler
  const handleAdd = (product) => {
    addToCart(product);
    toast.success(`${product.title.substring(0, 30)}... added to cart`, {
      icon: "🛒",
    });
  };

  // ✅ Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading products...</h4>
      </div>
    );
  }

  // ✅ UI
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛍️ Our Products</h2>

      {/* Filters */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        {/* Search Box */}
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "250px" }}
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category Dropdown */}
        <select
          className="form-select"
          style={{ maxWidth: "200px" }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "jewelery"
                ? "Jewellery"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="row">
        {paginatedProducts.map((item) => (
          <div key={item.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={item.image}
                className="card-img-top"
                alt={item.title}
                style={{ height: "200px", objectFit: "contain", padding: "10px" }}
              />
              <div className="card-body">
                <h6 className="card-title">{item.title.substring(0, 40)}...</h6>
                <p>{item.category}</p>
                <p className="fw-semibold">₹{(item.price * 85).toFixed(0)}</p>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-2">
                  <Link
                    to={`/products/${item.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAdd(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
        <button
          className="btn btn-outline-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline-primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
