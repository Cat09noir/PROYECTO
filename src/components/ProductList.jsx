/**
 * @file ProductList.jsx
 * @description Agrupa y lista las tarjetas de productos filtrados.
 * @author Icsaid Andrey Pino Vanegas
 */

import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ productos, agregarAlCarrito }) => {
    if (productos.length === 0) {
        return <p className="no-products">No se encontraron accesorios disponibles.</p>;
    }

    return (
        <div className="product-grid">
            {productos.map((prod) => (
                <ProductCard key={prod.id} producto={prod} agregarAlCarrito={agregarAlCarrito} />
            ))}
        </div>
    );
};

export default ProductList;