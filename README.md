# Mascotas Pino – Evidencia GA7-220501096-AA4-EV03

## 1. Descripción

Desarrollo del componente Front-End del proyecto formativo Mascotas Pino utilizando React. La interfaz se integra con el módulo Java existente por medio de una API REST y conserva la persistencia de productos en MySQL mediante JDBC.

## 2. Tecnologías

- React 18 y JSX para construir componentes reutilizables.
- Vite para ejecutar y compilar el Front-End.
- Java 17 y Jakarta Servlet 6 para exponer la API REST.
- Gson para convertir objetos Java y JSON.
- JDBC y MySQL/MariaDB para persistencia.
- Maven para gestionar dependencias y generar el archivo WAR.
- Git y GitHub para control de versiones.

## 3. Componentes Front-End implementados

| Componente | Responsabilidad |
|---|---|
| `Header` | Identidad de la tienda y navegación entre tienda y administración. |
| `SearchBar` | Búsqueda por texto y filtro por categoría. |
| `ProductCard` | Presentación individual de un producto y acción para agregarlo al carrito. |
| `ProductList` | Recorrido y presentación de los productos mediante tarjetas reutilizables. |
| `ShoppingCart` | Resumen local de productos, cantidades y total estimado. |
| `Footer` | Información general al pie de la aplicación. |
| `Home` | Vista de catálogo, búsqueda, filtros y carrito. |
| `Admin` | Formulario y tabla para registrar, editar y eliminar productos. |
| `App` | Componente raíz; consulta la API y comparte los datos con las vistas. |

Los componentes reciben información y funciones por medio de props. Los estados de interfaz se gestionan con Hooks (`useState`, `useEffect`, `useMemo` y `useCallback`).

## 4. Integración con el módulo Java

La clase `ProductoApiServlet` expone los siguientes recursos:

- `GET /api/productos`: consulta todos los productos.
- `POST /api/productos`: registra un producto recibido en JSON.
- `PUT /api/productos/{id}`: actualiza un producto.
- `DELETE /api/productos/{id}`: elimina un producto.

El Servlet utiliza `ProductoService`, que delega las operaciones al DAO existente (`ProductoDAO` y `ProductoDAOImpl`). La conexión a MySQL continúa centralizada en `ConexionBD`.

## 5. Estructura del proyecto

```text
proyecto-jdbc-mascotas-pino/
├── frontend/
│   ├── src/
│   │   ├── components/       # Header, ProductCard, ProductList, SearchBar, ShoppingCart y Footer
│   │   ├── pages/            # Home y Admin
│   │   ├── styles/           # Estilos generales
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── services.js       # Comunicación HTTP con el API
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── src/main/java/com/mascotaspino/
│   ├── conexion/             # Conexión JDBC
│   ├── modelo/               # Entidad Producto
│   ├── dao/                  # Acceso a datos
│   ├── servicio/              # Validación y lógica de negocio
│   └── web/                  # Servlet tradicional y API REST
├── src/main/webapp/          # Aplicación web Java y destino de compilación React
├── database/db_mascotas_pino.sql
├── pom.xml
├── enlace_repositorio.txt
└── README.md
```

## 6. Preparación y ejecución

### Base de datos

1. Iniciar MySQL desde XAMPP.
2. Importar `database/db_mascotas_pino.sql` en phpMyAdmin.
3. Verificar los datos de conexión en `src/main/java/com/mascotaspino/conexion/ConexionBD.java`. La configuración inicial usa `localhost:3306`, usuario `root` y contraseña vacía.

### Front-End React

1. Instalar Node.js y npm.
2. Abrir una terminal en la carpeta `frontend`.
3. Ejecutar `npm install` para instalar React, Vite y sus dependencias.
4. Para desarrollo, iniciar Tomcat con el contexto `mascotas-pino` y ejecutar `npm run dev`. Abrir la dirección local que indique Vite.
5. Para integrar el Front-End en el proyecto Java, ejecutar `npm run build`. Vite genera los archivos compilados en `src/main/webapp/app`.

### Aplicación Java

1. Instalar JDK 17, Maven y Apache Tomcat 10.1 o superior.
2. Desde la raíz del proyecto, ejecutar `mvn clean package`.
3. Copiar `target/mascotas-pino.war` a la carpeta `webapps` de Tomcat.
4. Iniciar Tomcat y abrir `http://localhost:8080/mascotas-pino/app/`.

La interfaz React necesita que Tomcat y MySQL estén activos para consultar o modificar los productos reales. El carrito es una vista previa local; no procesa pagos ni crea pedidos.

## 7. Estándares y comentarios

- Componentes React con nombres en PascalCase.
- Variables y funciones en camelCase.
- Separación de componentes, páginas, servicios y estilos.
- Uso de props para compartir datos y acciones entre componentes.
- Uso de Hooks para administrar estados y efectos.
- Comentarios en los componentes y operaciones principales.
- Validación de campos en la interfaz y en la capa de servicio Java.
- Consultas SQL parametrizadas con `PreparedStatement` en el DAO.

## 8. Relación con los artefactos del ciclo de software

El Front-End corresponde al proyecto Mascotas Pino y al módulo de gestión del catálogo desarrollado previamente. La vista de administración implementa las operaciones de registrar, consultar, actualizar y eliminar definidas en el módulo Java/JDBC. Los componentes `ProductCard`, `ProductList` y `SearchBar` cubren la consulta y exploración del catálogo; `Admin` permite gestionar los registros. La organización conserva la separación entre interfaz, servicio, acceso a datos y base de datos.

Los diagramas de clases, casos de uso, historias de usuario, diseños/prototipos y el plan técnico elaborados en evidencias anteriores deben conservarse como artefactos de referencia del proyecto y anexarse si el instructor los solicita.

## 9. Control de versiones

El proyecto conserva el repositorio Git recibido y su remoto:

`https://github.com/Tupaginaweb9/proyecto-jdbc-mascotas-pino`

Después de revisar los cambios, ejecutar desde la raíz:

```bash
git status
git add .
git commit -m "Implementa Front-End React para Mascotas Pino AA4-EV03"
git push origin main
```

El `git push` requiere conexión a GitHub y autorización de la cuenta propietaria. Verificar en GitHub que el nuevo commit aparezca publicado.
