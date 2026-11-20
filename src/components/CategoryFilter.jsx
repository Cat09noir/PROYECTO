/**
 * @file CategoryFilter.jsx
 * @description Permite filtrar los productos por categoría específica.
 * @author Icsaid Andrey Pino Vanegas
 */

import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categoriaSeleccionada, setCategoriaSeleccionada }) => {
    const categorias = ['Todos', 'Paseo', 'Descanso', 'Juguetes', 'Accesorios'];

    return (
        <div className="category-filter">
            {categorias.map((cat) => (
                <button
                    key={cat}
                    className={categoriaSeleccionada === cat ? 'active' : ''}
                    onClick={() => setCategoriaSeleccionada(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;