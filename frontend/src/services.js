// La ruta relativa permite usar el mismo código en Vite y dentro de Tomcat.
const contextPath = window.location.pathname.split('/app')[0];
const API_URL = `${contextPath}/api/productos`;

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  const body = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new Error(body?.mensaje || 'No fue posible completar la operación.');
  return body;
}

export const productoService = {
  listar: () => request(API_URL),
  crear: (producto) => request(API_URL, { method: 'POST', body: JSON.stringify(producto) }),
  actualizar: (id, producto) => request(`${API_URL}/${id}`, { method: 'PUT', body: JSON.stringify(producto) }),
  eliminar: (id) => request(`${API_URL}/${id}`, { method: 'DELETE' })
};

export const categorias = [
  { id: 1, nombre: 'Ropa' }, { id: 2, nombre: 'Collar' },
  { id: 3, nombre: 'Accesorios' }, { id: 4, nombre: 'Cadena' },
  { id: 5, nombre: 'Camas' }, { id: 6, nombre: 'Pecheras' }
];
