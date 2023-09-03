import React from "react";
import "../styles/Product.css";
import "../styles/SingleProduct.css";
import { Link } from "react-router-dom";
import { useCart } from "./Cart";
import { useState } from "react";

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="product-container">
        <img
          className="product-image"
          src={product.image}
          alt={product.title}
        />
        <div className="product-title">{product.title}</div>
        <div className="product-price">${product.price}</div>
      </div>
    </Link>
  );
};

const SingleProduct = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const addingToCart = () => {
    const checkQuantity = isNaN(quantity) || quantity === '' ? 1 : quantity
    const productWithQuantity = { ...product, quantity: checkQuantity };
    addToCart(productWithQuantity);
  };

  return (
    <div className="single-product-container">
      <img
        className="single-product-image"
        src={product.image}
        alt={product.title}
      />
      <div className="single-product-title">{product.title}</div>
      <div className="single-product-price">${product.price}</div>
      <div className="single-product-body">{product.body}</div>
      <div className="single-product-category">
        Category: {product.category}
      </div>
      <div className="quantity-container">
        <input
          className="quantity-input"
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => {
            const val = parseInt(e.target.value, 10)
            setQuantity(val)
            }}
        />
        <button className="add-to-cart-button" onClick={addingToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default { Product, SingleProduct };
