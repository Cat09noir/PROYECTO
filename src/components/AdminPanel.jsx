/**
 * @file AdminPanel.jsx
 * @description Panel administrativo para gestionar la información del catálogo.
 * @author Icsaid Andrey Pino Vanegas
 */

import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ productos, agregarNuevoProducto, eliminarProducto }) => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('Paseo');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !precio) return;

        const nuevo = {
            id: Date.now(),
            nombre,
            precio: Number(precio),
            categoria,
            descripcion,
            imagen: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80"
        };

        agregarNuevoProducto(nuevo);
        setNombre('');
        setPrecio('');
        setDescripcion('');
        alert('Producto agregado exitosamente al catálogo.');
    };

    return (
        <div className="admin-container">
            <h2>Panel de Administración - Mascotas Pino</h2>
            <form onSubmit={handleSubmit} className="admin-form">
                <h3>Registrar Nuevo Accesorio</h3>
                <input type="text" placeholder="Nombre del accesorio" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="number" placeholder="Precio ($)" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option value="Paseo">Paseo</option>
                    <option value="Descanso">Descanso</option>
                    <option value="Juguetes">Juguetes</option>
                    <option value="Accesorios">Accesorios</option>
                </select>
                <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <button type="submit" className="btn-submit">Guardar Producto</button>
            </form>
        </div>
    );
};

export default AdminPanel;