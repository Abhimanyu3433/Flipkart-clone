import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={goToProduct}>
      <div className="product-card-image-wrapper">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-card-title">{product.title}</div>
      <div className="product-card-price-row">
        <span className="product-card-price">₹{product.price}</span>
        <span className="product-card-mrp">₹{product.mrp}</span>
        <span className="product-card-discount">
          {product.discountPercent}% off
        </span>
      </div>
      <div className="product-card-rating">
        ⭐ {product.rating} ({product.reviewsCount} reviews)
      </div>
    </div>
  );
}

export default ProductCard;
