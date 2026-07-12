# 💄 Aura Makeup — E-commerce (React + Firebase)

Proyecto Final de **React JS**: una tienda de cosméticos completa con carrito de
compras, autenticación de usuarios, panel de administración con CRUD sobre
Firebase, búsqueda, paginación y diseño responsivo.

La estética (paleta vino/rosa, tipografías serif + mono y animaciones) está
inspirada en un diseño de referencia, implementada con **CSS Modules** puro.

---

## ✨ Funcionalidades

- **Carrito de compras funcional** con Context API (`CarritoContext`):
  agregar (sin duplicar), incrementar/decrementar cantidad, eliminar un producto
  individual y vaciar el carrito. Persiste en `localStorage`.
- **Autenticación** con Firebase Authentication (`AuthContext`): registro, login,
  logout y **autorización por rol**. El administrador ve el **Dashboard**; el
  usuario común, no.
- **CRUD completo en Firebase (Firestore)**: mostrar, agregar, editar y eliminar
  productos, con **modal de confirmación** antes de borrar, **spinner** de carga
  y **mensajes de error**.
- **Rutas públicas** (Inicio, Productos, Detalle, Contacto, Carrito) y **ruta
  protegida** para administrador (Dashboard).
- **Detalle de producto**: título, precio, descripción, imagen, stock y categoría,
  con selector de cantidad, agregar al carrito y **sección de opiniones** en
  tiempo real.
- **Barra de búsqueda** en tiempo real y **paginación** del catálogo.
- **Diseño responsivo** con **menú hamburguesa** (drawer) en móvil.
- **SEO** con **React Helmet** (`<title>` y `<meta>` por página) e **iconos**
  con **React Icons**.

---

## 🛠️ Tecnologías

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router DOM 7](https://reactrouter.com/) — ruteo y rutas protegidas
- [Firebase](https://firebase.google.com/) — Authentication + Firestore
- [React Helmet Async](https://github.com/staylor/react-helmet-async) — SEO
- [React Icons](https://react-icons.github.io/react-icons/) — iconografía
- **CSS Modules** — estilos modulares y responsivos

---

## 🚀 Instalación y ejecución local

Requisitos: **Node.js 18+** y **pnpm** (o npm).

```bash
# 1. Clonar el repositorio
git clone https://github.com/marielgutierrez/ecommerce-app.git
cd proyecto-ecommerce

# 2. Instalar dependencias
pnpm install        # o: npm install

# 3. Levantar el entorno de desarrollo
pnpm dev            # o: npm run dev
```

La app queda disponible en `http://localhost:5173`.

Otros scripts:

```bash
pnpm build          # build de producción (genera /dist)
pnpm preview        # sirve el build localmente
pnpm lint           # análisis de código con ESLint
```

---

## 🔥 Configuración de Firebase

El proyecto ya incluye una configuración de Firebase en
[`src/firebase/config.js`](src/firebase/config.js). Para usar tu propio proyecto,
reemplazá el objeto `firebaseConfig` y asegurate de:

1. **Habilitar Authentication → Email/Password** en la consola de Firebase.
2. **Crear una base de datos Firestore** (modo test o con reglas apropiadas).

### Colecciones que usa la app

- `productos` — catálogo (campos: `nombre`, `precio`, `stock`, `categoria`,
  `imagen`, `descripcion`).
- `usuarios` — perfil y rol de cada usuario (`email`, `nombre`, `rol`).
- `opiniones` — reseñas de productos (`productoId`, `clienteNombre`,
  `comentario`, `rating`, `fecha`).

### 👤 Cómo tener un administrador

La autorización combina Firestore + una lista de emails de administrador en
[`src/context/AuthContext.jsx`](src/context/AuthContext.jsx):

```js
export const ADMIN_EMAILS = ["admin@aura.com"];
```

Cualquier cuenta registrada con un email de esa lista obtiene rol **admin**
automáticamente y ve el **Dashboard**. Cambiá el email por el tuyo (o agregá
más) y registrate con ese email.

> El resto de los usuarios se crean con rol `usuario` y **no** ven el Dashboard.

### 🌱 Cargar productos de ejemplo

Al iniciar sesión como administrador, si el catálogo está vacío, el Dashboard
muestra el botón **"Cargar productos de ejemplo"** que puebla Firestore con
6 productos de demostración. También podés cargarlos manualmente con el
formulario de alta.

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Item.jsx / ItemList.jsx / ItemListContainer.jsx   # catálogo, búsqueda, paginación
│   ├── RutaProtegida.jsx                                  # protección de rutas
│   └── layout/  (Nav, Header, Footer, Layout)             # navbar + hamburguesa
├── context/
│   ├── AuthContext.jsx           # autenticación y rol
│   ├── CarritoContext.jsx        # estado global del carrito
│   └── ProductosContext.jsx      # catálogo Firestore + CRUD
├── firebase/config.js            # inicialización de Firebase
├── hooks/useScrollReveal.js      # animaciones al hacer scroll
├── pages/
│   ├── Home.jsx                  # landing con hero animado
│   ├── DetalleProducto.jsx       # detalle + opiniones
│   ├── Carrito.jsx               # carrito
│   ├── Login.jsx / Registro.jsx  # autenticación
│   ├── Dashboard.jsx             # panel admin (CRUD)
│   └── Contacto.jsx
├── index.css                     # tokens de diseño, fuentes, utilidades
└── main.jsx / App.jsx            # providers y rutas
```

---

## 🌐 Deploy

El proyecto está listo para **Vercel** ([`vercel.json`](vercel.json)) o
**Netlify** ([`public/_redirects`](public/_redirects)); ambos incluyen la
reescritura a `index.html` para que las rutas del cliente funcionen al recargar.

Configuración de build:

- **Build command:** `pnpm build` (o `npm run build`)
- **Output directory:** `dist`

---

## ✅ Compatibilidad

Probado en las últimas versiones de Chrome, Firefox y Edge. Diseño adaptable a
móviles, tablets y escritorio.
