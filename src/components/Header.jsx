/**
 * @file Header.jsx
 * @description Componente de cabecera que muestra el logotipo y nombre de Mascotas Pino.
 * @author Icsaid Andrey Pino Vanegas
 */

import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="main-header">
            <div className="header-content">
                <h1>🐾 Mascotas Pino</h1>
                <p>Tu tienda confiable de accesorios y bienestar para mascotas</p>
            </div>
        </header>
    );
};

export default Header;