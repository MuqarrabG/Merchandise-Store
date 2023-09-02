import React from "react";
import '../styles/Product.css'
import '../styles/SingleProduct.css'
import { Link } from "react-router-dom";


const Product = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`}>
            <div className="product-container">
                <img className="product-image" src={product.image} alt={product.title} />
                <div className="product-title">{product.title}</div>
                <div className="product-price">${product.price}</div>
            </div>
        </Link>
    );
}

const SingleProduct = ({ product }) => {
    return (
        <div className="single-product-container">
            <img className="single-product-image" src={product.image} alt={product.title} />
            <div className="single-product-title">{product.title}</div>
            <div className="single-product-price">${product.price}</div>
            <div className="single-product-body">{product.body}</div>
            <div className="single-product-category">Category: {product.category}</div>
        </div>
    );
}

export default {Product, SingleProduct};

