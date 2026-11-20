import { PawPrint, ShoppingBag, Settings } from 'lucide-react';

// Encabezado reutilizable para navegar entre la tienda y la administración.
export default function Header({ vista, cambiarVista, cantidadCarrito, abrirCarrito }) {
  return <header className="site-header">
    <a className="brand" href="#inicio" onClick={() => cambiarVista('tienda')}>
      <span className="brand-icon"><PawPrint size={25} /></span>
      <span>Mascotas <b>Pino</b><small>Todo para tus mejores amigos</small></span>
    </a>
    <nav className="main-nav" aria-label="Navegación principal">
      <button className={vista === 'tienda' ? 'nav-link active' : 'nav-link'} onClick={() => cambiarVista('tienda')}>Tienda</button>
      <button className={vista === 'admin' ? 'nav-link active' : 'nav-link'} onClick={() => cambiarVista('admin')}><Settings size={16}/> Administración</button>
      <button className="cart-nav" onClick={abrirCarrito} aria-label="Ver carrito"><ShoppingBag size={18}/><span>Carrito</span><b>{cantidadCarrito}</b></button>
    </nav>
  </header>;
}
