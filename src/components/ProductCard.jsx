/**
 * @file ProductCard.jsx
 * @description Representa visualmente un producto individual con su imagen y precio.
 * @author Icsaid Andrey Pino Vanegas
 */

import React from 'react';
import './ProductCard.css';

const ProductCard = ({ producto, agregarAlCarrito }) => {
    return (
        <div className="product-card">
            <img src={producto.imagen} alt={producto.nombre} className="product-img" />
            <div className="product-info">
                <span className="product-category">{producto.categoria}</span>
                <h3>{producto.nombre}</h3>
                <p className="product-desc">{producto.descripcion}</p>
                <p className="product-price">${producto.precio.toLocaleString('es-CO')}</p>
                <button 
                    className="btn-add" 
                    onClick={() => agregarAlCarrito(producto)}
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;