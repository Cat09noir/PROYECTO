import { Minus, Plus, Trash2, X } from 'lucide-react';

// Carrito local de demostración; no descuenta existencias ni registra pagos.
export default function ShoppingCart({ items, abierto, cerrar, cambiarCantidad, quitar }) {
  const total = items.reduce((suma, item) => suma + Number(item.precio) * item.cantidad, 0);
  return <>
    {abierto && <button className="drawer-backdrop" onClick={cerrar} aria-label="Cerrar carrito"/>}
    <aside className={`cart-drawer ${abierto ? 'show' : ''}`} aria-label="Carrito de compras">
      <div className="drawer-head"><h2>Tu carrito</h2><button className="plain-icon" onClick={cerrar}><X/></button></div>
      {!items.length ? <p className="empty-cart">Todavía no has agregado productos.</p> : <>
        <div className="cart-items">{items.map((item) => <div className="cart-item" key={item.idProducto}>
          <img src={item.imagen || 'https://placehold.co/100x100?text=Producto'} alt=""/><div className="cart-item-info"><b>{item.nombre}</b><strong>{(Number(item.precio) * item.cantidad).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}</strong>
            <div className="quantity"><button onClick={() => cambiarCantidad(item.idProducto, -1)}><Minus size={13}/></button><span>{item.cantidad}</span><button onClick={() => cambiarCantidad(item.idProducto, 1)}><Plus size={13}/></button><button className="remove" onClick={() => quitar(item.idProducto)}><Trash2 size={14}/></button></div>
          </div></div>)}</div>
        <div className="cart-total"><span>Total estimado</span><strong>{total.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}</strong></div>
        <p className="cart-note">Este carrito es una vista previa. La compra y el pago no se procesan desde esta evidencia.</p>
      </>}
    </aside>
  </>;
}
