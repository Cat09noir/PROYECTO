import { PawPrint } from 'lucide-react';

// Pie de página compartido por las vistas de la aplicación.
export default function Footer() {
  return <footer className="site-footer"><span><PawPrint size={17}/> Mascotas Pino</span><small>Productos y accesorios para el bienestar de tus mascotas.</small><small>© {new Date().getFullYear()} Mascotas Pino</small></footer>;
}
