/**
 * @file App.jsx
 * @description Componente principal de la aplicación web Mascotas Pino.
 *              Coordina el estado global del catálogo de accesorios, búsqueda,
 *              filtrado por categorías, carrito de compras y vista administrativa.
 * @author Icsaid Andrey Pino Vanegas
 * @date Noviembre 2026
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { productosIniciales } from './data/productos';
import './App.css';

function App() {
  // Estado principal del catálogo de accesorios para mascotas
  const [productos, setProductos] = useState(productosIniciales);

  // Estado de los productos agregados al carrito de compras
  const [carrito, setCarrito] = useState([]);

  // Estado para controlar la sección activa ('catalogo', 'carrito' o 'admin')
  const [vistaActual, setVistaActual] = useState('catalogo');

  // Estado del texto ingresado en la barra de búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Estado de la categoría seleccionada para filtrar el catálogo
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');

  /**
   * Agrega un accesorio al carrito. Si ya existe, incrementa su cantidad.
   * @param {Object} producto - Objeto del accesorio seleccionado.
   */
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoAnterior) => {
      const indiceExistente = carritoAnterior.findIndex((item) => item.id === producto.id);

      if (indiceExistente !== -1) {
        return carritoAnterior.map((item, index) =>
          index === indiceExistente
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      }

      return [...carritoAnterior, { ...producto, cantidad: 1 }];
    });
  };

  /**
   * Elimina un producto del carrito según su identificador único.
   * @param {number|string} idProducto - ID del producto a retirar.
   */
  const eliminarDelCarrito = (idProducto) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter((item) => item.id !== idProducto)
    );
  };

  /**
   * Registra un nuevo accesorio en el catálogo desde el panel administrativo.
   * @param {Object} nuevoProducto - Datos del nuevo accesorio.
   */
  const agregarNuevoProducto = (nuevoProducto) => {
    setProductos((productosAnteriores) => [...productosAnteriores, nuevoProducto]);
  };

  /**
   * Elimina un accesorio del catálogo desde el panel administrativo.
   * @param {number|string} idProducto - ID del producto a eliminar.
   */
  const eliminarProducto = (idProducto) => {
    setProductos((productosAnteriores) =>
      productosAnteriores.filter((item) => item.id !== idProducto)
    );
  };

  // Calcula la cantidad total de unidades en el carrito para mostrar en el Navbar
  const cantidadTotalCarrito = carrito.reduce(
    (total, item) => total + (item.cantidad || 1),
    0
  );

  // Aplica los filtros de texto de búsqueda y categoría activa sobre el catálogo
  const productosFiltrados = productos.filter((producto) => {
    const textoNormalizado = busqueda.trim().toLowerCase();
    const coincideNombre =
      producto.nombre.toLowerCase().includes(textoNormalizado) ||
      (producto.descripcion &&
        producto.descripcion.toLowerCase().includes(textoNormalizado));

    const coincideCategoria =
      categoriaSeleccionada === 'Todos' ||
      producto.categoria === categoriaSeleccionada;

    return coincideNombre && coincideCategoria;
  });

  return (
    <div className="app-container">
      {/* Encabezado y navegación principal */}
      <Header />
      <Navbar
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
        cantidadCarrito={cantidadTotalCarrito}
      />

      {/* Contenido dinámico según la vista seleccionada */}
      <main className="main-content">
        {vistaActual === 'catalogo' && (
          <>
            <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />
            <CategoryFilter
              categoriaSeleccionada={categoriaSeleccionada}
              setCategoriaSeleccionada={setCategoriaSeleccionada}
            />
            <ProductList
              productos={productosFiltrados}
              agregarAlCarrito={agregarAlCarrito}
            />
          </>
        )}

        {vistaActual === 'carrito' && (
          <Cart
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
          />
        )}

        {vistaActual === 'admin' && (
          <AdminPanel
            productos={productos}
            agregarNuevoProducto={agregarNuevoProducto}
            eliminarProducto={eliminarProducto}
          />
        )}
      </main>

      {/* Pie de página institucional */}
      <Footer />
    </div>
  );
}

export default App;
