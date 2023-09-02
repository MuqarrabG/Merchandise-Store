import React from "react";

const Product = ({ product }) => {
    const cardStyle = {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        margin: '10px',
        maxWidth: '250px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: '0.3s',
        textAlign: 'center',
        backgroundColor: '#fff'
    };

    const imgStyle = {
        maxWidth: '100%',
        height: 'auto',
        marginBottom: '12px',
        borderRadius: '4px'
    };

    const titleStyle = {
        fontWeight: 'bold',
        fontSize: '18px',
        margin: '12px 0',
        color: '#333'
    };

    const priceStyle = {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#e74c3c',
        marginBottom: '16px'
    };

    return (
        <div style={cardStyle}>
            <img src={product.image} alt={product.title} style={imgStyle} />
            <h2 style={titleStyle}>{product.title}</h2>
            <p style={priceStyle}>${product.price}</p>
        </div>
    );
}

export default Product;

