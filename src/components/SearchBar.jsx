/**
 * @file SearchBar.jsx
 * @description Componente de búsqueda para filtrar accesorios por nombre.
 * @author Icsaid Andrey Pino Vanegas
 */

import React from 'react';
import './SearchBar.css';

const SearchBar = ({ busqueda, setBusqueda }) => {
    return (
        <div className="search-bar-container">
            <input 
                type="text" 
                placeholder="Buscar accesorios para tu mascota..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;