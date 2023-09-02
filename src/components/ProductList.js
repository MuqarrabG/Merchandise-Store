import React from "react";
import Product from "./Product";

const ProductList = ({products}) => {
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px'
    };

    return (
        <div style={gridStyle}>
            {products.map((product) => (<Product.Product key={product.id} product={product} />))}
        </div>
    );
}

export default ProductList
