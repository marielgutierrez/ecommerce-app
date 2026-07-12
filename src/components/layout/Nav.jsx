import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import styles from "./Nav.module.css";
import { useCart } from "../../context/CarritoContext";
import { useAuth } from "../../context/AuthContext";

const Nav = () => {
  const [abierto, setAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { obtenerCantidadTotal } = useCart();
  const { estaLogueado, esAdmin, usuario, logout } = useAuth();
  const location = useLocation();

  const cantidad = obtenerCantidadTotal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setAbierto(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  const enlaces = (
    <>
      <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : "")}>
        Inicio
      </NavLink>
      <NavLink to="/productos" className={({ isActive }) => (isActive ? styles.active : "")}>
        Productos
      </NavLink>
      <NavLink to="/contacto" className={({ isActive }) => (isActive ? styles.active : "")}>
        Contacto
      </NavLink>
      {esAdmin && (
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : "")}>
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <Link to="/" className={styles.logo}>
          Aura<span>Makeup</span>
        </Link>

        {/* Enlaces escritorio */}
        <div className={styles.links}>{enlaces}</div>

        {/* Acciones */}
        <div className={styles.actions}>
          {estaLogueado ? (
            <div className={styles.userBox}>
              <span className={styles.userName} title={usuario?.email}>
                <FiUser /> {usuario?.nombre || usuario?.email?.split("@")[0]}
              </span>
              <button className={styles.logoutBtn} onClick={logout} title="Cerrar sesión">
                <FiLogOut />
              </button>
            </div>
          ) : (
            <Link to="/login" className={styles.loginLink}>
              <FiUser /> Ingresar
            </Link>
          )}

          <Link to="/carrito" className={styles.cartBtn} aria-label="Carrito">
            <FiShoppingCart />
            {cantidad > 0 && <span className={styles.badge}>{cantidad}</span>}
          </Link>

          {/* Hamburguesa */}
          <button
            className={`${styles.toggle} ${abierto ? styles.open : ""}`}
            onClick={() => setAbierto((v) => !v)}
            aria-label="Abrir menú"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Drawer mobile */}
      <div className={`${styles.drawer} ${abierto ? styles.open : ""}`}>
        <ul>
          <li>{enlaces}</li>
          {estaLogueado ? (
            <li>
              <button className={styles.drawerLogout} onClick={logout}>
                <FiLogOut /> Cerrar sesión
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">Ingresar</Link>
            </li>
          )}
        </ul>
      </div>
      <div
        className={`${styles.overlay} ${abierto ? styles.show : ""}`}
        onClick={() => setAbierto(false)}
      />
    </>
  );
};

export default Nav;
