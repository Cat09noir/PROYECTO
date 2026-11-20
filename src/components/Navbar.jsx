import React from 'react';
import './Navbar.css';

const Navbar = ({ vistaActual, setVistaActual, cantidadCarrito }) => {
  return (
    <nav className="navbar">
      <button
        className={vistaActual === 'catalogo' ? 'active' : ''}
        onClick={() => setVistaActual('catalogo')}
      >
        Catálogo
      </button>

      <button
        className={vistaActual === 'carrito' ? 'active' : ''}
        onClick={() => setVistaActual('carrito')}
      >
        Carrito ({cantidadCarrito})
      </button>

      <button
        className={vistaActual === 'admin' ? 'active' : ''}
        onClick={() => setVistaActual('admin')}
      >
        Admin
      </button>
    </nav>
  );
};

export default Navbar;