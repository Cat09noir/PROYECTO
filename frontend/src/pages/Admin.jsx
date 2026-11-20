import { useState } from 'react';
import { Pencil, Plus, Trash2, X, Package } from 'lucide-react';
import { categorias } from '../services.js';

const formularioInicial = { nombre: '', idCategoria: '1', descripcion: '', precio: '', stock: '', imagen: '' };

// Vista administrativa para registrar, editar y eliminar productos del catálogo.
export default function Admin({ productos, guardar, eliminar, cargando }) {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState('');

  function actualizarCampo(event) { setFormulario({ ...formulario, [event.target.name]: event.target.value }); }
  function prepararEdicion(producto) {
    setEditando(producto.idProducto);
    setFormulario({ nombre: producto.nombre, idCategoria: String(producto.idCategoria), descripcion: producto.descripcion || '', precio: producto.precio, stock: producto.stock, imagen: producto.imagen || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function cancelar() { setEditando(null); setFormulario(formularioInicial); setError(''); }
  async function enviar(event) {
    event.preventDefault(); setError('');
    const datos = { ...formulario, idCategoria: Number(formulario.idCategoria), precio: Number(formulario.precio), stock: Number(formulario.stock) };
    if (!datos.nombre.trim() || datos.precio < 0 || datos.stock < 0 || !Number.isFinite(datos.precio) || !Number.isInteger(datos.stock)) { setError('Revisa el nombre, el precio y las existencias.'); return; }
    try { await guardar(editando, datos); cancelar(); } catch (e) { setError(e.message); }
  }

  return <section className="admin-section"><div className="section-heading"><div><span className="eyebrow">Panel de control</span><h2>Administrar productos</h2><p>Gestiona la información del catálogo de Mascotas Pino.</p></div><span className="result-count"><Package size={16}/> {productos.length} registros</span></div>
    <form className="admin-form" onSubmit={enviar}><div className="form-title"><h3>{editando ? 'Editar producto' : 'Registrar producto'}</h3>{editando && <button type="button" className="text-button" onClick={cancelar}><X size={15}/> Cancelar edición</button>}</div>
      <div className="form-grid"><label>Nombre del producto<input name="nombre" value={formulario.nombre} onChange={actualizarCampo} required maxLength="100" placeholder="Ej. Pechera para perro"/></label>
      <label>Categoría<select name="idCategoria" value={formulario.idCategoria} onChange={actualizarCampo}>{categorias.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}</select></label>
      <label>Precio (COP)<input name="precio" type="number" min="0" step="0.01" value={formulario.precio} onChange={actualizarCampo} required/></label>
      <label>Existencias<input name="stock" type="number" min="0" step="1" value={formulario.stock} onChange={actualizarCampo} required/></label>
      <label className="wide-field">URL de imagen<input name="imagen" type="url" value={formulario.imagen} onChange={actualizarCampo} placeholder="https://..."/></label>
      <label className="wide-field">Descripción<textarea name="descripcion" rows="3" value={formulario.descripcion} onChange={actualizarCampo} placeholder="Describe las características del producto"/></label></div>
      {error && <p className="form-error">{error}</p>}<button className="primary-button" type="submit" disabled={cargando}>{editando ? <Pencil size={16}/> : <Plus size={17}/>} {editando ? 'Guardar cambios' : 'Registrar producto'}</button>
    </form>
    <div className="table-wrap"><table><thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead><tbody>
      {productos.map((producto) => <tr key={producto.idProducto}><td><div className="table-product"><img src={producto.imagen || 'https://placehold.co/80x80?text=MP'} alt=""/><b>{producto.nombre}</b></div></td><td>{producto.categoriaNombre || categorias.find((c) => c.id === producto.idCategoria)?.nombre}</td><td>{Number(producto.precio).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}</td><td>{producto.stock}</td><td><div className="table-actions"><button className="edit-action" onClick={() => prepararEdicion(producto)} aria-label="Editar"><Pencil size={16}/></button><button className="delete-action" onClick={() => { if (window.confirm(`¿Eliminar ${producto.nombre}?`)) eliminar(producto.idProducto); }} aria-label="Eliminar"><Trash2 size={16}/></button></div></td></tr>)}
      {!productos.length && <tr><td colSpan="5" className="table-empty">No hay productos registrados en la base de datos.</td></tr>}
    </tbody></table></div>
  </section>;
}
