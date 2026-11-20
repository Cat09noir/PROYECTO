import { useMemo, useState } from 'react';
import { ShoppingBag, PawPrint } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import ProductList from '../components/ProductList.jsx';
import ShoppingCart from '../components/ShoppingCart.jsx';
import { categorias } from '../services.js';

// Página principal: catálogo, búsqueda, filtro y carrito de compras.
export default function Home({ productos, carrito, setCarrito, agregar, carritoAbierto, setCarritoAbierto, cambiarCantidad }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('todas');

  const filtrados = useMemo(() => productos.filter((producto) => {
    const coincideTexto = `${producto.nombre} ${producto.descripcion || ''}`.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === 'todas' || String(producto.idCategoria) === categoria;
    return coincideTexto && coincideCategoria;
  }), [productos, busqueda, categoria]);



  return <>
    <section className="hero"><div className="hero-copy"><span className="eyebrow"><PawPrint size={15}/> Cuidado, calidad y cariño</span><h1>Todo lo que tu mascota <em>necesita.</em></h1><p>Encuentra accesorios y productos seleccionados para acompañar cada aventura de tu mejor amigo.</p><button className="primary-button" onClick={() => document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' })}>Explorar catálogo <ShoppingBag size={17}/></button></div><div className="hero-art"><img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900" alt="Perro feliz"/></div></section>
    <section className="catalog-section" id="catalogo"><div className="section-heading"><div><span className="eyebrow">Nuestra selección</span><h2>Catálogo de productos</h2><p>Encuentra el detalle ideal para tu compañero.</p></div><span className="result-count">{filtrados.length} productos</span></div>
      <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} categoria={categoria} setCategoria={setCategoria} categorias={categorias}/>
      <ProductList productos={filtrados} agregar={agregar}/>
    </section>
    <ShoppingCart items={carrito} abierto={carritoAbierto} cerrar={() => setCarritoAbierto(false)} cambiarCantidad={cambiarCantidad} quitar={(id) => setCarrito((actual) => actual.filter((item) => item.idProducto !== id))}/>
  </>;
}
