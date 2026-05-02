# 🎵 Disquería POP — eCommerce
 
Primer entrega del proyecto final. Sitio de comercio electrónico de música física (vinilos, CDs, cassettes) desarrollado con React y Vite.
 
---
 
## 🛠️ Tecnologías utilizadas
 
| Tecnología | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | 18+ | Framework principal de UI |
| [Vite](https://vitejs.dev/) | 5+ | Bundler y entorno de desarrollo |
| [React Router DOM](https://reactrouter.com/) | 6+ | Sistema de ruteo SPA |
| JavaScript (ES6+) | — | Lenguaje base |
| CSS Modules | — | Estilos con scope por componente |
 
---

## ✅ Requerimientos cubiertos
 
### Requerimiento #1 — Estructura y Layout
 
- Estructura de carpetas organizada por componente
- `Layout.jsx` que envuelve todas las páginas con `Header` y `Footer` consistentes
- `Header.jsx` con navegación usando `<Link>` de React Router
- `Footer.jsx` con información de la empresa y tarjetas del equipo (mínimo 3 personas)
### Requerimiento #2 — Catálogo de productos con datos de una API
 
- `ItemListContainer.jsx` carga los productos desde `data/productos.json` usando `useEffect` y `fetch`
- Cada producto se renderiza con el componente reutilizable `Item.jsx` que recibe sus datos por props
### Requerimiento #3 — Sistema de ruteo
 
Rutas configuradas con `react-router-dom`:
 
| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home.jsx` | Vista principal de bienvenida |
| `/productos` | `Productos.jsx` | Catálogo completo de productos |
| `/producto/:id` | `ProductoDetalle.jsx` | Detalle de un producto individual |
| `/carrito` | `Carrito.jsx` | Vista del carrito de compras |
 
La navegación utiliza `<Link>` para evitar recargas de página.
