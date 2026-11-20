import { useCallback, useEffect, useState } from 'react';
import { AlertCircle, LoaderCircle, RefreshCw } from 'lucide-react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import { productoService } from './services.js';

// Componente raíz: centraliza la consulta y las operaciones CRUD del catálogo.
export default function App() {
  const [productos, setProductos] = useState([]);
  const [vista, setVista] = useState('tienda');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [carrito, setCarrito] = useState([]);

  const cargarProductos = useCallback(async () => {
    setCargando(true); setError('');
    try { setProductos(await productoService.listar()); }
    catch (e) { setError(`${e.message} Comprueba que Tomcat y MySQL estén activos y que la base de datos esté configurada.`); }
    finally { setCargando(false); }
  }, []);

  useEffect(() => { cargarProductos(); }, [cargarProductos]);

  async function guardar(id, datos) {
    if (id) await productoService.actualizar(id, datos); else await productoService.crear(datos);
    await cargarProductos();
  }
  async function eliminar(id) { try { await productoService.eliminar(id); await cargarProductos(); } catch (e) { setError(e.message); } }
  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existente = actual.find((item) => item.idProducto === producto.idProducto);
      if (existente) return actual.map((item) => item.idProducto === producto.idProducto ? { ...item, cantidad: Math.min(item.cantidad + 1, producto.stock) } : item);
      return [...actual, { ...producto, cantidad: 1 }];
    });
    setCarritoAbierto(true);
  }
  function cambiarCantidad(id, cambio) {
    setCarrito((actual) => actual.map((item) => item.idProducto === id ? { ...item, cantidad: Math.max(1, Math.min(item.cantidad + cambio, item.stock)) } : item));
  }

  return <div className="app-shell"><Header vista={vista} cambiarVista={setVista} cantidadCarrito={carrito.reduce((total, item) => total + item.cantidad, 0)} abrirCarrito={() => { setVista('tienda'); setCarritoAbierto(true); }}/>
    <main>{error && <div className="global-alert"><AlertCircle size={19}/><span>{error}</span><button onClick={cargarProductos}><RefreshCw size={15}/> Reintentar</button></div>}
      {cargando ? <div className="loading"><LoaderCircle className="spin" size={30}/><span>Consultando el catálogo...</span></div> : vista === 'tienda' ? <Home productos={productos} carrito={carrito} setCarrito={setCarrito} agregar={agregarAlCarrito} carritoAbierto={carritoAbierto} setCarritoAbierto={setCarritoAbierto} cambiarCantidad={cambiarCantidad}/> : <Admin productos={productos} guardar={guardar} eliminar={eliminar} cargando={cargando}/>}
    </main><Footer/>
  </div>;
}
