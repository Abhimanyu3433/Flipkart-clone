import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // 'loading' | 'done' | 'error'

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setStatus("done");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="page-title">Top Deals</h1>
      {status === "loading" && <p className="mt-1">Loading products...</p>}
      {status === "error" && (
        <p className="mt-1">Failed to load products. Try again later.</p>
      )}
      {status === "done" && (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
