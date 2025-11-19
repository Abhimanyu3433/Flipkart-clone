import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api";
import { useCart } from "../context/CartContext";

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
        setStatus("done");
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    })();
  }, [id]);

  if (status === "loading") {
    return <p className="mt-2">Loading product...</p>;
  }

  if (status === "error" || !product) {
    return <p className="mt-2">Product not found.</p>;
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="product-page">
      <div className="product-page-image-wrapper">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-page-details">
        <h2>{product.title}</h2>
        <p className="mt-1 text-muted">{product.description}</p>
        <p className="mt-1">
          ⭐ {product.rating} ({product.reviewsCount} ratings)
        </p>

        <div className="price-row">
          <span className="price-main">₹{product.price}</span>
          <span className="price-mrp">₹{product.mrp}</span>
          <span className="price-discount">
            {product.discountPercent}% off
          </span>
        </div>

        <div className="actions-row">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            ADD TO CART
          </button>
          <button className="btn btn-secondary">BUY NOW</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
