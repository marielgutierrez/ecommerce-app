import { Routes, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "./components/layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import { ProductosProvider } from "./context/ProductosContext";
import RutaProtegida from "./components/RutaProtegida";

import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
import DetalleProducto from "./pages/DetalleProducto";
import ItemListContainer from "./components/ItemListContainer";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <ProductosProvider>
        <CarritoProvider>
          <Helmet>
            <title>Aura Makeup · Cosméticos de alta calidad</title>
            <meta
              name="description"
              content="Aura Makeup — Tienda de cosméticos nacional e internacional. Productos originales con envío a todo el país."
            />
          </Helmet>

          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Rutas públicas */}
              <Route index element={<Home />} />
              <Route
                path="productos"
                element={<ItemListContainer Mensaje="Nuestros productos" />}
              />
              <Route path="producto/:id" element={<DetalleProducto />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="carrito" element={<Carrito />} />
              <Route path="login" element={<Login />} />
              <Route path="registro" element={<Registro />} />

              {/* Ruta protegida solo para administradores */}
              <Route
                path="dashboard"
                element={
                  <RutaProtegida soloAdmin>
                    <Dashboard />
                  </RutaProtegida>
                }
              />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div style={{ textAlign: "center", padding: "120px 20px" }}>
                    <h1 style={{ fontFamily: "var(--font-serif)", color: "var(--wine)", fontSize: "2.5rem" }}>
                      404
                    </h1>
                    <p style={{ color: "var(--text-soft)", margin: "12px 0 24px" }}>
                      La página que buscás no existe.
                    </p>
                    <Link to="/" className="btn-primary">Volver al inicio</Link>
                  </div>
                }
              />
            </Route>
          </Routes>
        </CarritoProvider>
      </ProductosProvider>
    </AuthProvider>
  );
}

export default App;
