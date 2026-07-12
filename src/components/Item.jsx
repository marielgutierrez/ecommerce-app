import { Link } from "react-router-dom";
import { FiShoppingCart, FiEye } from "react-icons/fi";
import styles from "./Item.module.css";
import { useCart } from "../context/CarritoContext";

const Item = ({ producto }) => {
  const { id, nombre, precio, stock, imagen, categoria } = producto;
  const { agregarACarrito } = useCart();

  const sinStock = Number(stock) <= 0;

  return (
    <article className={`${styles.card} reveal`}>
      <Link to={`/producto/${id}`} className={styles.imgWrap}>
        {imagen ? (
          <img src={imagen} alt={nombre} loading="lazy" />
        ) : (
          <div className={styles.noImg}>Sin imagen</div>
        )}
        {categoria && <span className={styles.categoria}>{categoria}</span>}
        <span className={styles.overlay}>
          <FiEye /> Ver detalle
        </span>
      </Link>

      <div className={styles.body}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.stock}>
          {sinStock ? "Sin stock" : `${stock} en stock`}
        </p>

        <div className={styles.footer}>
          <span className={styles.precio}>${Number(precio).toLocaleString("es-AR")}</span>
          <button
            className={styles.addBtn}
            onClick={() => agregarACarrito(producto, 1)}
            disabled={sinStock}
            aria-label={`Agregar ${nombre} al carrito`}
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Item;
