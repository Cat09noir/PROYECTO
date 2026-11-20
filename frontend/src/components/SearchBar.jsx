import { Search } from 'lucide-react';

// Control de búsqueda y filtro; los valores se administran desde el componente padre.
export default function SearchBar({ busqueda, setBusqueda, categoria, setCategoria, categorias }) {
  return <div className="search-tools">
    <label className="search-box"><Search size={19}/><input value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Buscar productos para tu mascota..." aria-label="Buscar productos" /></label>
    <select value={categoria} onChange={(event) => setCategoria(event.target.value)} aria-label="Filtrar por categoría">
      <option value="todas">Todas las categorías</option>
      {categorias.map((item) => <option key={item.id} value={String(item.id)}>{item.nombre}</option>)}
    </select>
  </div>;
}
