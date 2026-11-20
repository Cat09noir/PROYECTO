import ProductCard from './ProductCard.jsx';

// Lista los productos recibidos y conserva una tarjeta independiente por registro.
export default function ProductList({ productos, agregar }) {
  if (!productos.length) return <div className="empty-state">No se encontraron productos. Prueba otra búsqueda o categoría.</div>;
  return <div className="product-grid">{productos.map((producto) => <ProductCard key={producto.idProducto} producto={producto} agregar={agregar} />)}</div>;
}
