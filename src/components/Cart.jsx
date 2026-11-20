/**
 * @file Cart.jsx
 * @description Muestra los productos seleccionados y el cálculo total a pagar.
 * @author Icsaid Andrey Pino Vanegas
 */

import React from 'react';
import './Cart.css';

const Cart = ({ carrito, eliminarDelCarrito }) => {
    const total = carrito.reduce((acc, item) => acc + item.precio * (item.cantidad || 1), 0);

    if (carrito.length === 0) {
        return <div className="cart-container"><h2>Tu Carrito está vacío</h2></div>;
    }

    return (
        <div className="cart-container">
            <h2>Carrito de Compras</h2>
            <div className="cart-list">
                {carrito.map((item) => (
                    <div key={item.id} className="cart-item">
                        <span>{item.nombre}</span>
                        <span>${item.precio.toLocaleString('es-CO')}</span>
                        <button onClick={() => eliminarDelCarrito(item.id)} className="btn-remove">Eliminar</button>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <h3>Total: ${total.toLocaleString('es-CO')}</h3>
                <button className="btn-checkout" onClick={() => alert('¡Compra simulada con éxito!')}>Proceder al Pago</button>
            </div>
        </div>
    );
};

export default Cart;