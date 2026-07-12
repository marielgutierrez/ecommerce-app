import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CarritoContext";
import styles from "./Carrito.module.css";

const Carrito = () => {
  const {
    carrito,
    vaciarCarrito,
    obtenerTotalPrecio,
    obtenerCantidadTotal,
    incrementarCantidad,
    decrementarCantidad,
    eliminarDelCarrito,
  } = useCart();

  if (carrito.length === 0) {
    return (
      <div className={styles.wrapper}>
        <Helmet><title>Carrito · Aura Makeup</title></Helmet>
        <div className={styles.empty}>
          <FiShoppingBag className={styles.emptyIcon} />
          <h1 className={styles.emptyTitle}>Tu carrito está vacío</h1>
          <p className={styles.emptyText}>
            Explorá el catálogo y sumá tus productos favoritos.
          </p>
          <Link to="/productos" className="btn-primary">
            <FiShoppingBag /> Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Helmet><title>Carrito · Aura Makeup</title></Helmet>
      <p className="section-label">Tu compra</p>
      <h1 className="section-title" style={{ marginBottom: "2rem" }}>
        Carrito de <em>compras</em>
      </h1>

      <ul className={styles.list}>
        {carrito.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.thumb}>
              {item.imagen ? (
                <img src={item.imagen} alt={item.nombre} />
              ) : (
                <div className={styles.noImg} />
              )}
            </div>

            <div className={styles.itemInfo}>
              <h4 className={styles.itemName}>{item.nombre}</h4>
              <span className={styles.unit}>
                ${Number(item.precio).toLocaleString("es-AR")} c/u
              </span>
            </div>

            <div className={styles.qtyControls}>
              <button onClick={() => decrementarCantidad(item.id)} aria-label="Restar">
                <FiMinus />
              </button>
              <strong>{item.cantidad}</strong>
              <button onClick={() => incrementarCantidad(item.id)} aria-label="Sumar">
                <FiPlus />
              </button>
            </div>

            <span className={styles.subtotal}>
              ${(item.precio * item.cantidad).toLocaleString("es-AR")}
            </span>

            <button
              className={styles.removeBtn}
              onClick={() => eliminarDelCarrito(item.id)}
              aria-label={`Eliminar ${item.nombre}`}
              title="Eliminar"
            >
              <FiTrash2 />
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <button className={styles.btnClear} onClick={vaciarCarrito}>
          <FiTrash2 /> Vaciar carrito
        </button>

        <div className={styles.totalBox}>
          <div className={styles.totalRow}>
            <span>{obtenerCantidadTotal()} productos</span>
            <span className={styles.total}>
              ${obtenerTotalPrecio().toLocaleString("es-AR")}
            </span>
          </div>
          <button className="btn-primary" onClick={() => alert("¡Gracias por tu compra! (demo)")}>
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
