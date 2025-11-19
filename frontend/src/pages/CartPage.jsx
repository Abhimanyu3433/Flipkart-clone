import React from "react";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { items, removeFromCart, setQuantity, totalMrp, totalPrice } =
    useCart();

  const handleChangeQty = (id, value) => {
    const qty = Number(value);
    if (!Number.isNaN(qty) && qty > 0) {
      setQuantity(id, qty);
    }
  };

  const discount = totalMrp - totalPrice;

  return (
    <div className="cart-page">
      <div className="cart-items">
        <h2 className="page-title">My Cart ({items.length})</h2>
        {items.length === 0 && <p className="mt-1">Your cart is empty.</p>}
        {items.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div>
              <div className="cart-item-title">{item.title}</div>
              <div className="product-card-price-row">
                <span className="product-card-price">₹{item.price}</span>
                <span className="product-card-mrp">₹{item.mrp}</span>
                <span className="product-card-discount">
                  {item.discountPercent}% off
                </span>
              </div>
              <div className="mt-1">
                Qty:{" "}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleChangeQty(item.id, e.target.value)}
                  style={{ width: "60px", padding: "0.2rem" }}
                />
              </div>
              <button
                className="btn mt-1"
                onClick={() => removeFromCart(item.id)}
              >
                REMOVE
              </button>
            </div>
            <div className="text-right">
              <div>₹{item.price * item.quantity}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>PRICE DETAILS</h3>
        <div className="cart-summary-row mt-1">
          <span>Price</span>
          <span>₹{totalMrp}</span>
        </div>
        <div className="cart-summary-row">
          <span>Discount</span>
          <span style={{ color: "#388e3c" }}>− ₹{discount}</span>
        </div>
        <div className="cart-summary-row">
          <span>Delivery Charges</span>
          <span style={{ color: "#388e3c" }}>FREE</span>
        </div>
        <div className="cart-summary-row total">
          <span>Total Amount</span>
          <span>₹{totalPrice}</span>
        </div>
        <p
          className="mt-1"
          style={{ fontSize: "0.85rem", color: "#388e3c" }}
        >
          You will save ₹{discount} on this order
        </p>
      </div>
    </div>
  );
}

export default CartPage;
