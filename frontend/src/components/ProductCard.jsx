import { ShoppingCart, PawPrint } from 'lucide-react';

// Tarjeta visual reutilizable: recibe el producto y una acción por medio de props.
export default function ProductCard({ producto, agregar }) {
  const imagen = producto.imagen || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=700';
  return <article className="product-card">
    <div className="product-image"><img src={imagen} alt={producto.nombre} onError={(event) => { event.currentTarget.src = 'https://placehold.co/600x420/f1f5ef/315b4c?text=Mascotas+Pino'; }} /><span>{producto.categoriaNombre || 'Mascotas'}</span></div>
    <div className="product-info"><h3>{producto.nombre}</h3><p>{producto.descripcion || 'Producto seleccionado para el cuidado de tu mascota.'}</p>
      <div className="product-bottom"><strong>{Number(producto.precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}</strong><button className="icon-button" onClick={() => agregar(producto)} disabled={producto.stock <= 0} aria-label={`Agregar ${producto.nombre}`}><ShoppingCart size={18}/></button></div>
      <small className={producto.stock > 0 ? 'stock' : 'stock out'}>{producto.stock > 0 ? `Disponibles: ${producto.stock}` : 'Agotado'}</small>
    </div>
  </article>;
}
