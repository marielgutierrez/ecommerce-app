import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { FaShippingFast, FaGem, FaHeart } from "react-icons/fa";
import styles from "./Home.module.css";
import { useProductos } from "../context/ProductosContext";
import ItemList from "../components/ItemList";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Home = () => {
  const { productos } = useProductos();
  const destacados = productos.slice(0, 3);

  useScrollReveal([destacados]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />

        <div className={styles.heroInner}>
          <span className={styles.badge}>
            <span className={styles.dot} />
            Cosmética de alta calidad
          </span>

          <h1 className={styles.name}>
            Belleza que <em>transforma</em>
          </h1>

          <p className={styles.role}>Aura Makeup · Nacional e internacional</p>

          <p className={styles.desc}>
            Descubrí las mejores marcas del mundo y lo mejor de Argentina.
            Productos originales, certificados y con envío a todo el país.
          </p>

          <div className={styles.actions}>
            <Link to="/productos" className="btn-primary">
              <FiShoppingBag /> Ver productos
            </Link>
            <Link to="/contacto" className="btn-ghost">
              Contacto <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={`${styles.feature} reveal`}>
          <FaGem className={styles.icon} />
          <h3>Calidad garantizada</h3>
          <p>Productos originales con certificación de calidad.</p>
        </div>
        <div className={`${styles.feature} reveal delay-1`}>
          <FaShippingFast className={styles.icon} />
          <h3>Envío a todo el país</h3>
          <p>Recibí tu pedido donde estés en Argentina.</p>
        </div>
        <div className={`${styles.feature} reveal delay-2`}>
          <FaHeart className={styles.icon} />
          <h3>Belleza auténtica</h3>
          <p>Las mejores marcas del mundo y lo mejor local.</p>
        </div>
      </section>

      {destacados.length > 0 && (
        <section className={styles.destacados}>
          <div className={styles.destHead}>
            <div>
              <p className="section-label">Selección</p>
              <h2 className="section-title">
                Productos <em>destacados</em>
              </h2>
            </div>
            <Link to="/productos" className={styles.verTodos}>
              Ver todos <FiArrowRight />
            </Link>
          </div>

          <div className={styles.grid}>
            <ItemList productos={destacados} />
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
